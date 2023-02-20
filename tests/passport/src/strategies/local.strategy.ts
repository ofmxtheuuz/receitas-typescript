import passport from "passport"
import local from "passport-local"
const LocalStrategy = local.Strategy;

const USERNAME = "Matheus"
const PASSWORD = "Matheus123!"


passport.use(new LocalStrategy(
    function(username: any, password: any, done: any) {
        if( username == USERNAME && password == PASSWORD) {
            return done(null, { id: 1 });
        } else {
            return done(null, false, { message: 'Credenciais inválidas' });
        }
    }
  ));

passport.serializeUser(function(user: any, done: any) {
    done(null, user.id);
});

passport.deserializeUser(function(id: any, done: any) {
    if (id == 1) {
        done(null, { id: 1, email: "matheus@gmail.com", username: "Matheus" });
    }
});
