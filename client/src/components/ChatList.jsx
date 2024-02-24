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
  const { loading, data } = useQuery(QUERY_CHATS, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  /*  const { loading, data } = useQuery(QUERY_CHATS);
  console.log(data);
  setSearchResult(data); */
  return (
    <Sidebar position="left" scrollable={false}>
      <Search
        placeholder="Search Chats"
        value={""}
        onChange={(v) =>
          searchChats({
            variables: { chatName: v },
          })
        }
      />
      <Button border icon={<FontAwesomeIcon icon={faPlus} />}>
        New Group
      </Button>

      {loading ? (
        <Loader>Loading</Loader>
      ) : (
        <ConversationList>
          {data.allChats.map((chat) => {
            console.log(chat.lastMessage);
            const message = chat.lastMessage;
            return (
              <Conversation
                key={chat._id}
                name={chat.chatName}
                lastSenderName={message ? message.sender.username : null}
                info={message ? message.content : "No messages in this chat"}
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
