import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function TagsPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(1);
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  const { tags } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const fetchBlogdata = async () => {
        try {
          const res = await fetch(`/api/getblog?tags=${tags}`);
          const data = await res.json();
          // const data = await res.data;

          setBlog(data);
          setLoading(false);
        } catch (error) {
          console.log("Error fetching blog data:", error);
        }
      };
      if (tags) {
        fetchBlogdata();
      } else {
        router.push("/404");
      }
    }
  }, [router.isReady, tags]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = blog.slice(indexOfFirstblog, indexOfLastblog);
  const allblog = blog.length;
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }
  const publishedblogs = currentBlogs.filter((ab) => ab.status === "publish");

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const matches = markdownContent.match(regex);
    return matches ? matches[1] : null;
  }

  return (
    <div className="blogpage">
      <div className="category_slug">
        <div className="container">
          <div className="category_title">
            <div className="flex gap-1">
              <h1>
                {loading ? (
                  <div>loading ...</div>
                ) : publishedblogs ? (
                  publishedblogs[0].tags
                ) : (
                  "not found"
                )}
              </h1>
              <span>
                {loading
                  ? "0"
                  : publishedblogs.filter((blog) => blog.tags).length}
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
              optio numquam in excepturi? Fugiat, debitis rem ut, aut, harum
              doloremque fugit repellat porro modi id exercitationem optio
              veniam at dicta.
            </p>
          </div>
          <div className="category_blogs mt-3">
            {loading ? (
              <div className="wh-100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              publishedblogs.map((blog) => {
                const firstImageUrl = extractFirstImageUrl(blog.description);
                return (
                  <>
                    <div className="cate_blog" key={blog._id}>
                      <Link href={`/blog/${blog.slug}`}>
                        <img
                          src={
                            firstImageUrl || "https://placehold.co/600x400.png"
                          }
                          alt={blog.title}
                        />
                      </Link>

                      <div className="bloginfo mt-2">
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
                  </>
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
      </div>
    </div>
  );
}
