"use client";
import { useTreeStructureStore } from "@/store/treeStructureStore";
import { useEffect } from "react";
import { TreeNode } from "../molecules/FileTree/TreeNode";
import { FileContextMenu } from "../molecules/FileContextMenu/FileContextMenu";
import { ContextMenuAction } from "../molecules/FileContextMenu/FileContextMenu.types";
import { useFileContextMenuStore } from "@/store/fileContextMenuStore";
import { useFileOperations } from "@/hooks/useFileOperations";

export const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const { isOpen, x, y, filePath, fileName, closeContextMenu } =
    useFileContextMenuStore();
  const { deleteFile, duplicateFile, renameFile } = useFileOperations();

  useEffect(() => {
    if (treeStructure) {
      console.log(treeStructure);
    } else {
      setTreeStructure();
    }
  }, [setTreeStructure, treeStructure]);

  function handleContextMenuAction(action: ContextMenuAction, path: string) {
    switch (action.type) {
      case "delete":
        deleteFile(path);
        break;
      case "duplicate":
        duplicateFile(path);
        break;
      case "rename":
        renameFile(path, "");
        break;
      case "copyPath":
        navigator.clipboard.writeText(path);
        break;
    }
  }

  return (
    <div>
      <h2>Tree Structure </h2>
      <TreeNode fileFolderData={treeStructure} />

      {/* FileContextMenu rendered ONCE here — not inside every recursive TreeNode */}
      {isOpen && (
        <FileContextMenu
          x={x}
          y={y}
          filePath={filePath}
          fileName={fileName}
          onClose={closeContextMenu}
          onAction={handleContextMenuAction}
        />
      )}
    </div>
  );
};
