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