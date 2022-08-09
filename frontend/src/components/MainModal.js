import { useContext } from "react";
import ModalContext from "../ModalContext";
import "./MainModal.css";
import MainModalRow from "./MainModalRow";
import axios from "axios";

const MainModal = ({ setOpenModal }) => {
  const {
    rowsData,
    rowsData2,
    selectedRows,
    setSelectedRows,
    updateSelectedRows,
    containsIndex,
  } = useContext(ModalContext);

  const startTests = (indices, rows) => {
    let output_console = document.querySelector(".console");
    axios
      .post("/start", [indices, rows])
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleStartTests = (e, indices, rows) => {
    e.preventDefault();
    console.log("eeee");
    let output_console = document.querySelector(".console");
    let row = document.createElement("tr");
    let title = document.createElement("th");
    title.innerHTML = "Info";
    let time = document.createElement("th");
    time.innerHTML = new Date().toLocaleTimeString("en-GB");
    let desc = document.createElement("th");
    desc.innerHTML = "Starting tests...";
    row.appendChild(title);
    row.appendChild(time);
    row.appendChild(desc);
    row.style.color = "#09aad3";
    output_console.appendChild(row);
    output_console.scrollTop = output_console.scrollHeight;
    setOpenModal(false);

    startTests(indices, rows);
  };

  return (
    <div className="mainModalBackground">
      <div className="mainModalContainer">
        <div className="mainTop">
          <div className="mainTitleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
          <div className="main-title">
            <h1>Test Center </h1>
          </div>
        </div>
        <div className="main-not-title">
          <div className="main-table-headers">
            <div>Index</div>
            <div>Port</div>
            <div>Name</div>
            <div>Type</div>
            <div>Mode</div>
            <div>Next Stream</div>
          </div>
          <div className="main-stream-list">
            <tbody>
              <MainModalRow
                rowsData2={rowsData2}
                rowsData={rowsData}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                updateSelectedRows={updateSelectedRows}
                containsIndex={containsIndex}
              ></MainModalRow>
            </tbody>
          </div>
        </div>
        <div className="main-footer">
          <button
            onClick={(e) => {
              handleStartTests(e, selectedRows, [...rowsData, ...rowsData2]);
            }}
          >
            {" "}
            Start Tests{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainModal;
