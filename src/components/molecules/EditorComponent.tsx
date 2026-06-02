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
  let timerId = null as unknown as NodeJS.Timeout | null;
  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();
  const [editorState, setEditorState] = useState<any>({
    theme: draculaTheme,
  });
  const { editorSocket } = useEditorSocketStore();

  function handleEditorTheme(editor: any, monaco: any) {
    monaco.editor.defineTheme("dracula", editorState?.theme);
    monaco.editor.setTheme("dracula");
  }

  //use debouncing to limit the number of times the handleChange function is called when the user is typing
  function handleChange(value: string | undefined, event: any) {
    //clear old timers
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      const editorContent = value;
      editorSocket?.emit("file:write", {
        path: activeFileTab.path,
        content: editorContent,
      });
    }, 2000);
  }

  editorSocket?.on("file", (data: any) => {
    console.log("File update received:", data);
    const extension = data.path.split(".").pop() || "";
    setActiveFileTab(data.path, data.data, extension);
  });

  return (
    <>
      {editorState?.theme && (
        <Editor
          height={"80vh"}
          width={"100%"}
          language={languageMap[activeFileTab.extension] || "javascript"}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          }}
          value={
            activeFileTab.value
              ? activeFileTab.value
              : "// Welcome to your code editor!"
          }
          onChange={handleChange}
          onMount={handleEditorTheme}
        />
      )}
    </>
  );
};
