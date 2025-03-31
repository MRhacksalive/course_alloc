import express from 'express'
const app = express()
const port = 3000
import pool from "./db.js";
import bcrypt from 'bcrypt'
import cors from 'cors'


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());


app.post("/user/register", async (req, res) => {
    try {
        const { firstName: first_name, lastName: last_name, email, password } = req.body;
  
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const client = await pool.connect();
      try {
        const checkUser = await client.query("SELECT * FROM Users WHERE email = $1", [email]);
        if (checkUser.rows.length > 0) {
          return res.status(400).json({ error: "User already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
  
        const result = await client.query(
          "INSERT INTO Users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [first_name, last_name, email, hashedPassword]
        );
  
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
  
      } finally {
        client.release();
      }
    } catch (err) {
      console.error("Error Registering user:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const client = await pool.connect();
        try {
            const checkUser = await client.query("SELECT * FROM Users WHERE email = $1", [email]);
            if (checkUser.rows.length === 0) {
                return res.status(400).json({ error: "User not found." });
            }

            const user = checkUser.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            res.status(200).json({ message: "Login successful", user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email } });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error("Error Logging in user:", err);
        res.status(500).json({ error: err.message });
    }
});





app.listen(3000,()=>{
    console.log('App running on port 3000')
})