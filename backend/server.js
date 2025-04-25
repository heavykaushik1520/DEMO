const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ MySQL DB Connection
const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12775330",
    password: "q77cjYI1P6",
    database: "sql12775330",
    port: 3306,
  });
  
  db.connect((err) => {
    if (err) {
      console.error("MySQL connection error:", err);
      process.exit(1); // stop server if DB connection fails
    }
    console.log("MySQL connected to remote database.");
  });

// 📌 Routes

// Get all users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Get one user by id
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result[0]);
  });
});

// Create new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, name, email });
  });
});

// Update user
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    res.json({ id, name, email });
  });
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
