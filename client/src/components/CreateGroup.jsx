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

import { useState, useRef, useEffect, createRef } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { ADD_CHAT, EDIT_CHAT } from "../utils/mutations";
import Auth from "../utils/auth";

const CreateGroup = ({ onCreate, onEdit, newGroup, activeChat, children }) => {
  const currentUser = Auth.getCurrentUser();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(true);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [validated, setValidated] = useState(false);
  const [noName, setNoName] = useState(false);
  const [noUsers, setNoUsers] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [searchUsers, { loading: userLoading, data: userData }] = useLazyQuery(
    QUERY_USERS,
    {
      onCompleted: (d) => {
        setSearchResult(d.users);
        console.log("searchUsers", d);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );
  /* const [createChat, { loading: chatLoading }] = useMutation(ADD_CHAT, {
    onCompleted: (d) => {
      const newChat = { ...d.addChat };
      delete newChat["__typename"];
      console.log("createChat Data:", d);
      console.log("New Chat:", newChat);
    },
  }); */
  /* const [editChat, { loading: editLoading }] = useMutation(EDIT_CHAT, {
    onCompleted: (d) => {
      const chat = d.editChat;
      handleConversationOnClick(chat);
      console.log("Created:", chat);
    },
  }); */

  useEffect(() => {
    /* if (!search) {
      setSearchResult([]);
      return;
    } */
    console.log("search:", search);
    searchUsers({ variables: { userSearch: search } });
    console.log("searchResult:", searchResult);
  }, [search]);
  useEffect(() => {
    if (show) {
      if (!newGroup) {
        if (activeChat.groupAdmin._id === currentUser._id) {
          setIsAdmin(true);
          console.log("Editing:", activeChat);
          const admin = activeChat.groupAdmin;
          setSelectedUsers([
            ...activeChat.users.filter((user) => user._id !== admin._id),
          ]);
          setGroupChatName(activeChat.chatName);
          setValidated(true);
        } else {
          setIsAdmin(false);
          console.log("Not Admin");
        }
      }
    } else {
      setNoName(false);
      setNoUsers(false);
      setSearch("");
      setGroupChatName("");
      setSelectedUsers([]);
      setSearchFocus(true);
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    setShow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(form.checkValidity());
    if (!groupChatName) {
      e.stopPropagation();
      console.log("No Name");
      setNoName(true);
    }
    if (!selectedUsers.length) {
      e.stopPropagation();
      console.log("No Users");
      setNoUsers(true);
    }
    console.log(
      "validated",
      form.checkValidity(),
      "!noUsers",
      Boolean(selectedUsers.length),
      "!noName",
      Boolean(groupChatName)
    );
    if (form.checkValidity() && selectedUsers.length && groupChatName) {
      if (newGroup) {
        const userIds = selectedUsers.map((u) => {
          return { _id: u._id };
        });
        onCreate(() => {
          console.log("Creating:", groupChatName);
          return { variables: { chatName: groupChatName, users: userIds } };
        });
        handleClose();
      } else if (!newGroup) {
        const userIds = selectedUsers.map((u) => {
          return { _id: u._id };
        });
        onEdit(() => {
          return {
            variables: {
              chatId: activeChat._id,
              chatName: groupChatName,
              users: userIds,
            },
          };
        });
        handleClose();
      }

      setValidated(true);
    }
  };
  const handleDelete = () => {
    onEdit(() => {
      // console.log("Deleting:", activeChat.chatName);
      return {
        variables: {
          chatId: activeChat._id,
          chatName: activeChat.chatName,
          users: [],
        },
      };
    });
    handleClose();
  };

  const inputRef = useRef();
  const searchRef = useRef();
  // console.log("searchRef", searchRef);

  return (
    <>
      <span
        style={{ margin: "0.4em 0.2em 0em" }}
        id="newGroup"
        onClick={handleShow}
      >
        {children}
      </span>

      {isAdmin || newGroup ? (
        <Modal show={show} onHide={handleClose} centered animation={true}>
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
                        autoFocus
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
                        margin: "-0.1em 0.8em .3em",
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
                    console.log("selectedUsers", selectedUsers);
                    const _id = user._id;
                    return (
                      <Btn
                        key={_id}
                        className="cs-button cs-button--border"
                        onClick={() => {
                          const newUsers = selectedUsers.filter((u) => {
                            return u._id !== _id;
                          });
                          console.log("newUsers", newUsers);
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
                  {noUsers && (
                    <Form.Control.Feedback
                      type="invalid"
                      style={{
                        display: "block",
                        margin: "-0.2em 0.8em .3em",
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
                    ref={searchRef}
                    as={Search}
                    placeholder="Search users"
                    value={search}
                    onChange={(v) => setSearch(v)}
                    onFocus={() => setSearchFocus(true)}
                    onClearClick={() => {
                      setSearchFocus(false);
                      setSearch("");
                    }}
                    style={{
                      flexGrow: 1,
                      flexShrink: "initial",
                    }}
                  />
                </InputGroup>
              </Form.Group>
              {(search || searchFocus) && (
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
                      {searchResult
                        .filter((usr) => {
                          return !selectedUsers
                            .map((u) => u._id)
                            .includes(usr._id);
                        })
                        .map((user) => {
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
                                  setSearch("");
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
                <Button border type="submit" className="btn btn-primary">
                  Create Group
                </Button>
              ) : (
                <>
                  <Button
                    className="btn btn-danger"
                    border
                    onClick={handleDelete}
                  >
                    Delete Group
                  </Button>
                  <Button border type="submit" className="btn btn-primary">
                    Save Changes
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose} centered animation={true}>
          <Modal.Header closeButton>
            <Modal.Title style={{ marginLeft: "auto" }}>
              Not Authorized
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are not authorized to edit this chat.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" border onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CreateGroup;
