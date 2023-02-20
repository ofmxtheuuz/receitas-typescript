import * as db from "mongoose"

const Receitas = db.model("Receitas", new db.Schema({
    nome: String,
    descricao: String,
    conteudo: String,
    porcoes: Number,
    data_publicacao: {
        type: Date,
        default: Date.now
    },
    autor: String,
    user_id: String
}))

export default Receitas