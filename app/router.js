const express = require("express");
const router = express.Router();


// Import de nos controleurs
// const listingController = require("./controllers/listingController.js")
// const categoryController = require("./controllers/categoryController.js")
// const userController = require("./controllers/userController.js")

// Les routes deviennent DYNAMIQUES : elles fonctionnent quel que soit le nom du modèle !
// TODO! Ajouter les controlleurs associés 
// Routes correspondant aux annonces
// router.route('/posts')
//   .get(listingsController.getAll)
//   .post(listingsController.create);

// Routes correspondant à une annonce spécifique
// router.route('/post/:id')
//   .get(listingController.getOneListingById)
//   .patch(listingController.updateOneListingById)
//   .delete(listingController.deleteOneListingById)

// Routes correspondant aux catégories
// router.route('/category')
//   .get(categoryController.getAll)
//   .post(categoryController.create)

// Routes correspondant à une catégorie spécifique
// router.route('/category/:id')
//   .get(categoryController.getOneCategoryById)
//   .patch(categoryController.updateOneCategoryById)
//   .delete(categoryController.deleteOneCategoryById)

// Route correspondant aux utilisateurs
// router.route('/user')
//  .get(userController.getAll)
//  .post(userController.create)

// Route correspondant à un utilisateur spécifique
// router.route('/user/:id')
//  .get(userController.getOneUserById)
//  .path(userController.updateOneUserById)
//  .delete(userController.deleteOneUserById)