require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const { v4: uuid } = require("uuid");
const app = express();
const validateRouter = require("./validateRouter");
const bookmarkRouter = require("./bookmarkRouter");

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.get("/", (req, res) => {
  res.send("Hello, Caleb!");
});

app.use(validateRouter);
app.use(bookmarkRouter);
app.use(cors());

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
