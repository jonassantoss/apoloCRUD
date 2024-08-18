require("dotenv").config();

// General Imports
const express = require("express");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");

// Import Middlewares
const {
  middlewareGlobal,
  checkCSRFERROR,
  csrfMiddleware,
} = require("./middlewares/middlewares");

// Import Routes
const loginRoute = require("./routes/loginRoute");
const homeRoute = require("./routes/homeRoute");
const productRoute = require("./routes/productRoute");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "..", "public")));

const sessionOptions = session({
  secret: "apolo@123",
  cookie: {
    maxAge: 1600000,
  },
  resave: false,
  saveUninitialized: false,
});

app.use(sessionOptions);
app.use(flash());

// View Engine setup
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares setup
app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCSRFERROR);
app.use(csrfMiddleware);

// Routes setup
app.use(homeRoute);
app.use(loginRoute);
app.use(productRoute);

app.use((req, res) => {
  res.status(404).render("404");
});

const port = 3100;

app.listen(port, () => {
  console.log(`Acessar em http://localhost:${port}`);
});
