"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { FaHtml5 } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

export default function Slug() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get("/api/getblog?slug=" + slug)
        .then((res) => {
          const alldata = res.data;
          setBlog(alldata);
          setLoading(false);
        })
        .catch((err) => console.log("error fetching blog", err));
    }
  }, [slug]);

  // markdown code highligher
  const code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = usestate();
    // copy code function
    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    };
    if (inline) return <code>{children}</code>;
    else if (match) {
      return (
        <div style={{ position: "relative" }}>
          {/*  <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
            children={String(children).replace(/\n$/, "")}
          />*/}
          <button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
              backgroundColor: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <>
      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">
              {loading ? <div>loading...</div> : blog && blog[0]?.title}
            </h1>
            <h5>
              By <span>Caesar</span>. Published in{" "}
              <span>
                {loading ? (
                  <div>loading...</div>
                ) : (
                  blog && blog[0]?.blogcategory[0]
                )}
              </span>
              .{" "}
              {blog &&
                new Date(blog[0].createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              <span>. 1 min read</span>
            </h5>
          </div>
          <div className="flex flex-sb flex-left pb-5 flex-wrap">
            <div className="leftblog_data_markdown">
              {loading ? (
                <div className="wh-100 flex flex-center mt-3">
                  <div className="loader" />
                </div>
              ) : (
                <div className="w-100 blogcontent">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ code }}
                  >
                    {blog[0].description}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            <div className="rightslug_data">
              <div className="slug_profile_info">
                <div className="slugprofile_sec">
                  <div className="profile_imgbg"></div>
                  <div className="slugprofile_img">
                    <div className="image_bg_top0"></div>
                    <div className="image_bg_top1"></div>
                    <img
                      src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                      alt="coder"
                      width={100}
                    />
                  </div>
                </div>
                <h3>Caesar</h3>
                <h4>Website Developer</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                  <div className="st_icon">
                    <FaTwitter />
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                </div>
              </div>
              <div className="topics_sec">
                <h2>Topics</h2>
                <div className="topics_list">
                  <Link href="/topics/htmlcssjs">
                    <div className="topics">
                      <div className="flex  center topics_svg">
                        <FaHtml5 />
                      </div>
                      <h3>Html, Css & JavaScript</h3>
                    </div>
                  </Link>
                  <Link href="/topics/nextJs">
                    <div className="topics">
                      <div className="flex flex center topics_svg">
                        <TbBrandNextjs />
                      </div>
                      <h3>next js, React Js</h3>
                    </div>
                  </Link>
                  <Link href="/topics/database">
                    <div className="topics">
                      <div className="flex  center topics_svg">
                        <FiDatabase />
                      </div>
                      <h3>database</h3>
                    </div>
                  </Link>
                  <Link href="/topics/deployment">
                    <div className="topics">
                      <div className="flex flex center topics_svg">
                        <AiOutlineDeploymentUnit />
                      </div>
                      <h3>Deployment</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
