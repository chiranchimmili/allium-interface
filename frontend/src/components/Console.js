import "./Console.css"
import { saveAs } from "file-saver";

const Console = () => {

  return (
    <div id="console-flex">
      <div className="console">
        <tr> 
          <th colSpan = "5" className="welcome-message">Welcome to Ethernet Traffic Tester</th>
        </tr>
        {/* <button onClick={saveFile}> Hi </button> */}
      </div>
    </div>
  );
};

export default Console;
