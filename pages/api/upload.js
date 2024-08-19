import nextConnect from "next-connect";
import upload from "../../lib/multer";
import { mongooseconnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";
import { Document } from "@/models/document";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file")); // 'file' is the field name for the uploaded file

apiRoute.post(async (req, res) => {
  await mongooseconnect();

  const { originalname, mimetype, size, path } = req.file;
  const { title, description, category, tags, status, slug } = req.body; // Assuming title and description are sent along with the file

  console.log("req.file", req.file);

  try {
    const document = new Document({
      title: originalname, // Use the file name if no title is provided
      description: description || "",
      cloudinary_id: req.file.public_id,
      file_url: path,
      file_type: mimetype,
      file_size: size,
    });

    const newDocument = await document.save();

    const blogDoc = await Blog.create({
      file: newDocument?._id,
      title,
      slug,
      description,
      tags: JSON.parse(tags),
      status,
    });

    res.status(200).json({ success: true, data: blogDoc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so multer can handle the file
  },
};
