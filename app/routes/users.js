// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const userController = require("../controllers/userController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Route correspondant aux utilisateurs
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createOneUser);

// Route correspondant à un utilisateur spécifique
router
  .route("/:id")
  .get(authenticateMiddleware, userController.getOneUserById)
  .put(authenticateMiddleware, userController.modifyOneUserById)
  .patch(authenticateMiddleware, userController.modifyOneUserEmailById)
  // .patch(userController.modifyOneUserPasswordById) Route de moficiation de mot de passe
  .delete(authenticateMiddleware, userController.removeOneUserById);

// Export
module.exports = router;
