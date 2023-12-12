// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const userController = require("../controllers/userController");

// Route correspondant aux utilisateurs
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createOneUser);

// Route correspondant à un utilisateur spécifique
router
  .route("/:id")
  .get(userController.getOneUserById)
  .put(userController.modifyOneUserById)
  .patch(userController.modifyOneUserEmailById)
  // .patch(userController.modifyOneUserPasswordById) Route de moficiation de mot de passe
  .delete(userController.removeOneUserById);

// Export
module.exports = router;
