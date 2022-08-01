import { useContext, useRef, useState } from "react";
import axios from "axios";
import "./Console.js";
import "./Form.css";
import "./GenerationForm.css";
import ModalContext from "../ModalContext.js";

const GenerationForm = (props) => {
  const port = props.keyProp;
  const [testType, setType] = useState("Generation")
  const [packetCount, setPacketCount] = useState("");
  const [burstLength, setBurstLength] = useState("");
  const [speed, setSpeed] = useState("1G");
  const [mode, setMode] = useState("Continuous");
  const [IPG, setIPG] = useState("0");
  const [IBG, setIBG] = useState("0");
  const [ISG, setISG] = useState("0");

  const [mac, macEn] = useState(true);
  const [macDa, setMacDa] = useState("");
  const [macSa, setMacSa] = useState("");
  const [vlan, setVlan] = useState("0x8100");
  const [vlanEn, setVlanEn] = useState(false);
  const [ethType, setEthType] = useState("0x0800");

  const [ipv4, ipv4En] = useState(false);
  const [version, setVersion] = useState("0x45");
  const [dscp, setDscp] = useState("0x00");
  const [identification, setIdentification] = useState("0x0000");
  const [flags, setFlags] = useState("0x4000");
  const [timetolive, setTimetolive] = useState("0x80");
  const [protocol, setProtocol] = useState("0x11");
  const [ipv4Da, setIpv4Da] = useState("");
  const [ipv4Sa, setIpv4Sa] = useState("");
  const [ipv4Length, setIpv4Length] = useState(0);

  const [udp, udpEn] = useState(false);
  const [udpDa, setUdpDa] = useState("");
  const [udpSa, setUdpSa] = useState("");
  const [udpLength, setUdpLength] = useState(0);

  const [payload, setPayload] = useState("None");
  const [payloadLength, setPayloadLength] = useState("");
  const [payloadPattern, setPayloadPattern] = useState("");

  const oldPayloadLength = useRef(0);

  const { setModalOpen } = useContext(ModalContext);
  const { setModal2Open } = useContext(ModalContext);

  const { rowsData } = useContext(ModalContext)
  const { rowsData2 } = useContext(ModalContext)
  const { selectedRow } = useContext(ModalContext)
  const { selectedRow2 } = useContext(ModalContext)

  const [streamName, setStreamName] = useState(" ")
  const [streamName2, setStreamName2] = useState(" ")

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

  const calculateIpv4Length = (bool, val) => {
    if (bool) {
      setIpv4Length(ipv4Length + val);
    } else {
      setIpv4Length(ipv4Length - val);
    }
  };
  const calculateUdpLength = (bool, val) => {
    if (bool) {
      setUdpLength(udpLength + val);
    } else {
      setUdpLength(udpLength - val);
    }
  };

  const calculateLengths = (newVal) => {
    if (newVal === "") {
      newVal = "0";
    }
    setIpv4Length(ipv4Length + parseInt(newVal) - oldPayloadLength.current);
    setUdpLength(udpLength + parseInt(newVal) - oldPayloadLength.current);
  };

  const [timer, setTimer] = useState(null);
  const updateLengths = (e) => {
    const newVal = e.currentTarget.value;
    if (payloadLength === "") {
      oldPayloadLength.current = 0;
    } else {
      oldPayloadLength.current = parseInt(payloadLength);
    }

    setPayloadLength(e.currentTarget.value);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      calculateLengths(newVal);
    }, 1);

    setTimer(newTimer);
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

  const updateName = (e, port) => {
    if (port == 0) {
      if (rowsData[selectedRow]) {
        rowsData[selectedRow].name = e.currentTarget.value;
        setStreamName(e.currentTarget.value)
      }
    } else {
    if (rowsData2[selectedRow2]) {
      rowsData2[selectedRow2].name = e.currentTarget.value;
      setStreamName2(e.currentTarget.value)
      }
    }
  }

  const determineStreamName = (port) => {
    if (port == 0) {
      if (rowsData[selectedRow]) {
        return rowsData[selectedRow].name

      }
    } else {
      if (rowsData2[selectedRow2]) {
        return rowsData2[selectedRow2].name
      }
    }
    return " "
  }

  const updateMode = (mode, port) => {
    if (port == 0) {
      rowsData[selectedRow].mode = mode
    }
    else {
      rowsData2[selectedRow2].mode = mode
    }
    setMode(mode)
  }

  const updateType = (type, port) => {
    if (port == 0) {
      rowsData[selectedRow].type = type
    }
    else {
      rowsData2[selectedRow2].type = type
    }
    setType(type)
  }
  
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
                checked={mode === "Continuous"}
                onChange={(e) => updateMode(e.currentTarget.value, port)}
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
                onChange={(e) => updateMode(e.currentTarget.value, port)}
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
                onChange={(e) => updateMode(e.currentTarget.value, port)}
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
                onChange={(e) => updateMode(e.currentTarget.value, port)}
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
          value={
            mode === "Continuous" || mode === "Continuous-Burst"
              ? "N/A"
              : packetCount
          }
          disabled={mode === "Continuous" || mode === "Continuous-Burst"}
          onChange={(e) => setPacketCount(e.target.value)}
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
          onChange={(e) => setBurstLength(e.target.value)}
        ></input>
        <label>Transmission Speed:</label>
        <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
          <option value="100M" disabled="disabled">
            100 MB/s
          </option>
          <option value="1G">1 GB/s</option>
          <option value="10G" disabled="disabled">
            10 GB/s
          </option>
          <option value="100G" disabled="disabled">
            100 GB/s
          </option>
        </select>
      </form>
      <form id="gen-form-3">
        <div className="gen-form-3-content">
          <button
            className="openModalBtn"
            onClick={(e) => {
              updateModalOpen(e, true, port);
            }}
          >
            Stream Manager
          </button>
          <label for="name">Name:</label>
        <input
          type="text"
          // required
          value={determineStreamName(port) }
          onChange={(e) => updateName(e, port)}
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
                onChange={(e) => updateType(e.currentTarget.value, port)}
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
                onChange={(e) => updateType(e.currentTarget.value, port)}
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
                onChange={(e) => setISG(e.target.value)}
              />
              <span className="ms">ms</span>
            </div>
          </div>
          <div className="interpacket">
            <label>Inter-packet Gap (IPG)</label>
            <div className="ipbg">
              <input
                type="text"
                value={IPG}
                onChange={(e) => setIPG(e.target.value)}
              />
              <span className="ms">ms</span>
            </div>
          </div>
          <div className="interburst">
            <label>Inter-burst Gap (IBG) </label>
            <div className="ipbg">
              <input
                type="text"
                value={mode === "Continuous" || mode === "Fixed" ? "0" : IBG}
                disabled={mode === "Continuous" || mode === "Fixed"}
                onChange={(e) => setIBG(e.target.value)}
              />
              <span className="ms">ms</span>
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
          {/* <input type="checkbox" id="mac-da" disabled={mac === false} onChange = {(e) => setMacDaEn(e.currentTarget.checked)}
          checked = {mac === false ? false : macDaEn}/> */}
        </div>
        <input
          type="text"
          // required
          value={macDa}
          onChange={(e) => setMacDa(e.target.value)}
        />
        <div class="inner-group">
          <label for="mac-sa">Source Address</label>
          {/* <input type="checkbox" id="mac-sa" disabled={mac === false} onChange = {(e) => setMacSaEn(e.currentTarget.checked)}
          checked = {mac === false ? false : macSaEn}/>        */}
        </div>
        <input
          // required
          // value={burstLength}
          value={macSa}
          onChange={(e) => setMacSa(e.target.value)}
        ></input>
        <div class="inner-group">
          <label for="vlan">VLAN-Tag</label>
          <input
            type="checkbox"
            id="vlan"
            disabled={mac === false}
            onChange={(e) => setVlanEn(e.currentTarget.checked)}
            checked={mac === false ? false : vlanEn}
          />
        </div>
        <input
          disabled={vlanEn === false || mac === false}
          value={vlanEn === false || mac === false ? "N/A" : vlan}
          onChange={(e) => setVlan(e.currentTarget.value)}
        ></input>

        <div class="inner-group">
          <label for="ethertype">Ethertype</label>
          {/* <input type="checkbox" id="ethertype" disabled={mac === false} onChange = {(e) => setEthTypeEn(e.currentTarget.checked)}
          checked = {mac === false ? false : ethTypeEn}/>  */}
        </div>
        <input
          value={ethType}
          onChange={(e) => setEthType(e.currentTarget.value)}
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
              ipv4En(e.target.checked),
              calculateIpv4Length(e.target.checked, 20),
            ]}
          />
        </div>
        <div>
          <div class="inner-group">
            <label for="version">Version & IHL</label>
            {/* <input type="checkbox" id="version" disabled={ipv4 === false} onChange = {(e) => [setVersionEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 1)]}
          checked = {ipv4 === false ? false : versionEn}/>            */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : version}
            onChange={(e) => setVersion(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="dscp">DSCP & ECN</label>
            {/* <input type="checkbox" id="dscp" disabled={ipv4 === false} onChange = {(e) => [setDscpEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 1)]}
          checked = {ipv4 === false ? false : dscpEn}/> */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : dscp}
            onChange={(e) => setDscp(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="identification">Identification</label>
            {/* <input type="checkbox" id="identification" disabled={ipv4 === false} onChange = {(e) => [setIdentificationEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 2)]}
          checked = {ipv4 === false ? false : identificationEn}/> */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : identification}
            onChange={(e) => setIdentification(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="flags">Flags & Fragment Offset</label>
            {/* <input type="checkbox" id="flags" disabled={ipv4 === false} onChange = {(e) => [setFlagsEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 2)]}
          checked = {ipv4 === false ? false : flagsEn}/>           */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : flags}
            onChange={(e) => setFlags(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="timetolive">Time to Live</label>
            {/* <input type="checkbox" id="timetolive" disabled={ipv4 === false} onChange = {(e) => [setTimetoliveEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 1)]}
          checked = {ipv4 === false ? false : timetoliveEn}/> */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : timetolive}
            onChange={(e) => setTimetolive(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <header id="blank">Blank</header>
        </div>
        <div>
          <div class="inner-group">
            <label for="protocol">Protocol</label>
            {/* <input type="checkbox" id="protocol" disabled={ipv4 === false} onChange = {(e) => [setProtocolEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 1)]}
          checked = {ipv4 === false ? false : protocolEn}/> */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : protocol}
            onChange={(e) => setProtocol(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="da">Destination Address</label>
            {/* <input type="checkbox" id="da" disabled={ipv4 === false} onChange = {(e) => [setIpv4DaEn(e.currentTarget.checked), , calculateIpv4Length(e.currentTarget.checked, 4)]}
          checked = {ipv4 === false ? false : ipv4DaEn}/> */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : ipv4Da}
            onChange={(e) => setIpv4Da(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="sa">Source Address</label>
            {/* <input type="checkbox" id="sa" disabled={ipv4 === false} onChange = {(e) => [setIpv4SaEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 4)]}
          checked = {ipv4 === false ? false : ipv4SaEn}/> */}
          </div>
          <input
            disabled={ipv4 === false}
            value={ipv4 === false ? "N/A" : ipv4Sa}
            onChange={(e) => setIpv4Sa(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="ip-length">Length</label>
            {/* <input type="checkbox" id="ip-length" disabled={ipv4 === false} onChange = {(e) => [setIpv4LengthEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 2)]}
          checked = {ipv4 === false ? false : ipv4LengthEn}/>   */}
          </div>
          <input
            disabled={true}
            value={ipv4 === true ? ipv4Length + " Bytes" : "0 Bytes"}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="checksum">Checksum</label>
            {/* <input type="checkbox" id="checksum" disabled={ipv4 === false} onChange = {(e) => [setIpv4ChecksumEn(e.currentTarget.checked), calculateIpv4Length(e.currentTarget.checked, 2)]}
            checked =  {ipv4 === false ? false : ipv4ChecksumEn}/> */}
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
              udpEn(e.target.checked),
              calculateIpv4Length(e.target.checked, 8),
              calculateUdpLength(e.target.checked, 8),
            ]}
          />
        </div>
        <div class="inner-group">
          <label for="udp-da">Destination Address</label>
          {/* <input type="checkbox" id="udp-da" disabled={udp === false} onChange = {(e) => [setUdpDaEn(e.currentTarget.checked), calculateUdpLength(e.currentTarget.checked, 2), calculateIpv4Length(e.currentTarget.checked, 2)]}
            checked =  {udp === false ? false : udpDaEn}/> */}
        </div>
        <input
          disabled={udp === false}
          value={udp === false ? "N/A" : udpDa}
          onChange={(e) => setUdpDa(e.currentTarget.value)}
        ></input>
        <div class="inner-group">
          <label for="udp-sa">Source Address</label>
          {/* <input type="checkbox" id="udp-sa" disabled={udp === false} onChange = {(e) => [setUdpSaEn(e.currentTarget.checked), calculateUdpLength(e.currentTarget.checked, 2), calculateIpv4Length(e.currentTarget.checked, 2)]}
            checked =  {udp === false ? false : udpSaEn}/> */}
        </div>
        <input
          disabled={udp === false}
          value={udp === false ? "N/A" : udpSa}
          onChange={(e) => setUdpSa(e.currentTarget.value)}
        ></input>
        <div>
          <div class="inner-group">
            <label for="udp-length">Length</label>
            {/* <input type="checkbox" id="udp-length" disabled={udp === false} onChange = {(e) => [setUdpLengthEn(e.currentTarget.checked), calculateUdpLength(e.currentTarget.checked, 2), calculateIpv4Length(e.currentTarget.checked, 2)]}
          checked = {udp === false ? false : udpLengthEn}/> */}
          </div>
          <input
            disabled={true}
            value={udp === true ? udpLength + " Bytes" : "0 Bytes"}
          ></input>
        </div>
        <div>
          <div class="inner-group">
            <label for="udp-checksum">Checksum</label>
            {/* <input type="checkbox" id="udp-checksum" disabled={udp === false} onChange = {(e) => [setUdpChecksumEn(e.currentTarget.checked), , calculateUdpLength(e.currentTarget.checked, 2),calculateIpv4Length(e.currentTarget.checked, 2)]}
            checked =  {udp === false ? false : udpChecksumEn}/> */}
          </div>
          <input disabled={true} value={"Auto-calculated"}></input>
        </div>
      </form>
      <form id="gen-form-7">
        <header>Payload</header>
        {/* <div className="BERT">
          <div class="inner-group-bert">
            <label for="bert">BERT</label>
            <input type="checkbox" id="bert" onChange={(e) => setBert(e.target.checked)}/>
          </div>
          </div> */}
        <div>
          <label>Type:</label>
          <select value={payload} onChange={(e) => setPayload(e.target.value)}>
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
          {/* <input type="checkbox" id="udp-da" disabled={udp === false} onChange = {(e) => [setUdpDaEn(e.currentTarget.checked), calculateUdpLength(e.currentTarget.checked, 2), calculateIpv4Length(e.currentTarget.checked, 2)]}
            checked =  {udp === false ? false : udpDaEn}/> */}
        </div>
        <input
          disabled={payload === "None"}
          value={payload === "None" ? "N/A" : payloadLength}
          placeholder="0 - 1500 Bytes"
          type="number"
          onChange={(e) => updateLengths(e)}
        ></input>
        <div
          style={{
            visibility: payload === "Fixed" ? "visible" : "hidden",
          }}
        >
          <div class="inner-group">
            <label for="payload-pattern">Pattern</label>
            {/* <input type="checkbox" id="udp-da" disabled={udp === false} onChange = {(e) => [setUdpDaEn(e.currentTarget.checked), calculateUdpLength(e.currentTarget.checked, 2), calculateIpv4Length(e.currentTarget.checked, 2)]}
            checked =  {udp === false ? false : udpDaEn}/> */}
          </div>
          <input
            value={payloadPattern}
            placeholder="Enter 8 byte pattern"
            onChange={(e) => setPayloadPattern(e.currentTarget.value)}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default GenerationForm;
