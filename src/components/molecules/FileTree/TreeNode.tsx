"use client";
import { FileIcon } from "@/components/atoms/FileIcon/FileIcon";
import React from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

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

  function toggleVisibility(name: string) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }
  return (
    fileFolderData && (
      <div
        style={{
          paddingLeft: "15px",
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
              justifyContent: "center",
              borderRadius: "5px",
              padding: "5px",
              gap: "5px",
              cursor: "pointer",
            }}
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
      </div>
    )
  );
};
