"use client";

import React from "react";
import { FileIcon } from "@/components/atoms/FileIcon/FileIcon";
import { useActiveFileTabStore } from "@/store/activeFileTabStore";
import { useEditorSocketStore } from "@/store/editorSocketStore";
import { useTreeStructureStore } from "@/store/treeStructureStore";
import { FileContextMenu } from "@/components/molecules/FileContextMenu/FileContextMenu";
import { ContextMenuAction } from "@/components/molecules/FileContextMenu/FileContextMenu.types";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useFileContextMenuStore } from "@/store/fileContextMenuStore";

export type FileFolderData = {
  name: string;
  children?: FileFolderData[];
  [key: string]: any;
};

export const TreeNode = ({
  fileFolderData,
}: {
  fileFolderData: FileFolderData | null | any;
}) => {
  const [visibility, setVisibility] = React.useState<Record<string, boolean>>(
    {},
  );

  const {
    openContextMenu,
    closeContextMenu,
    x,
    y,
    filePath,
    fileName,
    isOpen,
  } = useFileContextMenuStore();
  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();
  const { editorSocket } = useEditorSocketStore();
  const { projectId } = useTreeStructureStore();

  function toggleVisibility(name: string) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }

  function handleDoubleClick(fileFolderData: FileFolderData) {
    console.log("File double-clicked:", fileFolderData);
    editorSocket?.emit("file:read", {
      projectId: projectId,
      path: fileFolderData.path,
    });
    const extension = fileFolderData.path.split(".").pop() || "";
    setActiveFileTab(fileFolderData.path, fileFolderData.data, extension);
  }

  function handleContextMenuForFiles(
    event: React.MouseEvent<HTMLDivElement>,
    path: string,
    name: string,
  ) {
    event.preventDefault();
    openContextMenu(event.clientX, event.clientY, path, name);
  }

  function handleContextMenuAction(action: ContextMenuAction, path: string) {
    console.log(`Context menu action: ${action.type} on ${path}`);
    // Each action type can be wired to the backend later
  }

  return (
    fileFolderData && (
      <div
        style={{
          paddingLeft: "10px",
          color: "white",
        }}
      >
        {fileFolderData.children ? (
          // if the node has children, it is a folder, so we render a button to toggle visibility
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            style={{
              border: "none",
              cursor: "pointer",
              outline: "none",
              background: "transparent",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {visibility[fileFolderData.name] ? (
              <IoIosArrowDown size={12} />
            ) : (
              <IoIosArrowForward size={12} />
            )}
            {fileFolderData.name}
          </button>
        ) : (
          // if the node does not have children, it is a file, so we just render its name
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              borderRadius: "5px",
              padding: "5px",
              gap: "5px",
              cursor: "pointer",
            }}
            onContextMenu={(e) =>
              handleContextMenuForFiles(
                e,
                fileFolderData.path,
                fileFolderData.name,
              )
            }
            onDoubleClick={() => handleDoubleClick(fileFolderData)}
          >
            <FileIcon extension={fileFolderData.name.split(".").pop() || ""} />
            <p
              style={{
                paddingTop: "5px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              {fileFolderData.name}
            </p>
          </div>
        )}

        {/* for folders which are already open in the tree */}
        {visibility[fileFolderData.name] && fileFolderData.children && (
          <div style={{ paddingLeft: "15px" }}>
            {fileFolderData.children.map((child: FileFolderData) => (
              <TreeNode key={child.name} fileFolderData={child} />
            ))}
          </div>
        )}

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
    )
  );
};
