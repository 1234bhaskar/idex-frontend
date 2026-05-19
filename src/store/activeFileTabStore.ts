// creating zustand store for active file tabs in the editor

import { create } from "zustand"

interface ActiveFileTabState {
    activeFileTab: {
        path: string
        value: string
        extension: string
    }
    setActiveFileTab: (path: string, value: string, extension: string) => void
}

export const useActiveFileTabStore = create<ActiveFileTabState>((set) => ({
    activeFileTab: {
        path: "",
        value: "",
        extension: ""
    },
    setActiveFileTab: (path: string, value: string, extension: string) => set({
        activeFileTab: {
            path: path,
            value: value,
            extension: extension
        }
    }),
}))