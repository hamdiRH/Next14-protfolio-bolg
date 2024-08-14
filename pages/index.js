import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FaHtml5 } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import LandingLayout from "@/components/LandingLayout";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { alldata, loading } = useFetchData("/api/getblog");
  const [perPage] = useState(1);
  //filter published blogs
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = alldata.length;

  const publishedBlogs = alldata.filter((blog) => blog.status === "publish");

  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const matches = markdownContent.match(regex);
    return matches ? matches[1] : null;
  }
  return (
    <LandingLayout>
      <Head>
        <title>Bloggy</title>
        <meta name="description" content="blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>
              Hi, I'm <span>Caesar</span>. <br />
              FullStuck JS developer
            </h1>
            <h3>Specialized in javaScript, React and Next JS</h3>
            <div className="flex gap-2">
              <Link href="/contact">
                <button>Contact Me</button>
              </Link>
              <Link href="/about">
                <button>About Me</button>
              </Link>
            </div>
          </div>
          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img
              src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
              alt=""
              style={{ margin: "auto" }}
            />
          </div>
        </div>
      </section>
      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                publishedBlogs.map((blog) => {
                  const firstImageUrl = extractFirstImageUrl(blog.description);
                  return (
                    <div className="blog" key={blog._id}>
                      <div className="blogimg">
                        <Link href={`/blog/${blog.slug}`}>
                          <img
                            src={
                              firstImageUrl ||
                              "https://placehold.co/600x400.png"
                            }
                            alt={blog.title}
                          />
                        </Link>
                      </div>
                      <div className="bloginfo">
                        <Link href={`/blog/${blog.tags[0]}`}>
                          <div className="blogtag">{blog.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${blog.slug}`}>
                          <h3>{blog.title}</h3>
                        </Link>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ducimus, porro quas nulla eveniet, saepe tenetur
                          molestias veritatis possimus dignissimos natus ratione
                          eaque deserunt perspiciatis voluptatum dolorem sequi
                          dolor dolore sed!
                        </p>
                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <img
                              src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                              alt="coder"
                            />
                          </div>
                          <div className="flex flex-col flex-left gap-05">
                            <h4>Caesar</h4>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${currentPage === number ? "active" : ""}`}
                  >
                    {number}
                  </button>
                ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentBlogs.length < perPage}
              >
                Next
              </button>
            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex center topics_svg">
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
                    <div className="flex flex center topics_svg">
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
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tags/html">#html</Link>
                <Link href="/tags/css">#css</Link>
                <Link href="/tags/javascript">#javascript</Link>
                <Link href="/tags/nextjs">#nextjs</Link>
                <Link href="/tags/reactjs">#reactjs</Link>
                <Link href="/tags/database">#database</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>
                  want to find out how i can solve problems specifuc to your
                  business? let's talk.
                </h4>
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
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
