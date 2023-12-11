  // ou ici nous pourrions gérer les erreurs avec un try and catch
  // voir ce qui est le plus optimal
  //  AllMangas: async () => {
  //     try{
  //     const sql = "SELECT * FROM manga ORDER BY name ASC";
  //     const result = await pool.query(sql);

  //     return result.rows;
  //   } catch (error) {

  //     console.error("Erreur lors des la récupération des mangas :", error.message);
  //     throw error;

  // }  
  
  // Récupère toutes les Annonces de la base de données
  findAllArticles: async () => {
    const sql =  "SELECT * FROM Article ORDER BY title ASC;";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucune Annonces trouvées dans la base de données");
    }
    return result.rows;
  },
  
  
  // Met à jour le titre d'un manga par son code isbn
  updateOneMangaTitleById: async (newTitle, code_isbn) => {
    const sql = {
      text: "UPDATE manga SET title = $1 WHERE code_isbn = $2 ",
      values: [newTitle, code_isbn]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour le numéro de volume d'un manga par son code isbn
  updateOneMangaVolumenNumberById: async (newVolumeNumber, code_isbn) => {
    const sql = {
      text: " UPDATE manga SET volume = $1 WHERE code_isbn = $2 ",
      values: [newVolumeNumber, code_isbn]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour l'année de publication d'un manga par son code isbn
  updateOneMangaYearOfPublicationById: async (newYearOfPublication,code_isbn) => {
    const sql = {
      text: "UPDATE manga SET year_publication = $1 WHERE code_isbn = $2 ",
      values: [newYearOfPublication, code_isbn]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour l'auteur d'un manga par son code isbn
  updateOneMangaAuthorById: async (newAuthor, code_isbn) => {
    const sql = {
      text: "UPDATE manga SET author = $1 WHERE code_isbn = $2 ",
      values: [newAuthor, code_isbn]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour la description d'un manga par son code isbn
  updateOneMangaDescriptionById: async (newDescription, code_isbn) => {
    const sql = {
      text: "UPDATE manga SET description = $1 WHERE code_isbn = $2 ",
      values: [newDescription, code_isbn]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour l'URL de la couverture d'un manga par son code isbn
  updateOneMangaCoverUrlById: async (newCoverUrl, code_isbn) => {
    const sql = {
      text: "UPDATE manga SET cover_url =$1 WHERE code_isbn = $2 ",
      values: [newCoverUrl, code_isbn]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour la catégorie d'un manga par son code isbn
  updateOneMangaCategoryById: async (newCategory, code_isbn) => {
    const sql = {
      text: "UPDATE manga SET category_id = $1 WHERE code_isbn = $2 ",
      values: [newCategory, code_isbn]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  }
};

module.exports = mangaDataMapper;

//
// const db = require('../config/database');

// const mangaDataMapper = {
//   findAllMangas: async () => {
//     const sql = "SELECT * FROM manga ORDER BY name ASC";
//     const result = await pool.query(sql);
//     if (!result.rowCount) {
//       throw new Error('Aucun manga trouvé');
//     }
//     return result.rows;
//   },

//   findOneMangaById: async (code_isbn) => {
//     return findOneMangaByField('code_isbn', code_isbn);
//   },

//   updateOneMangaFieldById: async (code_isbn, fieldToUpdate, newValue) => {
//     return updateMangaFieldById('code_isbn', code_isbn, fieldToUpdate, newValue);
//   },
// };

// // Fonction utilitaire pour trouver un manga par un champ spécifique
// async function findOneMangaByField(fieldName, value) {
//   const query = {
//     text: `SELECT * FROM manga WHERE ${fieldName} = $1`,
//     values: [value]
//   };
//   const result = await pool.query(query);
//   if (!result.rowCount) {
//     throw new Error("Aucun manga correspondant");
//   }
//   return result.rows[0];
// }

// // Fonction utilitaire pour mettre à jour un champ spécifique d'un manga par ID
// async function updateMangaFieldById(
//   idFieldName,
//   idValue,
//   fieldToUpdate,
//   newValue
// ) {
//   const query = {
//     text: `UPDATE manga SET ${fieldToUpdate} = $1 WHERE ${idFieldName} = $2 RETURNING *`,
//     values: [newValue, idValue]
//   };
//   const result = await pool.query(query);
//   if (!result.rowCount) {
//     throw new Error("Aucun manga correspondant");
//   }
//   return result.rows[0];
// }

// // Ajoute des méthodes spécifiques de mise à jour
// [
//   "title",
//   "volume_number",
//   "year_of_publication",
//   "author",
//   "description",
//   "cover_url",
//   "category"
// ].forEach(field => {
//   mangaDataMapper[
//     `updateOneManga${field.charAt(0).toUpperCase() + field.slice(1)}ById`
//   ] = async (code_isbn, newValue) => {
//     return mangaDataMapper.updateOneMangaFieldById(code_isbn, field, newValue);
//   };
// });



ici on retrouve l'ancienne requete 
SELECT 
article.id AS a_id,
article.title AS a_title,
article.description AS a_description,
article.price,
article.transaction_id,
article.date_transaction,
article.state_completion,
article.created_at,
article.updated_at,
"user".id AS u_id,
"user".lastname,
"user".firstname,
"user".pseudo,
"user".birthdate,
"user".address,
"user".zip_code,
"user".city,
"user".phone_number,
"user".email,
"user".role_id,
"user".created_at AS u_created_at,
"user".updated_at AS u_updated_at,
manga.code_isbn AS m_code_isbn, 
manga.title,
manga.volume,
manga.year_publication,
manga.author,
manga.description,
manga.cover_url,
manga.category_id,
manga.created_at AS m_created_at,
manga.updated_at AS m_updated_at
FROM article
INNER JOIN manga_has_article ON article.id = manga_has_article.article_id
INNER JOIN manga ON manga_has_article.manga_code_isbn = manga.code_isbn
INNER JOIN user_has_article ON article.id = user_has_article.article_id
INNER JOIN "user" ON user_has_article.user_id = "user".id
ORDER BY article.created_at ASC
;`;