import conexao from '../config/conexao.js'

const Cliente = conexao.Schema({
    nome: {type:String, required:true},
    tel: {type:String, required:true}
})

export default conexao.model('Cliente',Cliente)
