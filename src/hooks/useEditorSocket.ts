import { useEffect } from "react";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "@/store/editorSocketStore";
import { useActiveFileTabStore } from "@/store/activeFileTabStore";
import { useTreeStructureStore } from "@/store/treeStructureStore";

export const useEditorSocket = (projectId: string) => {
    const { setEditorSocket, editorSocket } = useEditorSocketStore();
    const { setActiveFileTab, activeFileTab } = useActiveFileTabStore();
    const { setTreeStructure } = useTreeStructureStore();
    useEffect(() => {
        if (!projectId) return;
        const editorSocketConn = io(`${process.env.NEXT_PUBLIC_API_URL}/editor`, {
            query: { projectId },
        });
        setEditorSocket(editorSocketConn);
        return () => {
            editorSocketConn.disconnect();
        };
    }, [projectId, setEditorSocket]);

    useEffect(() => {
        if (!editorSocket) return;
        function handleFileReadSuccess(data: any) {
            console.log("File content received:", data);
            const extension = data.path.split(".").pop() || "";
            setActiveFileTab(data.path, data.data, extension);
        }

        function handleFileWriteSuccess(data: any) {
            console.log("File write success:", data);
            editorSocket?.emit("file:read", { path: activeFileTab.path });
        }

        function handleFileDeletedSuccess(data: any) {
            console.log("File deleted:", data);
            setTreeStructure(); // Refresh tree structure after deletion
        }

        editorSocket.on("readFileSuccess", handleFileReadSuccess);
        editorSocket.on("writeFileSuccess", handleFileWriteSuccess);
        editorSocket.on("deleteFileSuccess", handleFileDeletedSuccess); // Refresh content on delete as well
        return () => {
            editorSocket.off("readFileSuccess", handleFileReadSuccess);
            editorSocket.off("writeFileSuccess", handleFileWriteSuccess);
            editorSocket.off("deleteFileSuccess", handleFileDeletedSuccess);
        };
    }, [editorSocket, setActiveFileTab, activeFileTab, setTreeStructure]);
};
