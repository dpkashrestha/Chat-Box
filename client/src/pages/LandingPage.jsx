import React, { useState } from "react";
import { Tab, Nav, Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

const LandingPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleShowLogin = () => {
    setShowSignup(false);
  };

  return (
    <>
      <div className="landing">
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

        {!showSignup ? (
          <>
            <LoginForm />
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "brown" }}
                onClick={handleShowSignup}
              >
                Signup instead
              </span>
            </p>
          </>
        ) : (
          <>
            <SignUpForm />
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "brown" }}
                onClick={handleShowLogin}
              >
                Login instead
              </span>
            </p>
          </>
        )}

        <div className="landing-footer">
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
      </div>
    </>
  );
};

export default LandingPage;
