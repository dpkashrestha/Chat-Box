import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationHeader,
  ConversationList,
  Button,
  Loader,
  Avatar,
  AvatarGroup,
} from "@chatscope/chat-ui-kit-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHATS } from "../utils/queries";
import Auth from "../utils/auth";

const ChatList = ({ onClickCallback }) => {
  const currentUser = Auth.getCurrentUser();
  const [search, setSearch] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { loading, data } = useQuery(QUERY_CHATS, {
    variables: { chatName: search },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const getOtherUsers = (users) => {
    return users.filter((user) => user._id !== currentUser._id);
  };

  const getOtherUsernames = (users) => {
    return getOtherUsers(users)
      .map((user) => user.username)
      .join(", ");
  };

  return (
    <Sidebar position="left" scrollable={false}>
      <ConversationHeader>
        <Avatar
          name={currentUser.username}
          src={`data:image/svg+xml;base64,${currentUser.avatar}`}
        />
        <ConversationHeader.Content userName={currentUser.username} />
      </ConversationHeader>
      <Search
        placeholder="Search..."
        value={search}
        onChange={(v) => setSearch(v)}
        onClearClick={() => setSearch("")}
      />
      <Button border icon={<FontAwesomeIcon icon={faPlus} />}>
        <div className="buttonText">New Group</div>
      </Button>

      {loading ? (
        <Loader>Loading</Loader>
      ) : (
        <ConversationList>
          {data.allChats.map((chat) => {
            const message = chat.lastMessage;
            return (
              <Conversation
                key={chat._id}
                name={
                  chat.chatName ? chat.chatName : getOtherUsernames(chat.users)
                }
                lastSenderName={message ? message.sender.username : null}
                info={message ? message.content : "No messages yet"}
                onClick={() => {
                  setSelectedChatId(chat._id);
                  onClickCallback(chat._id);
                }}
                active={selectedChatId === chat._id}
              >
                <AvatarGroup size="md">
                  {getOtherUsers(chat.users).map((user) => {
                    return (
                      <Avatar
                        name={user.username}
                        status="available"
                        src={`data:image/svg+xml;base64,${user.avatar}`}
                      />
                    );
                  })}
                </AvatarGroup>
              </Conversation>
            );
          })}
        </ConversationList>
      )}

      <Button
        border
        className="btn btn-danger"
        style={{ backgroundColor: "#DC3545", color: "white" }}
        onClick={Auth.logout}
        icon={<FontAwesomeIcon icon={faSignOutAlt} />}
      >
        <div className="buttonText">Logout</div>
      </Button>
    </Sidebar>
  );
};

export default ChatList;
