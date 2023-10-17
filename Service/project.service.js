const Project = require("../Model/Project");

exports.addProjectService = async (data) => {
  const result = await Project.create(data);
  return result;
};
exports.getProjectsService = async () => {
  const projects = await Project.find({});
  return projects;
};

exports.getProjectByIdAndWebsiteNameService = async (
  projectID,
  websiteName
) => {
  const project = await Project.find({
    $and: [{ projectID: projectID }, { websiteName: websiteName }],
  });
  return project;
};
