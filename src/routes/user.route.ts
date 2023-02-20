import express, { Request, Response } from "express"
import "../strategies/local.strategy"
import passport from "passport"
import User from "../models/user.schema"
import Receita from "../models/receita.schema"
const router = express.Router()

router.get("/dashboard", async (req: Request, res: Response) => {
    if(req.isAuthenticated()) {
        let user: any = req.user
        const receitas = await Receita.find({ user_id: user.id }).lean()
        res.render("user/dashboard", { receitas: receitas, title: "Dashboard", user: req.user })
    } else {
        res.redirect("/login")
    }
})

router.get("/delete", async (req: Request, res: Response) => {
    if(req.isAuthenticated()) {
        const user: any = req.user
        const receita: any = await Receita.findById(req.query.id).lean()
        if(receita.user_id == user.id) 
        {
            await Receita.findByIdAndDelete(req.query.id).then(() => {
                res.redirect("/dashboard")
            })
        } else {
            res.redirect("/login")
        }
    } else {
        res.redirect("/login")
    }
})


router.get("/update", async (req: Request, res: Response) => {
    if(req.isAuthenticated()) {
        const user: any = req.user
        const receita: any = await Receita.findById(req.query.id).lean()
        if(receita.user_id == user.id) 
        {
            res.render("user/update", { title: "Atualizar", receita: receita, user: user })
        } else {
            res.redirect("/login")
        }
    } else {
        res.redirect("/login")
    }
})

router.post("/service/update", async(req: Request, res: Response) => {
    if(req.isAuthenticated()) {
        const receita_id: any = req.body.receita_id
        const user: any = req.user
        const receita: any = await Receita.findById(receita_id).lean()
        if(receita.user_id = user.id) {
            await Receita.findByIdAndUpdate(receita_id, {
                nome: req.body.nome,
                descricao: req.body.descricao,
                porcoes: req.body.porcoes
            })
            res.redirect("/dashboard")
        } else {
            res.redirect("/login")
        }
    } else {
        res.redirect("/login")
    }
})

export default router