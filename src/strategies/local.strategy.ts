import passport from "passport"
import local from "passport-local"
const LocalStrategy = local.Strategy;
import Users from "../models/user.schema"

passport.use(new LocalStrategy(
    async function(username: String, password: String, done: any) {
        let _user: any = await Users.findOne({ username: username }).select('+senha').exec()
        
        if(_user != null && _user.senha == password) {
            return done(null, { id: _user._id });
        } else {
            return done(null, false, { message: 'Credenciais inválidas' });
        }
    }
  ));

passport.serializeUser(function(user: any, done: any) {
    done(null, user.id);
});

passport.deserializeUser(async function(id: any, done: any) {
    
    const user: any = await Users.findById(id);
    
    done(null, { id: user._id, email: user.email, username: user.username, nome: user.nome });
    
});
