import React, { useState } from "react";
import { Tab, Nav, Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="landing flex-column">
        <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
          <h1 style={{ textAlign: "center" }}>
            Connect with your favorite people
          </h1>
          <Card>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  {activeTab === "login" && <LoginForm />}
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  {activeTab === "signup" && <SignUpForm />}
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </div>
      <footer>
        <div className="text-muted d-flex flex-column flex-md-row align-items-md-center">
          <span>UI components provided by:</span>
          <div className="mt-2 align-self-end mt-md-0 ml-md-2 d-flex align-items-center">
            <span>Provided by: </span>
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
      </footer>
    </>
  );
};

export default LandingPage;
