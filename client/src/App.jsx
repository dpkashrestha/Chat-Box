import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
      {/* <LandingPage></LandingPage> */}
      <ChatPage></ChatPage>
    </>
  );
}

export default App;
