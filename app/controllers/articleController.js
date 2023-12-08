const articleDataMapper = require("../dataMappers/articleDataMapper");

const articleController = {
  
  // Récupère tous les articles de la base de données
  getAllArticles: async (request, response, next) => {
    try {
      const articles = await articleDataMapper.findAllArticles();
      if (!articles) {
        return next();
      }
      return response.status(200).json(
        articles
      );
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

  // Crée un nouvel article dans la base de données
  createOneArticle: async (request, response) => {
    try {
      const {
        title,
        description,
        price,
        image_url,
        condition_id
      } = request.body;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (
        !title ||
        !description ||
        !price ||
        !image_url ||
        !condition_id
      ) {
        return response.json({
          status : 400, 
          error: "Paramètre manquant dans le corps de la requête HTTP" 
        });
      }
      const newArticle = await articleDataMapper.insertOneArticle({
        title,
        description,
        price,
        image_url,
        condition_id
      });

      if (newArticle) {
        // La création s'est bien déroulée
        console.log("L'annonce a été créé avec succès");
        return response.json({
          status: 201,
          success: true,
          message: "L'annonce a été créé avec succès",
          article: newArticle
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message:
            "Aucune annonce n'a été créé, peut-être que l'annonce existe déjà"
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

  // Récupère une annonce par son code id
  getOneArticleById: async (request, response) => {
    try {
      const { id } = request.params;

  
      const article = await articleDataMapper.findOneArticleById(id);
      if (!article) {
        // Aucune annonce trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucune annonce trouvée avec le code id spécifié"
        });
      }
      return response.json(
        article
      );
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

  modifyOneArticleById : async (request, response) => {
    try {
      const { id } = request.params;

      const {
        title,
        description,
        price,
        image_url,
        condition_id } = request.body;

      if (!id || !title || !description || !price || !image_url || !condition_id) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      if (price && typeof price !== "number") {
        return response.json({
          "error": "Type invalide : le prix doit être un nombre"}
        );}


      const modifiedArticle = await articleDataMapper.updateOneArticle({
        id,
        title,
        description,
        price,
        image_url,
        condition_id
      });

      if (modifiedArticle) {
      // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "L'annonce a été modifié avec succès",
          article: modifiedArticle,
        });

      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status : 200,
          success: false,
          message: "Aucune annonce n'a été modifié",
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

  // Supprime une annnonce par son code ISBN
  removeOneArticleById: async (request, response) => {
    try {
      const { id } = request.params;

  
      const article = await articleDataMapper.deleteOneArticleById(id);
      if (!article) {
        // Aucune annonce trouvée, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucune annonce trouvé avec le code id spécifié"
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: "Annonce supprimée avec succès"
      });
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

  // Associe un manga à un article par la table de relation manga_has_article
  linkOneMangaToOneArticle: async (request, response) => {
    try {
      const { isbn, articleId } = request.params;

      if (!isbn || !articleId) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans les paramètres de la requête HTTP",
        });
      }

      const code_isbn = isbn;
      
      const associationResult = await articleDataMapper.associateOneMangaToOneArticle(code_isbn, articleId);

      return response.json({
        status: 200,
        success: true,
        message: "Association réussie entre le manga et l'article",
        associationResult,
      });
    } catch (error) {
      console.error(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },

  // Retourne les articles associés à un manga
  getArticlesByManga : async (request, response) => {

    try {
      const { isbn } = request.params;
      if (!isbn) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP",
        });
      }


      const articles = await articleDataMapper.findArticlesByManga(isbn);

      return response.json({
        status: 200,
        success: true,
        articles,
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

  // Associe un manga à un article par la table de relation manga_has_article
  linkOneUserToOneArticle: async (request, response) => {
    try {
      const { userId, articleId } = request.params;
  
      if (!userId || !articleId) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans les paramètres de la requête HTTP",
        });
      }
  
        
      const associationResult = await articleDataMapper.associateOneUserToOneArticle(userId, articleId);
  
      return response.json({
        status: 200,
        success: true,
        message: "Association réussie entre le manga et l'article",
        associationResult,
      });
    } catch (error) {
      console.error(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString(),
        },
      });
    }
  },
  
  // Retourne les articles associés à un manga
  getArticlesByUser : async (request, response) => {
  
    try {
      const { userId } = request.params;
      if (!userId) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP",
        });
      }
  
  
      const articles = await articleDataMapper.findArticlesByUser(userId);
  
      return response.json({
        status: 200,
        success: true,
        articles,
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

module.exports = articleController;