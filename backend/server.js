require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./db/conn");
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

//---------------------------------------------- RESOURCES -----------------------------------//

// GET ALL POSTS
app.get("/", async (req, res) => {
   try {
      const homePage = await pool.query("SELECT * FROM post ORDER BY created_at DESC");
      res.json(homePage.rows);
   } catch (err) {
      res.send(err.message);
   }
});

// GET ONE POST
app.get("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const onePost = await pool.query("SELECT * FROM post WHERE id = $1", [id]);
      res.send(onePost.rows[0]);
   } catch (err) {
      res.send(err.message);
   }
});

// UNIVERSAL CREATE POST ROUTE
app.post("/", async (req, res) => {
   try {
      const { title, body, link, username, cohort } = req.body;
      const addPost = await pool.query(
         "INSERT INTO post (title, body, link, username, cohort) VALUES ($1, $2, $3, $4, $5)",
         [title, body, link, username, cohort]
      );
      res.send("Post successfully posted");
   } catch (err) {
      res.send(err.message);
   }
});

// Listen and PORT assignment
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});

// -------------------------------------------- USERS CONTROLS -------------------------------//

// GET SINGLE USER'S POSTS
app.get("/:username/posts", async (req, res) => {
   try {
      const username = req.params.username;
      const userPosts = await pool.query("SELECT * FROM post WHERE username = $1 ORDER BY created_at DESC", [username]);
      res.send(userPosts.rows);
   } catch (err) {
      res.send(err.message);
   }
});

// FOR SPECIFIC USER TO UPDATE POST
app.patch("/edit/:id", async (req, res) => {
   const id = req.params.id;
   try {
      const oldPost = await pool.query("SELECT * FROM post WHERE id = $1", [id]);

      const title = req.body.title || oldPost.rows[0].title;
      const body = req.body.body || oldPost.rows[0].body;
      const link = req.body.link || oldPost.rows[0].link;

      const newPost = await pool.query("UPDATE post SET title = $1, body = $2, link = $3 WHERE id = $4", [
         title,
         body,
         link,
         id,
      ]);
      res.send("Post successfully updated");
   } catch (err) {
      res.send(err.message);
   }
});

// FOR SPECIFIC USER TO DELETE THEIR POST
app.delete("/delete/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const deletePost = await pool.query("DELETE FROM post WHERE id = $1", [id]);
      res.send("Post successfully deleted");
   } catch (err) {
      res.send(err.message);
   }
});
