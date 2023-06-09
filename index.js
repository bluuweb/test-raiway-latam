import { config } from "dotenv";
config();

import express from "express";
import pool from "./database/connection.js";
import { verifyToken } from "./middlewares/verifyToken.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/productos", verifyToken, async (req, res) => {
  try {
    const text = "SELECT * FROM productos WHERE email = $1";
    const { rows } = await pool.query(text, [req.email]);
    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw { message: "se necesita el email y la constraseña" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const text = "INSERT INTO usuarios (email, password) VALUES ($1, $2)";
    const { rows } = await pool.query(text, [email, hashPassword]);
    res.json({ rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw { message: "se necesita el email y la constraseña" };
    }

    // verificar credenciales
    const text = "SELECT * FROM usuarios WHERE email = $1";
    const {
      rows: [userDB],
      rowCount,
    } = await pool.query(text, [email]);

    console.log({ userDB, rowCount });

    if (!rowCount) {
      throw { message: "No existe este usuario" };
    }

    const verifyPassword = await bcrypt.compare(password, userDB.password);

    if (!verifyPassword) {
      throw { message: "Contraseña incorrecta" };
    }

    // generar el jwt
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
