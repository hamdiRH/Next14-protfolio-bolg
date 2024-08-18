const { Schema, models, model, SchemaTypes } = require("mongoose");
const BlogSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true },
    description: { type: String },
    blogcategory: [{ type: String }],
    tags: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Tag",
      },
    ],
    file: {
      type: SchemaTypes.ObjectId,
      ref: "Document",
    },
    status: { type: String },
  },
  { timestamps: true } // this option will automatically manage createdat abd updatedat fields
);
export const Blog = models.Blog || model("Blog", BlogSchema, "blogs");
