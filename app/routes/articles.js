// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const articleController = require("../controllers/articleController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Routes correspondant aux annonces
router
  .route("/")
  .get(articleController.getAllArticles)
  .post(authenticateMiddleware, articleController.createOneArticle);

// Routes correspondant à une annonce spécifique
router
  .route("/:id")
  .get(articleController.getOneArticleById)
  .put(authenticateMiddleware, articleController.modifyOneArticleById)
  .delete(authenticateMiddleware, articleController.removeOneArticleById);

// Export
module.exports = router;
