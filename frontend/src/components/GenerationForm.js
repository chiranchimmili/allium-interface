import { useState } from "react";
import axios from "axios";
import "./Console.js"
import "./Form.css";

const GenerationForm = () => {
  const [packetCount, setPacketCount] = useState("10000");
  const [packetLength, setPacketLength] = useState("120");
  const [payload, setPayload] = useState("Random");
  const type = 0;

  const sendData = (form) => {
    let output_console = document.querySelector('.console')
    axios.post('/', form)
      .then(function (response) {
        let row = document.createElement('tr');
        let title = document.createElement('th')
        title.innerHTML = "Event"
        let time = document.createElement('th')
        time.innerHTML = (new Date()).toLocaleTimeString('en-GB')
        let desc = document.createElement('th')
        desc.innerHTML = response.data
        row.appendChild(title)
        row.appendChild(time)
        row.appendChild(desc)
        row.style.color = 'rgba(102,255,0,1)';
        output_console.appendChild(row);
        output_console.scrollTop = output_console.scrollHeight;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSave = (e) => {
    let output_console = document.querySelector('.console')
    e.preventDefault();
    let row = document.createElement('tr');
    let title = document.createElement('th')
    title.innerHTML = "Info"
    let time = document.createElement('th')
    time.innerHTML = (new Date()).toLocaleTimeString('en-GB')
    let desc = document.createElement('th')
    desc.innerHTML = "Saving configuration..."
    row.appendChild(title)
    row.appendChild(time)
    row.appendChild(desc)
    row.style.color = 'rgba(0,191,255,1)';
    output_console.appendChild(row)
    const generationForm = {"type" : type, "count" : packetCount, "length" : packetLength, "payload" : payload};
    output_console.scrollTop = output_console.scrollHeight;
    sendData(generationForm)
  };

  return (
    <div className="form">
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
          value={packetLength}
          onChange={(e) => setPacketLength(e.target.value)}
        ></input>
        <label>Payload:</label>
        <select value={payload} onChange={(e) => setPayload(e.target.value)}>
          <option value="Random">Random</option>
          <option value="0101">010101...</option>
          <option value="1111">111111...</option>
          <option value="0000">000000...</option>
        </select>
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default GenerationForm;
