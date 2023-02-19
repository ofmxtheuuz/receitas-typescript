import "../config/database_config"
import Receitas from "./models/receita.schema"
import express from "express"
import * as handlebars from "express-handlebars"
import path from "path"
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

import clientr from "./routes/client.route"
app.use('/', clientr)

app.listen(3000, () => {
    console.log("Servidor aberto e operando na porta 1003, http://localhost:1003")
})