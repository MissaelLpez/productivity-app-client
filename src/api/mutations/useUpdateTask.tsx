import { graphqlClient } from "@/gqlClient";
import { UpdateTaskInput, UpdateTaskResponse } from "@/vite-env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";

interface Payload {
  updateTaskInput: UpdateTaskInput;
}

const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      id
      name
      description
      status
      defined_time
      started_at
      completed_at
      paused_in
      list_number
    }
  }
`;

const gqlRequest = async ({ updateTaskInput }: Payload) => {
  const variables = { updateTaskInput };
  const data = await graphqlClient.request<UpdateTaskResponse>(
    UPDATE_TASK,
    variables
  );
  return data.updateTask;
};

/* Mutation to update a task */
const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-task"],
    mutationFn: gqlRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all-tasks"] });
    },
  });
};

export default useUpdateTask;
