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
  .put(mangaController.modifyOneMangaById)
  .delete(mangaController.removeOneMangaById);   

// Route d'API d'insertion d'un nouveau manga en base de données
router.route('/API/:isbn')
  .get(mangaController.getMangaInfos); 

// Export
module.exports = router;
