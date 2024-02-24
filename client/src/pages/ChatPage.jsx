import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { useState } from "react";

const ChatPage = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const setActiveConversation = (chatId) => {
    setActiveChatId(chatId);
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
        {activeChatId && <ChatWindow chatId={activeChatId} />}
      </MainContainer>
    </div>
  );
};

export default ChatPage;
