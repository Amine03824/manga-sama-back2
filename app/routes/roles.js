// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const roleController = require('../controllers/roleController');

// Routes correspondant aux rôles utilisateur
router.route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createOneRole);

// Routes correspondant à un role spécifique
router.route('/:id')
  .get(roleController.getOneRoleById)
  .patch(roleController.modifyOneRoleById)
  .delete(roleController.removeOneRoleById);


// Export
module.exports = router;
