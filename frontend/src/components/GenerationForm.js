import { useState } from "react";
import axios from "axios";
import "./Console.js";
import "./Form.css";
import "./GenerationForm.css";

const GenerationForm = () => {
  const [packetCount, setPacketCount] = useState("10000");
  const [burstLength, setBurstLength] = useState("120");
  const [payload, setPayload] = useState("Random");
  const [mode, setMode] = useState("Continuous");

  const type = 0;

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
        row.style.color = "rgba(102,255,0,1)";
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
    row.style.color = "rgba(0,191,255,1)";
    output_console.appendChild(row);
    const generationForm = {
      type: type,
      mode: mode,
      count: packetCount,
      length: burstLength,
      payload: payload,
    };
    output_console.scrollTop = output_console.scrollHeight;
    sendData(generationForm);
  };

  return (
    <div className="inputs">
      <form id="mode">
        <header> Mode </header>
        <section class="radio-section">
          <div class="radio-list">
            <div class="radio-item">
              <input type="radio" name="radio" id="radio1" value ="Continuous"  checked={ mode === "Continuous"} 
              onChange={(e) => setMode(e.currentTarget.value)}/>
              <label for="radio1">Continuous</label>
            </div>
            <div class="radio-item">
              <input type="radio" name="radio" id="radio2" value = "Fixed" onChange={(e) => setMode(e.currentTarget.value)}/>
              <label for="radio2">Fixed</label>
            </div>
            <div class="radio-item">
              <input type="radio" name="radio" id="radio3" value = "Burst" onChange={(e) => setMode(e.currentTarget.value)}/>
              <label for="radio3">Burst</label>
            </div>
          </div>
        </section>
      </form>
      <form>
        <label>Number of Packets:</label>
        <input
          type="text"
          required
          value={mode !== "Continuous" ? packetCount: "NA"}
          disabled = {mode === "Continuous"}
          onChange={(e) => setPacketCount(e.target.value)}
        />
        <label>Packets per Burst:</label>
        <input
          required
          value={mode === "Burst" ? burstLength: "NA"}
          disabled = {mode === "Continuous" || mode === "Fixed"}
          onChange={(e) => setBurstLength(e.target.value)}
        ></input>
        <label>Payload:</label>
        <select value={payload} onChange={(e) => setPayload(e.target.value)}>
          <option value="Random">Random</option>
          <option value="0101">010101...</option>
          <option value="1111">111111...</option>
          <option value="0000">000000...</option>
        </select>
      </form>
      <form>
        <label>Packet Count:</label>
        <input
          type="text"
          required
          value={packetCount}
          onChange={(e) => setPacketCount(e.target.value)}
        />
        <label>Packet Length:</label>
        <input
          required
          value={burstLength}
          onChange={(e) => setBurstLength(e.target.value)}
        ></input>
        <label>Payload:</label>
        <select value={payload} onChange={(e) => setPayload(e.target.value)}>
          <option value="Random">Random</option>
          <option value="0101">010101...</option>
          <option value="1111">111111...</option>
          <option value="0000">000000...</option>
        </select>
      </form>
      <form class="gaps">
        <div id="diagram">
          <span>PACK1</span> <span>IPG</span> <span>PACK2</span>{" "}
          <span>IBG</span> <span>PACK1</span> <span> IPG</span> <span>PACK2</span>
        </div>
        <div class="gaps-inputs">
          <div class ="interpacket">
            <label>Inter-packet Gap (IPG)</label>
            <input type="text" />
          </div>
          <div class ="interburst">
            <label>Inter-burst Gap (IBG)</label>
            <input type="text" />
          </div>
        </div>
      </form>
      <button id="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default GenerationForm;
