const { pool } = require("../config/database");

const userDataMapper = {

  // Récupère toutes les Utilisateurs de la base de données
  // Il faut bien préciser qu'on souhaite accéder à la table "user" et non à l'utilisateur de postgres, dans ce cas il faut mettre des quotes mais pour une requête préparée ça n'a pas l'air possible nous avons donc été chercher la table user dans le schéma 'public' avec public.user 
  findAllusers: async () => {
    const sql = "SELECT * FROM public.user ORDER BY id ASC;";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Utilisateur trouvé dans la base de données");
    }
    return result.rows;
  },
  
  // Insère un nouvel Utilisateur dans la base de données
  insertOneUser: async ({
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
  }) => {
    const sql = {
      text: "INSERT INTO public.user (lastname, firstname, pseudo, birthdate, address, zip_code, city, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;",
      values: [
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
      ],
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Utilisateur trouvé dans la base de données");
    }
    return result.rows[0];
  },

  // Met à jour les informations d'un Utilisateur dans la base de données
  updateOneUser: async ({
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
  }) => {
    const sql = {
      text: `
    UPDATE 
    public.user SET  
    lastname = $2,
    firstname = $3,
    pseudo = $4,
    birthdate = $5,
    address = $6,
    zip_code = $7,
    city = $8,
    phone_number = $9,
    email = $10,
    password = $11
    WHERE id = $1
    RETURNING *;`,
      values: [
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
      ],
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error(
        "Aucun Utilisateur trouvé pour la mise à jour dans la base de données"
      );
    }

    return result.rows[0];
  },

  // Récupère une Utilisateur par son id
  findOneUserById: async (id) => {
    const sql = {
      text: "SELECT * FROM public.user WHERE id = $1;",
      values: [id],
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error(
        "Aucun Utilisateur correspondant dans la base de données"
      );
    }
    return result.rows[0];
  },

  // Supprime une Utilisateur par son id
  deleteOneUserById: async (id) => {
    const sql = {
      text: "DELETE FROM public.user WHERE id = $1;",
      values: [id],
    };
    const result = await pool.query(sql);
    if (result.rowCount === 1) {
      return {
        success: true,
      };
    } else {
      console.log(result);
      console.error("Aucun Utilisateur correspondant dans la base de données");
    }
  },

  // Permet d'éditer toutes les infos d'un utilisateur par un Administrateur (donc le rôle en plus)
  adminUpdateOneUser : async ({
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
    role_id
  }) => {
    const sql = {
      text: `
      UPDATE 
      public.user SET  
      lastname = $2,
      firstname = $3,
      pseudo = $4,
      birthdate = $5,
      address = $6,
      zip_code = $7,
      city = $8,
      phone_number = $9,
      email = $10,
      password = $11,
      role_id = $12,
      WHERE id = $1
      RETURNING *;`,
      values: [
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
        role_id
      ],
    };
  
    const result = await pool.query(sql);
  
    if (!result.rowCount) {
      throw new Error(
        "Aucun Utilisateur trouvé pour la mise à jour dans la base de données"
      );
    }
  
    return result.rows[0];
  }, 

  // Associe un utilisateur à une annonce
  associateOneUserWithOneArticle: async (user_id, article_id) => {
    // Ici pas besoin de spécifier public.user vu que la table user_has_article éxiste déjà dans le schéma public
    const sql = {
      text: "INSERT INTO user_has_article (user_id, article_id) VALUES ($1, $2) RETURNING *;",
      values: [user_id, article_id],
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error("Echec de l'association del'utilisateur avec l'annonce");
    }
    return result.rows[0];
  },

  // Obtient les articles associés à un utilisateur
  findArticlesByUser: async (user_id) => {
    const sql = {
      text: "SELECT article.* FROM article JOIN user_has_article ON article.id = user_has_article.article_id WHERE user_has_article.user_id = $1;",
      values: [user_id],
    };

    const result = await pool.query(sql);
    if (result.rows.length === 0) {
      throw new Error("Aucune association trouvée dans la base de données");
    }
    return result.rows;
  },
};
module.exports = userDataMapper;
