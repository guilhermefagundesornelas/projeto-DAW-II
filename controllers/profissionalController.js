//importar o Model
import Profissional from '../models/Profissional.js'

export default class profissionalController{

    constructor(caminhoBase='profissional/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Profissional
            await Profissional.create({
                nome: req.body.nome,
                especialidade:req.body.especialidade,
                anosExperiencia:req.body.anosExperiencia
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Profissional.find({})
            res.render(caminhoBase + 'lst', {profissionais:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const profissional = await Profissional.findById(id)
            res.render(caminhoBase + "edt", {profissional})
        }
        this.edt = async(req, res)=>{
        await Profissional.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');

        }

         this.del = async(req, res)=>{
        await Profissional.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');

        }

    }
}
