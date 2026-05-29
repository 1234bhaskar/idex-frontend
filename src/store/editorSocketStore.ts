import { create } from "zustand";
import { IEditorSocketState } from "../types/store.types";


export const useEditorSocketStore = create<IEditorSocketState>((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => set({ editorSocket: incomingSocket }),
}));