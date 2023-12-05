// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const mangaController = require('../controllers/mangaController');

// Routes correspondant aux mangas
router.route('/')
  .get(mangaController.getAllMangas)
  .post(mangaController.createOneManga);

// Routes correspondant à un manga spécifique
router.route('/:isbn')
  .get(mangaController.getOneMangaById)
  .post(mangaController.getMangaInfos) // Route d'API d'insertion d'un nouveau manga en base de données
  .put(mangaController.modifyOneMangaById)
  .delete(mangaController.removeOneMangaById);   

// Export
module.exports = router;
