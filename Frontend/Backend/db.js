import pg from "pg";
const { Pool } = pg;
const PGHOST='ep-royal-mode-a58jhk51-pooler.us-east-2.aws.neon.tech'
const PGDATABASE='neondb'
const PGUSER='neondb_owner'
const PGPASSWORD='npg_KMG9dw1bZWaj'
const port=5432

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: port,
ssl: { rejectUnauthorized: false }
});



const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    client.release();
  }
};

createTables();

export default pool;