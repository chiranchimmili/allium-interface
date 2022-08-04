import { useContext, useRef, useState } from "react";
import axios from "axios";
import "./Console.js";
import "./Form.css";
import "./GenerationForm.css";
import ModalContext from "../ModalContext.js";

const GenerationForm = (props) => {
  const formPort = props.keyProp;
  const { modalOpen,
    setModalOpen, port, setPort,
    modal2Open, streamName, updateStreamName,
    setModal2Open,
    rowsData,
    setRowsData,
    rowsData2,
    setRowsData2,
    selectedRow,
    setSelectedRow,
    selectedRow2,
    setSelectedRow2,
    selectedRows,
    setSelectedRows,
    updateSelectedRows,
    containsIndex, updateType, BERTPattern, updateBERTPattern,
    testType, mode, updateMode, packetCount, updatePacketCount, burstLength, updateBurstLength
    , speed, updateSpeed, IPG, updateIPG, IBG, updateIBG, ISG, updateISG, ISGUnit, updateISGUnit, IBGUnit, updateIBGUnit, IPGUnit, updateIPGUnit,
    macDa, updateMacDa, macSa, updateMacSa, vlan, updateVlan, vlanEn, updateVlanEn,
    ethType, updateEthType, ipv4, updateIpv4, ipv4Da, updateIpv4Da, ipv4Sa, updateIpv4Sa, version, updateVersion, dscp, updateDscp, identification, updateIdentification, flags, updateFlags,
    timetolive, updateTimetolive, protocol, updateProtocol, ipv4Length, udp, updateUdp, udpDa, updateUdpDa, udpSa, updateUdpSa, udpLength, payload, updatePayload, payloadLength, updatePayloadLength, payloadPattern, updatePayloadPattern, calculateIpv4Length, calculateUdpLength, updateLengths } = useContext(ModalContext)

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


  const sendData = (form) => {
    let output_console = document.querySelector(".console");
    axios
      .post("/", form)
      .then(function (response) {
        let row = document.createElement("tr");
        let title = document.createElement("th");
        title.innerHTML = "Event";
        let time = document.createElement("th");
        time.innerHTML = new Date().toLocaleTimeString("en-GB");
        let desc = document.createElement("th");
        desc.innerHTML = response.data;
        row.appendChild(title);
        row.appendChild(time);
        row.appendChild(desc);
        row.style.color = "#0ac73a";
        output_console.appendChild(row);
        output_console.scrollTop = output_console.scrollHeight;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSave = (e) => {
    let output_console = document.querySelector(".console");
    e.preventDefault();
    let row = document.createElement("tr");
    let title = document.createElement("th");
    title.innerHTML = "Info";
    let time = document.createElement("th");
    time.innerHTML = new Date().toLocaleTimeString("en-GB");
    let desc = document.createElement("th");
    desc.innerHTML = "Saving configuration...";
    row.appendChild(title);
    row.appendChild(time);
    row.appendChild(desc);
    row.style.color = "#09aad3";
    output_console.appendChild(row);
    const generationForm = {
      port: port,
      type: testType,
      mode: mode,
      count: packetCount,
      length: burstLength,
      speed: speed,
      ipg: IPG,
      ibg: IBG,
    };
    output_console.scrollTop = output_console.scrollHeight;
    sendData(generationForm);
  };

  return (
    <div className="inputs">
      <header className="stream-properties"> Stream Properties </header>
      <form id="gen-form-1">
        <header> Mode: </header>
        <section className="radio-section">
          <div className="radio-list">
            <div className="radio-item">
              <input
                type="radio"
                name="radio"
                id="radio1"
                value="Continuous"
                checked={port === 0 ? (rowsData[selectedRow] ? rowsData[selectedRow].mode === "Continuous" : false) : rowsData2[selectedRow2] ? rowsData2[selectedRow2].mode === "Continuous": true}
                onChange={(e) => updateMode(e.currentTarget.value, formPort)}
              />
              <label htmlFor="radio1" id="radio1">
                Continuous
              </label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                name="radio"
                id="radio2"
                value="Fixed"
                checked={port === 0 ? (rowsData[selectedRow] ? rowsData[selectedRow].mode === "Fixed" : false) : rowsData2[selectedRow2] ? rowsData2[selectedRow2].mode === "Fixed": false}
                onChange={(e) => updateMode(e.currentTarget.value, formPort)}
              />
              <label htmlFor="radio2" id="radio2">
                Fixed
              </label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                name="radio"
                id="radio3"
                value="Fixed-Burst"
                checked={port === 0 ? (rowsData[selectedRow] ? rowsData[selectedRow].mode === "Fixed-Burst" : false) : rowsData2[selectedRow2] ? rowsData2[selectedRow2].mode === "Fixed-Burst": false}
                onChange={(e) => updateMode(e.currentTarget.value, formPort)}
              />
              <label htmlFor="radio3" id="radio3">
                Fixed-Burst
              </label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                name="radio"
                id="radio4"
                value="Continuous-Burst"
                checked={port === 0 ? (rowsData[selectedRow] ? rowsData[selectedRow].mode === "Continuous-Burst" : false) : rowsData2[selectedRow2] ? rowsData2[selectedRow2].mode === "Continuous-Burst": false}
                onChange={(e) => updateMode(e.currentTarget.value, formPort)}
              />
              <label htmlFor="radio4" id="radio4">
                Continuous-Burst
              </label>
            </div>
          </div>
        </section>
      </form>
      <form id="gen-form-2">
        <label>Number of Packets:</label>
        <input
          type="text"
          required
          value={ mode == "Continuous" || mode == "Continuous-Burst" ? "N/A" : packetCount }
          disabled={mode === "Continuous" || mode === "Continuous-Burst"}
          onChange={(e) => updatePacketCount(e.target.value, formPort)}
        />
        <label>Packets per Burst:</label>
        <input
          required
          value={
            mode === "Continuous-Burst" || mode === "Fixed-Burst"
              ? burstLength
              : "N/A"
          }
          disabled={mode === "Continuous" || mode === "Fixed"}
          onChange={(e) => updateBurstLength(e.target.value, formPort)}
        ></input>
        <label>Transmission Speed (Mb/s):</label>
        <input
          required
          value={speed}
          //disabled={mode === "Continuous" || mode === "Fixed"}
          placeholder = "1.0 - 1000.0 Mb/s (or %)"
          onChange={(e) => updateSpeed(e.target.value, formPort)}
        ></input>
      </form>
      <form id="gen-form-3">
        <div className="gen-form-3-content">
          <button
            className="openModalBtn"
            onClick={(e) => {
              updateModalOpen(e, true, formPort);
            }}
          >
            Stream Manager
          </button>
          <label for="name">Name:</label>
        <input
          type="text"
          // required
          value={streamName}
          onChange={(e) => updateStreamName(e.target.value, formPort)}
        />
        {/* <label for="Type">Type:</label>
        <select>
          <option value="Generation">
            Generation
          </option>
          <option value="Verification">Verification</option>
          </select> */}
          {/* {modalOpen && <Modal setOpenModal={updateModalOpen} />} */}
      
        <label> Test Type: </label>
        <section className="radio-sectiont">
          <div className="radio-listt">
            <div className="radio-itemt">
              <input
                type="radio"
                name="radiot"
                id="radio1t"
                value="Generation"
                checked={testType === "Generation"}
                onChange={(e) => updateType(e.currentTarget.value, formPort)}
              />
              <label htmlFor="radio1t" id="radio1t">
                Generation
              </label>
            </div>
            <div className="radio-itemt">
              <input
                type="radio"
                name="radiot"
                id="radio2t"
                value="Verification"
                checked={testType === "Verification"}
                onChange={(e) => updateType(e.currentTarget.value, formPort)}
              />
              <label htmlFor="radio2t" id="radio2t">
                Verification
              </label>
            </div>
          </div>
        </section>
        </div>
      </form>
      <form className="gaps" id="gaps-form">
        <div id="diagram">
          <span>ISG</span> <span>PKT1</span> <span>IPG</span> <span>PKT2</span>{" "}
          <span>IBG</span>
          <span>PKT1</span> <span> IPG</span> <span>PKT2</span>
        </div>
        <div className="gaps-inputs">
          <div className="interstart">
            <label>Inter-start Gap (ISG)</label>
            <div className="ipbg">
              <input
                type="text"
                value={ISG}
                onChange={(e) => updateISG(e.target.value, formPort)}
              />
              <span className="ms">
                <select value={ISGUnit} onChange={(e) => updateISGUnit(e.target.value, formPort)}>
          <option value="ms">
            ms
          </option>
          <option value="us">
            μs
          </option>
          <option value="ns">
            ns
          </option>
          <option value="ps">
            ps
          </option>
          <option value="bit">
            bit times
          </option>
        </select>
              </span>
            </div>
          </div>
          <div className="interpacket">
            <label>Inter-packet Gap (IPG)</label>
            <div className="ipbg">
              <input
                type="text"
                value={IPG}
                onChange={(e) => updateIPG(e.target.value, formPort)}
              />
              <span className="ms">
                <select value={IPGUnit} onChange={(e) => updateIPGUnit(e.target.value, formPort)}>
          <option value="ms">
            ms
          </option>
          <option value="us">
            μs
          </option>
          <option value="ns">
            ns
          </option>
          <option value="ps">
            ps
          </option>
          <option value="bit">
            bit times
          </option>
        </select>
              </span>
            </div>
          </div>
          <div className="interburst">
            <label>Inter-burst Gap (IBG) </label>
            <div className="ipbg">
              <input
                type="text"
                value={mode === "Continuous" || mode === "Fixed" ? "0" : IBG}
                disabled={mode === "Continuous" || mode === "Fixed"}
                onChange={(e) => updateIBG(e.target.value, formPort)}
              />
              <span className="ms">
                <select value={IBGUnit}                 disabled={mode === "Continuous" || mode === "Fixed"}
onChange={(e) => updateIBGUnit(e.target.value, formPort)}>
          <option value="ms">
            ms
          </option>
          <option value="us">
            μs
          </option>
          <option value="ns">
            ns
          </option>
          <option value="ps">
            ps
          </option>
          <option value="bit">
            bit times
          </option>
        </select>
              </span>
            </div>
          </div>
        </div>
      </form>
      <button id="save-button" onClick={handleSave}>
        Save
      </button>
      <header className="header-properties">Packet Properties</header>
      <form id="gen-form-4">
        <div class="group">
          <label for="mac-enable">MAC</label>
          {/* <input
            type="checkbox"
            id="mac-enable"
            onChange={(e) => macEn(e.target.checked)}
          /> */}
        </div>
        <div class="inner-group">
          <label for="mac-da">Destination Address</label>

        </div>
        <input
          type="text"
          // required
          value={macDa}
          onChange={(e) => updateMacDa(e.target.value, formPort)}
        />
        <div class="inner-group">

        </div>
        <input
          // required
          // value={burstLength}
          value={macSa}
          onChange={(e) => updateMacSa(e.target.value, formPort)}
        ></input>
        <div class="inner-group">
          <label for="vlan">VLAN-Tag</label>
          <input
            type="checkbox"
            id="vlan"
            onChange={(e) => updateVlanEn(e.currentTarget.checked, formPort)}
            checked = {vlanEn}
          />
        </div>
        <input
          disabled={vlanEn === false}
          value={vlanEn === false ? "N/A" : vlan}
          onChange={(e) => updateVlan(e.currentTarget.value, formPort)}
        ></input>

        <div class="inner-group">
          <label for="ethertype">Ethertype</label>

        </div>
        <input
          value={ethType}
          onChange={(e) => updateEthType(e.currentTarget.value, formPort)}
        ></input>
      </form>
      <form id="gen-form-5">
        <div class="group">
          <label for="ipv4-enable">IPv4</label>
          <input
            type="checkbox"
            id="ipv4-enable"
            checked={ipv4}
            onChange={(e) => [
              updateIpv4(e.target.checked, formPort),
              calculateIpv4Length(e.target.checked, 20),
            ]}
          />
        </div>
        <div>
          <div class="inner-group">
            <label for="version">Version & IHL</label>
   
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : version}
            onChange={(e) => updateVersion(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="dscp">DSCP & ECN</label>
     
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : dscp}
            onChange={(e) => updateDscp(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="identification">Identification</label>

          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : identification}
            onChange={(e) => updateIdentification(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="flags">Flags & Fragment Offset</label>

          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : flags}
            onChange={(e) => updateFlags(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="timetolive">Time to Live</label>
  
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : timetolive}
            onChange={(e) => updateTimetolive(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <header id="blank">Blank</header>
        </div>
        <div>
          <div class="inner-group">
            <label for="protocol">Protocol</label>
   
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : protocol}
            onChange={(e) => updateProtocol(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="da">Destination Address</label>

          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : ipv4Da}
            onChange={(e) => updateIpv4Da(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="sa">Source Address</label>
  
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : ipv4Sa}
            onChange={(e) => updateIpv4Sa(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="ip-length">Length</label>

          </div>
          <input
            disabled={true}
            value={ipv4 === true ? ipv4Length + " Bytes" : "0 Bytes"}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="checksum">Checksum</label>

          </div>
          <input disabled={true} value={"Auto-calculated"}></input>
        </div>
      </form>
      <form id="gen-form-6">
        <div class="group">
          <label for="udp-enable">UDP</label>
          <input
            type="checkbox"
            id="udp-enable"
            disabled={ipv4 === false}
            checked={ipv4 === false ? false : udp}
            onChange={(e) => [
              updateUdp(e.target.checked, formPort),
              calculateIpv4Length(e.target.checked, 8),
              calculateUdpLength(e.target.checked, 8),
            ]}
          />
        </div>
        <div class="inner-group">
          <label for="udp-da">Destination Address</label>

        </div>
        <input
          disabled={udp === false}
          value={udp === false ? "N/A" : udpDa}
          onChange={(e) => updateUdpDa(e.currentTarget.value, formPort)}
        ></input>
        <div class="inner-group">
          <label for="udp-sa">Source Address</label>
   
        </div>
        <input
          disabled={udp === false}
          value={udp === false ? "N/A" : udpSa}
          onChange={(e) => updateUdpSa(e.currentTarget.value, formPort)}
        ></input>
        <div>
          <div class="inner-group">
            <label for="udp-length">Length</label>

          </div>
          <input
            disabled={true}
            value={udp === true ? udpLength + " Bytes" : "0 Bytes"}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="udp-checksum">Checksum</label>

          </div>
          <input disabled={true} value={"Auto-calculated"}></input>
        </div>
      </form>
      <form id="gen-form-7">
        <header>Payload</header>
 
        <div>
          <label>Type</label>
          <select value={payload} onChange={(e) => updatePayload(e.target.value, formPort)}>
            <option value="None">None</option>
            <option value="Increment">Increment Byte</option>
            <option value="Decrement">Decrement Byte</option>
            <option value="Random">Random</option>
            <option value="BERT">BERT</option>
            <option value="Fixed">Fixed</option>
          </select>
        </div>
        <div class="inner-group">
          <label for="payload-length">Length</label>
        </div>
        <input
          disabled={payload === "None"}
          value={payload === "None" ? "N/A" : payloadLength}
          placeholder="0 - 9000 Bytes"
          type="number"
          onChange={(e) => [updatePayloadLength(e.currentTarget.value, formPort), updateLengths(e)]}
        ></input>
        <div
          style={{
            display: payload === "Fixed"? "block" : "none",
          }}
        >
          <div class="inner-group">
            <label for="payload-pattern">Pattern</label>
          </div>
          <input
            value={payloadPattern}
            placeholder="Enter 8 byte pattern"
            onChange={(e) => updatePayloadPattern(e.currentTarget.value, formPort)}
          ></input>
        </div>
        <div
          style={{
            visibility: payload === "BERT"? "visible" : "hidden",
          }}
        >
          <div class="inner-group">
            <label for="BERT-pattern">Pattern</label>
          </div>
          <select value={BERTPattern} onChange={(e) => updateBERTPattern(e.target.value, formPort)}>
          <option value="0">
            PRBS3
          </option>
          <option value="1">
          PRBS9
          </option>
          <option value="2">
          PRBS11
          </option>
          <option value="3">
          PRBS15
          </option>
          <option value="4">
          PRBS23
          </option>
          <option value="5">
          PRBS31
          </option>
          <option value="8">
            Ones
          </option>
          <option value="9">
            Zeroes
          </option>
        </select>
        </div>
      </form>
    </div>
  );
};

export default GenerationForm;
