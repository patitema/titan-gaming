require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const pool = require('./db');

const app = express();

// --- конфиги из .env
const PORT = process.env.PORT || 5000;
const IMAGES_DIR = path.join(__dirname, process.env.IMAGES_DIR || 'images');
const IMAGES_URL = process.env.IMAGES_URL || '/images';
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || 'products';

// middlewares
app.use(cors());
app.use(express.json());

// статическая раздача картинок
app.use(IMAGES_URL, express.static(IMAGES_DIR));

// API products
app.get('/api/products', async (req, res) => {
  try {
    const sql = `
      SELECT 
        p_id, p_name, processor, videoCard, ram, drive, casePC, system,
        price, image, type, popularity
      FROM ${PRODUCTS_TABLE}
      ORDER BY p_id ASC
    `;
    const [rows] = await pool.query(sql);

    const host = req.get('host');
    const protocol = req.protocol;

    const products = rows.map(r => {
      const obj = { ...r };
      if (obj.image) {
        let img = obj.image.startsWith('/') ? obj.image : `/${obj.image}`;
        obj.image = `${protocol}://${host}${img}`;
      }
      return obj;
    });

    res.json({ products });
  } catch (err) {
    console.error('GET /api/products error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// single product
app.get('/api/products/:p_id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM ${PRODUCTS_TABLE} WHERE p_id = ?`,
      [req.params.p_id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });

    const host = req.get('host');
    const protocol = req.protocol;
    const obj = { ...rows[0] };
    if (obj.image) {
      let img = obj.image.startsWith('/') ? obj.image : `/${obj.image}`;
      obj.image = `${protocol}://${host}${img}`;
    }

    res.json({ product: obj });
  } catch (err) {
    console.error('GET /api/products/:p_id error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});