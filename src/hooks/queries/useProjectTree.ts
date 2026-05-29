import { getProjectTree } from "@/api/projects";
import { useQuery } from "@tanstack/react-query"

export const useProjectTree = (projectId: string) => {
    const { isLoading, isError, data: projectTree, error } = useQuery({
        queryKey: ['projectTree', projectId],
        queryFn: () => getProjectTree({ projectId }),
    });

    return {
        isLoading,
        isError,
        projectTree,
        error
    }
}