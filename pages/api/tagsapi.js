import { Tag } from "@/models/tags";
import { mongooseconnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  // if authentificated, connect to mongodb
  await mongooseconnect();

  const { method } = req;

  // data send or post
  if (method === "POST") {
    const { name, slug, description } = req.body;
    const tagDoc = await Tag.create({
      name,
      slug,
      description,
    });
    res.json(tagDoc);
  }

  // data fetch or get
  if (method === "GET") {
    res.json(await Tag.find());
  }

  // update
  if (method === "PUT") {
    await Tag.updateOne({ _id }, { name, slug, description });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Tag.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
