const validator = require("email-validator");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const userDataMapper = require("../dataMappers/userDataMapper");

// Définition des expressions régulières
const nameRegex = /^[a-zA-ZÀ-ÿ]*$/;
const pseudoRegex = /^[a-zA-ZÀ-ÿ0-9_]*$/;

// Fonction de validation des champs
const validateFields = (fields, fieldValidations) => {
  const schema = Joi.object(fieldValidations);

  // Application du schéma à un objet contenant les champs à valider
  const validation = schema.validate(fields);

  // Vérification des erreurs de validation
  if (validation.error) {
    return {
      isValid: false,
      error: validation.error.message
    };
  }

  return { isValid: true };
};

const userController = {
  // ... (autres fonctions)

  // Modifie un utilisateur par son id
  modifyOneUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        lastname,
        firstname,
        pseudo,
        birthdate,
        address,
        zip_code,
        city,
        phone_number,
        email,
        password
      } = request.body;

      // Définition des validations pour chaque champ
      const fieldValidations = {
        lastname: Joi.string().min(1).regex(nameRegex).messages({
          "string.pattern.base":
            "Le nom doit contenir uniquement des caractères latins"
        }),
        firstname: Joi.string().min(1).regex(nameRegex).messages({
          "string.pattern.base":
            "Le prénom doit contenir uniquement des caractères latins"
        }),
        pseudo: Joi.string().min(2).regex(pseudoRegex).messages({
          "string.min": "Le pseudo doit contenir au moins 2 caractères",
          "string.pattern.base":
            "Le pseudo doit contenir uniquement des caractères latins, chiffres ou underscores"
        })
        // ... (ajoutez d'autres champs et validations au besoin)
      };

      // Appel de la fonction de validation
      const validation = validateFields(
        {
          lastname,
          firstname,
          pseudo,
          birthdate,
          address,
          zip_code,
          city,
          phone_number,
          email,
          password
        },
        fieldValidations
      );

      // Vérification du résultat de la validation
      if (!validation.isValid) {
        // Retourne une réponse JSON avec le statut 400 en cas d'erreur de validation
        return response.json({
          status: 400,
          error: validation.error
        });
      }

      // Continue avec le reste de la fonction...
    } catch (error) {
      // Gestion des erreurs - retourne une réponse avec le statut 500 en cas d'erreur
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }

  // ... (autres fonctions)
};

module.exports = userController;
