export type ContextMenuAction =
    | { type: "rename" }
    | { type: "delete" }
    | { type: "copyPath" }
    | { type: "duplicate" };

export type FileContextMenuProps = {
    x: number;
    y: number;
    filePath: string;
    fileName: string;
    onClose: () => void;
    onAction: (action: ContextMenuAction, path: string) => void;
};