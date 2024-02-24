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
} from "@chatscope/chat-ui-kit-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHATS } from "../utils/queries";
import Auth from "../utils/auth";

const currentUser = Auth.getCurrentUser();

const ChatList = ({ onClickCallback }) => {
  const [search, setSearch] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { loading, data } = useQuery(QUERY_CHATS, {
    variables: { chatName: search },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const getOtherUsernames = (users) => {
    return users
      .filter((user) => user._id !== currentUser._id) // Filter out the current user
      .map((user) => user.username) // Map the usernames
      .join(", "); // Join the usernames with comma
  };

  return (
    <Sidebar position="left" scrollable={false}>
      <ConversationHeader>
        {/* <Avatar name={currentUser.username} /> */}
        <ConversationHeader.Content userName={currentUser.username} />
      </ConversationHeader>
      <Search
        placeholder="Search..."
        value={search}
        onChange={(v) => setSearch(v)}
        onClearClick={() => setSearch("")}
      />
      <Button border icon={<FontAwesomeIcon icon={faPlus} />}>
        New Group
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
                name={getOtherUsernames(chat.users)}
                lastSenderName={message ? message.sender.username : null}
                info={message ? message.content : "No messages yet"}
                onClick={() => {
                  setSelectedChatId(chat._id);
                  onClickCallback(chat._id);
                }}
                active={selectedChatId === chat._id}
              >
                <Avatar name={chat.chatName} status="available" />
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
        Logout
      </Button>
    </Sidebar>
  );
};

export default ChatList;
