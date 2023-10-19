const express = require("express");
const router = express.Router();

const projectController = require("../Controller/project.controller");

router
  .route("/")
  .post(projectController.addProject)
  .get(projectController.getProjects);

router
  .route("/:projectID/:websiteName")
  .get(projectController.getProjectByIdAndWebsiteName);

router
  .route("/:projectID/:websiteName/media")
  .get(projectController.getProjectMedia);

module.exports = router;
