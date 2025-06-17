import React from "react";
import { useFilesystem } from "../context/FileSystemContext";

const FileViewer = ()=>{{
const {selectedNode} = useFilesystem();

console.log(selectedNode ,"selectedNode")


if(!selectedNode || selectedNode.type !== "folder"){
  return <div className="file-viewer">Select Folder to view </div>
}

return(

    <div className="file-viewer">
      <h1>{selectedNode.name}</h1>
        <h3>{selectedNode?.children?.[0].name}</h3>
        <p>{selectedNode?.children?.[0].content}</p>
    </div>
)
}}

export default FileViewer;