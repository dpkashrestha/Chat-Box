import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Button } from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const CreateModal = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button border onClick={handleClose}>
            Close
          </Button>
          <Button border onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateModal;
