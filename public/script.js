(function () {
  // dados dos serviços que o usuário colocou no carrinho (vêm dos cards, que vêm do banco)
  const getServices = () => JSON.parse(localStorage.getItem('servilar-services') || '{}')
  const saveServices = (services) => localStorage.setItem('servilar-services', JSON.stringify(services))

  const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const getCart = () => JSON.parse(localStorage.getItem('servilar-cart') || '[]')
  const saveCart = (cart) => {
    localStorage.setItem('servilar-cart', JSON.stringify(cart))
    updateCartCount()
  }
  const updateCartCount = () => {
    const count = getCart().length
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = count
      el.hidden = count === 0
    })
  }
  const toast = (text) => {
    const current = document.querySelector('.toast')
    if (current) current.remove()
    const el = document.createElement('div')
    el.className = 'toast'
    el.setAttribute('role', 'status')
    el.textContent = '✓  ' + text
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2600)
  }

  document.querySelector('[data-menu]')?.addEventListener('click', () => {
    const nav = document.querySelector('.nav')
    nav?.classList.toggle('open')
  })

  let scale = Number(localStorage.getItem('servilar-font') || 100)
  const setScale = (next) => {
    scale = Math.min(125, Math.max(85, next))
    document.documentElement.style.fontSize = scale + '%'
    localStorage.setItem('servilar-font', String(scale))
  }
  setScale(scale)
  document.querySelector('[data-font-minus]')?.addEventListener('click', () => setScale(scale - 10))
  document.querySelector('[data-font-reset]')?.addEventListener('click', () => setScale(100))
  document.querySelector('[data-font-plus]')?.addEventListener('click', () => setScale(scale + 10))

  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      const d = button.dataset
      const services = getServices()
      services[d.add] = { id: d.add, name: d.nome, category: d.categoria, professional: d.profissional, duration: d.duracao, price: Number(d.preco) }
      saveServices(services)
      const cart = getCart()
      cart.push(d.add)
      saveCart(cart)
      toast('Serviço adicionado ao carrinho')
    })
  })

  const heroForm = document.querySelector('[data-hero-search]')
  heroForm?.addEventListener('submit', (event) => {
    event.preventDefault()
    const term = heroForm.querySelector('input').value.trim()
    location.href = '/site/servicos?q=' + encodeURIComponent(term)
  })

  const search = document.querySelector('[data-catalog-search]')
  const category = document.querySelector('[data-category-filter]')
  const filterCards = () => {
    const term = (search?.value || '').toLowerCase().trim()
    const selected = category?.value || 'Todos'
    let visible = 0
    document.querySelectorAll('[data-service-card]').forEach((card) => {
      const matchesText = !term || card.textContent.toLowerCase().includes(term)
      const matchesCategory = selected === 'Todos' || card.dataset.category === selected
      card.hidden = !(matchesText && matchesCategory)
      if (!card.hidden) visible++
    })
    const result = document.querySelector('[data-results]')
    if (result) result.textContent = visible + ' serviços encontrados'
    document.querySelector('[data-no-results]')?.toggleAttribute('hidden', visible !== 0)
  }
  if (search) {
    search.value = new URLSearchParams(location.search).get('q') || ''
    search.addEventListener('input', filterCards)
  }
  if (category) {
    category.value = new URLSearchParams(location.search).get('categoria') || 'Todos'
    category.addEventListener('change', filterCards)
  }
  filterCards()

  const cartList = document.querySelector('[data-cart-list]')
  const renderCart = () => {
    if (!cartList) return
    const services = getServices()
    const cart = getCart().filter((id) => services[id])
    const empty = document.querySelector('[data-empty-cart]')
    const layout = document.querySelector('[data-cart-layout]')
    empty?.toggleAttribute('hidden', cart.length !== 0)
    layout?.toggleAttribute('hidden', cart.length === 0)
    if (!cart.length) return
    const quantities = cart.reduce((all, id) => ({ ...all, [id]: (all[id] || 0) + 1 }), {})
    cartList.innerHTML = Object.entries(quantities).map(([id, qty]) => {
      const item = services[id]
      return `<article class="cart-item">
        <div class="cart-info"><span>${item.category}</span><h2>${item.name}</h2><p>${item.professional ? 'com ' + item.professional + ' · ' : ''}${item.duration}</p><button data-remove="${id}">Remover</button></div>
        <div class="quantity"><button aria-label="Diminuir quantidade" data-minus="${id}">−</button><span>${qty}</span><button aria-label="Aumentar quantidade" data-plus="${id}">+</button></div>
        <strong>${money(item.price * qty)}</strong>
      </article>`
    }).join('')
    const subtotal = cart.reduce((sum, id) => sum + services[id].price, 0)
    document.querySelector('[data-subtotal]').textContent = money(subtotal)
    document.querySelector('[data-fee]').textContent = money(subtotal * .05)
    document.querySelector('[data-total]').textContent = money(subtotal * 1.05)
    document.querySelectorAll('[data-plus]').forEach((b) => b.onclick = () => { const c = getCart(); c.push(b.dataset.plus); saveCart(c); renderCart() })
    document.querySelectorAll('[data-minus]').forEach((b) => b.onclick = () => { const c = getCart(); c.splice(c.indexOf(b.dataset.minus), 1); saveCart(c); renderCart() })
    document.querySelectorAll('[data-remove]').forEach((b) => b.onclick = () => { saveCart(getCart().filter((id) => id !== b.dataset.remove)); renderCart() })
  }
  renderCart()

  document.querySelector('[data-checkout]')?.addEventListener('click', () => {
    saveCart([])
    toast('Pagamento demonstrativo concluído')
    setTimeout(() => location.href = '/site/contratacoes', 700)
  })

  document.querySelector('[data-login]')?.addEventListener('click', () => {
    document.querySelector('[data-modal]')?.removeAttribute('hidden')
  })
  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (event.target === el || el.hasAttribute('data-close-button')) {
        document.querySelector('[data-modal]')?.setAttribute('hidden', '')
      }
    })
  })
  document.querySelector('[data-login-form]')?.addEventListener('submit', (event) => {
    event.preventDefault()
    document.querySelector('[data-modal]')?.setAttribute('hidden', '')
    toast('Login demonstrativo realizado')
  })

  updateCartCount()
})()
