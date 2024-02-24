import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

import { useState, useRef } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <ChatList />
        <ChatWindow />
      </MainContainer>
    </div>
  );
};

export default ChatPage;
