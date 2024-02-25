import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Search,
  Button,
  MessageInput,
  Loader,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { Modal, Form } from "react-bootstrap";

import { useState, useRef, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

const CreateModal = ({ newGroup, chatId, children }) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [searchUsers, { loading, data }] = useLazyQuery(QUERY_USERS, {
    onCompleted: (d) => {
      setSearchResult(data.users);
      console.log(d);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (!search) {
      setSearchResult([]);
      console.log("Clearing Results", searchResult);
      return;
    }
    console.log("searching:", search);
    searchUsers({ variables: { userSearch: search } });
    console.log("result:", searchResult);
  }, [search]);

  /* useEffect(() => {
    if (show) {
    }
  }, [show]); */

  const handleClose = () => {
    setShow(false);
    setSearch("");
    setGroupChatName("");
  };
  const handleShow = () => {
    setShow(true);
    if (newGroup) {
      //when the modal is shown run this command
      console.log("test newGroup");
    }
  };

  const inputRef = useRef();

  return (
    <>
      <span
        style={{ margin: "-0.1em 0.2em 0.4em" }}
        id="newGroup"
        onClick={handleShow}
      >
        {children}
      </span>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "auto" }}>
            {newGroup ? "Create a chat" : `Edit this chat`}
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            if (newGroup) {
              e.preventDefault();
              console.log(`Created: ${groupChatName}`);
            } else if (!newGroup) {
              console.log(`Edited: ${groupChatName}`);
            }
          }}
        >
          <Modal.Body>
            <div
              as={MessageInput}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0.2em 0em",
              }}
            >
              <MessageInput
                ref={inputRef}
                placeholder="Chat Name"
                onChange={(v) => setGroupChatName(v)}
                value={groupChatName}
                sendButton={false}
                attachButton={false}
                style={{
                  flexGrow: 1,
                  flexShrink: "initial",
                }}
              />
            </div>

            <Search
              placeholder="Search users"
              value={search}
              onChange={(v) => setSearch(v)}
              onClearClick={() => setSearch("")}
              style={{
                flexGrow: 1,
                flexShrink: "initial",
              }}
            />

            {data && (
              <>
                {loading ? (
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      marginTop: "0.5em",
                    }}
                  >
                    <Loader style={{ justifyContent: "center" }}></Loader>
                  </div>
                ) : (
                  <ConversationList>
                    {searchResult.map((user) => {
                      return (
                        <Conversation
                          key={user._id}
                          name={user.username}
                          info={user.email}
                          onClick={() => {}}
                          active={false}
                        >
                          <Avatar
                            name={user.username}
                            src={`data:image/svg+xml;base64,${user.avatar}`}
                          />
                        </Conversation>
                      );
                    })}
                  </ConversationList>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {newGroup ? (
              <Button border type="submit" onClick={() => {}}>
                Create Group
              </Button>
            ) : (
              <>
                <Button border onClick={handleClose}>
                  Delete Group
                </Button>
                <Button
                  border
                  type="submit"
                  onClick={() => {
                    console.log(newGroup);
                  }}
                >
                  Save Changes
                </Button>
              </>
            )}
          </Modal.Footer>{" "}
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;
