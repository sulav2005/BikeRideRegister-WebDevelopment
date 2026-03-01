# Backend for React-App

This directory contains a minimal Node/Express server that connects to a PostgreSQL database.

## Setup

1. Navigate into the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (see `.env.example` below) and set your PostgreSQL connection string:
   ```bash
   DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
   ```
   or, if you're using a cloud database, the connection URI provided by your provider.

4. Start the server:
   ```bash
   npm run dev   # uses nodemon for auto-reload
   ```
   The server listens on port `5000` by default.

## Example endpoints

- `GET /` – health check.
- `GET /api/rides` – returns all rows from a `rides` table (you'll need to create this table yourself).

Modify or add routes to suit your API needs.
