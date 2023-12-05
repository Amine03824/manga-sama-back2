// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const userController = require('../controllers/userController');

// Route correspondant aux utilisateurs
router.route('/')
  .get(userController.getAll)
  .post(userController.create);

// Route correspondant à un utilisateur spécifique
router.route('/:id')
  .get(userController.getOneUserById)
  .path(userController.updateOneUserById)
  .delete(userController.deleteOneUserById);


// Export
module.exports = router;
