import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { useState, useCallback, useEffect } from "react";
import Auth from "../utils/auth";

const ChatPage = () => {
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
  const [activeChat, setActiveChat] = useState(null);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarStyle, setSidebarStyle] = useState({
    display: "flex",
    flexBasis: "auto",
    width: "100%",
    maxWidth: "100%",
  });
  const [chatContainerStyle, setChatContainerStyle] = useState({
    display: "none",
  });
  const [conversationContentStyle, setConversationContentStyle] = useState({
    display: "flex",
  });
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({
    marginRight: "1em",
  });
  const handleBackClick = () => {
    setActiveChat(null);
    setSidebarVisible(!sidebarVisible);
  };
  const setActiveConversation = useCallback(
    (chat) => {
      setActiveChat(chat);
      if (sidebarVisible) {
        setSidebarVisible(false);
      }
    },
    [sidebarVisible, setSidebarVisible]
  );
  useEffect(() => {
    if (sidebarVisible && 768 >= windowDimensions && windowDimensions <= 578) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });

      setConversationContentStyle({
        display: "flex",
      });
      setConversationAvatarStyle({
        marginRight: "1em",
      });
      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
    windowDimensions,
  ]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Auth.loggedIn()) {
    window.location.assign("/");
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <ChatList
          onClickCallback={setActiveConversation}
          sidebarStyle={sidebarStyle}
          activeChat={activeChat}
          conversationAvatarStyle={conversationAvatarStyle}
          conversationContentStyle={conversationContentStyle}
        />
        {activeChat && (
          <ChatWindow
            onClickCallback={handleBackClick}
            activeChat={activeChat}
            chatContainerStyle={chatContainerStyle}
          />
        )}
      </MainContainer>
    </div>
  );
};

export default ChatPage;
