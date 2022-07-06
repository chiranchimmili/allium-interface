import { useState } from "react";
import "./Tabs.css";
import "./GenerationForm.js"
import GenerationForm from "./GenerationForm.js";
import VerificationForm from "./VerificationForm";

const Tabs = () =>  {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
      <div className="tabs-container">
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
            Validation
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <GenerationForm></GenerationForm>
            <div></div>
          </div>
          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <VerificationForm></VerificationForm>
            <div></div>
          </div>
        </div>
      </div>
  );
}

export default Tabs;
