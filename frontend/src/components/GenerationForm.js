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
    axios.post('/', form)
      .then(function (response) {
        let console = document.querySelector('.console')
        let z = document.createElement('div');
        z.innerHTML = response.data;
        z.style.color = 'rgba(15, 255, 80, 1)';
        console.appendChild(z);
        console.scrollTop = console.scrollHeight;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const generationForm = {"type" : type, "count" : packetCount, "length" : packetLength, "payload" : payload};
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
