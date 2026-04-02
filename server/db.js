const { Pool } = require('pg');
require('dotenv').config();

const pool = process.env.DATABASE_URL
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
  : new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

const fs = require('fs');
const path = require('path');

const initDB = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    console.log('Running database initialization...');
    await pool.query(schema);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    // If it's a "relation already exists" error, we can ignore it
    if (err.code === '42P07') {
      console.log('Tables already exist, skipping initialization.');
    } else {
      throw err;
    }
  }
};

module.exports = { pool, initDB };
