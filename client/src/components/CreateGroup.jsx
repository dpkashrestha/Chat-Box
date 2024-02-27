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
// import Button from "react-bootstrap/Button";
import { Modal, Form, InputGroup, Badge, Button as Btn } from "react-bootstrap";

import { useState, useRef, useEffect } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { ADD_CHAT } from "../utils/mutations";

const CreateGroup = ({ onClickCallback, newGroup, chatId, children }) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [validated, setValidated] = useState(false);
  const [noName, setNoName] = useState(false);

  const [searchUsers, { loading: userLoading, data: userData }] = useLazyQuery(
    QUERY_USERS,
    {
      onCompleted: (d) => {
        setSearchResult(d.users);
        console.log(d);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const [createChat, { loading: chatLoading }] = useMutation(ADD_CHAT, {
    onCompleted: (d) => {
      const newChat = { ...d.addChat };
      delete newChat["__typename"];
      onClickCallback(newChat);
      console.log("createChat Data:", d);
      console.log("New Chat:", newChat);
    },
  });

  useEffect(() => {
    if (!search) {
      setSearchResult([]);
      return;
    }
    console.log("searching:", search);
    searchUsers({ variables: { userSearch: search } });
    console.log("result:", searchResult);
  }, [search]);
  useEffect(() => {
    // setEditGroup(!newGroup);
    if (show) {
      if (newGroup) {
        console.log("newGroup", newGroup);
      } else {
        console.log("editGroup", !newGroup);
      }
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
    setSearch("");
    setGroupChatName("");
    setSelectedUsers([]);
  };
  const handleShow = async () => {
    setShow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      console.log("No Name");
      setValidated(true);
      setNoName(true);
    } else if (!selectedUsers.length) {
      e.stopPropagation();
      console.log("No Users");
      setValidated(true);
    } else {
      if (newGroup) {
        console.log(!selectedUsers.length);
        const userIds = selectedUsers.map((u) => {
          return { _id: u._id };
        });
        createChat({
          variables: { chatName: groupChatName, users: userIds },
        });
        console.log(`Created: ${groupChatName}`);
        setShow(false);
        setSearch("");
        setGroupChatName("");
        setSelectedUsers([]);
      } else if (!newGroup) {
        console.log(`Edited: ${groupChatName}`);
      }

      setValidated(false);
    }
  };

  const inputRef = useRef();

  return (
    <>
      <span
        style={{ margin: "0.4em 0.2em 0em" }}
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group md="4" controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <div
                  className="cs-message-input__content-editor-wrapper"
                  style={{
                    height: "39.48px",
                    margin: "0.2em 0em",
                  }}
                >
                  <div
                    className="scrollbar-container cs-message-input__content-editor-container ps"
                    style={{
                      height: "20.3px",
                    }}
                  >
                    <Form.Control
                      required={true}
                      ref={inputRef}
                      type="text"
                      placeholder="Chat Name"
                      onChange={(e) => {
                        if (e.target) {
                          var name = e.target.value;
                        } else {
                          var name = e;
                        }
                        setNoName(false);
                        setGroupChatName(name);
                      }}
                      className="cs-message-input__content-editor"
                      value={groupChatName}
                      /* as={MessageInput}
                      sendButton={false}
                      attachButton={false} */
                      style={{
                        height: "20.3px",
                        boxShadow: "0 0",
                        backgroundColor: "transparent",
                        /* flexGrow: 1,
                        flexShrink: "initial",
                        display: "flex",
                        flexDirection: "row",
                        margin: "0.2em 0em", */
                      }}
                    />
                  </div>
                </div>
                {noName && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      display: "block",
                      margin: "-0.2em 0.8em .5em",
                    }}
                  >
                    Please choose a group name.
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
            {selectedUsers.length ? (
              <div style={{ margin: "0.3em" }}>
                {selectedUsers.map((user) => {
                  const _id = user._id;
                  return (
                    <Btn
                      key={_id}
                      className="cs-button cs-button--border"
                      onClick={() => {
                        const newUsers = selectedUsers.filter((u) => {
                          console.log("id", u._id, _id);
                          return u._id !== _id;
                        });
                        console.log(newUsers);
                        setSelectedUsers(newUsers);
                      }}
                      style={{
                        opacity: "1",
                        backgroundColor: "transparent",
                        color: "#6ea9d7",
                        borderColor: "#6ea9d7",
                        margin: "0.1em",
                        justifyContent: "start",
                        display: "inline-flex",
                      }}
                    >
                      {user.username}
                      <Badge
                        pill
                        bg="danger"
                        className="selectedUsers"
                        style={{
                          fontSize: "0.5em",
                          marginLeft: "0.4em",
                          marginBlockStart: "0.8em",
                        }}
                      >
                        X
                      </Badge>
                    </Btn>
                  );
                })}
              </div>
            ) : (
              <>
                {validated && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      display: "block",
                      margin: "-0.2em 0.8em .5em",
                    }}
                  >
                    Please select at least one user.
                  </Form.Control.Feedback>
                )}
              </>
            )}
            <Form.Group md="4" controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <Form.Control
                  required={true}
                  as={Search}
                  placeholder="Search users"
                  value={search}
                  onChange={(v) => setSearch(v)}
                  onClearClick={() => setSearch("")}
                  style={{
                    flexGrow: 1,
                    flexShrink: "initial",
                  }}
                />
              </InputGroup>
            </Form.Group>
            {userData && (
              <>
                {userLoading ? (
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
                          onClick={() => {
                            const newUser = {
                              _id: user._id,
                              username: user.username,
                            };
                            console.log(
                              newUser,
                              selectedUsers
                                .map((u) => u._id)
                                .includes(newUser._id)
                            );
                            if (
                              !selectedUsers
                                .map((u) => u._id)
                                .includes(newUser._id)
                            ) {
                              setSelectedUsers([...selectedUsers, newUser]);
                            }
                          }}
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

export default CreateGroup;
