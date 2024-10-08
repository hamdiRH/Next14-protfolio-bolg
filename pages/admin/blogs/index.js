import { useEffect } from "react";
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
import Pagination from "rc-pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/actions/blogActions";

export default function blogs() {
  const {
    blogs,
    loadingBlogs,
    errorBlogs,
    searchQuery,
    totalResults,
    page,
    limit,
  } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [perPage] = useState(1);
  // fetch blogs form api endpoint with hooks
  // const { alldata, loading } = useFetchData("/api/blogapi");
  // filtering Publish blogs

  // function to handle page change
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const indexOfLastblog = currentPage * perPage;

  // const indexOfFirstblog = indexOfLastblog - perPage;

  // const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);
  // const publishBlogs = currentBlogs.filter((ab) => ab.status === "publish");

  // const allblog = alldata.filter((ab) => ab.status === "publish").length;
  // const pageNumbers = [];

  // for (let i = 0; i < Math.ceil(allblog / perPage); i++) {
  //   pageNumbers.push(i);
  // }
  // const [searchQuery, setSearchQuery] = useState("");
  // const filtredBlog =
  //   searchQuery.trim() === ""
  //     ? publishBlogs
  //     : publishBlogs.filter((blog) =>
  //         blog.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  //       );

  const handlePageChange = (current, pageSize) => {
    dispatch(setPage(current));
  };

  useEffect(() => {
    dispatch(
      fetchBlogs({
        page,
        limit,
        status: "publish",
      })
    );
  }, [dispatch]);

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
              {loadingBlogs ? (
                <tr>
                  <td>
                    <Dataloading />
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Publish Blog
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => {
                  return (
                    <tr key={blog._id}>
                      <td>{limit * (page - 1) + index + 1}</td>
                      <td>{blog.title}</td>
                      <td>{blog.slug}</td>
                      <td>
                        <div className="flex gap-2 flex-center">
                          <Link href={"/admin/blogs/edit/" + blog._id}>
                            <button title="edit">
                              <FaEdit />
                            </button>
                          </Link>
                          <Link href={"/admin/blogs/delete/" + blog._id}>
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
          <Pagination
            total={totalResults}
            pageSize={limit}
            currentPage={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
