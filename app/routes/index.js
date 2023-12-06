// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import des sous routeurs
const articleRouter = require('./articles'); 
const categoryRouter = require('./categories');
const userRouter = require('./users');
const mangaRouter = require('./mangas');
const conditionRouter = require('./conditions');
const roleRouter = require('./roles');
// const imageRouter = resquire('./images'); //TODO! faire les images

// Routes correspondant aux annonces
router.use('/article', articleRouter);

// Routes correspondant aux catégories
router.use('/category', categoryRouter);


// Routes correspondant aux utilisateurs
router.use('/user', userRouter);


//  Routes correspondant aux mangas dans la base de données
router.use('/manga', mangaRouter);

// Routes correspondant à l'état des mangas
router.use('/condition', conditionRouter);

// Routes correspondant aux rôles utilisateur
router.use('/role', roleRouter);

module.exports = router;

