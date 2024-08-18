// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseconnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseconnect();

  if (method === "GET") {
    if (req.query?.id) {
      const blog = await Blog.findById(req.query.id).populate([
        {
          path: "tags",
          model: "Tag",
        },
        { path: "file", model: "Document" },
      ]);
      res.json(blog);
    } else {
      // fetch all blogs
      const blog = await Blog.find().populate([
        {
          path: "tags",
          model: "Tag",
        },
        { path: "file", model: "Document" },
      ]);
      res.json(blog);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
