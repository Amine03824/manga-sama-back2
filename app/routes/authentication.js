// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const authenticationController = require("../controllers/authenticationController");

// Routes correspondant à l'authentification et à la déconnexion

// Route pour la connexion de l'utilisateur
router.post("/login", authenticationController.loginUser);

// Route pour la déconnexion de l'utilisateur (si nécessaire)
router.post("/logout", authenticationController.logoutUser);

// Export
module.exports = router;
