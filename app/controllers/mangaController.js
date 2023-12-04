const mangaDataMapper = require('../dataMappers/mangaDataMapper');

const mangaController = {
  
  // Récupère tous les mangas de la base de données
  getAllMangas : async (request, response, next) => {
    try {
      const mangas = await mangaDataMapper.findAllMangas();
      if(!mangas){return next();}
      
      response.json({
        status : 200,
        mangas
      });
    }catch (error) {
      console.log(error);
      return response.json({
        status : 500,
        success: false,
        error: { 
          message : error.toString()
        }
      });
    }  
  },
  // TODO  : décider de la logique de création d'un manga, automatisé api ou fallback utilisateur à la main et de comment arrivent les informations depuis l'api (un truc genre "apimanga(createonemanga)" )
  // Crée un nouveau manga dans la base de données
  createOneManga: async (request, response) => {
    try {
      const {
        code_ISBN,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id } = request.body;
      
      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (!code_ISBN || !title || !volume || !year_publication || !author || !description || !cover_url || !category_id) {
        return response.status(400).json({ "error": "Missing body parameter" });
      }
      const newManga = await mangaDataMapper.insertOneManga({
        code_ISBN,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id,
      });

      if (newManga) {
        // La création s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: 'Le manga a été créé avec succès',
          manga: newManga,
        });
      } else {
      // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status : 200,
          success: false,
          message: "Aucun manga n'a été créé, peut-être que le manga existe déjà",
        });
      }
    }catch (error) {
      console.log(error);
      return response.json({
        status : 500,
        success: false,
        error: { 
          message : error.toString()
        }
      });
    }
  },

  // Récupère un manga par son code ISBN
  getOneMangaById : async (request, response) => {
    const{ code_ISBN } = request.params;
    try {
      const manga = await mangaDataMapper.findOneMangaById(code_ISBN);
      if(!manga){
      // Aucun manga trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status:404,
          success: false,
          message: 'Aucun manga trouvé avec le code ISBN spécifié',
        });
      }
      return response.json({
        status: 200,
        success: true,
        manga
      });
    }catch (error) {
      console.log(error);
      return response.json({
        status : 500,
        success: false,
        error: { 
          message : error.toString()
        }
      });
    }  
  },

  // Modifie le titre d'un manga par son code ISBN
  modifyOneMangaTitleById: async (request, response) => {
    try {
      const {
        code_ISBN,
        title
      } = request.body;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (!code_ISBN || !title){
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP" 
        });
      } 

      const modifiedManga = await mangaDataMapper.updateOneMangaTitleById({
        code_ISBN,
        title,
      });
      
      if (modifiedManga) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: 'Le manga a été modifié avec succès',
          manga: modifiedManga,
        });
  
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status : 200,
          success: false,
          message: "Aucun manga n'a été modifié",
        });
  
      } 
    
    }catch (error) {
      console.log(error);
      return response.json({
        status : 500,
        success: false,
        error: { 
          message : error.toString()
        }
      });
    }
  },

  // Modifie le numéro de volume d'un manga par son code ISBN
  modifyOneMangaVolumeNumberById: async (request, response) => {
    try {
      const { code_ISBN, newVolumeNumber } = request.body;

      if (!code_ISBN || !newVolumeNumber) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      const modifiedManga = await mangaDataMapper.updateOneMangaVolumeNumberById(
        newVolumeNumber,
        code_ISBN
      );

      if (modifiedManga) {
        return response.json({
          status: 201,
          success: true,
          message: "Le numéro de volume du manga a été mis à jour avec succès",
          manga: modifiedManga,
        });
      } else {
        return response.json({
          status: 200,
          success: false,
          message: "Aucun manga n'a été mis à jour",
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

  // Modifie l'année de publication d'un manga par son code ISBN
  modifyOneMangaYearOfPublicationById: async (request, response) => {
    try {
      const { code_ISBN, newYearOfPublication } = request.body;

      if (!code_ISBN || !newYearOfPublication) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      const modifiedManga = await mangaDataMapper.updateOneMangaYearOfPublicationById(
        newYearOfPublication,
        code_ISBN
      );

      if (modifiedManga) {
        return response.json({
          status: 201,
          success: true,
          message: "L'année de publication du manga a été mise à jour avec succès",
          manga: modifiedManga,
        });
      } else {
        return response.json({
          status: 200,
          success: false,
          message: "Aucun manga n'a été mis à jour",
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

  modifyOneMangaAuthorById: async (request, response) => {
    try {
      const { code_ISBN, newAuthor } = request.body;

      if (!code_ISBN || !newAuthor) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      const modifiedManga = await mangaDataMapper.updateOneMangaAuthorById(
        newAuthor,
        code_ISBN
      );

      if (modifiedManga) {
        return response.json({
          status: 201,
          success: true,
          message: "L'auteur du manga a été mis à jour avec succès",
          manga: modifiedManga,
        });
      } else {
        return response.json({
          status: 200,
          success: false,
          message: "Aucun manga n'a été mis à jour",
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

  modifyOneMangaDescriptionById: async (request, response) => {
    try {
      const { code_ISBN, newDescription } = request.body;

      if (!code_ISBN || !newDescription) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      const modifiedManga = await mangaDataMapper.updateOneMangaDescriptionById(
        newDescription,
        code_ISBN
      );

      if (modifiedManga) {
        return response.json({
          status: 201,
          success: true,
          message: "La description du manga a été mise à jour avec succès",
          manga: modifiedManga,
        });
      } else {
        return response.json({
          status: 200,
          success: false,
          message: "Aucun manga n'a été mis à jour",
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

  modifyOneMangaCoverUrlById: async (request, response) => {
    try {
      const { code_ISBN, newCoverUrl } = request.body;

      if (!code_ISBN || !newCoverUrl) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      const modifiedManga = await mangaDataMapper.updateOneMangaCoverUrlById(
        newCoverUrl,
        code_ISBN
      );

      if (modifiedManga) {
        return response.json({
          status: 201,
          success: true,
          message: "L'URL de couverture du manga a été mise à jour avec succès",
          manga: modifiedManga,
        });
      } else {
        return response.json({
          status: 200,
          success: false,
          message: "Aucun manga n'a été mis à jour",
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

  modifyOneMangaCategoryById: async (request, response) => {
    try {
      const { code_ISBN, newCategory } = request.body;

      if (!code_ISBN || !newCategory) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      const modifiedManga = await mangaDataMapper.updateOneMangaCategoryById(
        newCategory,
        code_ISBN
      );

      if (modifiedManga) {
        return response.json({
          status: 201,
          success: true,
          message: "La catégorie du manga a été mise à jour avec succès",
          manga: modifiedManga,
        });
      } else {
        return response.json({
          status: 200,
          success: false,
          message: "Aucun manga n'a été mis à jour",
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


  // TODO!: A rendre dynamique si le mangaDataMapper est rendu dynamique aussi
  // modifyOneMangaById : async (request, response) => {
  //   try {
  //     const {    
  //       code_ISBN,
  //       title,
  //       volume,
  //       year_publication,
  //       author,
  //       description,
  //       cover_url,
  //       category_id } = request.body;
      
  //     if (!code_ISBN || !title || !author || !description || !cover_url) {
  //       return response.json({
  //         status: 400,
  //         error: "Paramètre manquant dans le corps de la requête HTTP" 
  //       });
  //     }

  //     if (volume && typeof volume !== "number") {
  //       return response.json({ 
  //         "error": "Type invalide : le tome doit être un nombre"}
  //       );}

  //     if (year_publication && typeof year_publication !== "number") {
  //       return response.json({ 
  //         "error": "Type invalide : l'année de publication doit être un nombre"}
  //       );}

  //     const modifiedManga = await mangaDataMapper.insertOneManga({
  //       code_ISBN,
  //       title,
  //       volume,
  //       year_publication,
  //       author,
  //       description,
  //       cover_url,
  //       category_id,
  //     });

  //     if (modifiedManga) {
  //     // La modification s'est bien déroulée
  //       return response.json({
  //         status: 201,
  //         success: true,
  //         message: 'Le manga a été modifié avec succès',
  //         manga: modifiedManga,
  //       });

  //     } else {
  //       // Aucune ligne affectée, la modification n'a pas été effectuée
  //       return response.json({
  //         status : 200,
  //         success: false,
  //         message: "Aucun manga n'a été modifié",
  //       });

  //     } 
  
  //   }catch (error) {
  //     console.log(error);
  //     return response.json({
  //       status : 500,
  //       success: false,
  //       error: { 
  //         message : error.toString()
  //       }
  //     });
  //   }
  // },
  
  removeOneMangaById : async (request, response) => {
    const{ code_ISBN } = request.params;
    try {
      const manga = await mangaDataMapper.deleteOneMangaById(code_ISBN);
      if(!manga){
      // Aucun manga trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status:404,
          success: false,
          message: 'Aucun manga trouvé avec le code ISBN spécifié',
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: 'Manga supprimé avec succès',
      });

    }catch (error) {
      console.log(error);
      return response.json({
        status : 500,
        success: false,
        error: { 
          message : error.toString()
        }
      });
    }    
  }
};
    
module.exports = mangaController;