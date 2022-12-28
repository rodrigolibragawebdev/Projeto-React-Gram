require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// config JSON and form data response

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS

app.use(
  cors({
    credentials: true,
    // de acordo com o seu front...
    origin: "http://localhost:5173",
  })
);

// Upload Directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB CONNECTION
require("./config/db.js");

//routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log(`app rodando na porta ${port} `);
});
