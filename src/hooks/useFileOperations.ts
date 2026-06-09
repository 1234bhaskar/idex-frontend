import { useEditorSocketStore } from "@/store/editorSocketStore";
import { useTreeStructureStore } from "@/store/treeStructureStore";

export function useFileOperations() {
  const { editorSocket } = useEditorSocketStore();
  const { projectId } = useTreeStructureStore();

  function deleteFile(path: string) {
    if (!editorSocket || !projectId) {
      console.error("Socket or project ID not available");
      return;
    }

    editorSocket.emit("file:delete", {
      projectId,
      path,
    });
    console.log(`Emitting delete for ${path} in project ${projectId}`);
  }

  function duplicateFile(path: string) {
    if (!editorSocket || !projectId) {
      console.error("Socket or project ID not available");
      return;
    }

    editorSocket.emit("file:duplicate", {
      projectId,
      path,
    });
  }

  function renameFile(oldPath: string, newName: string) {
    if (!editorSocket || !projectId) {
      console.error("Socket or project ID not available");
      return;
    }

    editorSocket.emit("file:rename", {
      projectId,
      oldPath,
      newName,
    });
  }

  return {
    deleteFile,
    duplicateFile,
    renameFile,
  };
}
