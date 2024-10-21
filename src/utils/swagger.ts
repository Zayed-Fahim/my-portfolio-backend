import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API for Portfolio",
      version: "2.0.0",
      description: "API for managing portfolio.",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
  },
  apis: ["src/routes/*.ts", "src/Models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Express, port: number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `Swagger documentation is available at http://localhost:${port}/api-docs`
  );
};

export default swaggerDocs;
