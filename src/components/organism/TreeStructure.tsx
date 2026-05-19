"use client";
import { useTreeStructureStore } from "@/store/treeStructureStore";
import { useEffect } from "react";
import { TreeNode } from "../molecules/FileTree/TreeNode";

export const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();

  useEffect(() => {
    if (treeStructure) {
      console.log(treeStructure);
    } else {
      setTreeStructure();
    }
  }, [setTreeStructure, treeStructure]);

  return (
    <div>
      <h2>Tree Structure </h2>
      <TreeNode fileFolderData={treeStructure} />
    </div>
  );
};
