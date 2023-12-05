// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const categoryController = require('../controllers/categoryController');

// Routes correspondant aux catégories
router.route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createOneCategory);

// Routes correspondant à une catégorie spécifique
router.route('/:id')
  .get(categoryController.getOneCategoryById)
  .patch(categoryController.modifyOneCategoryById)
  .delete(categoryController.removeOneCategoryById);


// Export
module.exports = router;


