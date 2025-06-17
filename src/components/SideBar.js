import React from "react";
import { useFilesystem } from "../context/FileSystemContext";
import FileNode from "./FileNode";

function SideBar() {
  const { fileSystem } = useFilesystem();
  console.log(fileSystem);
  return (
    <div className="sidebar">
      <h2>Explorer</h2>
      {fileSystem.map((node) => {
        console.log(node, "node");
        return <FileNode key={node?.id} node={node} />;
      })}
    </div>
  );
}

export default SideBar;
