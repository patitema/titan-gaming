// server/models/db.js
const { Pool } = require("pg");
const pool = new Pool(); // возьмёт параметры из process.env
module.exports = {
    query: (text, params) => pool.query(text, params),
};
