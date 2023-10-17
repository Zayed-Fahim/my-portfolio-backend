const express = require("express");
const router = express.Router();

const projectController = require("../Controller/project.controller");

router
  .route("/")
  .post(projectController.addProject)
  .get(projectController.getProjects);

module.exports = router;
