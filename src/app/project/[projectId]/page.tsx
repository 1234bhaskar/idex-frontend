import { EditorButton } from "@/components/atoms/EditorButton";
import { EditorComponent } from "../../../components/molecules/EditorComponent";

export default async function ProjectPlayground({
    params
}: {
    params: Promise<{ projectId: string }>
}) {
    const resolvedParams = await params;

    console.log("This is a project ID: ", resolvedParams.projectId);
    return (
        <>
            Project Id: {resolvedParams.projectId}
            <div className="flex ">
                <EditorButton label="file.js" isActive={true} />
                <EditorButton label="file.css" isActive={false} />
            </div>
            <EditorComponent />




        </>
    );
}