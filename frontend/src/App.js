import "./App.css";
import ResizableConsole from "./components/ResizableConsole";
import Tabs from "./components/Tabs";
import Header from "./components/Header"
import ResizableNav from "./components/ResizableNav";

function App() {

  return (
    
      <div className="container">
        <Header></Header>
        <ResizableNav></ResizableNav>
        <div className="main">
          <Tabs></Tabs>
        </div>
        <ResizableConsole>
        </ResizableConsole>
        </div>
  );
}

export default App;
