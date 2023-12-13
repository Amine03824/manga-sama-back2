const transactionDataMapper = require("../dataMappers/transactionDataMapper");
const { v4: uuidv4 } = require('uuid');
const emailService = require("../services/mail/emailService.js");
const userDataMapper = require("../dataMappers/userDataMapper");

const transactionController = {
  addTransaction: async (request, response) => {
    try {
      const {
        buyerID,
        sellerID,
        articleID,
      } = request.body;
      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (
        !buyerID ||
        !sellerID ||
        !articleID 
      ) {
        return response.status(400).json({
          error: "Paramètre manquant dans le corps de la requête"
        });
      }

      const buyerEmail = await userDataMapper.findOneUserEmailById(buyerID);
      const sellerEmail = await userDataMapper.findOneUserEmailById(sellerID);

      const transaction_id = uuidv4();
      const date_transaction = new Date();
      const state_completion = 1;

      const newTransaction = await transactionDataMapper.updateTransactionDetails({
        articleID,
        transaction_id,
        date_transaction,
        state_completion
      });

      if (newTransaction) {
        try {
          // Envoi d'un e-mail de confirmation ✉
          await emailService.sendTransactionBuyerConfirmationEmail(buyerEmail, sellerEmail , newTransaction);
          await emailService.sendTransactionSellerConfirmationEmail(buyerEmail, sellerEmail , newTransaction);
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail de confirmation.' });
        }
        // La transaction s'est bien déroulée
        console.log("Le La transaction s'est bien déroulée");
        return response.json({
          status: 200,
          success: true,
          message: "transaction effectuée avec succès",
          transaction: newTransaction
        });
        
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "La transaction n'a pas pu s'effectuer"
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },
  // TODO! : Faire la mise à jour de l'état d'une transaction vers terminé

};

module.exports = transactionController;
