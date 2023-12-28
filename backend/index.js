const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "the-bridge-learning",
  password: "chelsea2001",
  port: "5432",
});

app.use(cors());

// Multer middleware to handle multipart/form-data
const upload = multer();

// Create a new course
app.post("/courses", upload.single("image"), async (req, res) => {
  try {
    const { buffer } = req.file; // Access the buffer property of req.file
    const { title, price } = req.body;

    const result = await pool.query(
      "INSERT INTO courses (image, title, price) VALUES ($1, $2, $3) RETURNING *",
      [buffer.toString("hex"), title, parseFloat(price)]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Update a course
app.put("/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const { image, title, price } = req.body;
    const result = await pool.query(
      "UPDATE courses SET image = $1, title = $2, price = $3 WHERE id = $4 RETURNING *",
      [image, title, price, courseId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Read all courses
app.get("/courses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (error) {
    console.error("Error reading courses:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a course
app.delete("/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const result = await pool.query(
      "DELETE FROM courses WHERE id = $1 RETURNING *",
      [courseId]
    );
    if (result.rows.length === 0) {
      res.status(404).send("Course not found");
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
