const { Schema, models, model } = require("mongoose");

// Define the Tag schema
const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  iconName: {
    trim: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Create a pre-save middleware to generate a slug from the tag name

export const Tag = models.Tag || model("Tag", tagSchema, "tags");
