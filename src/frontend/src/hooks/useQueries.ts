import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddImageUpload() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      filename,
      status,
    }: { filename: string; status: string }) => {
      if (!actor) return false;
      return actor.addImageUpload(filename, status);
    },
  });
}

export function useAddContactSubmission() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: { name: string; email: string; message: string }) => {
      if (!actor) return false;
      return actor.addContactSubmission(name, email, message);
    },
  });
}
