import { useState } from "react";
import axios from "axios";
import "./Console.js";
import "./Form.css";
import "./GenerationForm.css";

const GenerationForm = () => {
  const [packetCount, setPacketCount] = useState("");
  const [burstLength, setBurstLength] = useState("");
  const [speed, setSpeed] = useState("1G");
  const [mode, setMode] = useState("Continuous");
  const [IPG, setIPG] = useState("0");
  const [IBG, setIBG] = useState("0");
  const [ipv4, ipv4En] = useState(false);
  const [mac, macEn] = useState(false);
  const [udp, udpEn] = useState(false);

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
      type: type,
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
      <form id="form-1">
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
                onChange={(e) => setMode(e.currentTarget.value)}
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
                onChange={(e) => setMode(e.currentTarget.value)}
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
                onChange={(e) => setMode(e.currentTarget.value)}
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
                onChange={(e) => setMode(e.currentTarget.value)}
              />
              <label htmlFor="radio4" id="radio4">
                Continuous-Burst
              </label>
            </div>
          </div>
        </section>
      </form>
      <form id="form-2">
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
      <form id="form-3">
        <label>Placeholder:</label>
        <input
        // type="text"
        // required
        // value={packetCount}
        // onChange={(e) => setPacketCount(e.target.value)}
        />
        <label>Placeholder:</label>
        <input
        // required
        // value={burstLength}
        // onChange={(e) => setBurstLength(e.target.value)}
        ></input>
        <label>Placeholder:</label>
        {/* <select value={} onChange={(e) => setPayload(e.target.value)}>
          <option value="Random">Random</option>
          <option value="0101">010101...</option>
          <option value="1111">111111...</option>
          <option value="0000">000000...</option>
        </select> */}
      </form>
      <form className="gaps" id="gaps-form">
        <div id="diagram">
          <span>PKT1</span> <span>IPG</span> <span>PKT2</span> <span>IBG</span>{" "}
          <span>PKT1</span> <span> IPG</span> <span>PKT2</span>
        </div>
        <div className="gaps-inputs">
          <div className="interpacket">
            <label>Inter-packet Gap (IPG)</label>
            <input
              type="text"
              value={IPG}
              onChange={(e) => setIPG(e.target.value)}
            />
          </div>
          <div className="interburst">
            <label>Inter-burst Gap (IBG)</label>
            <input
              type="text"
              value={mode === "Continuous" || mode === "Fixed" ? "0" : IBG}
              disabled={mode === "Continuous" || mode === "Fixed"}
              onChange={(e) => setIBG(e.target.value)}
            />
          </div>
        </div>
      </form>
      <button id="save-button" onClick={handleSave}>
        Save
      </button>
      <header className="header-properties">Packet Properties</header>
      <form id="form-4">
        <div class="group">
          <label for="mac-enable">MAC</label>
          <input
            type="checkbox"
            id="mac-enable"
            onChange={(e) => macEn(e.target.checked)}
          />
        </div>
        <label>Destination Address:</label>
        <input
          type="text"
          // required
          // value={packetCount}
          disabled={mac === false}
          // onChange={(e) => setPacketCount(e.target.value)}
        />
        <label>Source Address:</label>
        <input
          // required
          // value={burstLength}
          disabled={mac === false}
          // onChange={(e) => setBurstLength(e.target.value)}
        ></input>
        <label>VLAN Tag:</label>
        <input disabled={mac === false}></input>
        <label>EtherType</label>
        <input disabled={mac === false}></input>
      </form>
      <form id="form-5">
        <div class="group">
          <label for="ipv4-enable">IPv4</label>
          <input
            type="checkbox"
            id="ipv4-enable"
            onChange={(e) => ipv4En(e.target.checked)}
          />
        </div>
        <div>
          <label>Version & IHL:</label>
          <input
            // type="text"
            // required
            // value={packetCount}
            // onChange={(e) => setPacketCount(e.target.value)}
            disabled={ipv4 === false}
          />
        </div>
        <div>
          <label>DSCP & ECN:</label>
          <input
            disabled={ipv4 === false}

            // required
            // value={burstLength}
            // onChange={(e) => setBurstLength(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Identification</label>
          <input disabled={ipv4 === false} />
        </div>
        <div>
          <label>Flags & Fragment Offset:</label>
          <input
            disabled={ipv4 === false}

            // required
            // value={burstLength}
            // onChange={(e) => setBurstLength(e.target.value)}
          ></input>
        </div>
        <div>
          <header id="blank">Blank</header>
        </div>
        <div>
          <label>Time to Live:</label>
          <input
            disabled={ipv4 === false}

            // required
            // value={burstLength}
            // onChange={(e) => setBurstLength(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Protocol:</label>
          <input
            disabled={ipv4 === false}

            // required
            // value={burstLength}
            // onChange={(e) => setBurstLength(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Source Address:</label>
          <input
            disabled={ipv4 === false}

            // required
            // value={burstLength}
            // onChange={(e) => setBurstLength(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Destination Address:</label>
          <input
            disabled={ipv4 === false}

            // required
            // value={burstLength}
            // onChange={(e) => setBurstLength(e.target.value)}
          ></input>
        </div>
      </form>
      <form id="form-6">
        <div class="group">
          <label for="udp-enable">UDP</label>
          <input
            type="checkbox"
            id="udp-enable"
            onChange={(e) => udpEn(e.target.checked)}
          />
        </div>
        <label>Destination Address:</label>
        <input
          type="text"
          // required
          // value={packetCount}
          disabled={udp === false}
          // onChange={(e) => setPacketCount(e.target.value)}
        />
        <label>Source Address:</label>
        <input
        type = "test"
          // required
          // value={burstLength}
          disabled={udp === false}
          // onChange={(e) => setBurstLength(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default GenerationForm;
