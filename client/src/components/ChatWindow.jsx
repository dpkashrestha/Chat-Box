import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  SendButton,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { useState, useRef } from "react";

const ChatWindow = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const inputRef = useRef();

  return (
    <>
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
    </>
  );
};

export default ChatWindow;
