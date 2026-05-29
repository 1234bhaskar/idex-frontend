"use client";
import { useCreateProject } from "@/hooks/mutations/useCreateProject";
import { useRouter } from "next/navigation";
import { socket } from "../socket";
import { useEffect, useState } from "react";

export default function Home() {
  const { mutateAsync, isPending } = useCreateProject();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const router = useRouter();
  const handleCreateProject = async () => {
    try {
      const res = await mutateAsync();
      console.log("Project Created Successfully", res);
      router.push(`/project/${res.data}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Create project</h1>
      <button onClick={handleCreateProject}>Create</button>
      {isPending && <p>Creating project...</p>}
    </div>
  );
}
