import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db';

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username',
      [username, email, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]); // 201 is the standard "Created" status
  } catch (err: any) {
    if (err.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: "Email or Username already taken" });
    }
    console.error("Auth Register Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    // Generic error message prevents user enumeration
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Ensure JWT_SECRET exists
    const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      user: {
        id: user.id,
        username: user.username,
        email: user.email 
      }
    });
  } catch (err) {
    console.error("Auth Login Error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;