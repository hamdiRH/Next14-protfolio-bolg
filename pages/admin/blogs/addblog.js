import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function addblog() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    // loading state, loader or any other indicator
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }
  // useEffect(() => {
  //   // check if there's no active session and redirect to login page
  //   if (!session) router.push("login");
  // }, [session, router]);
  if (session)
    return (
      <ProtectedRoute>
        <div className="addblogspage">
          <div className="titledashboard flex flex-sb ">
            <div className="" data-aos="fade-right">
              <h2>
                Add <span>Blogs</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <MdOutlineAddPhotoAlternate /> <span>/</span> <span>AddBlog</span>
            </div>
          </div>
          <div className="blogsadd">
            <Blog />
          </div>
        </div>
      </ProtectedRoute>
    );
}
