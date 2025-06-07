// server/routes/products.js
const express = require("express");
const router = express.Router();
const db = require("../models/db");

// GET /api/products — возвращает все товары
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
    });

    // GET /api/products?filter=gaming&sort=price-asc
    router.get("/search", async (req, res) => {
    const { filter, sort } = req.query;
    let text = "SELECT * FROM products";
    const params = [];
    if (filter) {
        params.push(filter);
        text += ` WHERE type = $${params.length}`;
    }
    if (sort === "price-asc") text += " ORDER BY price ASC";
    else if (sort === "price-desc") text += " ORDER BY price DESC";
    else if (sort === "popularity") text += " ORDER BY popularity DESC";

    try {
        const result = await db.query(text, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
});

module.exports = router;
