import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123"; // later move to DB if needed

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};