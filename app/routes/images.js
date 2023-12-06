// Import d'express et du router
const express = require("express");
const router = express.Router();
// Import du controlleur
const imageController = require('../controllers/imageController');

// Routes d'envoi des couvertures de mangas
router.route('/:id')
  .get(imageController.sendOneCoverById);

// Export
module.exports = router;
