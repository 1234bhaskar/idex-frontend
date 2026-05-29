import { Socket } from "socket.io-client";

export interface IEditorSocketState {
    editorSocket: Socket | null;
    setEditorSocket: (incomingSocket: Socket) => void;
}