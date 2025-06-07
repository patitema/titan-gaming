require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool();

// fallback: если БД не работает — грузим из JSON
const getProductsFallback = () => {
    const jsonPath = path.join(__dirname, "public", "data", "products.json");
    const rawData = fs.readFileSync(jsonPath);
    return JSON.parse(rawData);
};

app.get("/api/products", async (req, res) => {
try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
} catch (err) {
    console.error("Ошибка подключения к БД:", err.message);
    const fallbackData = getProductsFallback();
    res.json(fallbackData);
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
