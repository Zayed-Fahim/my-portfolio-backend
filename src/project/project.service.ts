import Project from "../models/project.model";
import { IProjectProps, IQueryProps } from "./project.interface";

const addProjectService = async (data: IProjectProps) => {
  const isExist = await Project.exists({ title: data.title });
  if (isExist) {
    return {
      statusCode: 409,
      success: false,
      message: "Project already exists!",
      data: [],
    };
  }

  const result = await Project.create(data);
  return {
    statusCode: 201,
    success: true,
    message: "Project added successfully!",
    data: result,
  };
};
const getProjectsService = async (data: IQueryProps) => {
  let query = {};

  if (data?.visible) {
    query = { ...query, isVisible: data.visible };
  }

  const result = await Project.find(query).select(
    "-__v -createdAt -updatedAt -isVisible"
  );
  if (!result) {
    return {
      statusCode: 404,
      success: false,
      message: "No projects found!",
      data: [],
    };
  }

  return {
    statusCode: 200,
    success: true,
    message: "Data retrieved successfully!",
    data: result,
  };
};

export { addProjectService, getProjectsService };
