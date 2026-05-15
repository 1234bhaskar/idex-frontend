'use client'
import { useCreateProject } from "@/hooks/mutations/useCreateProject";
import { useRouter } from "next/navigation";

export default function Home() {

  const { mutateAsync, isPending } = useCreateProject();

  const router = useRouter();
  const handleCreateProject = async () => {
    try {
      const res = await mutateAsync();
      console.log("Project Created Successfully", res);
      router.push(`/project/${res.projectId}`);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Create project</h1>
      <button onClick={handleCreateProject}>Create</button>
      {isPending && <p>Creating project...</p>}
    </div>
  );
}
