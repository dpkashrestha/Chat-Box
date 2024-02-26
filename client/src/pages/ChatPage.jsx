import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { useState } from "react";

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const setActiveConversation = (chat) => {
    setActiveChat(chat);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <ChatList onClickCallback={setActiveConversation} />
        {activeChat && <ChatWindow activeChat={activeChat} />}
      </MainContainer>
    </div>
  );
};

export default ChatPage;
