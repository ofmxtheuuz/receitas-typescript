import express from "express"
const app = express()
import * as handlebars from "express-handlebars"
import path from "path"
import session from "express-session"
import "./strategies/local.strategy"
import passport from "passport"

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

app.get("/", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("index", { user: req.user })
    } else {
        res.redirect("/login")
    }
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }))

app.listen(6709)