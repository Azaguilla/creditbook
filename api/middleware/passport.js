const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

// On définit le comportement de la connexion grâce à passport
// La stratégie est locale car on connecte l'utilisateur avec des données d'une bdd locale
// userameField permet de définir le login à utiliser : on veut l'email et non pas le username
passport.use(
  new LocalStrategy(
    {
      passwordField: "password",
      usernameField: "username",
    },
    (username, password, done) => {
      User.findOne({ username }, async (err, user) => {
        if (err) {
          return done(err);
        }
        // Si l'utilisateur n'est pas dans la BDD
        if (!user) {
          return done(null, false, {
            message: "L'utilisateur est introuvable.",
          });
        }
        // Si le mot de passe est incorrecte
        const testPsw = await user.verifPassword(password, user);
        console.log(testPsw);
        if (!testPsw) {
          return done(null, false, {
            message: "Le mot de passe est incorrecte.",
          });
        }
        // Si l'utilisateur est trouvé et le mot de passe correcte (on retourne l'utilisateur)
        return done(null, user);
      });
    },
  ),
);
