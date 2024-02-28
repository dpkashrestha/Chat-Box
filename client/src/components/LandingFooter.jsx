import React from "react";

export function LandingFooter(props) {
  return (
    <>
      <div className="navbar sticky-bottom">
        <span style={{ marginRight: "1em" }}>
          UI components provided by:{" "}
          <a
            href="https://chatscope.io"
            rel="noopener noreferrer"
            target="_blank"
            className="ml-2"
          >
            chatscope{" "}
          </a>
        </span>
        <span /* style={{ marginLeft: "25vw" }} */>
          <a
            href="https://buy.stripe.com/test_7sIaIqaxafRx4r66oo"
            rel="noopener noreferrer"
            target="_blank"
            className="ml-2"
          >
            Support the developers
          </a>
        </span>
      </div>
    </>
  );
}
