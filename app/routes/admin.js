// Import d'express et du router
const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// Route d'administrateur pour éditer les privilèges d'un utilisateur spécifique
router.route('/user/:id')
  .put(userController.adminModifyOneUserById);


// Export
module.exports = router;