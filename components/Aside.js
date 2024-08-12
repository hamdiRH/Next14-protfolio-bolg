import Link from "next/link";
import { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlinePending, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { useRouter } from "next/router";

export default function Aside() {
  const router = useRouter;
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };
  useEffect(() => {
    // update active link state when the page is reload
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <aside className="asideleft">
        <ul>
          <Link href="/admin">
            <li
              className={activeLink === "/admin" ? "navactive" : ""}
              onClick={() => {
                handleLinkClick("/admin");
              }}
            >
              <IoHome />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link href="/admin/blogs">
            <li
              className={activeLink === "/admin/blogs" ? "navactive" : ""}
              onClick={() => {
                handleLinkClick("/admin/blogs");
              }}
            >
              <BsPostcard />
              <span>Blogs</span>
            </li>
          </Link>
          <Link href="/admin/blogs/addblog">
            <li
              className={
                activeLink === "/admin/blogs/addblog" ? "navactive" : ""
              }
              onClick={() => {
                handleLinkClick("/admin/blogs/addblog");
              }}
            >
              <MdOutlineAddPhotoAlternate />
              <span>Add Blog</span>
            </li>
          </Link>

          <Link href="/admin/tags">
            <li
              className={activeLink === "/admin/tags" ? "navactive" : ""}
              onClick={() => {
                handleLinkClick("/admin/tags");
              }}
            >
              <FaTag />
              <span>Tags</span>
            </li>
          </Link>
          <Link href="/admin/draft">
            <li
              className={activeLink === "/admin/draft" ? "navactive" : ""}
              onClick={() => {
                handleLinkClick("/admin/draft");
              }}
            >
              <MdOutlinePending />
              <span>Pending</span>
            </li>
          </Link>
          <Link href="/admin/setting">
            <li
              className={activeLink === "/admin/setting" ? "navactive" : ""}
              onClick={() => {
                handleLinkClick("/admin/setting");
              }}
            >
              <IoSettingsOutline />
              <span>Settings</span>
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
