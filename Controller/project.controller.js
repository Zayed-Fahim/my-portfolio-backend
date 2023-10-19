const Project = require("../Model/Project");
const {
  addProjectService,
  getProjectsService,
  getProjectByIdAndWebsiteNameService,
  getProjectMediaService,
} = require("../Service/project.service");

exports.addProject = async (req, res) => {
  try {
    const projectAlreadyExist = await Project.exists({
      $and: [{ projectID: req.body.projectID }, { title: req.body.title }],
    });
    if (projectAlreadyExist) {
      res
        .status(409)
        .json({ message: "This project already added to website." });
    }
    const result = await addProjectService(req.body);
    res
      .status(200)
      .json({ status: "Success", message: "Addition Successful!" });
  } catch (error) {
    res.status(444).json({
      status: "Failed",
      message: "Ops! Something Wrong!.",
      error: error.message,
    });
  }
};
exports.getProjects = async (req, res) => {
  const projects = await getProjectsService();
  res.status(200).json({ payload: projects });
};

exports.getProjectByIdAndWebsiteName = async (req, res) => {
  const { projectID, websiteName } = req.params;
  const projectDetails = await getProjectByIdAndWebsiteNameService(
    projectID,
    websiteName
  );
  res.status(200).json(projectDetails);
};

exports.getProjectMedia = async (req, res) => {
  const { projectID, websiteName } = req.params;
  const projectMedia = await getProjectMediaService(projectID, websiteName);
  res.status(200).json(projectMedia);
};
