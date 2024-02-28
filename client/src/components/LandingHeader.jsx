import React from "react";

export function LandingHeader() {
  return (
    <>
      <div className="landing-header" style={{ textAlign: "center" }}>
        <h1
          className="h1"
          style={{
            fontFamily: "Montserrat, sans-serif",
            // fontSize: "8em",
            // margin: "0",
          }}
        >
          <span style={{ fontWeight: "bold" }}>CHATBOX</span>
        </h1>

        <h2 className="h3" style={{ textAlign: "center" }}>
          connect with your favorite people
        </h2>

        <img
          src="chat-logo.png"
          alt="Logo"
          style={{ width: "16em", height: "auto" }}
        />
      </div>
    </>
  );
}
