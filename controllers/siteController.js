import Servico from '../models/Servico.js'
import Categoria from '../models/Categoria.js'

export default class siteController {

    constructor() {

        this.index = async (req, res) => {
            const categorias = await Categoria.find({}).limit(6)
            const servicos = await Servico.find({ dispo: 'sim' })
                .limit(3)
                .populate('categoria')
                .populate('profissional')
            res.render('site/index', { categorias, servicos });
        };

        // lista os servicos disponiveis, ou so os de uma categoria (id vem na url)
        this.servicos = async (req, res) => {
            const categorias = await Categoria.find({})
            const filtro = { dispo: 'sim' }
            let titulo = 'Todos os serviços'
            if (req.params.categoria) {
                filtro.categoria = req.params.categoria
                const categoria = await Categoria.findById(req.params.categoria)
                titulo = categoria.nome
            }
            const servicos = await Servico.find(filtro)
                .populate('categoria')
                .populate('profissional')
            res.render('site/servicos', {
                categorias, servicos, titulo,
                categoriaSel: req.params.categoria || '', q: ''
            });
        };

        // filtros enviados pelo formulario (categoria e busca por nome)
        this.filtrar = async (req, res) => {
            const categorias = await Categoria.find({})
            const filtro = { dispo: 'sim' }
            let titulo = 'Todos os serviços'

            if (req.body.categoria) {
                filtro.categoria = req.body.categoria
                const categoria = await Categoria.findById(req.body.categoria)
                titulo = categoria.nome
            }
            if (req.body.q) {
                filtro.nome = { $regex: req.body.q, $options: "i" }
            }

            const servicos = await Servico.find(filtro)
                .populate('categoria')
                .populate('profissional')
            res.render('site/servicos', {
                categorias, servicos, titulo,
                categoriaSel: req.body.categoria || '',
                q: req.body.q || ''
            });
        };

        this.categorias = async (req, res) => {
            const categorias = await Categoria.find({})
            res.render('site/categorias', { categorias });
        };

        this.carrinho = (req, res) => {
            res.render('site/carrinho');
        };

        this.contratacoes = (req, res) => {
            res.render('site/contratacoes');
        };

    }
}
