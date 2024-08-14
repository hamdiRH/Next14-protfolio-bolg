import { useRouter } from "next/router";
import React from "react";

export default function TopLoadingLine() {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  React.useEffect(() => {
    const handleStart = () => setLoadingProgress(80);
    const handleComplete = () => {
      setLoadingProgress(100);
      setTimeout(() => {
        setLoadingProgress(0);
      }, 500);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <div
      className="topLoadingLine"
      stylee={{ width: `${loadingProgress}%` }}
    ></div>
  );
}
