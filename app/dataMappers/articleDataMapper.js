
const {
  pool
} = require('../config/database');

const articleDataMapper = {

  // Récupère toutes les Annonces de la base de données
  findAllArticles: async () => {
    const sql = "SELECT * FROM Article ORDER BY title ASC;";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucune Annonces trouvées dans la base de données");
    }
    return result.rows;
  },

  // Insère une nouvelle annonce dans la base de données
  insertOneArticle: async ({
    title,
    description,
    price,
    transaction_id,
    date_transaction,
    state_completion,
    image_url,
    condition_id
  }) => {
    const sql = {
      text: "INSERT INTO Article (title, description, price, transaction_id, date_transaction, state_completion, image_url, condition_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
      values: [
        title,
        description,
        price,
        transaction_id,
        date_transaction,
        state_completion,
        image_url,
        condition_id
      ]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucune Annonce trouvée dans la base de données");
    }
    return result.rows[0];
  },

  // Met à jour les informations d'une annonce  dans la base de données
  updateOneArticle: async ({
    id,
    title,
    description,
    price,
    transaction_id,
    date_transaction,
    state_completion,
    image_url,
    condition_id
  }) => {
    const sql = {
      text: `
    UPDATE 
    Article SET 
    title =$2 , 
    description=$3, 
    price=$4, 
    transaction_id=$5, 
    date_transaction=$6, 
    state_completion=$7, 
    image_url=$8, 
    condition_id=$9 
    WHERE id = $1
    RETURNING *;`,
      values: [
        id,
        title,
        description,
        price,
        transaction_id,
        date_transaction,
        state_completion,
        image_url,
        condition_id
      ]
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error("Aucune Annonce trouvée pour la mise à jour dans la base de données");
    }

    return result.rows[0];
  },

  // Récupère une annonce par son id
  findOneArticleById: async (id) => {
    const sql = {
      text: "SELECT * FROM Article WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucune Annonce correspondante dans la base de données");
    }
    return result.rows[0];
  },

  // Supprime une annonce par son id
  deleteOneArticleById: async (id) => {
    const sql = {
      text: "DELETE FROM Article WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (result.rowCount === 1) {
      return {
        success: true
      };
    } else {
      console.log(result);
      console.log("Aucune Annonce correspondante dans la base de données");

    }
  },
  
  // Associe un manga à un article par la table de relation manga_has_article
  associateOneMangaToOneArticle: async (code_isbn, article_id) => {
    const sql = {
      text: "INSERT INTO manga_has_article (manga_code_isbn, article_id)VALUES ($1, $2) RETURNING*;",
      values: [code_isbn, article_id]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucune association trouvée dans la base de données");
    }
    return result.rows[0];
  },

  // Retourne les articles associés à un manga
  findArticlesByManga : async (code_isbn) => {
    const sql = {
      text :"SELECT article.* FROM article JOIN manga_has_article ON article.id = manga_has_article.article_id WHERE manga_has_article.manga_code_isbn = $1;",
      values: [code_isbn]
    };

    const result = await pool.query(sql);
    if (result.rows.length === 0) {
      throw new Error("Aucune association trouvée dans la base de données");
    }
    return result.rows;
  },

};

module.exports = articleDataMapper;