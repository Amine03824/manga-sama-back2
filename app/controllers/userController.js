const userDataMapper = require("../dataMappers/userDataMapper");

const userController = {
  
  // Récupère tous les utilisateurs de la base de données
  getAllUsers: async (request, response, next) => {
    try {
      const users = await userDataMapper.findAllusers();
      if (!users) {
        return next();
      }
      response.json({
        status: 200,
        users,
      });
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },

  // Crée un nouvel utilisateur dans la base de données
  createOneUser: async (request, response) => {
    try {
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
        password,
      } = request.body;


      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (
        typeof lastname !== "string" ||
        typeof firstname !== "string" ||
        typeof pseudo !== "string" ||
        typeof birthdate !== "string" ||
        typeof address !== "string" ||
        typeof zip_code !== "string" ||
        typeof city !== "string" ||
        typeof phone_number !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        return response.json({
          status:400,
          error: "Paramètre manquant ou type incorrect dans le corps de la requête HTTP",
        });
      }

      const newUser = await userDataMapper.insertOneUser({
        lastname,
        firstname,
        pseudo,
        birthdate,
        address,
        zip_code,
        city,
        phone_number,
        email,
        password,
      });

      if (newUser) {
        // La création s'est bien déroulée
        console.log("L'utilisateur a été créé avec succès");
        return response.json({
          status: 201,
          success: true,
          message: "L'utilisateur a été créé avec succès",
          user: newUser,
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message:
            "Aucun utilisateur n'a été créé, peut-être que l'utilisateur existe déjà",
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },

  // Récupère un utilisateur par son code id
  getOneUserById: async (request, response) => {
    try {
      const { id } = request.params;
  
      const user = await userDataMapper.findOneUserById(id);
      if (!user) {
        // Aucune utilisateur trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun utilisateur trouvé avec le code id spécifié",
        });
      }
      return response.json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },

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
        password,
      } = request.body;
      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (
        typeof lastname !== "string" ||
        typeof firstname !== "string" ||
        typeof pseudo !== "string" ||
        typeof birthdate !== "string" ||
        typeof address !== "string" ||
        typeof zip_code !== "string" ||
        typeof city !== "string" ||
        typeof phone_number !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"      
      ) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP",
        });
      }

      const modifiedUser = await userDataMapper.updateOneUser({
        id,
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
      });

      if (modifiedUser) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "L'utilisateur a été modifié avec succès",
          user: modifiedUser,
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun utilisateur n'a été modifié",
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },

  adminModifyOneUserById: async (request, response) => {
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
        password,
        role_id,
      } = request.body;

      if (
        typeof lastname !== "string" ||
        typeof firstname !== "string" ||
        typeof pseudo !== "string" ||
        !(birthdate instanceof Date) ||
        typeof address !== "string" ||
        typeof zip_code !== "string" ||
        typeof city !== "string" ||
        typeof phone_number !== "number" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof role_id !== "number"
      ) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP",
        });
      }

      const adminModifiedUser = await userDataMapper.adminUpdateOneUser({
        id,
        lastname,
        firstname,
        pseudo,
        birthdate,
        address,
        zip_code,
        city,
        phone_number,
        email,
        password,
        role_id,
      });

      if (adminModifiedUser) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "L'utilisateur a été modifié avec succès",
          user: adminModifiedUser,
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun utilisateur n'a été modifié",
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },

  // Supprime un utilisateur par son code ID
  removeOneUserById: async (request, response) => {
    const { id } = request.params;
    try {
      const user = await userDataMapper.deleteOneUserById(id);
      if (!user) {
        // Aucun utilisateur trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun utilisateur trouvé avec le code id spécifié",
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: "Utilisateur supprimé avec succès",
      });
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },
};

module.exports = userController;
