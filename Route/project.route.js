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
module.exports = router;
