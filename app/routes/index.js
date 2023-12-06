// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import des sous routeurs
const articlesRouter = require('./articles'); 
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const mangasRouter = require('./mangas');
const conditionsRouter = require('./conditions');
const rolesRouter = require('./roles');
const imagesRouter = require('./images'); 

// Routes correspondant aux annonces
router.use('/article', articlesRouter);

// Routes correspondant aux catégories
router.use('/category', categoriesRouter);

// Routes correspondant aux utilisateurs
router.use('/user', usersRouter);

//  Routes correspondant aux mangas dans la base de données
router.use('/manga', mangasRouter);

// Routes correspondant à l'état des mangas
router.use('/condition', conditionsRouter);

// Routes correspondant aux rôles utilisateur
router.use('/role', rolesRouter);

// Routes correspondant aux des couvertures de mangas
router.use('/images', imagesRouter);

module.exports = router;

