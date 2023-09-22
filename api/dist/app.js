"use strict";
//********* REQUIRED **********/
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const path = require('path');
//********* REQUIRED **********/
const app = express();
/********** MONGOOSE **********/
mongoose.connect('mongodb+srv://admin:TIijutf9wylXnpoP@cluster0.etxem6s.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
/********** MONGOOSE **********/
app.use(express.json()); // pour extraire le corps json de la requete post
/******** headers *********/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}); // on ajoute les headers qui permettront à toutes les requêtes d'être lues par l'api (sinon l'api bloque par sécurité)
/******** headers *********/
app.use('/images', express.static(path.join(__dirname, 'images'))); // on indique qu'il faut gérer la ressource images de manière statique à chaque fois qu'elle reçoit une requete vers la route /images
/**************************/
/******** ROUTES **********/
/**************************/
app.use('/api/auth', userRoutes);
/**************************/
/******** ROUTES **********/
/**************************/
/********* EXPORTS *********/
module.exports = app;
/********* EXPORTS *********/ 
