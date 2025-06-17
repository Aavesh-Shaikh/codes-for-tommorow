import React from "react";
import { useFilesystem } from "../context/FileSystemContext";
import { deleteNodeById, renameById } from "../utils/fileUtils";

const generatedId = Math.random().toString(36).substring(2, 9);
const ToolBar = () => {
  const { fileSystem, setFileSystem, selectedNode, setSelectedNode } =
    useFilesystem();

  const addNode = (nodes, newNode, parentId) => {
    return nodes.map((node) => {
      if (node.id === parentId && node.type === "folder") {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      } else if (node.children) {
        return {
          ...node,
          children: addNode(node.children, newNode, parentId),
        };
      }
      return node;
    });
  };

  const handleCreate = (type) => {
    const name = prompt(`enter ${type} name`)?.trim();
    if (!name) return;

    const newNode = {
      id: generatedId,
      name,
      type,
      ...(type === "folder" ? { chilren: [] } : { content: "" }),
    };

    const addNode = (nodes) =>{
        return nodes.map((node)=>{

            if(selectedNode && node?.id === selectedNode.id && node?.type === "folder" ){

                return{
                    ...node,
                    children:[...(node?.children || []), newNode],
                };

            }else if(node?.children){
                return {
                    ...node,
                    children:addNode(node?.children),
                }
            }
            return node;
        })
    }

    let updated;

    if(selectedNode?.type === "folder") {
         updated = addNode(fileSystem);
    }else{
        updated = [...fileSystem, newNode];
    }
    setFileSystem(updated);
    setSelectedNode(newNode);
  };

  const handleDelete = ()=>{
    if(!selectedNode){

        alert("please select a file to delete");
        return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedNode.name}?`);
    if(!confirmDelete) return;

    const updated = deleteNodeById(fileSystem, selectedNode.id);
    setFileSystem(updated);
    setSelectedNode(null);

  }

  const handleRename = () => {
     if(!selectedNode){
        alert("select file to rename");
        return;
     }

     const newName = prompt("Enter new name", selectedNode.name)?.trim();
     if(!newName || newName === selectedNode.name) return;

     const updated = renameById(fileSystem, selectedNode.id,  newName);
     setFileSystem(updated);
     setSelectedNode({...selectedNode, name :newName})

     
  } 

  return (
    <>
      <div className="toolbar">
        <button onCllick={()=>{handleCreate("folder")}}>Create Folder</button>
        <button onClick={()=>{handleCreate("file")}}>Create File</button>
        <button onClick={handleRename}>Rename File</button>
        <button onClick={handleDelete}>Delete File</button>
      </div>
    </>
  );
};

export default ToolBar;
