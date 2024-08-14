import React from "react";
import TopLoadingLine from "./TopLoadingLine";
import HeaderLanding from "./HeaderLanding";
import ScrollToTopBtn from "./ScrollToTopBtn";
import Footer from "./Footer";

export default function LandingLayout({ children }) {
  return (
    <div className="landing">
      <HeaderLanding />
      <div>
        <TopLoadingLine />
        {children}
        <ScrollToTopBtn />
      </div>
      <Footer />
    </div>
  );
}
