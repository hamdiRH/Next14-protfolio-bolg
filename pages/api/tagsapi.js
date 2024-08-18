import { Tag } from "@/models/tags";
import { mongooseconnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  // if authentificated, connect to mongodb
  await mongooseconnect();

  const { method } = req;

  // data send or post
  if (method === "POST") {
    const { name, slug, description, iconName } = req.body;
    const tagDoc = await Tag.create({
      name,
      slug,
      description,
      iconName,
    });
    res.json(tagDoc);
  }

  // data fetch or get
  if (method === "GET") {
    if (req.query?.page && req.query?.limit) {
      const { page = 1, limit = 10 } = req.query;

      // Convert page and limit to integers
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      // Calculate the number of documents to skip
      const skip = (pageNum - 1) * limitNum;

      // Retrieve paginated results
      const tags = await Tag.find().skip(skip).limit(limitNum);

      // Optionally, you can also return the total count of documents
      const totalCount = await Tag.countDocuments();

      res.json({
        totalPages: Math.ceil(totalCount / limitNum),
        currentPage: pageNum,
        totalItems: totalCount,
        items: tags,
      });
    } else res.json(await Tag.find());
  }

  // update
  if (method === "PUT") {
    const { name, slug, description, iconName } = req.body;
    await Tag.updateOne(
      { _id: req.query.id },
      { name, slug, description, iconName }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Tag.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
