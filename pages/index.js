import { useEffect } from "react";
import Head from "next/head";

export default function UnderConstruction() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const skylineImg = document.getElementById("skylineImg");
      if (skylineImg) {
        skylineImg.style.marginBottom = `${0 - scrolled / 8}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="comingsoon">
      <div className="overlay"></div>
      <div id="wrap">
        <div id="main">
          <h1>Coming soon...</h1>
        </div>
      </div>
    </div>
  );
}
