import { useState } from "react";
import { useSession } from "next-auth/react";
import { BsPostcard } from "react-icons/bs";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import Dataloading from "@/components/DataLoading";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function blogs() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(1);
  // fetch blogs form api endpoint with hooks
  const { alldata, loading } = useFetchData("/api/blogapi");
  // filtering Publish blogs

  // function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastblog = currentPage * perPage;

  const indexOfFirstblog = indexOfLastblog - perPage;

  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);
  const publishBlogs = currentBlogs.filter((ab) => ab.status === "publish");

  const allblog = alldata.filter((ab) => ab.status === "publish").length;
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }
  const [searchQuery, setSearchQuery] = useState("");
  const filtredBlog =
    searchQuery.trim() === ""
      ? publishBlogs
      : publishBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        );

  return (
    <ProtectedRoute>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div className="" data-aos="fade-right">
            <h2>
              All Published <span>Blogs</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <BsPostcard /> <span>/</span> <span>Blogs</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mab-1" data-aos="fade-up">
            <h2>Search Blogs: </h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search by title ..."
            />
          </div>
          <table className="table table-styling mt-2" data-aos="fade-up">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>
                    <Dataloading />
                  </td>
                </tr>
              ) : filtredBlog.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Publish Blog
                  </td>
                </tr>
              ) : (
                filtredBlog.map((blog, index) => {
                  return (
                    <tr key={blog._id}>
                      <td>{indexOfFirstblog + index + 1}</td>
                      <td>{blog.title}</td>
                      <td>{blog.slug}</td>
                      <td>
                        <div className="flex gap-2 flex-center">
                          <Link href={"/blogs/edit/" + blog._id}>
                            <button title="edit">
                              <FaEdit />
                            </button>
                          </Link>
                          <Link href={"/blogs/delete/" + blog._id}>
                            <button title="delete">
                              <RiDeleteBin6Fill />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {/* pagination pending start after database add ... */}
          {filtredBlog.length === 0 ? (
            ""
          ) : (
            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 1),
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
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
