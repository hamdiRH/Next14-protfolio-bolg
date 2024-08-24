import LandingLayout from "@/components/LandingLayout";
import React from "react";

function privacyNotice() {
  return (
    <LandingLayout>
      <div className="privacy-notice">
        <h1>Privacy Notice</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Date]
        </p>

        <div className="section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to [Your Name]'s website. Your privacy is important to us.
            This Privacy Notice explains how we collect, use, and protect your
            personal information when you visit our website.
          </p>
        </div>

        <div className="section">
          <h2>2. Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> When you subscribe to our
              newsletter or contact us, we may collect your name, email address,
              and other contact details.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect data on how you interact
              with our website, including your IP address, browser type, and
              pages visited.
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries.</li>
            <li>To send you updates and newsletters if you've subscribed.</li>
            <li>To improve our website's functionality and user experience.</li>
          </ul>
        </div>

        <div className="section">
          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties except to comply with legal
            obligations or protect our rights.
          </p>
        </div>

        <div className="section">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. Contact us at{" "}
            <a href="mailto:[Your Email Address]">[Your Email Address]</a> for
            any requests regarding your data.
          </p>
        </div>

        <div className="section">
          <h2>6. Changes to This Privacy Notice</h2>
          <p>
            We may update this Privacy Notice from time to time. We will notify
            you of any changes by posting the new Privacy Notice on this page.
          </p>
        </div>

        <div className="section">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Notice, please contact
            us at <a href="mailto:[Your Email Address]">[Your Email Address]</a>
            .
          </p>
        </div>
      </div>
    </LandingLayout>
  );
}

export default privacyNotice;
