const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');


//router.get('/', auth, stuffCtrl.getAllStuff); => exemple pour l'utilisation de la sécurité des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;