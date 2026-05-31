import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123"; // later move to DB if needed

export const login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { username, password } = req.body;

    console.log("USERNAME:", username);
    console.log("PASSWORD:", password);

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};