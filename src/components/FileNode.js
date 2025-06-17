import React, { useState } from "react";
import { useFilesystem } from "../context/FileSystemContext";

const FileNode = ({ node }) => {
  const [expanded, setExpanded] = useState(false);
  const { setSelectedNode } = useFilesystem();

  // console.log(node,"...")

  const handleClick = () => {
    if (node?.type !== "folder") {
      setExpanded(!expanded);
    } else {
      setSelectedNode(node);
    }
  };

  
  console.log(expanded,"expanded")

  return (
    <div className="file-node">
      <div onClick={handleClick}>
        {node?.type === "folder" ? (
          <span className="folder-icon">📁</span>
        ) : (
          <span className="file-icon">📄</span>
        )}
        <span>{node?.name}</span>
      </div>
      {expanded && node?.children && (
        <div className="child-nodes">
          {node?.children.map((childNode) => (
            console.log(childNode,"childNode"),
            <FileNode key={childNode.id} node={childNode} /> || (
              <div className="node" key={childNode.id}>
                {childNode.name} {childNode.content}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default FileNode;
