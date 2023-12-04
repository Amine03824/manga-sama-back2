const db = require("../config/database");

const mangaDataMapper = {
  // Récupère tous les mangas de la base de données
  findAllMangas: async () => {
    const sql = "SELECT * FROM manga ORDER BY name ASC";
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga trouvé");
    }
    return result.rows;
  },
  // Insère un nouveau manga dans la base de données
  insertOneManga: async ({
    code_ISBN,
    title,
    volume,
    year_publication,
    author,
    description,
    cover_url,
    category_id}) => 
  {
    const sql = {
      text : "INSERT INTO manga (code_ISBN, title, volume, year_publication, author, description, cover_url, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
      values : [
        code_ISBN,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga trouvé");
    }
    return result.row[0];
  },
  // ou ici nous pourrions gérer les erreurs avec un try and catch
  // voir ce qui est le plus optimal
  //  AllMangas: async () => {
  //     try{
  //     const sql = "SELECT * FROM manga ORDER BY name ASC";
  //     const result = await db.query(sql);

  //     return result.rows;
  //   } catch (error) {

  //     console.error("Erreur lors des la récupération des mangas :", error.message);
  //     throw error;

  // }

  // Récupère un manga par son code ISBN
  findOneMangaById: async (code_ISBN) => {
    const sql = {
      text: "SELECT * FROM manga WHERE code_ISBN = $1",
      values: [code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Supprime un manga par son code ISBN
  deleteOneMangaById: async code_ISBN => {
    const sql = {
      text: "DELETE FROM manga WHERE code_ISBN = $1",
      values: [code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
  },

  // Met à jour le titre d'un manga par son code ISBN
  updateOneMangaTitleById: async (newTitle, code_ISBN) => {
    const sql = {
      text: "UPDATE manga SET title = $1 WHERE code_ISBN = $2 ",
      values: [newTitle, code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour le numéro de volume d'un manga par son code ISBN
  updateOneMangaVolumenNumberById: async (newVolumeNumber, code_ISBN) => {
    const sql = {
      text: " UPDATE manga SET volume = $1 WHERE code_ISBN = $2 ",
      values: [newVolumeNumber, code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour l'année de publication d'un manga par son code ISBN
  updateOneMangaYearOfPublicationById: async (newYearOfPublication,code_ISBN) => {
    const sql = {
      text: "UPDATE manga SET year_publication = $1 WHERE code_ISBN = $2 ",
      values: [newYearOfPublication, code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour l'auteur d'un manga par son code ISBN
  updateOneMangaAuthorById: async (newAuthor, code_ISBN) => {
    const sql = {
      text: "UPDATE manga SET author = $1 WHERE code_ISBN = $2 ",
      values: [newAuthor, code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour la description d'un manga par son code ISBN
  updateOneMangaDescriptionById: async (newDescription, code_ISBN) => {
    const sql = {
      text: "UPDATE manga SET description = $1 WHERE code_ISBN = $2 ",
      values: [newDescription, code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour l'URL de la couverture d'un manga par son code ISBN
  updateOneMangaCoverUrlById: async (newCoverUrl, code_ISBN) => {
    const sql = {
      text: "UPDATE manga SET cover_url =$1 WHERE code_ISBN = $2 ",
      values: [newCoverUrl, code_ISBN]
    };
    const result = await db.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga correspondant");
    }
    return result.rows[0];
  },

  // Met à jour la catégorie d'un manga par son code ISBN
  updateOneMangaCategoryById: async (newCategory, code_ISBN) => {
    const sql = {
      text: "UPDATE manga SET category_id = $1 WHERE code_ISBN = $2 ",
      values: [newCategory, code_ISBN]
    };
    const result = await db.query(sql);
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
//     const result = await db.query(sql);
//     if (!result.rowCount) {
//       throw new Error('Aucun manga trouvé');
//     }
//     return result.rows;
//   },

//   findOneMangaById: async (code_ISBN) => {
//     return findOneMangaByField('code_ISBN', code_ISBN);
//   },

//   updateOneMangaFieldById: async (code_ISBN, fieldToUpdate, newValue) => {
//     return updateMangaFieldById('code_ISBN', code_ISBN, fieldToUpdate, newValue);
//   },
// };

// // Fonction utilitaire pour trouver un manga par un champ spécifique
// async function findOneMangaByField(fieldName, value) {
//   const query = {
//     text: `SELECT * FROM manga WHERE ${fieldName} = $1`,
//     values: [value]
//   };
//   const result = await db.query(query);
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
//   const result = await db.query(query);
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
//   ] = async (code_ISBN, newValue) => {
//     return mangaDataMapper.updateOneMangaFieldById(code_ISBN, field, newValue);
//   };
// });

// module.exports = mangaDataMapper;
