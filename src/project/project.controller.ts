import { Request, Response } from "express";
import { addProjectService, getProjectsService } from "./project.service";

const addProjectController = async (req: Request, res: Response) => {
  try {
    const result = await addProjectService(req.body);
    res.status(result.statusCode).json({
      success: result?.success,
      message: result?.message,
      data: result?.data ?? [],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Ops! Something went wrong!. Try again.",
    });
  }
};

const getProjectsController = async (req: Request, res: Response) => {
  try {
    const result = await getProjectsService(req.query);
    res.status(result?.statusCode).json({
      success: result?.success,
      message: result?.message,
      data: result?.data ?? [],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error on data retrieval.",
    });
  }
};

export { addProjectController, getProjectsController };
