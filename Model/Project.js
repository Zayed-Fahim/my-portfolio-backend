const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectID: {
      type: Number,
      required: true,
    },
    websitePrimaryColor: [
      {
        colorCode: {
          type: String,
          required: true,
        },
      },
    ],
    title: {
      type: String,
      trim: true,
      required: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    websiteName: {
      type: String,
      trim: true,
      required: true,
    },
    websiteLink: {
      type: String,
      required: true,
    },
    websiteCover: {
      type: String,
      required: true,
    },
    websiteFeatures: [
      {
        feature: {
          type: String,
          required: true,
        },
      },
    ],
    serverSideLink: {
      type: String,
      required: true,
    },
    clientSideLink: {
      type: String,
      required: true,
    },
    featuredPhotos: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    media: {
      photos: [
        {
          title: {
            type: String,
            required: true,
            trim: true,
          },
          image: {
            type: String,
            required: true,
          },
        },
      ],
    },
    tools: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
