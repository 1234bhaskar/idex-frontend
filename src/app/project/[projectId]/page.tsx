"use client";
import { EditorButton } from "@/components/atoms/EditorButton";
import { EditorComponent } from "../../../components/molecules/EditorComponent";
import { TreeStructure } from "@/components/organism/TreeStructure";
import { useTreeStructureStore } from "@/store/treeStructureStore";
import { useEffect, use } from "react";
import { useEditorSocketStore } from "@/store/editorSocketStore";
import { io } from "socket.io-client";
import { useActiveFileTabStore } from "@/store/activeFileTabStore";

export default function ProjectPlayground({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectIdFromUrl = use(params);

  //   console.log("This is a project ID: ", resolvedParams.projectId);

  const { setProjectId, projectId } = useTreeStructureStore();
  const { setEditorSocket, editorSocket } = useEditorSocketStore();
  const { setActiveFileTab } = useActiveFileTabStore();

  useEffect(() => {
    setProjectId(projectIdFromUrl.projectId);
    const editorSocketConn = io(`${process.env.NEXT_PUBLIC_API_URL}/editor`, {
      query: { projectId: projectIdFromUrl.projectId },
    });
    setEditorSocket(editorSocketConn);

    return () => {
      editorSocketConn.disconnect();
    };
  }, [setProjectId, setEditorSocket, projectIdFromUrl.projectId]);

  useEffect(() => {
    if (!editorSocket) return;

    function handleFileReadSuccess(data: any) {
      console.log("File content received:", data);
      const extension = data.path.split(".").pop() || "";
      setActiveFileTab(data.path, data.content || data.data, extension);
    }

    editorSocket.on("file:read-success", handleFileReadSuccess);

    return () => {
      editorSocket.off("file:read-success", handleFileReadSuccess);
    };
  }, [editorSocket, setActiveFileTab]);

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
        </div>
      </div>
    </>
  );
}
