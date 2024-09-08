import { graphqlClient } from "@/gqlClient";
import { setOpenTask } from "@/store/slices/modalSlice";
import { DeleteTaskResponse } from "@/vite-env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useDispatch } from "react-redux";

interface Payload {
  taskId: number;
}

const DELETE_TASK = gql`
  mutation DeleteTask($taskId: Float!) {
    deleteTask(taskId: $taskId) {
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

const gqlRequest = async ({ taskId }: Payload) => {
  const variables = { taskId };
  const data = await graphqlClient.request<DeleteTaskResponse>(
    DELETE_TASK,
    variables
  );
  return data.deleteTask;
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["delete-task"],
    mutationFn: gqlRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all-tasks"] });
      queryClient.refetchQueries({ queryKey: ["tasks-stats"] });
      dispatch(setOpenTask(null));
    },
    onError: () => {
      alert("Ocurrio un error. Intenta nuevamente");
    },
  });
};

export default useDeleteTask;
