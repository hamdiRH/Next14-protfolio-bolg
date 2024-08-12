import { useState } from "react";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { GoScreenFull } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { BiBorderRadius, BiExitFullscreen } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  return (
    <header className="header flex flex-sb">
      <div className="logo flex gap-2">
        <h1>ADMIN</h1>
        <div className="headerham flex flex-center">
          <RiBarChartHorizontalLine />
        </div>
      </div>
      <div className="rightnav flex gap-2">
        <div onClick={toggleFullScreen}>
          {isFullScreen ? <GoScreenFull /> : <BiExitFullscreen />}
        </div>
        <div className="notification">
          <IoMdNotifications />
        </div>
        <div className="profilenav">
          {session ? (
            <img
              src={session?.user?.image}
              alt="user"
              style={{ borderRadius: "100%", width: "50px" }}
            />
          ) : (
            <IoPersonSharp />
          )}
        </div>
      </div>
    </header>
  );
}
