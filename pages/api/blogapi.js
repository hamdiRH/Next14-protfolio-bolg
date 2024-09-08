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
      res.json(
        await Blog.findById(req.query.id).populate([
          {
            path: "tags",
            model: "Tag",
          },
          { path: "file", model: "Document" },
        ])
      );
    } else if (req.query?.page) {
      const { page, limit, searchQuery, status } = req.query;

      const name =
        searchQuery == "undefined" ||
        searchQuery == undefined ||
        searchQuery == "null" ||
        searchQuery == null
          ? ""
          : searchQuery;
      const skip = (page - 1) * limit;
      const nameRegex = new RegExp(
        name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
        "gi"
      );
      const statusRegex = new RegExp(
        status.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
        "gi"
      );

      const totalResults = await Blog.countDocuments({
        title: nameRegex,
        status: statusRegex,
      });

      const blogs = await Blog.find({
        $and: [
          {
            title: nameRegex,
          },
          { status: statusRegex },
        ],
      })
        .populate([
          {
            path: "tags",
            model: "Tag",
          },
          { path: "file", model: "Document" },
        ])
        .limit(limit)
        .skip(skip);

      res.json({
        blogs,
        totalResults,
        totalPages: Math.ceil(totalResults / limit),
        currentPage: page,
      });
    } else {
      // if (req.query?.blogcategory) or tags
      res.json(
        await Blog.find().populate([
          {
            path: "tags",
            model: "Tag",
          },
          { path: "file", model: "Document" },
        ])
      );
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
