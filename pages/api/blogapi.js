import { Blog } from "@/models/blog";
import { mongooseconnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  // if authentificated, connect to mongodb
  await mongooseconnect();

  const { method } = req;

  // data send or post
  if (method === "POST") {
    const { title, slug, description, blogcategory, tags, status } = req.body;
    const blogDoc = await Blog.create({
      title,
      slug,
      description,
      blogcategory,
      tags,
      status,
    });
    res.json(blogDoc);
  }

  // data fetch or get
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Blog.findById(req.query.id));
    } else {
      res.json((await Blog.find()).reverse());
    }
  }

  // update
  if (method === "PUT") {
    const { _id, title, slug, description, blogcategory, tags, status } =
      req.body;
    await Blog.updateOne(
      { _id },
      { title, slug, description, blogcategory, tags, status }
    );
    res.json(true);
  }

  // delete one blog
  if (method === "DELETE") {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
