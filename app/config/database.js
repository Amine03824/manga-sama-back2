const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PG_URL
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("🗃️  Connecté à la base de données PostgreSQL");
  } catch (error) {
    console.log(
      "🟠 Erreur de connexion à la base de données :",
      error
    );
  }
}

module.exports = { client, connectToDatabase };
