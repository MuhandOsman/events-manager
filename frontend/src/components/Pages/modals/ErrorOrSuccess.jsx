import React, { useContext } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MyContext from "../../../context/MyContext";

const ErrorOrSuccess = () => {
  const store = useContext(MyContext);
  const { errorOrSuccess, setErrorOrSuccess } = store;
  return (
    <div>
      <Modal
        isOpen={errorOrSuccess}
        centered
        fullscreen="sm"
        size="md"
        toggle={() => setErrorOrSuccess(false)}
      >
        <ModalHeader toggle={()=>setErrorOrSuccess(false)}>Modal title</ModalHeader>
        <ModalBody>You are already registered to this event!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck() {}}>
            Do Something
          </Button>{" "}
          <Button onClick={function noRefCheck() {}}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ErrorOrSuccess;
