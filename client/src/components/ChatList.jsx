import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Button,
  Loader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_USERS, QUERY_CHATS } from "../utils/queries";
import Auth from "../utils/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

const ChatList = () => {
  const [search, setSearch] = useState("");
  const { loading, data } = useQuery(QUERY_CHATS, {
    variables: { chatName: search },
  });

  return (
    <Sidebar position="left" scrollable={false}>
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
                name={chat.chatName}
                lastSenderName={message ? message.sender.username : null}
                info={message ? message.content : "No messages yet"}
              >
                <Avatar status="available" />
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
