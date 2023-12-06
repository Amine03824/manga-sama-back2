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

router.route('/admin/:id')
  .put(userController.adminModifyOneUserById);
  
// Export
module.exports = router;
