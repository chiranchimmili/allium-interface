import React, { useState } from "react";
import "./Tabs.css";
import "./GenerationForm.js";
import GenerationForm from "./GenerationForm.js";
import TabContext from "../TabContext";
import { useContext } from "react";
import VerificationForm from "./VerificationForm";
import GenerationResults from "./GenerationResults"

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [toggleState1, setToggleState1] = useState(3);
  const [toggleState2, setToggleState2] = useState(5);

  const { page } = useContext(TabContext);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const toggleTab1 = (index) => {
    setToggleState1(index);
  };
  const toggleTab2 = (index) => {
    setToggleState2(index);
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
            onClick={() => toggleTab(1)}
          >
            Generation
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Verification
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <GenerationForm key={0} keyProp={0}></GenerationForm>
            <div></div>
          </div>
          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <VerificationForm key={0} keyProp={0}></VerificationForm>
            <div></div>
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
            onClick={() => toggleTab1(3)}
          >
            Generation
          </button>
          <button
            className={toggleState1 === 4 ? "tabs1 active-tabs1" : "tabs1"}
            onClick={() => toggleTab1(4)}
          >
            Verification
          </button>
        </div>

        <div className="content-tabs1">
          <div
            className={
              toggleState1 === 3 ? "content1  active-content1" : "content1"
            }
          >
            <GenerationForm key={1} keyProp={1}></GenerationForm>
            <div></div>
          </div>
          <div
            className={
              toggleState1 === 4 ? "content1  active-content1" : "content1"
            }
          >
            <VerificationForm key={1} keyProp={1}></VerificationForm>
            <div></div>
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
            <GenerationResults></GenerationResults>
            <div></div>
          </div>
          <div
            className={
              toggleState2 === 6 ? "content2  active-content2" : "content2"
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
