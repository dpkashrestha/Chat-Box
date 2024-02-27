import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MESSAGES, QUERY_ME } from "../utils/queries";
import { ADD_MESSAGE } from "../utils/mutations";
import Picker from "emoji-picker-react";
import CreateGroup from "./CreateGroup";

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  SendButton,
  Avatar,
  ConversationHeader,
  Button,
  AvatarGroup,
  Loader,
} from "@chatscope/chat-ui-kit-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import Auth from "../utils/auth";

const ChatWindow = ({ activeChat, onClickCallback, chatContainerStyle }) => {
  const currentUser = Auth.getCurrentUser();
  const [messageInputValue, setMessageInputValue] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [newGroup, setNewGroup] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef();
  const emojiPickerRef = useRef(null);

  const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
    refetchQueries: [QUERY_MESSAGES, "messages"],
  });
  const { loading, data } = useQuery(QUERY_MESSAGES, {
    variables: { chatId: activeChat._id },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const getOtherUsers = (users) => {
    return users.filter((user) => user._id !== currentUser._id);
  };

  const otherUsers = getOtherUsers(activeChat.users);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target) &&
      !event.target.classList.contains("emoji-icon")
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        chatId: activeChat._id,
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
                message?.sender?._id === currentUser?._id
                  ? "outgoing"
                  : "incoming",
              position: "single",
            }}
          >
            <Avatar
              name={message?.sender?.username}
              src={`data:image/svg+xml;base64,${message?.sender?.avatar}`}
            />

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
      <ChatContainer style={chatContainerStyle}>
        <ConversationHeader className="test-class">
          <ConversationHeader.Back onClick={onClickCallback} />
          {otherUsers.length > 1 ? (
            <AvatarGroup size="md" max={4}>
              {otherUsers.map((user) => {
                return (
                  <Avatar
                    key={user._id}
                    name={user.username}
                    src={`data:image/svg+xml;base64,${user.avatar}`}
                  />
                );
              })}
            </AvatarGroup>
          ) : (
            <Avatar
              key={otherUsers[0]._id}
              name={otherUsers[0].username}
              src={`data:image/svg+xml;base64,${otherUsers[0].avatar}`}
            />
          )}
          <ConversationHeader.Content userName={activeChat.chatName} />
          <ConversationHeader.Actions>
            <CreateGroup newGroup={newGroup} activeChat={activeChat}>
              <Button
                border
                style={{ width: "100%", height: "100%", padding: "0 0.1em" }}
                onClick={() => setNewGroup(false)}
                labelPosition="left"
                icon={
                  <FontAwesomeIcon
                    icon={faGear}
                    className="button-icon"
                    style={{ margin: "0" }}
                  />
                }
              >
                <span>Edit Group </span>
              </Button>
            </CreateGroup>
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList>{renderMessages()}</MessageList>

        <div
          as={MessageInput}
          style={{
            display: "flex",
            flexDirection: "row",
            borderTop: "1px dashed #d1dbe4",
          }}
        >
          <div className="emoji" style={{}}>
            <div
              onClick={handleEmojiPickerHideShow}
              style={{
                fontSize: "1.7em",
                marginTop: "0.05em",
                marginLeft: "0.5em",
                marginRight: "-0.1em",
              }}
              className="emoji-icon"
            >
              😃
            </div>
            {showEmojiPicker && (
              <div ref={emojiPickerRef}>
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <div
            as={MessageInput}
            style={{
              display: "flex",
              flexDirection: "row",
              borderTop: "1px dashed #d1dbe4",
              width: "100%",
            }}
          >
            <MessageInput
              ref={inputRef}
              onChange={(msg) => setMessageInputValue(msg)}
              value={messageInputValue}
              sendButton={false}
              onSend={() => handleSend(messageInputValue)}
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
                width: "65px",
                minWidth: "65px",
              }}
            />
          </div>
        </div>
      </ChatContainer>
    </>
  );
};

export default ChatWindow;
