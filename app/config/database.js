const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: true, // Ensure your provider doesn't require this to be false
  },
});

// --- THIS IS THE CRITICAL ADDITION ---
// This listens for errors on idle clients in the pool
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle PostgreSQL client:", err.message);
  // We don't need to exit; the pool will simply discard the bad client
});

async function connectToDatabase() {
  try {
    // 1. Get a client from the pool
    const client = await pool.connect();
    console.log("🗃️  Connecté à la base de données PostgreSQL");

    // 2. IMPORTANT: Release the client back to the pool immediately!
    // If you don't release it, you'll eventually run out of connections (a "leak").
    client.release();
  } catch (error) {
    console.error(
      "🟠 Erreur de connexion à la base de données :",
      error.message,
    );
  }
}

module.exports = { pool, connectToDatabase };
