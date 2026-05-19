import { getProjectTree } from '@/api/projects';
import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

type TreeStructureStore = {
    projectId: string | null;
    treeStructure: unknown | null;
    setTreeStructure: () => Promise<unknown>;
    setProjectId: (projectId: string) => void;
};

export const useTreeStructureStore = create<TreeStructureStore>((set, get) => {
    const queryClient = new QueryClient();
    return {
        projectId: null,
        treeStructure: null,
        setTreeStructure: async () => {
            const id = get().projectId;
            const data = await queryClient.fetchQuery({
                queryKey: ['projectTree', id],
                queryFn: () => getProjectTree({ projectId: id as string }),
            });
            console.log(data);

            set({ treeStructure: data });
            return data;
        },
        setProjectId: (projectId: string) => set({ projectId: projectId }),
    }
})
