export interface IContextMenuState {
    x: number;
    y: number;
    filePath: string;
    fileName: string;
    isOpen: boolean;
    openContextMenu: (x: number, y: number, filePath: string, fileName: string) => void;
    closeContextMenu: () => void;
}