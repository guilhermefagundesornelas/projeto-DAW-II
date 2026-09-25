import conexao from '../config/conexao.js'

const Servico = conexao.Schema({
    nome: {type:String, required:true},
    categoria:{type: conexao.Types.ObjectId, ref:"Categoria", required:false},
    profissional:{type: conexao.Types.ObjectId, ref:"Profissional", required:false},
    cliente:{type: conexao.Types.ObjectId, ref:"Cliente", required:false},
    preco:{type:Number, required:true},
    foto:{type:Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
})

export default conexao.model('Servico',Servico)
