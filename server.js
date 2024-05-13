const express = require("express");
const session = require("express-session");
const path = require("path");
const checkLogin = require('./middlewares/checkLogin')
require('dotenv').config()

// Import de Rotas
const loginRoute = require("./routes/loginRoute");

const app = express();

// View Engine setup
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "apolo@123",
    cookie: {
      maxAge: 1600000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

// Rotas
app.use(loginRoute)

app.get("/", checkLogin, (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acessar http://localhost:${port}`);
});
