import "./App.css";
import Resizable from "./components/Resizable";
import Tabs from "./components/Tabs";
import Console from "./components/Console"

function App() {


  
  return (
    
      <div className="container">
        <div className="header"></div>
        <div className="sidebar"></div>
        <div className="main">
          <Tabs></Tabs>
        </div>
        <Resizable >
        </Resizable>
        </div>
  );
}

export default App;
