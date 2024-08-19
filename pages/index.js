import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import LandingLayout from "@/components/LandingLayout";
import ReactIcon from "@/components/ReactIcon";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogsSlice";
import { fetchTags } from "../redux/slices/tagsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { blogs, loadingBlogs, errorBlogs } = useSelector(
    (state) => state.blogs
  );
  const { tags, loadingTags, errorTags } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <LandingLayout>
      <Head>
        <title>Bloggy</title>
        <meta name="description" content="blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="relative p-[4rem] pt-0 pb-0">
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
              {loadingBlogs ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                blogs.map((blog) => {
                  // const firstImageUrl = extractFirstImageUrl(blog.description);
                  return (
                    <div className="blog" key={blog._id}>
                      <div className="blogimg">
                        <Link href={`/blog/${blog.slug}`}>
                          <img
                            src={
                              blog?.file?.file_url ||
                              "https://placehold.co/600x400.png"
                            }
                            alt={blog.title}
                          />
                        </Link>
                      </div>
                      <div className="bloginfo">
                        {/* <Link href={`/blog/${blog.tags[0]}`}>
                          <div className="blogtag">{blog.tags[0]}</div>
                        </Link> */}
                        {blog.tags.map((tag) => (
                          <Link href={`/blog/${tag.name}`} key={tag._id}>
                            <div className="blogtag"># {tag.name}</div>
                          </Link>
                        ))}
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
            {/* <div className="blogpagination">
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
            </div> */}
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Tags</h2>
              <div className="topics_list">
                {tags.map((tag) => (
                  <Link href={`/tags/${tag.name}`} key={tag}>
                    <div className="topics">
                      <div className="flex flex center topics_svg">
                        <ReactIcon
                          icon={tag.iconName}
                          size={30}
                          color="black"
                        />
                      </div>
                      <h3>{tag.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tags/html">#html</Link>
                <Link href="/tags/css">#css</Link>
                <Link href="/tags/javascript">#javascript</Link>
                <Link href="/tags/nextjs">#nextjs</Link>
                <Link href="/tags/reactjs">#reactjs</Link>
                <Link href="/tags/database">#database</Link>
              </div>
            </div> */}
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
