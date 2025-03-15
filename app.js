const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const apicache = require("apicache");
let cache = apicache.middleware;

const PORT = process.env.PORT || 3000;

app.use(cache("5 minutes"));

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, "::", () => {
  console.log(`App is live at - http://localhost:${PORT}/`);
});
