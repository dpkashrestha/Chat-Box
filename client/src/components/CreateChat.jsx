import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Search, Button, MessageInput } from "@chatscope/chat-ui-kit-react";
import { Modal, Form } from "react-bootstrap";

import { useState, useRef, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

const CreateModal = ({ newGroup, chatId, children }) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [searchUsers, { loading, data }] = useLazyQuery(QUERY_USERS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (!search) {
      console.log("not searching", search);
      return;
    }
    console.log("searching:", search);
    searchUsers({ variables: { userSearch: search } });
  }, [search]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Form>
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
          </Modal.Body>
          <Modal.Footer>
            {newGroup ? (
              <Button
                border
                type="submit"
                onClick={() => {
                  console.log(newGroup);
                }}
              >
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
