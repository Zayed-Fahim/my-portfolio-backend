const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const projectRoute = require("./Route/project.route");

app.use("/projects", projectRoute);

app.get("/", (req, res) => {
  res.status(200).send("My portfolio server is running successfully.");
});

module.exports = app;
