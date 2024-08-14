import { IoMoonSharp, IoSearch, IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { HiBars3BottomRight } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";

export default function HeaderLanding() {
  const [searchopen, setSearchopen] = useState(false);
  const [aside, setAside] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData("/api/getblog");

  const openSearch = () => {
    setSearchopen(true);
  };
  const closeSearch = () => {
    setSearchopen(false);
  };

  const asideOpen = () => {
    setAside(true);
  };

  const asideClose = () => {
    setAside(false);
  };

  const handleLinkClick = () => {
    setAside(false);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  const publishedBlogs = alldata.filter((blog) => blog.status === "publish");
  const filtredBlogs =
    searchQuery.trim() === ""
      ? publishedBlogs
      : publishedBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="header_sec">
      <div className="container header">
        <div className="logo">
          <Link href="/">
            <h1>Blog</h1>
          </Link>
        </div>
        <div className="searchbar">
          <IoSearchSharp />
          <input
            onClick={openSearch}
            type="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Discover news, articles and more"
          />
        </div>
        <div className="nav_list_dark">
          <ul>
            <li>
              <Link href="/">home</Link>
            </li>
            <li>
              <Link href="/">About Me</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
          {/* for mobile device */}
          <div className="navlist_mobile_ul">
            <button onClick={toggleDarkMode}>
              {darkMode ? <IoMoonSharp /> : <LuSun />}
            </button>
            <button onClick={openSearch}>
              <IoSearchSharp />
            </button>
            <button onClick={asideOpen}>
              <HiBars3BottomRight />
            </button>
          </div>
          <div className="darkmode">
            <label className="switch">
              <input
                type="checkbox"
                onClick={toggleDarkMode}
                defaultChecked={darkMode}
              />
              <span className="slider_header"></span>
            </label>
          </div>
        </div>
      </div>
      <div className={`search_click ${searchopen ? "open" : ""}`}>
        <div className="searchab_input">
          <IoSearchSharp />
          <input
            type="search"
            placeholder="Discover news, articles and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="search_data text-center">
          {loading ? (
            <div className="wh_100 flex flex-center mt-2 pb-5">
              <div className="loader"></div>
            </div>
          ) : searchQuery ? (
            filtredBlogs.slice(0, 3).map((blog) => (
              <>
                <Link
                  className="blog"
                  key={blog._id}
                  onClick={closeSearch}
                  href={`/blog/${blog.slug}`}
                >
                  <div className="bloginfo">
                    <dev>
                      <h3>{blog.title}</h3>
                    </dev>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Temporibus exercitationem veniam ab tempore nam doloremque
                      nobis quibusdam modi. Quasi aut suscipit corporis natus,
                      recusandae dolor! Minus officia non similique provident.
                    </p>
                  </div>
                </Link>
              </>
            ))
          ) : (
            <div>No Search Result</div>
          )}
        </div>
        <div className="exit_search" onClick={closeSearch}>
          <div className="">
            <FaXmark />
          </div>
          <h4>ESC</h4>
        </div>
      </div>
      <div className={`navlist_mobile ${aside ? "open" : ""}`}>
        <div className="navlist_m_title flex flex-sb">
          <h1>BLOG</h1>
          <button onClick={asideClose}>
            <FaXmark />
          </button>
        </div>
        <hr />
        <h3 className="mt-3">Main Menu</h3>
        <ul onClick={handleLinkClick}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">About Us</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
        <hr />
        <h3 className="mt-3">Topics</h3>
        <ul onClick={handleLinkClick}>
          <li>
            <Link href="/topics/htmlcssjs">Html Css Js</Link>
          </li>
          <li>
            <Link href="/topics/nextjs">Next Js</Link>
          </li>
          <li>
            <Link href="/topics/database">Database</Link>
          </li>
          <li>
            <Link href="/topics/deployment">Deployment</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
