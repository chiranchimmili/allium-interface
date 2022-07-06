import "./App.css";
import Resizable from "./components/Resizable";
import Tabs from "./components/Tabs";

function App() {
  return (
    <body>
      <div className="container">
        <div className="header"></div>
        <div className="sidebar"></div>
        <div className="main">
          <Tabs></Tabs>
        </div>
        <Resizable className="console"></Resizable>
        </div>
    </body>
  );
}

export default App;
