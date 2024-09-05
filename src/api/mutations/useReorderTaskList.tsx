import { graphqlClient } from "@/gqlClient";
import { NewOrderInput, ReorderTaskResponse } from "@/vite-env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";

interface Payload {
  newOrder: NewOrderInput[];
}

const REORDER_TASK_LIST = gql`
  mutation ReorderTasks($newOrder: [NewOrderInput!]!) {
    reorderTasks(newOrder: $newOrder) {
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

const gqlRequest = async ({ newOrder }: Payload) => {
  const variables = { newOrder };
  const data = await graphqlClient.request<ReorderTaskResponse>(
    REORDER_TASK_LIST,
    variables
  );
  return data.reorderTasks;
};

/* Mutation to change order task list */
const useReorderTaskList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reorder-taks"],
    mutationFn: gqlRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all-tasks"] });
    },
  });
};

export default useReorderTaskList;
