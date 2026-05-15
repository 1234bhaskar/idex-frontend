'use client'
import { createProjectApi } from "@/api/projects";
import { useApiMutation } from "../useApi";

export const useCreateProject = () => {
    return useApiMutation('projects', 'POST', {
        mutationFn: createProjectApi,
        onSuccess: (data) => {
            console.log("Project created successfully", data);
        },
        onError: (error) => {
            console.log("Error creating project", error);
        }
    });
}