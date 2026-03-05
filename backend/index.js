import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// simple health check
app.get('/', (req, res) => {
  res.send('Backend running');
});

// sample route to fetch rides (for example)
app.get('/api/rides', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rides');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// fetch all users from users table
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// fetch all registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registrations');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});