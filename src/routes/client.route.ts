import { Router, Request, Response } from  "express"
import passport from "passport"
import Receitas from "../models/receita.schema"
import "../strategies/local.strategy"
const router = Router()

router.get("/", async (req: Request, res: Response) => {
    res.render("client/index", { receitas: await Receitas.find().lean(), title: "Início", user: req.user })
})


router.get("/criar", (req: Request, res: Response) => {
    if(req.isAuthenticated()) {
        res.render("client/create", { title: "Criar" })
    } else {
        res.redirect("/login")
    }
})

router.post("/service/create", (req: Request, res: Response) => {
    if(req.isAuthenticated()) {
        let user: any = req.user
        Receitas.create({ nome: req.body.nome, descricao: req.body.descricao, conteudo: req.body.conteudo, porcoes: Number(req.body.porcoes), autor: user.nome })
        res.redirect("/")
    } else {
        res.redirect("/login")
    }
})

router.get("/receita", async (req: Request, res: Response) => {
    const receita: any = await Receitas.findById(req.query.id).lean()
    res.render("client/visualizar", { receita: receita, title: receita.nome })
})

export default router