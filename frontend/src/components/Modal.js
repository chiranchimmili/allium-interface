import React, { useContext, useState } from "react";
import "./Modal.css";
import ModalContext from "../ModalContext";
import ModalRow from "./ModalRow";

const Modal = (props) => {
  const modalNum = props.modalNum;
  const { setModalOpen, setModal2Open, setRowsData, rowsData, setRowsData2, 
    rowsData2, selectedRow, setSelectedRow, selectedRow2, setSelectedRow2 } = useContext(ModalContext);

  const updateModalOpen = (e, bool, num) => {
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

  const addTableRows = (num) => {
      const rowsInput = {
          name:'New Stream',
          type:'Generation',
          mode:'Continuous'  
      } 
      if (num == 0) {
        setRowsData([...rowsData, rowsInput])
        setSelectedRow(rowsData.length)
      } else {
        setRowsData2([...rowsData2, rowsInput])
        setSelectedRow2(rowsData2.length)
      }
    }
  const deleteTableRows = (index, num) => {
    if (num == 0) {
      const rows = [...rowsData];
      rows.splice(index, 1);
      setRowsData(rows);
      setSelectedRow(null)
    }
     else {
      const rows = [...rowsData2];
      rows.splice(index, 1);
      setRowsData2(rows);
      setSelectedRow2(null)
     }
   }
 
   const handleChange = (index, e, num)=> {
    const { name, value } = e.target;
    if (num == 0) {
      const rowsInput = [...rowsData];
      rowsInput[index][name] = value;
      setRowsData(rowsInput);
    }
     else {
      const rowsInput = [...rowsData2];
      rowsInput[index][name] = value;
      setRowsData2(rowsInput);
     }
   }

   const editStream = (e, num) => {
    if (num == 0) {
      if (selectedRow == null) {
        return
      }     }
     else {
    if (selectedRow2 == null) {
      return
    } 
   }
   updateModalOpen(e, false, num)
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="top">
          <div className="titleCloseBtn">
            <button
              onClick={(e) => {
                updateModalOpen(e, false, modalNum);
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
          <div className="title">
            <h1>Stream Manager Port {modalNum} </h1>
          </div>
        </div>
        <div className="not-title">
          <div className="modalButtons">
            <div>
              <button onClick={(e) => {addTableRows(modalNum)}}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>{" "}
              </button>{" "}
              <span> Add Stream </span>{" "}
            </div>
            <div>
              <button onClick={(e) => {editStream(e, modalNum)}}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>{" "}
              </button>{" "}
              <span> Edit Stream </span>{" "}
            </div>
            <div>
              <button>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-files"
                  viewBox="0 0 16 16"
                >
                  <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                </svg>{" "}
              </button>{" "}
              <span> Duplicate Stream </span>{" "}
            </div>
            <div>
              <button  onClick={(e) => {deleteTableRows(selectedRow, modalNum)}}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>{" "}
              </button>{" "}
              <span> Delete Stream </span>{" "}
            </div>
          </div>
          <div className = "table-headers">
            <div>
              Name
            </div>
            <div>
              Type
            </div>
            <div>
              Mode
            </div>
          </div>
            <div className="stream-list">
            <tbody>
              <ModalRow rowsData2 = {rowsData2} rowsData = {rowsData} handleChange = {handleChange} modalNum = {modalNum}
              selectedRow = {selectedRow} setSelectedRow = {setSelectedRow} selectedRow2 = {selectedRow2} setSelectedRow2 = {setSelectedRow2}></ModalRow> 
            </tbody>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
