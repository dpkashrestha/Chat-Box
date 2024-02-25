import React from "react";

export function LandingHeader() {
  return (
    <>
      <div className="landing-header" style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "8em",
            margin: "0",
          }}
        >
          <span style={{ fontWeight: "bold" }}>C</span>
          <span style={{ fontWeight: "bold" }}>H</span>
          <span style={{ fontWeight: "bold" }}>A</span>
          <span style={{ fontWeight: "bold" }}>T</span>
          <span style={{ fontWeight: "bold" }}>B</span>
          <span style={{ fontWeight: "bold" }}>O</span>
          <span style={{ fontWeight: "bold" }}>X</span>
        </h1>

        <h2 style={{ textAlign: "center" }}>
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
