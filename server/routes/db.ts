import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// 1. Create a dynamic config object based on environment
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT) || 5432, // Must be a number
    };

const pool = new Pool(poolConfig);

// 2. Define types for the query utility
const db = {
  /**
   * @param text - SQL query string
   * @param params - Values to inject into $1, $2, etc.
   */
  query: (
    text: string, 
    params?: (string | number | boolean | null | Date | Buffer)[]
  ) => {
    return pool.query(text, params);
  },
};

export default db;