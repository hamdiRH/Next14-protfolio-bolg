import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container flex flex-sb flex-wrap flex-left">
        <div className="footer_logo">
          <h2>Caesar</h2>
          <h4>&copy; 2024 All Rights Reserved.</h4>
          <h3>
            Coded By <span>@Caesar</span>
          </h3>
        </div>
        <div className="q_links">
          <h3>Quick links</h3>
          <ul>
            <li>
              <Link href="/">Advertise with us</Link>
            </li>
            <li>
              <Link href="/">About us</Link>
            </li>
            <li>
              <Link href="/">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="q_links">
          <h3>Legal Stuff links</h3>
          <ul>
            <li>
              <Link href="/privacyNotice">Privacy Notice</Link>
            </li>
            <li>
              <Link href="/cookiePolicy">Cookie Policy</Link>
            </li>
            <li>
              <Link href="/termsOfUse">Terms of Use</Link>
            </li>
          </ul>
        </div>
        <div className="q_links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/">Github</Link>
            </li>
            <li>
              <Link href="/">Twitter</Link>
            </li>
            <li>
              <Link href="/">Instagram</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
