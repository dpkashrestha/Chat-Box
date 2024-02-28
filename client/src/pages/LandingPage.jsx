import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";
import { LandingHeader } from "../components/LandingHeader";
import { LandingFooter } from "../components/LandingFooter";
import Auth from "../utils/auth";
import { Button } from "react-bootstrap";

const LandingPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleShowLogin = () => {
    setShowSignup(false);
  };

  if (Auth.loggedIn()) {
    window.location.assign("/chat");
  }

  const installBtn = document.getElementById("installBtn");
  const textHeader = document.getElementById("textHeader");

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installBtn.style.visibility = "visible";
    textHeader.textContent = "Click the button to install!";

    installBtn.addEventListener("click", () => {
      event.prompt();
      installBtn.setAttribute("disabled", true);
      installBtn.textContent = "Installed!";
    });
  });

  window.addEventListener("appinstalled", (event) => {
    textHeader.textContent = "Successfully installed!";
    console.log("👍", "appinstalled", event);
  });

  return (
    <>
      <div className="landing">
        <LandingHeader />

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
        <div id="textHeader">Click the button to install!</div>
        <Button id="installBtn" variant="dark">
          Install
        </Button>

        <LandingFooter />
      </div>
    </>
  );
};

export default LandingPage;
