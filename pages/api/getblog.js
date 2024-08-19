// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseconnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";
import { Document } from "@/models/blog";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseconnect();

  if (method === "GET") {
    if (req.query?.id) {
      const blog = await Blog.findById(req.query.id).populate([
        { path: "file", model: "Document" },
        {
          path: "tags",
          model: "Tag",
        },
      ]);
      res.json(blog);
    } else {
      // fetch all blogs
      const blog = await Blog.find().populate([
        { path: "file", model: "Document" },
        {
          path: "tags",
          model: "Tag",
        },
      ]);
      res.json(blog);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
