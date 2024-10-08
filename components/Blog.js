import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

const animatedComponents = makeAnimated();
export default function Blog({
  _id,
  title: existingTile,
  slug: existingSlug,
  category: existingCategory,
  description: existingDescription,
  tags: existingTags,
  status: existingStatus,
  file: fileUrl,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState(existingTile || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [category, setCategory] = useState(existingCategory || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [allTags, setAllTags] = useState(existingTags || []);

  const [status, setStatus] = useState(existingStatus || "draft");
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log("binaryStr", binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [tags, setTags] = useState(existingTags || []);
  async function createProduct(ev) {
    ev.preventDefault();
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (title) formData.append("title", title);
    if (slug) formData.append("slug", slug);
    if (category) formData.append("category", category);
    if (tags) formData.append("tags", JSON.stringify(tags));
    if (status) formData.append("status", status);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const uploadedData = await response.json();
    setUploadedData(uploadedData.data);

    setRedirect(true);

    // const data = {
    //   title,
    //   slug,
    //   description,
    //   blogcategory: category,
    //   tags,
    //   status,
    // };
    // if (_id) {
    //   await axios.put("/api/blogapi", { ...data, _id });
    // } else {
    //   await axios.post("/api/blogapi", data);
    // }
    // setRedirect(true);
  }
  if (redirect) {
    router.push("/");
    return null;
  }

  const handleSlugChnage = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(newSlug);
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`/api/tagsapi`);
        setAllTags(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);

  return (
    <form className="addWebsiteform" onSubmit={createProduct}>
      {/* blog title */}
      <div
        className="w-100 flex flex-col flex-left mb-2" /**data-aos="fade-up"*/
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleSlugChnage(e);
          }}
          placeholder="Enter small title"
          required
        />
      </div>
      {/* blog slug */}
      <div
        className="w-100 flex flex-col flex-left mb-2" /**data-aos="fade-up"*/
      >
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          placeholder="Enter slug url"
          value={slug}
          onChange={handleSlugChnage}
          disabled
        />
      </div>
      {/* blog category */}
      {/* <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
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
      </div> */}

      {/* tags */}
      <div
        className="w-100 flex flex-col flex-left mb-25 " /**data-aos="fade-up"*/
      >
        <label htmlFor="tags">tags</label>

        <Select
          isMulti
          options={allTags.map((el) => ({ value: el._id, label: el.slug }))}
          onChange={(el) => setTags(el.map((el) => el.value))}
          components={animatedComponents}
          closeMenuOnSelect={false}
          className="custom-multiselect"
          defaultValue={
            existingTags?.map((el) => ({ value: el._id, label: el.slug })) || []
          }
        />
      </div>
      {/* Image cover */}
      <div className="w-100 flex flex-col flex-left mb-25 ">
        <label htmlFor="tags">Image</label>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {file ? (
            <img
              crossOrigin="anonymous"
              referrerPolicy="origin"
              src={file.preview}
              alt="img drop"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          ) : fileUrl?.file_url ? (
            <img
              crossOrigin="anonymous"
              referrerPolicy="origin"
              src={fileUrl?.file_url}
              alt="img drop"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>
      {/* status */}
      <div className="w-100 flex flex-col flex-left mb-2">
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

      {/* markdown description content */}
      <div className="description w-100 flex flex-col flex-left mb-2">
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
      {/* Save button */}
      <div className="w-100 mb-2" /**data-aos="fade-up"*/>
        <button type="submit" className="w-100 addwebbtn flex-center">
          SAVE BLOG
        </button>
      </div>
    </form>
  );
}
