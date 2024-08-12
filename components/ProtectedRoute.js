import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "./Loading";
import AdminLayout from "@/layout/admin";

const ProtectedRoute = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="admin">
        <div className="loadingdata flex flex-col flex-center wh_100">
          <Loading />
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="admin">
        <AdminLayout>{children}</AdminLayout>
      </div>
    );
  }

  return null; // Or return a fallback UI if needed
};

export default ProtectedRoute;
