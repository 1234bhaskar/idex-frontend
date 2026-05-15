"use client"
import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react";
import draculaTheme from "@/themes/Dracula.json";

export const EditorComponent = () => {
    const [editorState, setEditorState] = useState<any>({
        theme: draculaTheme
    });

    function handleEditorTheme(editor: any, monaco: any) {
        monaco.editor.defineTheme('dracula', editorState?.theme);
        monaco.editor.setTheme('dracula')
    }

    return (
        <>
            {
                editorState?.theme &&
                <Editor
                    height={'80vh'}
                    width={'100%'}
                    defaultLanguage="javascript"
                    defaultValue="console.log('Hello world');"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 18,
                        fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                    }}
                    onMount={handleEditorTheme}
                />
            }
        </>
    )
}