// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const articleController = require('../controllers/articleController');

// Routes correspondant aux annonces
router.route('/')
  .get(articleController.getAllArticles)
  .post(articleController.createOneArticle);

// Routes correspondant à une annonce spécifique
router.route('/:id')
  .get(articleController.getOneArticleById)
  .put(articleController.modifyOneArticleById)
  .delete(articleController.removeOneArticleById);


// Export
module.exports = router;
