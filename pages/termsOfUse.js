import LandingLayout from "@/components/LandingLayout";
import React from "react";

function termsOfUse() {
  return (
    <LandingLayout>
      <div className="terms-of-use">
        <h1>Terms of Use</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Date]
        </p>

        <div className="section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you agree to comply with these
            Terms of Use. If you do not agree with any part of these terms,
            please do not use the website.
          </p>
        </div>

        <div className="section">
          <h2>2. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, and code, is
            the intellectual property of [Your Name] and is protected by
            copyright laws. You may not reproduce, distribute, or create
            derivative works without explicit permission.
          </p>
        </div>

        <div className="section">
          <h2>3. User Conduct</h2>
          <p>
            You agree not to use this website for any unlawful purposes or to
            violate any rights of others. You also agree not to disrupt the
            website's operation or to engage in any activity that could harm the
            website or its users.
          </p>
        </div>

        <div className="section">
          <h2>4. Limitation of Liability</h2>
          <p>
            [Your Name] is not liable for any damages resulting from the use or
            inability to use the website, including any errors or omissions in
            the content.
          </p>
        </div>

        <div className="section">
          <h2>5. Changes to the Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Your
            continued use of the website following any changes constitutes your
            acceptance of the new terms.
          </p>
        </div>

        <div className="section">
          <h2>6. Governing Law</h2>
          <p>
            These Terms of Use are governed by the laws of [Your Country/State].
            Any disputes arising from these terms will be resolved in the courts
            of [Your Country/State].
          </p>
        </div>

        <div className="section">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Use, please contact
            us at <a href="mailto:[Your Email Address]">[Your Email Address]</a>
            .
          </p>
        </div>
      </div>
    </LandingLayout>
  );
}

export default termsOfUse;
