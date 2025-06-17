import "./App.css";
import { FileSystemProvider } from "./context/FileSystemContext";
import SideBar from "./components/SideBar";
import FileViewer from "./components/FileViewer";
import ToolBar from "./components/ToolBar";

function App() {
  return (
    <FileSystemProvider>
      <div className="app-container">
        <SideBar />

        <div className="main-content">
          <ToolBar />
          <FileViewer />
        </div>
      </div>
    </FileSystemProvider>
  );
}

export default App;
