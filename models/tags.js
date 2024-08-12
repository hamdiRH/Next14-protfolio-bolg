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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Create a pre-save middleware to generate a slug from the tag name
tagSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

export const Tag = models.Tag || model("Tag", tagSchema, "blogtest");
