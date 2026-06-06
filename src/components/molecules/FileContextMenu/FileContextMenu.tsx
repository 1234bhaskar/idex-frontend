"use client";

import React, { useEffect, useRef } from "react";
import { ContextMenuAction, FileContextMenuProps } from "@/components/molecules/FileContextMenu/FileContextMenu.types";

const actions: { label: string; type: ContextMenuAction["type"] }[] = [
  { label: "Rename", type: "rename" },
  { label: "Duplicate", type: "duplicate" },
  { label: "Copy Path", type: "copyPath" },
  { label: "Delete", type: "delete" },
];

export const FileContextMenu = ({
  x,
  y,
  filePath,
  fileName,
  onClose,
  onAction,
}: FileContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Delay adding the listener so the right-click event doesn't immediately close it
    const tick = requestAnimationFrame(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    });

    return () => {
      cancelAnimationFrame(tick);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Keep menu within viewport bounds
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 180);

  return (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        left: adjustedX,
        top: adjustedY,
        zIndex: 9999,
        minWidth: "160px",
        background: "#1e1e2e",
        border: "1px solid #45475a",
        borderRadius: "8px",
        padding: "4px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      {actions.map((action) => (
        <button
          key={action.type}
          onClick={() => {
            onAction({ type: action.type }, filePath);
            onClose();
          }}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "6px 12px",
            fontSize: "13px",
            color: action.type === "delete" ? "#f38ba8" : "#cdd6f4",
            background: "transparent",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#313244")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default FileContextMenu;
