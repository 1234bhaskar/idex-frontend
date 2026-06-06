import { create } from "zustand";
import { IContextMenuState } from "../types/store/useFileContextMenuStore.types";

export const useFileContextMenuStore = create<IContextMenuState>((set) => ({
  x: 0,
  y: 0,
  filePath: "",
  fileName: "",
  isOpen: false,
  openContextMenu: (x, y, filePath, fileName) =>
    set({ x, y, filePath, fileName, isOpen: true }),
  closeContextMenu: () =>
    set({ x: 0, y: 0, filePath: "", fileName: "", isOpen: false }),
}));
