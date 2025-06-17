export const deleteNodeById = (nodes, targetedId) => {
  return nodes
    .filter((node) => node?.id !== targetedId)
    .map((node) => {
      if (node?.children) {
        return { ...node, children: deleteNodeById(node?.children, targetedId) };
      }
    });
};

export const renameById = (nodes, targetedId, newName) => {
  return nodes?.map((node) => {
    {
      if (node.id === targetedId) {
        return { ...node, name: newName };
      } else if (node.children) {
        return {
          ...nodes,
          children: renameById(node?.children, targetedId, newName),
        };
      }
    }
  });
};
