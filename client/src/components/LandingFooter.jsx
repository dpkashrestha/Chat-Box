import React from "react";

export function LandingFooter(props) {
  return (
    <nav className="navbar fixed-bottom" style={{ width: "100%" }}>
      <div className="container-fluid">
        <span /* className="landing-footer-left" */>
          UI components provided by:{" "}
          <a
            href="https://chatscope.io"
            rel="noopener noreferrer"
            target="_blank"
            className="ml-2"
          >
            chatscope
          </a>
        </span>
        <span /* className="landing-footer-right "*/>
          <a
            href="https://buy.stripe.com/test_7sIaIqaxafRx4r66oo"
            rel="noopener noreferrer"
            target="_blank"
            className="ml-2"
          >
            ❤️ Support the developers
          </a>
        </span>
      </div>
    </nav>
  );
}
