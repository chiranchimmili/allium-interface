import React, { useState, useRef } from "react";
import "./Tabs.css";
import "./GenerationForm.js";
import GenerationForm from "./GenerationForm.js";
import TabContext from "../TabContext";
import { useContext } from "react";
import VerificationForm from "./VerificationForm";
import GenerationResults from "./GenerationResults"
import ModalContext from "../ModalContext";
import Modal from "./Modal";

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [toggleState1, setToggleState1] = useState(3);
  const [toggleState2, setToggleState2] = useState(5);
  const [toggleState3, setToggleState3] = useState(7);


  const { page } = useContext(TabContext);
  const { modalOpen, setModalOpen} = useContext(ModalContext)
  const { modal2Open, setModal2Open } = useContext(ModalContext)
  const oldTab = useRef(0);
  const oldTab1 = useRef(0);
  const oldTab2 = useRef(0);
  const oldTab3 = useRef(0);

  const toggleTab = (index) => {
    oldTab.current = toggleState;
    setToggleState(index);
  };
  const toggleTab1 = (index) => {
    oldTab1.current = toggleState1;
    setToggleState1(index);
  };
  const toggleTab2 = (index) => {
    oldTab2.current = toggleState2;
    setToggleState2(index);
  };
  const toggleTab3 = (index) => {
    oldTab3.current = toggleState3;
    setToggleState3(index);
  };

  const updateModalOpen = (e, bool, num, index) => {
    e.preventDefault();
    if (oldTab.current == index || oldTab1.current == index || oldTab2.current == index || oldTab3 == index) {
      return;
    }
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
    <React.Fragment>
      <div
        className="configuration-container"
        style={{
          display: page === "configuration-container" ? "flex" : "none",
        }}
      >
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={(e) => [toggleTab(1), updateModalOpen(e, false, 0, 1)]}
          >
            Generation
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={(e) => [toggleTab(2), updateModalOpen(e, false, 0, 2)]}
          >
            Verification
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content active-content" : "content"
            }
          >
            <GenerationForm key={0} keyProp={0}></GenerationForm>
            {modalOpen === "modalOpen" && <Modal key = {0} modalNum = {0}/>}
          </div>
          <div
            className={
              toggleState === 2 ? "content active-content" : "content"
            }
          >
            <VerificationForm key={0} keyProp={0}></VerificationForm>
            {modalOpen === "modalOpen" && <Modal key = {0} modalNum = {0}/>}
          </div>
        </div>
      </div>
      <div
        className="configuration1-container"
        style={{
          display: page === "configuration1-container" ? "flex" : "none",
        }}
      >
        <div className="bloc-tabs1">
          <button
            className={toggleState1 === 3 ? "tabs1 active-tabs1" : "tabs1"}
            onClick={(e) => [toggleTab1(3), updateModalOpen(e, false, 1, 3)]}
          >
            Generation
          </button>
          <button
            className={toggleState1 === 4 ? "tabs1 active-tabs1" : "tabs1"}
            onClick={(e) => [toggleTab1(4), updateModalOpen(e, false, 1, 4)]}
          >
            Verification
          </button>
        </div>

        <div className="content-tabs1">
          <div
            className={
              toggleState1 === 3 ? "content1 active-content1" : "content1"
            }
          >
            <GenerationForm key={1} keyProp={1}></GenerationForm>
            {modal2Open === "modal2Open" && <Modal key = {1} modalNum = {1}/>}
          </div>
          <div
            className={
              toggleState1 === 4 ? "content1 active-content1" : "content1"
            }
          >
            <VerificationForm key={1} keyProp={1}></VerificationForm>
            {modal2Open === "modal2Open" && <Modal key = {1} modalNum = {1}/>}
          </div>
        </div>
      </div>
      <div
        className="results-container"
        style={{
          display: page === "results-container" ? "flex" : "none",
        }}
      >
        <div className="bloc-tabs2">
          <button
            className={toggleState2 === 5 ? "tabs2 active-tabs2" : "tabs2"}
            onClick={() => toggleTab2(5)}
          >
            Generation
          </button>
          <button
            className={toggleState2 === 6 ? "tabs2 active-tabs2" : "tabs2"}
            onClick={() => toggleTab2(6)}
          >
            Verification
          </button>
        </div>

        <div className="content-tabs2">
          <div
            className={
              toggleState2 === 5 ? "content2 active-content2" : "content2"
            }
            
          >
            <GenerationResults key = {0}></GenerationResults>
            <div></div>
          </div>
          <div
            className={
              toggleState2 === 6 ? "content2 active-content2" : "content2"
            }
          >
          </div>
        </div>
      </div>
      <div
        className="results1-container"
        style={{
          display: page === "results1-container" ? "flex" : "none",
        }}
      >
        <div className="bloc-tabs3">
          <button
            className={toggleState3 === 7 ? "tabs3 active-tabs3" : "tabs3"}
            onClick={() => toggleTab3(7)}
          >
            Generation
          </button>
          <button
            className={toggleState3 === 8 ? "tabs3 active-tabs3" : "tabs3"}
            onClick={() => toggleTab3(8)}
          >
            Verification
          </button>
        </div>

        <div className="content-tabs3">
          <div
            className={
              toggleState3 === 7 ? "content3 active-content3" : "content3"
            }
          >
            <GenerationResults key = {1}></GenerationResults>
            <div></div>
          </div>
          <div
            className={
              toggleState3 === 8 ? "content3 active-content3" : "content3"
            }
          >
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  // else if (page === "configuration1-container") {
  //   return (
  //     <div className="configuration1-container">
  //       {/* <div className="bloc-tabs">
  //         <button
  //           className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
  //           onClick={() => toggleTab(1)}
  //         >
  //           Generation
  //         </button>
  //         <button
  //           className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
  //           onClick={() => toggleTab(2)}
  //         >
  //           Verification
  //         </button>
  //       </div> */}

  //       <div className="content-tabs">
  //         <div
  //           className={
  //             toggleState === 1 ? "content  active-content" : "content"
  //           }
  //         >
  //           <GenerationForm key = {1}></GenerationForm>
  //           <div></div>
  //         </div>
  //         <div
  //           className={
  //             toggleState === 2 ? "content  active-content" : "content"
  //           }
  //         >
  //           <div></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  //         }

  // else  {
  //   return (
  //     <div className="empty-container">

  //     </div>
  //   )
  // }
};

export default Tabs;
