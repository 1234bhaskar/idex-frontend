import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import io from "socket.io-client";
import { useParams } from "next/navigation";

export const BrowserTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const socket = useRef<any>(null);
  const projectIdFromUrl = useParams();
  const projectId = projectIdFromUrl.projectId;

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
        cursor: "#ffffff",
        cursorAccent: "#1e1e1e",
        red: "#ff5544",
        green: "#50fa7c",
        yellow: "#f1fa8c",
        cyan: "#8be9fd",
      },
      fontFamily: "Ubuntu Mono, monospace",
      fontSize: 14,
      convertEol: true,
    });

    terminal.open(terminalRef.current!);

    //fit the terminal to the size of the container
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    fitAddon.fit();

    socket.current = io(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/terminal` : "/terminal", {
      query: { projectId },
    });

    socket.current.on("shell-output", (data: string) => {
      terminal.write(data);
    });

    terminal.onData((data) => {
      console.log(data);
      socket.current.emit("shell-input", data);
    });

    return () => {
      socket.current.disconnect();
      terminal.dispose();
    };
  }, []);
  return (
    <div
      ref={terminalRef}
      style={{
        height: "25vh",
        overflow: "auto",
      }}
      className="terminal"
      id="terminal-container"
    ></div>
  );
};
