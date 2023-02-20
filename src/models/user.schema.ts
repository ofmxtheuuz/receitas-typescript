import * as db from "mongoose"

const Users = db.model("Users", new db.Schema({
    nome: String,
    email: String,
    username: String,
    senha: String
}))

export default Users