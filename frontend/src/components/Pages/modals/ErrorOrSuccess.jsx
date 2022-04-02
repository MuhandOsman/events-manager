import React, { useContext } from "react";
import { Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import MyContext from "../../../context/MyContext";

const ErrorOrSuccess = () => {
  const store = useContext(MyContext);
  const { errorOrSuccess, setErrorOrSuccess,error,setError } = store;
  return (
    <div>
      <Modal
        isOpen={errorOrSuccess}
        backdrop={false}
        centered
        fullscreen="sm"
        size="md"
        toggle={() => setErrorOrSuccess(false)}
      >
        {/* <ModalHeader toggle={()=>setErrorOrSuccess(false)}>Modal title</ModalHeader> */}
        <ModalBody>{error ? <span style={{color: "red"}}>{error}</span>  : <span style={{color: 'green'}}>your information successfully added to this event</span>  }</ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={function noRefCheck() {}}>
            Do Something
          </Button>{" "} */}
          <Button className="custom-btn btn-7 btn-red" onClick={()=>{
              setErrorOrSuccess(false)
              setError(null)
              }}><span>OK</span></Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ErrorOrSuccess;
