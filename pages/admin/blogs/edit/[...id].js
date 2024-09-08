import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";

export default function EditBlog() {
  // Loading
  const router = useRouter();
  // blog Edit
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/blogapi?id=" + id).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div className="">
            <h2>
              Edit <span>{productInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <BsPostcard /> <span>/</span> <span>Edit Blog</span>
          </div>
        </div>
        <div className="mt-3">{productInfo && <Blog {...productInfo} />}</div>
      </div>
    </ProtectedRoute>
  );
}
