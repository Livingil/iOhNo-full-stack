require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { PORT } = require("./constants/port");

const app = express();

app.use(express.static(path.resolve("..", "frontend", "dist")));

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "frontend", "dist", "index.html"));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
