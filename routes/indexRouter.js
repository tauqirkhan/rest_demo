const { Router } = require("express");

const indexRouter = Router();

const users = [{ email: "abc@foo.com" }];

const employees = [
  { firstName: "Jane", lastName: "Smith", age: 20 },
  //...
  { firstName: "John", lastName: "Smith", age: 30 },
  { firstName: "Mary", lastName: "Green", age: 50 },
];

indexRouter.get("/articles", (req, res) => {
  const articles = [];
  // code to retrieve an article...
  res.json(articles);
});

indexRouter.get("/articles/:articlesId/comments", (req, res) => {
  const { articlesId } = req.params;
  const comments = [];
  //code to get comments by articlesId
  res.json(comments);
});

//for filtering query = employees?lastName=Smith&age=30
//for sorting query = employees?sort=+age,-firstName (asc age & desc firstName)

app.get("/v1/employees", (req, res) => {
  const employees = [];
  // code to get employees
  res.json(employees);
});

app.get("/v2/employees", (req, res) => {
  const employees = [];
  // different code to get employees
  res.json(employees);
});

indexRouter.get("/employees", (req, res) => {
  const { firstName, lastName, age } = req.query;
  let results = [...employees];
  if (firstName) {
    results = results.filter((r) => r.firstName === firstName);
  }
  if (lastName) {
    results = results.filter((r) => r.lastName === lastName);
  }
  if (age) {
    results = results.filter((r) => +r.age === +age);
  }
  res.json(results);
});

indexRouter.post("/users", (req, res) => {
  const { email } = req.body;
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }
  res.json(req.body);
});

indexRouter.post("/articles", (req, res) => {
  // code to add a new article...
  res.json(req.body);
});

indexRouter.put("/articles/:id", (req, res) => {
  const { id } = req.params;
  // code to update an article...
  res.json(req.body);
});

indexRouter.delete("/articles/:id", (req, res) => {
  const { id } = req.params;
  // code to delete an article...
  res.json({ deleted: id });
});

module.exports = indexRouter;
