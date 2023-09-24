const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// Pour le paramétrage et la vérification du mot de passe (gère les hashages etc...)
const crypto = require("crypto");
// Utilisé pour générer le token de session
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection: 'users'
});

// plugin qui permet d'améliorer les messages d'erreur lors de l'enregistrement de données uniques
userSchema.plugin(uniqueValidator); 

// On crée une méthode qui sera utilisée lors de la création d'un utilisateur
// Cette méthode permet de créer un salt aléatoire (randomBytes) et de définir un hashage (pbkdf2Sync) pour le password
// rappel : hex = hexadécimal
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

// On créee une méthode qui permettra de vérifier le password
userSchema.methods.verifPassword = async (password, user) => {
  // const userPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return await bcrypt.compare(password, user.password);
};

// On crée une méthode qui génère un jeton avec une date d'expiration et un message secret hashé
userSchema.methods.generateJwt = function() {
  let expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  expirationDate = String(expirationDate.getTime() / 1000);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expirationDate, 10)
  }, "ceDctaAsrDIi6LWBx6vkaEFYawj136Nr"); // TODO Secret à mettre dans une variable d'environnement de NODEJS (fichier .env)
};


module.exports = mongoose.model('User', userSchema);