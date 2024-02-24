import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Sidebar,
  Search,
  Conversation,
  ConversationList,
  Button,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import Auth from "../utils/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const ChatList = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  return (
    <Sidebar position="left" scrollable={false}>
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
    </Sidebar>
  );
};

export default ChatList;
