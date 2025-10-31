require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const pool = require("./db");
const e = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
const IMAGES_DIR = path.join(__dirname, process.env.IMAGES_DIR || "images");
const IMAGES_URL = process.env.IMAGES_URL || "/images";
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE || "products";

app.use(cors());
app.use(express.json());

app.use(IMAGES_URL, express.static(IMAGES_DIR));

app.get("/api/products", async (req, res) => {
  try {
    const { type } = req.query;

    const filters = [];
    const params = [];

    if (type) {
      filters.push("type = ?");
      params.push(type);
    }

    let sql = `
      SELECT 
        p_id, p_name, processor, videoCard, ram, drive, casePC, \`system\`,
        price, image, type, popularity
      FROM ${PRODUCTS_TABLE}
    `;

    if (filters.length > 0) {
      sql += ` WHERE ${filters.join(" AND ")}`;
    }

    const [rows] = await pool.query(sql, params);

    const host = req.get("host");
    const protocol = req.protocol;

    const products = rows.map((r) => {
      const obj = { ...r };
      if (obj.image) {
        let img = obj.image.startsWith("/") ? obj.image : `/${obj.image}`;
        obj.image = `${protocol}://${host}${img}`;
      }
      return obj;
    });

    res.json({ products });
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/products/:p_id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM ${PRODUCTS_TABLE} WHERE p_id = ?`,
      [req.params.p_id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    const host = req.get("host");
    const protocol = req.protocol;
    const obj = { ...rows[0] };
    if (obj.image) {
      let img = obj.image.startsWith("/") ? obj.image : `/${obj.image}`;
      obj.image = `${protocol}://${host}${img}`;
    }

    res.json({ product: obj });
  } catch (err) {
    console.error("GET /api/products/:p_id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const USERS_TABLE = process.env.USERS_TABLE || "users";

// GET /api/users
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM ${USERS_TABLE} ORDER BY id ASC`
    );
    res.json({ users: rows });
  } catch (err) {
    console.error("GET /api/users error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/users/:id - получить пользователя по ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM ${USERS_TABLE} WHERE id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    res.json({ user: rows[0] });
  } catch (err) {
    console.error("GET /api/users/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/users
app.post("/api/users", async (req, res) => {
  try {
    const { username, password, email, phone, address } = req.body;

    // Проверка обязательных полей
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password and email are required" });
    }

    // Проверка на существующего пользователя
    const [existingUsers] = await pool.query(
      `SELECT id FROM ${USERS_TABLE} WHERE email = ? OR username = ?`,
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ error: "User with this email or username already exists" });
    }

    // Создание пользователя
    const [result] = await pool.query(
      `INSERT INTO ${USERS_TABLE} (username, password, email, phone, address) VALUES (?, ?, ?, ?, ?)`,
      [username, password, email, phone || null, address || null]
    );

    // Получение созданного пользователя
    const [newUser] = await pool.query(
      `SELECT * FROM ${USERS_TABLE} WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({ user: newUser[0] });
  } catch (err) {
    console.error("POST /api/users error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { username, password, email, phone, address } = req.body;
    const userId = req.params.id;

    const [existingUsers] = await pool.query(
      `SELECT id FROM ${USERS_TABLE} WHERE id = ?`,
      [userId]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email || username) {
      const [conflicts] = await pool.query(
        `SELECT id FROM ${USERS_TABLE} WHERE (email = ? OR username = ?) AND id != ?`,
        [email, username, userId]
      );

      if (conflicts.length > 0) {
        return res
          .status(409)
          .json({ error: "Email or username already taken by another user" });
      }
    }

    const updateFields = [];
    const updateValues = [];

    if (username) {
      updateFields.push("username = ?");
      updateValues.push(username);
    }
    if (password) {
      updateFields.push("password = ?");
      updateValues.push(password);
    }
    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (phone !== undefined) {
      updateFields.push("phone = ?");
      updateValues.push(phone);
    }
    if (address !== undefined) {
      updateFields.push("address = ?");
      updateValues.push(address);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    updateValues.push(userId);

    await pool.query(
      `UPDATE ${USERS_TABLE} SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );

    // Получение обновленного пользователя
    const [updatedUser] = await pool.query(
      `SELECT * FROM ${USERS_TABLE} WHERE id = ?`,
      [userId]
    );

    res.json({ user: updatedUser[0] });
  } catch (err) {
    console.error("PUT /api/users/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [users] = await pool.query(
      `SELECT * FROM ${USERS_TABLE} WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];
    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });
  } catch (err) {
    console.error("POST /api/auth/login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
app.delete("/api/users/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM ${USERS_TABLE} WHERE id = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/users/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const CART_TABLE = process.env.CART_TABLE || "cart";

// GET /api/cart/:userId - получить корзину пользователя
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM ${CART_TABLE} WHERE user_id = ?`,
      [req.params.userId]
    );
    res.json({ cart: rows });
  } catch (err) {
    console.error("GET /api/cart/:userId error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/cart - добавить товар в корзину
app.post("/api/cart", async (req, res) => {
  try {
    const { product_id, user_id } = req.body;

    if (!product_id || !user_id) {
      return res
        .status(400)
        .json({ error: "product_id and user_id are required" });
    }

    const [result] = await pool.query(
      `INSERT INTO ${CART_TABLE} (products, user_id) VALUES (?, ?)`,
      [product_id, user_id]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("POST /api/cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/cart/:id - удалить товар из корзины
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM ${CART_TABLE} WHERE id = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Cart item deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/cart/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
