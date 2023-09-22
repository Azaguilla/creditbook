const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection: 'users'
});

// plugin qui permet d'améliorer les messages d'erreur lors de l'enregistrement de données uniques
userSchema.plugin(uniqueValidator); 

module.exports = mongoose.model('User', userSchema);