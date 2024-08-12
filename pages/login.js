import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function Login() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    // loading state, loader or any other indicator
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }
  const router = useRouter();

  async function login() {
    await router.push("/");
    await signIn();
  }

  if (!session) {
    return (
      <div className="admin">
        <div className="loginfront flex flex-center flex-col full-w">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
            alt="coder"
            width={300}
          />
          <h1>Welcome Admin of the way2code 👋</h1>
          <p>
            Visit our main website <span>way2code</span>
          </p>
          <button className="mt-2" onClick={login}>
            Login with google{" "}
          </button>
        </div>
        I
      </div>
    );
  }
}
