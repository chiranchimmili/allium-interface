import "./App.css";
import ResizableConsole from "./components/ResizableConsole";
import Tabs from "./components/Tabs";
import Header from "./components/Header";
import ResizableNav from "./components/ResizableNav";
import GenerationForm from "./components/GenerationForm";
import { TabProvider } from "./TabContext";
import { ModalProvider } from "./ModalContext"

function App() {
  return (
    <div className="container">
      <TabProvider>
        <ModalProvider>
        <Header></Header>
        <ResizableNav></ResizableNav>
        <div className="main">
          <Tabs></Tabs>
        </div>
        <ResizableConsole></ResizableConsole>
        </ModalProvider>
      </TabProvider>
    </div>
  );
}

export default App;
