// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const conditionController = require('../controllers/conditionController');


// Routes correspondant à l'état des mangas
router.route('/')
  .get(conditionController.getAllConditions)
  .post(conditionController.createOneCondition);

// Routes correspondant à un état spécifique
router.route('/:id')
  .get(conditionController.getOneConditionById)
  .patch(conditionController.modifyOneConditionById)
  .delete(conditionController.removeOneConditionById);

// Export
module.exports = router;
