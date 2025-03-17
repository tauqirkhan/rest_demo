const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const { users, messages, employees } = require("../models/index");
const verifyToken = require("./utils/verifyToken");

const indexRouter = Router();
const jwt = require("jsonwebtoken");

//store this in .env file
const secretKey = "secretKeyYouWantString";

indexRouter.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

indexRouter.use((req, res, next) => {
  req.me = users[1];
  next();
});

//curl http://localhost:3000 or curl -X GET http://localhost:3000
indexRouter.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

indexRouter.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

indexRouter.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

indexRouter.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

indexRouter.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };
  messages[id] = message;

  return res.send(message);
});

indexRouter.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

indexRouter.post("/api/login", (req, res) => {
  //mock user
  const user = {
    id: 1,
    username: "tk",
    email: "tk@test.io",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "1h" }, (err, token) => {
    res.json({
      token,
    });
  });
});

//curl -X POST http://localhost:3000
indexRouter.post("/users", (req, res) => {
  return res.send("Received a POST HTTP method");
});

//curl -X PUT http://localhost:3000
indexRouter.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

//curl -X DELETE http://localhost:3000
indexRouter.delete("/users", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

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

indexRouter.get("/v1/employees", (req, res) => {
  const employees = [];
  // code to get employees
  res.json(employees);
});

indexRouter.get("/v2/employees", (req, res) => {
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

indexRouter.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;

  messages = otherMessages;

  return res.send(message);
});

module.exports = indexRouter;
