import React, { createContext, useState, useContext } from "react";
import initialData from "../data/fileSystem.json";
const FileSystemContext = createContext();

export const useFilesystem = () => useContext(FileSystemContext);

export const FileSystemProvider = ({ children }) => {
  const [fileSystem, setFileSystem] = useState(initialData);
  const [selectedNode, setSelectedNode] = useState();

  return (
    <FileSystemContext.Provider
      value={{ fileSystem, selectedNode, setFileSystem, setSelectedNode }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};
