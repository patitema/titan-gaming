require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    const [rows] = await conn.query('SELECT 1+1 AS result');
    console.log('DB CONNECTED! Test result:', rows);
    await conn.end();
  } catch (err) {
    console.error('DB ERROR:', err.message);
  }
})();
