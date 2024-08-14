// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseconnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseconnect();

  if (method === "GET") {
    if (req.query?.id) {
      const blog = await Blog.findById(req.query.id);
      res.json(blog);
    }
    //  else if (req.query?.blogcategory) {
    //   const blog = await Blog.find({ blogcategory: req.query.blogcategory });
    //   res.json(blog.reverse());
    // } else if (req.query?.tags) {
    //   const blog = await Blog.find({ tags: req.query.tags });
    //   res.json(blog.reverse());
    // } else if (req.query?.slug) {
    //   const blog = await Blog.find({ slug: req.query.slug });
    //   res.json(blog.reverse());
    // }
    else {
      // fetch all blogs
      const blog = await Blog.find();
      res.json(blog.reverse());
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
