import { useRouter } from "next/router";
import { useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function Blog({
  _id,
  title: existingTile,
  slug: existingSlug,
  category: existingCategory,
  description: existingDescription,
  tags: existingTags,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState(existingTile || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [category, setCategory] = useState(existingCategory || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || "draft");

  async function createProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      slug,
      description,
      blogcategory: category,
      tags,
      status,
    };
    if (_id) {
      await axios.put("/api/blogapi", { ...data, _id });
    } else {
      await axios.post("/api/blogapi", data);
    }
    setRedirect(true);
  }
  if (redirect) {
    router.push("/");
    return null;
  }
  const handleSlugChnage = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace("/s+/g", "-");
    setSlug(newSlug);
  };
  return (
    <form className="addWebsiteform" onSubmit={createProduct}>
      {/* blog title */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter small title"
          required
        />
      </div>
      {/* blog slug */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          placeholder="Enter slug url"
          value={slug}
          onChange={handleSlugChnage}
        />
      </div>
      {/* blog category */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => {
            console.log("e.target.selectedOptions", e.target.selectedOptions);
            setCategory(
              Array.from(e.target.selectedOptions, (option) => option.value)
            );
          }}
          multiple
        >
          <option value="htmlcssjs">Html, Css & javaScript</option>
          <option value="nextjs">Next Js, React Js</option>
          <option value="database">Database</option>
          <option value="deployment">Deployment</option>
        </select>
        <p className="existingcategory flex gap-1 mt-1 mb-1">
          selected: <span>{JSON.stringify(category)}</span>
        </p>
      </div>
      {/* markdown description content */}
      <div
        className="description w-100 flex flex-col flex-left mb-2"
        data-aos="fade-up"
      >
        <label htmlFor="description">Blog Content</label>
        <MarkdownEditor
          value={description}
          onChange={(ev) => setDescription(ev.text)}
          style={{ width: "100%", height: "400px" }} // you can adjust the height as your device needed
          renderHTML={(text) => (
            <ReactMarkdown
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className | "");
                  if (inline) {
                    return <code>{children}</code>;
                  } else if (match) {
                    return (
                      <div style={{ position: "relative" }}>
                        <pre
                          style={{
                            padding: "0",
                            borderRadius: "5px",
                            overflowX: "auto ",
                            whiteSpace: "pre-wrap",
                          }}
                          {...props}
                        >
                          <code>{children}</code>
                          <button
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              zIndex: "1",
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(children)
                            }
                          >
                            copy code
                          </button>
                        </pre>
                      </div>
                    );
                  } else {
                    return <code {...props}>{children}</code>;
                  }
                },
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        />
      </div>
      {/* tags */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="tags">tags</label>
        <select
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) =>
            setTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          multiple
        >
          <option value="html">Html</option>
          <option value="css">css</option>
          <option value="javascript">javascript</option>
          <option value="nextjs">nextjs</option>
          <option value="reactjs">reactjs</option>
          <option value="database">database</option>
        </select>
        <div className="existingcategory flex gap-1 mt-1 mb-1">
          selected: <span>{JSON.stringify(tags)}</span>
        </div>
      </div>
      {/* status */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">draft</option>
          <option value="publish">publish</option>
        </select>
        <div className="existingcategory flex gap-1 mt-1 mb-1">
          selected: <span>{status}</span>
        </div>
      </div>
      {/* Save button */}
      <div className="w-100 mb-2" data-aos="fade-up">
        <button type="submit" className="w-100 addwebbtn flex-center">
          SAVE BLOG
        </button>
      </div>
    </form>
  );
}
