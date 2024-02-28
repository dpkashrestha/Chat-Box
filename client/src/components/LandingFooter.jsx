import React from "react";

export function LandingFooter(props) {
  return (
    <nav className="navbar sticky-bottom" style={{ width: "100%" }}>
      <div className="container-fluid">
        <span className="" style={{}}>
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
        <span className="" style={{}}>
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
