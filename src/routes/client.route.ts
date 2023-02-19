import { Router, Request, Response } from  "express"
import Receitas from "../models/receita.schema"
const router = Router()

router.get("/", async (req: Request, res: Response) => {
    res.render("client/index", { receitas: await Receitas.find().lean(), title: "Início" })
})

router.get("/criar", (req: Request, res: Response) => {
    res.render("client/create", { title: "Criar" })
})
router.post("/service/create", (req: Request, res: Response) => {
    Receitas.create({ nome: req.body.nome, descricao: req.body.descricao, conteudo: req.body.conteudo, porcoes: Number(req.body.porcoes), autor: req.body.autor })
    res.redirect("/")
})

router.get("/receita", async (req: Request, res: Response) => {
    const receita: any = await Receitas.findById(req.query.id).lean()
    res.render("client/visualizar", { receita: receita, title: receita.nome })
})

export default router