const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: true
  }
});

async function connectToDatabase() {
  try {
    await pool.connect();
    console.log("🗃️  Connecté à la base de données PostgreSQL");
  } catch (error) {
    console.log("🟠 Erreur de connexion à la base de données :", error);
  }
}

module.exports = { pool, connectToDatabase };
