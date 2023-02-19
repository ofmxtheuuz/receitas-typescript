import * as db from "mongoose"
require("dotenv")

db.connect(`mongodb+srv://mxtheuz:${process.env.DB_PASS}@cluster0.dqcfam1.mongodb.net/Receitas?retryWrites=true&w=majority`)