import conexao from '../config/conexao.js'

const Profissional = conexao.Schema({
    nome: {type:String, required:true},
    especialidade:{type:String, required:true},
    anosExperiencia:{type:Number, required:true}
})

export default conexao.model('Profissional',Profissional)
