import { useEffect } from "react";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "@/store/editorSocketStore";
import { useActiveFileTabStore } from "@/store/activeFileTabStore";

export const useEditorSocket = (projectId: string) => {
    const { setEditorSocket, editorSocket } = useEditorSocketStore();
    const { setActiveFileTab } = useActiveFileTabStore();

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

        editorSocket.on("readFileSuccess", handleFileReadSuccess);
        return () => {
            editorSocket.off("readFileSuccess", handleFileReadSuccess);
        };
    }, [editorSocket, setActiveFileTab]);
};
