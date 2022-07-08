import "./App.css";
import Resizable from "./components/Resizable";
import Tabs from "./components/Tabs";
import Console from "./components/Console"
import Header from "./components/Header"

function App() {

  return (
    
      <div className="container">
        <Header></Header>
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
