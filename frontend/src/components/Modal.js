import React, { useContext } from "react";
import "./Modal.css";
import ModalContext from "../ModalContext";

const Modal = (props) => {
  const modalNum = props.modalNum;
  const { setModalOpen } = useContext(ModalContext);
  const { setModal2Open } = useContext(ModalContext);

  const updateModalOpen = (e, bool, num) => {
    e.preventDefault();
    if (num == 0) {
      if (bool) {
        setModalOpen("modalOpen");
      } else {
        setModalOpen("modalClosed");
      }
    } else {
      if (bool) {
        setModal2Open("modal2Open");
      } else {
        setModal2Open("modal2Closed");
      }
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className = "top">
        <div className="titleCloseBtn">
          <button
            onClick={(e) => {
              updateModalOpen(e, false, modalNum);
            }}
          >
            &times;
          </button>
        </div>
        <div className="title">
          <h1>Stream Manager Port {modalNum} </h1>
        </div>
        </div>
        <div className = "modalButtons">
        <button> Add Stream </button>
        <button> Edit Stream </button>
        <button> Duplicate Stream </button>
        <button> Delete Stream </button>
        </div>
        {/* <div className="footer">
          <button43
            onClick={(e) => {
                updateModelOpen(e, false)
            }}
            id="cancelBtn"
          >
            Exit
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
