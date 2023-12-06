// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const userController = require('../controllers/userController');

// Route correspondant aux utilisateurs
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createOneUser);

// Route correspondant à un utilisateur spécifique
router.route('/:id')
  .get(userController.getOneUserById)
  .put(userController.modifyOneUserById)
  .delete(userController.removeOneUserById);

// Route d'administrateur pour éditer les privilèges d'un utilisateur spécifique
router.route('/admin/:id')
  .put(userController.adminModifyOneUserById);
  

// Associe un manga à un article par la table de relation user_has_article  //TODO! : A FAIRE POUR LES ASSOCIATIONS
router.route('/:id/article/:id')
  .get(userController.getAllUsers)
  .post(userController.createOneUser);

// Export
module.exports = router;
