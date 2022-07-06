import { useState } from "react";
import "./Form.css";

const GenerationForm = () => {
  const [packetCount, setPacketCount] = useState('10000');
  const [packetLength, setPacketLength] = useState('120');
  const [payload, setPayload] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const generationForm = {};
  }

  return (
    <div className="form">
      <form onSubmit={ handleSubmit }>
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
        <select
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        >
          <option value="Random">Random</option>
          <option value="0101">010101...</option>
          <option value="1111">111111...</option>
          <option value="0000">000000...</option>
        </select>
        <button>Save</button>
      </form>
    </div>
  );
}
 
export default GenerationForm;