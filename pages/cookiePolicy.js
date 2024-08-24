import LandingLayout from "@/components/LandingLayout";
import React from "react";

function cookiePolicy() {
  return (
    <LandingLayout>
      <div className="cookie-policy">
        <h1>Cookie Policy</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Date]
        </p>

        <div className="section">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help the website remember your actions and preferences
            over time.
          </p>
        </div>

        <div className="section">
          <h2>2. How We Use Cookies</h2>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary
              for the website to function and cannot be switched off in our
              systems.
            </li>
            <li>
              <strong>Performance Cookies:</strong> These cookies help us
              understand how visitors interact with our website by collecting
              and reporting information anonymously.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These cookies enable the
              website to provide enhanced functionality and personalization.
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>3. Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings.
            However, disabling cookies may affect the functionality of the
            website.
          </p>
        </div>

        <div className="section">
          <h2>4. Third-Party Cookies</h2>
          <p>
            We may use third-party services that place cookies on your device to
            improve our website's performance and user experience.
          </p>
        </div>

        <div className="section">
          <h2>5. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We will notify
            you of any changes by posting the new Cookie Policy on this page.
          </p>
        </div>

        <div className="section">
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us
            at <a href="mailto:[Your Email Address]">[Your Email Address]</a>.
          </p>
        </div>
      </div>
    </LandingLayout>
  );
}

export default cookiePolicy;
