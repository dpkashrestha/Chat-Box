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
          <span style={{ fontWeight: "bold", color: "#002681" }}>C</span>
          <span style={{ fontWeight: "bold", color: "#9F0766" }}>H</span>
          <span style={{ fontWeight: "bold", color: "#D0711D" }}>A</span>
          <span style={{ fontWeight: "bold", color: "#E6B200" }}>T</span>
          <span style={{ fontWeight: "bold", color: "#AB031D" }}>B</span>
          <span style={{ fontWeight: "bold", color: "#497834" }}>O</span>
          <span style={{ fontWeight: "bold", color: "#527EBD" }}>X</span>
        </h1>

        <h2 style={{ textAlign: "center" }}>
          connect with your favorite people
        </h2>

        <img
          src="chat-logo.png"
          alt="Logo"
          style={{ width: "250px", height: "auto" }}
        />
      </div>
    </>
  );
}
