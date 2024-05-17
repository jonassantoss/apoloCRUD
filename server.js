require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");

// Import Middlewares
const checkLogin = require("./src/middlewares/checkLogin");

// Import de Rotas
const loginRoute = require("./src/routes/loginRoute");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "apolo@123",
  cookie: {
    maxAge: 1600000,
  },
  resave: false,
  saveUninitialized: false,
});

app.use(sessionOptions)
app.use(flash())

// View Engine setup
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf())

// Rotas
app.use(loginRoute);

app.get("/", checkLogin, (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acessar em http://localhost:${port}`);
});
