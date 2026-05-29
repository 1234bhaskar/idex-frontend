"use client";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import draculaTheme from "@/themes/Dracula.json";
import { useActiveFileTabStore } from "@/store/activeFileTabStore";
import { useEditorSocketStore } from "@/store/editorSocketStore";

const languageMap: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  jsx: "javascript",
  tsx: "typescript",
  css: "css",
  html: "html",
  json: "json",
  md: "markdown",
};

export const EditorComponent = () => {
  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();
  const [editorState, setEditorState] = useState<any>({
    theme: draculaTheme,
  });
  const { editorSocket } = useEditorSocketStore();

  function handleEditorTheme(editor: any, monaco: any) {
    monaco.editor.defineTheme("dracula", editorState?.theme);
    monaco.editor.setTheme("dracula");
  }

  editorSocket?.on(
    "readFileSuccess",
    (data: { path: string; content: string }) => {
      console.log("File content received:", data);
      setActiveFileTab(
        data.path,
        data.content,
        data.path.split(".").pop() || "",
      );
    },
  );
  return (
    <>
      {editorState?.theme && (
        <Editor
          height={"80vh"}
          width={"100%"}
          language={languageMap[activeFileTab.extension] || "javascript"}
          value={activeFileTab.value || "// Select a file to view its content"}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          }}
          defaultValue={
            activeFileTab.value
              ? activeFileTab.value
              : "// Welcome to your code editor!"
          }
          onMount={handleEditorTheme}
        />
      )}
    </>
  );
};
