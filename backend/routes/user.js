// routes/user.js
const express = require("express");
const router = express.Router();
const db = require("./database"); // Make sure the path to database.js is correct

// Sample API route
async function getUser(req,res) {
  try {
    const {username , password} = req.query
    const checkQuery = "SELECT * FROM user WHERE username = ? AND password = ?";
    const [existingUser] = await db.query(checkQuery, [username, password]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not exists" });
    }
    res.status(200).json(existingUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    const checkQuery = "SELECT * FROM user WHERE username = ?";
    const [existingUser] = await db.query(checkQuery, [username]);
    if (existingUser.length > 0) {
      return res.json({ message: "User already exists" });
    }
    const query = "insert into user values(?,?)";
    const [result] = await db.query(query, [username, password]);
    res.json({ message: "User Successfully Added" });
  } catch (error) {
    res.json({ error: error.message });
  }
}
router.get("/user", (req, res) => {
  getUser(req,res);
});

router.post("/createuser", (req, res) => {
  createUser(req, res);
});
module.exports = router;
