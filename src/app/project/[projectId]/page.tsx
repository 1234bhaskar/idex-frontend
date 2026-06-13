"use client";
import { EditorButton } from "@/components/atoms/EditorButton";
import { EditorComponent } from "../../../components/molecules/EditorComponent";
import { TreeStructure } from "@/components/organism/TreeStructure";
import { useTreeStructureStore } from "@/store/treeStructureStore";
import { useEffect, use } from "react";
import { useEditorSocket } from "@/hooks/useEditorSocket";
import { BrowserTerminal } from "@/components/molecules/Terminal/BrowserTerminal";

export default function ProjectPlayground({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectIdFromUrl = use(params);
  const { setProjectId, projectId } = useTreeStructureStore();

  // Use custom hook to handle socket connection and events
  useEditorSocket(projectIdFromUrl.projectId);

  useEffect(() => {
    setProjectId(projectIdFromUrl.projectId);
  }, [setProjectId, projectIdFromUrl.projectId]);

  return (
    <>
      Project Id: {projectIdFromUrl.projectId}
      <div className="flex w-full">
        {projectId && (
          <div
            style={{
              backgroundColor: "#333254",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
              minWidth: "250px",
              maxWidth: "25%",
              height: "99.7vh",
            }}
          >
            <TreeStructure />
          </div>
        )}

        <div className="flex-1">
          <div className="flex ">
            <EditorButton label="file.js" isActive={true} />
            <EditorButton label="file.css" isActive={false} />
          </div>
          <EditorComponent />
          <div>
            <BrowserTerminal />
          </div>
        </div>
      </div>
    </>
  );
}
