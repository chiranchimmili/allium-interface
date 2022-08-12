import "./Console.css"

// Console component. To add to console, see sendData() method in GenerationForm.js
const Console = () => {
  return (
    <div id="console-flex">
      <div className="console">
        <tr> 
          <th colSpan = "5" className="welcome-message">Welcome to Ethernet Traffic Tester</th>
        </tr>
      </div>
    </div>
  );
};

export default Console;
