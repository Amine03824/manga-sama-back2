// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const mangaController = require('../controllers/mangaController');

// Routes correspondant aux mangas
router.route('/manga')
  .get(mangaController.getAllMangas)
  .post(mangaController.createOneManga);

// Routes correspondant à un manga spécifique
// router.route('/category/:id')
//   .get(mangaController.getOneMangaById)
//   .patch(mangaController.updateOneMangaById)
//   .delete(mangaController.deleteOneMangaById);


// Export
module.exports = router;
