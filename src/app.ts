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

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// session configuration
app.use(session({
    secret: "56273652356234579843265235893",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());


app.engine('handlebars', handlebars.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

import clientr from "./routes/client.route"
app.use('/', clientr)

import authr from "./routes/auth.route"
app.use("/", authr)

import userr from "./routes/user.route"
app.use("/", userr)

app.listen(3000, () => {
    console.log("Servidor aberto e operando na porta 1003, http://localhost:1003")
})