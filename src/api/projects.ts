import { apiClient } from "@/lib";

export const createProjectApi = async (payload: { name: string; description: string }) => {
    try {
        const response = await apiClient.post('/projects', payload);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export const getProjectTree = async ({ projectId }: { projectId: string }) => {
    try {
        const response = await apiClient.get(`/projects/${encodeURIComponent(projectId)}/tree`);
        console.log(response.data);
        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching project tree:', error);
        throw error;
    }
}