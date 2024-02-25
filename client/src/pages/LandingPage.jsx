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
        <div className="landing-header">
          <h1 style={{ textAlign: "center"}}>
            welcome to chat box
          </h1>
          <img
            src="chat-logo.png"
            alt="Logo"
            style={{ width: "100px", height: "auto" }}
          />
          <h3 style={{ textAlign: "center" }}>
            connect with your favorite people
          </h3>
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
