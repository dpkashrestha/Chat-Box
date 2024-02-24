import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MESSAGES } from "../utils/queries";
import { ADD_MESSAGE } from "../utils/mutations";
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
  Loader,
} from "@chatscope/chat-ui-kit-react";
import { useState, useRef, useMemo, useCallback } from "react";

const ChatWindow = ({ chatId }) => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const inputRef = useRef();
  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  const { loading, data } = useQuery(QUERY_MESSAGES, {
    variables: { chatId: chatId },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleSend = async (message) => {
    const { data } = await addMessage({
      variables: {
        content: message,
        chatId: chatId,
      },
    });

    setAllMessages([...allMessages, data.addMessage]);
    setMessageInputValue("");
  };

  const renderMessages = useCallback(() => {
    return (
      !loading &&
      allMessages.map((message) => {
        return (
          <Message
            key={message._id}
            model={{
              message: message?.content,
              sentTime: "15 mins ago",
              sender: message?.sender?.username,
              direction: "outgoing",
              position: "single",
            }}
          >
            <Avatar name="Zoe" />
          </Message>
        );
      })
    );
  }, [allMessages]);

  useMemo(() => {
    setAllMessages(data?.messages);
  }, [data]);

  if (loading) {
    return <Loader>Loading</Loader>;
  }

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
          {/* {allMessages?.map((message) => {
            return (
              <Message
                key={message._id}
                model={{
                  message: message?.content,
                  sentTime: "15 mins ago",
                  sender: message?.sender?.username,
                  direction: "outgoing",
                  position: "single",
                }}
              >
                <Avatar name="Zoe" />
              </Message>
            );
          })} */}
          {renderMessages()}
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
            onClick={() => handleSend(messageInputValue)}
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
