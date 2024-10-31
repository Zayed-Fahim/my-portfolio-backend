import mongoose from "mongoose";
import { IProjectProps } from "src/project/project.interface";

const projectSchema = new mongoose.Schema<IProjectProps>(
  {
    styles: {
      backgroundImage: {
        type: String,
        required: true,
      },
      brandColor: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      required: true,
    },
    technologies: [
      new mongoose.Schema(
        {
          name: {
            type: String,
            required: true,
          },
          icon: {
            name: {
              type: String,
              trim: true,
              required: true,
            },
            className: {
              type: String,
              trim: true,
              required: true,
            },
            fill: {
              type: String,
              trim: true,
              required: false,
            },
          },
        },
        { _id: false }
      ),
    ],
    image: {
      type: String,
      required: true,
    },
    liveSite: {
      type: String,
      required: true,
    },
    clientRepo: {
      type: String,
      required: true,
    },
    serverRepo: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
