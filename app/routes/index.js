// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import des sous routeurs
const listingRouter = require('./listings'); 
const categoryRouter = require('./categories');
const userRouter = require('./users');
const mangaRouter = require('./mangas');
const conditionRouter = require('./conditions');
const roleRouter = require('./roles');

// TODO! : Rajouter les controllers associés
// Routes correspondant aux annonces
router.use('/listing', listingRouter);
router.use('/listing/:id', listingRouter);

// Routes correspondant aux catégories
router.use('/category', categoryRouter);
router.use('/category/:id', categoryRouter);

// Routes correspondant aux utilisateurs
router.use('/user', userRouter);
router.use('/user/:id', userRouter);

// Routes correspondant aux mangas
router.use('/manga', mangaRouter);
router.use('/manga/:id', mangaRouter);

// Routes correspondant à l'état des mangas
router.use('/condition', conditionRouter);
router.use('/condition/:id', conditionRouter);

// Routes correspondant aux rôles utilisateur
router.use('/role', roleRouter);
router.use('/role/:id', roleRouter);


module.exports = router;

