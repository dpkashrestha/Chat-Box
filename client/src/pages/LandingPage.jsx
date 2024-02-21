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
    <div>
      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
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
  );
};

export default LandingPage;
