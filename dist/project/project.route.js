"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const projectRoute = express_1.default.Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     ProjectSchema:
 *       type: object
 *       properties:
 *         styles:
 *           type: object
 *           properties:
 *             backgroundImage:
 *               type: string
 *               description: Background image URL or path
 *             brandColor:
 *               type: string
 *               description: Hex code for brand color
 *         title:
 *           type: string
 *           description: Project title
 *         shortDescription:
 *           type: string
 *           description: Brief description of the project
 *         technologies:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *         image:
 *           type: string
 *         liveSite:
 *           type: string
 *           description: URL of the live site
 *         clientRepo:
 *           type: string
 *           description: GitHub repository link for the client side
 *         serverRepo:
 *           type: string
 *           description: GitHub repository link for the server side
 *       required:
 *         - styles
 *         - title
 *         - shortDescription
 *         - technologies
 *         - image
 *         - liveSite
 *         - clientRepo
 *         - serverRepo
 */
/**
 * @openapi
 * /api/v2/projects:
 *   get:
 *     summary: Retrieve a list of projects
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: The number of projects to return per page.
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: sort
 *         in: query
 *         required: false
 *         description: The field by which to sort the results.
 *         schema:
 *           type: string
 *           example: title
 *       - name: visible
 *         in: query
 *         required: false
 *         description: Define which projects will show up or not.
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: List of projects retrieved successfully
 *       400:
 *         description: Failed to retrieve data from the API.
 */
projectRoute.route("/").get(project_controller_1.getProjectsController);
/**
 * @openapi
 * /api/v2/projects:
 *   post:
 *     summary: Add a new project
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectSchema'
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid request data
 */
projectRoute.route("/").post(project_controller_1.addProjectController);
exports.default = projectRoute;
