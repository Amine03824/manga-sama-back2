const {
  pool
} = require('../config/database');

const userDataMapper = {
  // Récupère toutes les Utilisateurs de la base de données
  findAllusers: async () => {
    const sql = "SELECT * FROM user ORDER BY title ASC";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Utilisateurs trouvés dans la base de données");
    }
    return result.rows;
  },
  // Insère un nouvel Utilisateur dans la base de données
  insertOneUser: async ({
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
      text: "INSERT INTO user (id, lastname, firstname, pseudo, birthdate, address, zip_code, city, phone_number, email, password, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;",
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
      ]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Utilisateur trouvé dans la base de données");
    }
    return result.rows[0];
  },

  // Met à jour les informations d'un Utilisateur dans la base de données
  updateOneUser: async ({
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
    user SET  
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
    role_id = $12
    WHERE id = $1
    RETURNING *;`,
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
        role_id
      ]
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error("Aucun Utilisateur trouvé pour la mise à jour dans la base de données");
    }

    return result.rows[0];
  },


  // Récupère une Utilisateur par son id
  findOneUserById: async (id) => {
    const sql = {
      text: "SELECT * FROM user WHERE id = $1",
      values: [id]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Utilisateur correspondant dans la base de données");
    }
    return result.rows[0];
  },

  // Supprime une Utilisateur par son id
  deleteOneUserById: async (id) => {
    const sql = {
      text: "DELETE FROM user WHERE id = $1",
      values: [id]
    };
    const result = await pool.query(sql);
    if (result.rowCount === 1) {
      return {
        success: true
      };
    } else {
      console.log(result);
      console.error("Aucun Utilisateur correspondant dans la base de données");

    }
  }
};
module.exports = userDataMapper;