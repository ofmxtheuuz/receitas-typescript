import express, { Request, Response } from "express"
import "../strategies/local.strategy"
import passport from "passport"
import User from "../models/user.schema"
const router = express.Router()


router.get("/login", (req: Request, res: Response) => {
    res.render("auth/login", { title: "Login" })
})
router.post("/login", passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }))

router.get("/registro", (req: Request, res: Response) => {
    res.render("auth/registro", { title: "Registre-se "})
})
router.post("/registro", (req: Request, res: Response) => {
    User.create({
        nome: req.body.nome,
        email: req.body.email,
        username: req.body.username,
        senha: req.body.senha
    })

    res.redirect("/login")
})

router.get("/logout", (req: Request, res: Response, next: any) => {
    req.logout((err) => {
        if(err) { return next(err) }
        res.redirect("/")
    })
})

export default router