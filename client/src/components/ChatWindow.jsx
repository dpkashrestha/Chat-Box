import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MESSAGES, QUERY_ME } from "../utils/queries";
import { ADD_MESSAGE } from "../utils/mutations";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Button,
  SendButton,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  TypingIndicator,
  Loader,
} from "@chatscope/chat-ui-kit-react";
import { useState, useRef, useMemo, useCallback } from "react";

const ChatWindow = ({ chatId }) => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef();
  const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
    refetchQueries: [QUERY_MESSAGES, "messages"],
  });
  const { loading, data } = useQuery(QUERY_MESSAGES, {
    variables: { chatId: chatId },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  //TODO: add get one chat
  // const { loading: chatLoading, data: chatData } = useQuery();

  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const me = userData?.me || {};

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    let msg = messageInputValue;
    console.log("emoji:", emoji);
    msg += emoji.emoji;
    setMessageInputValue(msg);
  };

  const handleSend = async (message) => {
    const { data } = await addMessage({
      variables: {
        content: message,
        chatId: chatId,
      },
    });

    setMessageInputValue("");
  };

  const renderMessages = useCallback(() => {
    return (
      !loading &&
      allMessages.map((message) => {
        const createdAt = new Date(parseInt(message?.createdAt));
        const sentAt = createdAt.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <Message
            key={message._id}
            model={{
              message: message?.content,
              sentTime: sentAt,
              sender: message?.sender?.username,
              direction:
                message?.sender?._id === me?._id ? "outgoing" : "incoming",
              position: "single",
            }}
          >
            {message?.sender?._id !== me?._id && (
              <Avatar
                name={message?.sender?.username}
                src={`data:image/svg+xml;base64,${message?.sender?.avatar}`}
              />
            )}
            <Message.Footer
              sender={message?.sender?.username}
              sentTime={sentAt}
            />
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
          <div className="emoji" style={{}}>
            {/* <FontAwesomeIcon
              icon={faFaceSmile}
              onClick={handleEmojiPickerHideShow}
              style={{ color: "#E2AC00", fontSize: "30px" }}
            /> */}
            <div
              onClick={handleEmojiPickerHideShow}
              style={{
                fontSize: "1.7em",
                marginTop: "0.05em",
                marginLeft: "0.5em",
                marginRight: "-0.1em",
              }}
            >
              😃
            </div>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>

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
              marginRight: "0em",
            }}
          />
          <SendButton
            border
            onClick={() => handleSend(messageInputValue)}
            disabled={messageInputValue.length === 0}
            style={{
              width: "10vw",
            }}
          />
        </div>
      </ChatContainer>
    </>
  );
};

export default ChatWindow;
