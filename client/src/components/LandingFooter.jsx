import React from "react";

export function LandingFooter(props) {
  return (
    <>
      <div className="landing-footer-left">
        <a
          href="https://buy.stripe.com/test_7sIaIqaxafRx4r66oo"
          rel="noopener noreferrer"
          target="_blank"
          className="ml-2"
        >
          {" "}
          ❤️ Support the developers
        </a>
      </div>
      <div className="landing-footer-right">
        <span>UI components provided by:</span>
        <a
          href="https://chatscope.io"
          rel="noopener noreferrer"
          target="_blank"
          className="ml-2"
        >
          chatscope
        </a>
      </div>
    </>
  );
}
