import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  SendButton,
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";

import { useState, useRef } from "react";
import ChatList from "../components/ChatList";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import Auth from "../utils/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const ChatPage = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const inputRef = useRef();

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
        {/* <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            {!loading &&
              data.users.map((user) => (
                <Conversation
                  key={user._id}
                  name={user.username}
                  lastSenderName={user.username}
                  info="Yes i can do it for you"
                  unreadCnt={user.unreadCnt}
                >
                  <Avatar status="available" />
                </Conversation>
              ))}
          </ConversationList>

          <button className="btn btn-danger" onClick={Auth.logout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </Sidebar> */}

        <ChatContainer>
          <ConversationHeader className="test-class">
            <ConversationHeader.Back />
            <Avatar name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
            >
              <Avatar name="Zoe" />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar name="Zoe" />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "first",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "last",
              }}
            />

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar name="Zoe" />
            </Message>
          </MessageList>

          <div
            as={MessageInput}
            style={{
              display: "flex",
              flexDirection: "row",
              borderTop: "1px dashed #d1dbe4",
            }}
          >
            <MessageInput
              ref={inputRef}
              onChange={(msg) => setMessageInputValue(msg)}
              value={messageInputValue}
              sendButton={false}
              attachButton={false}
              style={{
                flexGrow: 1,
                borderTop: 0,
                flexShrink: "initial",
              }}
            />
            <SendButton
              border
              /* onClick={() => handleSend(messageInputValue)} */
              disabled={messageInputValue.length === 0}
              style={{
                marginLeft: 0,
                paddingLeft: 0,
                paddingRight: 0,
                width: 0,
              }}
            />
          </div>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatPage;
