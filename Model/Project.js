const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
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
      type: String,
      required: true,
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
  media: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  projectID: {
    type: Number,
    required: true,
  },
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
