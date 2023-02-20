import "../config/database_config"
import Receitas from "./models/receita.schema"
import Users from "./models/user.schema"
import express from "express"
import * as handlebars from "express-handlebars"
import path from "path"
import session from "express-session"
import passport from "passport"
import "./strategies/local.strategy"
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// session configuration
app.use(session({
    secret: "56273652356234579843265235893",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


app.engine('handlebars', handlebars.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

import clientr from "./routes/client.route"
app.use('/', clientr)

import authr from "./routes/auth.route"
app.use("/", authr)

app.listen(3000, () => {
    console.log("Servidor aberto e operando na porta 1003, http://localhost:1003")
})