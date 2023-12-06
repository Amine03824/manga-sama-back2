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

// Associe un manga à un article par la table de relation manga_has_article //TODO! : A FAIRE POUR LES ASSOCIATIONS
router.route('/:id/manga/:id')
  .get(articleController.getAllArticles)
  .post(articleController.createOneArticle);

// Export
module.exports = router;
