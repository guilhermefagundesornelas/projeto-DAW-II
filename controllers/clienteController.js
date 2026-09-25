//importar o Model
import Cliente from '../models/Cliente.js'

export default class clienteController{

    constructor(caminhoBase='cliente/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Cliente
            await Cliente.create({
                nome: req.body.nome,
                tel: req.body.tel
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Cliente.find({})
            res.render(caminhoBase + 'lst', {clientes:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await
            Cliente.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {clientes:resultado})
        }

        this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const cliente = await Cliente.findById(id)
            res.render(caminhoBase + "edt", {cliente})
        }

        this.edt = async(req, res)=>{
            await Cliente.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');

        }

        this.del = async(req, res)=>{
            await Cliente.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');

        }

    }
}
