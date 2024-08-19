const { Schema, models, model } = require("mongoose");

// Define the Tag schema
const documentSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: false,
  },
  cloudinary_id: {
    type: String,
    // required: true,
  },
  file_url: {
    type: String,
    // required: true,
  },
  file_type: {
    type: String,
    // required: true,
  },
  file_size: {
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Create a pre-save middleware to generate a slug from the tag name

export const Document =
  models.Document || model("Document", documentSchema, "documents");
