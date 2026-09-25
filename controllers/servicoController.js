//importar o Model
import Servico from '../models/Servico.js'
import Categoria from '../models/Categoria.js'
import Profissional from '../models/Profissional.js'
import Cliente from '../models/Cliente.js'

export default class servicoController{

    constructor(caminhoBase='servico/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            // Buscar as entidades relacionadas pra popular os selects
            const categorias = await Categoria.find({})
            const profissionais = await Profissional.find({})
            const clientes = await Cliente.find({})
            res.render(caminhoBase + "add", {
                Categorias:categorias,
                Profissionais:profissionais,
                Clientes:clientes
            })
        }
        this.add = async(req, res)=>{
            //cria o Servico

            let jcategoria = null;
            if(req.body.categoria){
                jcategoria = await Categoria.findById(req.body.categoria)
            }
            let jprofissional = null;
            if(req.body.profissional){
                jprofissional = await Profissional.findById(req.body.profissional)
            }
            let jcliente = null;
            if(req.body.cliente){
                jcliente = await Cliente.findById(req.body.cliente)
            }

            let fotoEnviada
            if(req.file!=null){
                fotoEnviada = req.file.buffer
            }
            else{
                fotoEnviada = null
            }

            await Servico.create({
                nome: req.body.nome,
                categoria: jcategoria,
                profissional: jprofissional,
                cliente: jcliente,
                preco: req.body.preco,
                duracao: req.body.duracao,
                dispo: req.body.dispo,
                desc: req.body.desc,
                foto: fotoEnviada
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Servico.find({})
                .populate('categoria')
                .populate('profissional')
                .populate('cliente')
            res.render(caminhoBase + 'lst', {Servicos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await
            Servico.find({ nome: { $regex: filtro,
                $options: "i" }})
                .populate('categoria')
                .populate('profissional')
                .populate('cliente')
            res.render(caminhoBase + 'lst', {Servicos:resultado})
        }

        this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const servico = await Servico.findById(id)
            const categorias = await Categoria.find({})
            const profissionais = await Profissional.find({})
            const clientes = await Cliente.find({})
            res.render(caminhoBase + "edt",
                {Servico:servico,
                Categorias:categorias,
                Profissionais:profissionais,
                Clientes:clientes})
        }

        this.edt = async(req, res)=>{
            let jcategoria = req.body.categoria ? await Categoria.findById(req.body.categoria) : null;
            let jprofissional = req.body.profissional ? await Profissional.findById(req.body.profissional) : null;
            let jcliente = req.body.cliente ? await Cliente.findById(req.body.cliente) : null;

            let fotoEnviada
            if(req.file!=null){
                fotoEnviada = req.file.buffer
            }
            else{
                fotoEnviada = null
            }

            await Servico.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                categoria: jcategoria,
                profissional: jprofissional,
                cliente: jcliente,
                preco: req.body.preco,
                duracao: req.body.duracao,
                dispo: req.body.dispo,
                desc: req.body.desc,
                foto: fotoEnviada
            })
            res.redirect('/'+caminhoBase + 'lst');

        }

         this.del = async(req, res)=>{
        await Servico.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');

        }

    }
}
