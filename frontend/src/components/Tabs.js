import React, { useState } from "react";
import "./Tabs.css";
import "./GenerationForm.js";
import GenerationForm from "./GenerationForm.js";
import TabContext from "../TabContext";
import { useContext } from "react";

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const { page } = useContext(TabContext);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <React.Fragment>
      <div className="configuration-container" style={{display: page === "configuration-container" ? 'flex' : 'none' }}>
        {/* <div className="bloc-tabs">
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
        </div> */}

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <GenerationForm key = {0}></GenerationForm>
            <div></div>
          </div>
          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <div></div>
          </div>
        </div>
      </div>
      <div className="configuration1-container" style={{display: page === "configuration1-container" ? 'flex' : 'none' }}>
      {/* <div className="bloc-tabs">
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
      </div> */}

      <div className="content-tabs">
        <div
          className={
            toggleState === 1 ? "content  active-content" : "content"
          }
        >
          <GenerationForm key = {1}></GenerationForm>
          <div></div>
        </div>
        <div
          className={
            toggleState === 2 ? "content  active-content" : "content"
          }
        >
          <div></div>
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
