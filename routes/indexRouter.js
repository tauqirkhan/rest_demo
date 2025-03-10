const { Router } = require("express");

const indexRouter = Router();

app.get("/articles", (req, res) => {
  const articles = [];
  // code to retrieve an article...
  res.json(articles);
});

app.get("/articles/:articlesId/comments", (req, res) => {
  const { articlesId } = req.params;
  const comments = [];
  //code to get comments by articlesId
  res.json(comments);
});

app.post("/articles", (req, res) => {
  // code to add a new article...
  res.json(req.body);
});

app.put("/articles/:id", (req, res) => {
  const { id } = req.params;
  // code to update an article...
  res.json(req.body);
});

app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;
  // code to delete an article...
  res.json({ deleted: id });
});

module.exports = indexRouter;
