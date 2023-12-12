// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const roleController = require("../controllers/roleController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Ajout du Middleware d'authentification sécurisée
router.use(authenticateMiddleware);

// Routes correspondant aux rôles utilisateur
router
  .route("/")
  .get(roleController.getAllRoles)
  .post(roleController.createOneRole);

// Routes correspondant à un role spécifique
router
  .route("/:id")
  .get(roleController.getOneRoleById)
  .patch(roleController.modifyOneRoleById)
  .delete(roleController.removeOneRoleById);

// Export
module.exports = router;
