import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";
import { LandingHeader } from "../components/LandingHeader";
import { LandingFooter } from "../components/LandingFooter";

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

        <LandingFooter />
      </div>
    </>
  );
};

export default LandingPage;
