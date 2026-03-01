import pkg from 'pg';
const { Pool } = pkg;

// connection string should be in environment variable DATABASE_URL
// for local development you can put something like:
//   postgres://user:password@localhost:5432/mydb

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;