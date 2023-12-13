const mangaCoverLocation = ('../../public/images');
const path = require('path');
const fs = require('fs');
const userDataMapper = require("../dataMappers/userDataMapper");
const articleDataMapper = require("../dataMappers/articleDataMapper");


const imageController = {
  // Renvoie une cover de manga du dossier public par son ID
  sendOneCoverById : async (request, response) =>{
    try {
      const { id } = request.params;
      const mangaCover= path.join(__dirname,mangaCoverLocation,`${id}.jpg`);
      console.log(mangaCover);
      if (!fs.existsSync(mangaCover)) {
        // Aucune image trouvée, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucune couverture trouvée pour l'image demandée"
        });
      }
      return response.sendFile(mangaCover);
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
  sendOneUserImageById: async (request, response) => {
    try {
      const { id } = request.params;
      console.log("coucou");
      const userImage = path.join(__dirname, '..', 'public', 'uploads', 'user', `${id}`);
      console.log(userImage);
      if (!fs.existsSync(userImage)) {
        return response.status(404).json({
          status: 404,
          success: false,
          message: 'Aucune image trouvée pour l\'utilisateur demandé'
        });
      }

      return response.sendFile(userImage);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  uploadImageUser: async (request, response) => {
    try {
      const { id } = request.params;
      const { filename } = request.file;
      // Enregistrez le nom de fichier dans la base de données pour l'utilisateur
      const image_profile_url = `http://localhost:3000/uploads/user/${filename}`;

      const updatedUser = await userDataMapper.insertImageProfileByUserId(id, image_profile_url);
      
      if (!updatedUser) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
      }
  
      // Envoyez une réponse JSON indiquant le succès de l'upload
      response.status(202).json({
        updatedUser,
        message: 'Image téléchargée avec succès pour l\'utilisateur'
      });
    } catch (error) {
      console.error(error);

      // En cas d'erreur, renvoyez une réponse JSON avec le statut 500 (Internal Server Error)
      response.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
    }
  },
  sendOneArticleImageById: async (request, response) => {
    try {
      const { id } = request.params;
      const articleImage = path.join(__dirname, '..', 'public', 'uploads', 'article', `${id}`);
      console.log(articleImage);
      if (!fs.existsSync(articleImage)) {
        return response.status(404).json({
          status: 404,
          success: false,
          message: 'Aucune image trouvée pour l\'article demandé'
        });
      }

      return response.sendFile(articleImage);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  }, 
  
  uploadImageArticle: async (request, response) => {
    try {
      const { id } = request.params;
      const { filename } = request.file;

      // Enregistrez le nom de fichier dans la base de données pour l'article
      const photo_url = `http://localhost:3000/uploads/article/${filename}`;
      const updatedArticle = await articleDataMapper.insertImageByArticleId(id, photo_url);

      // Envoyez une réponse JSON indiquant le succès de l'upload
      response.status(202).json({
        updatedArticle,
        message: 'Image téléchargée avec succès pour l\'article'
      });
    } catch (error) {
      console.error(error);

      // En cas d'erreur, renvoyez une réponse JSON avec le statut 500 (Internal Server Error)
      response.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
    }
  },
};

module.exports = imageController;
