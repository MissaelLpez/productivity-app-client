import { graphqlClient } from "@/gqlClient";
import { setOpenCreateTask } from "@/store/slices/modalSlice";
import { CreateTaskInput, CreateTaskResponse } from "@/vite-env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useDispatch } from "react-redux";

interface Payload {
  createTaskInput: CreateTaskInput;
}

const CREATE_TASK = gql`
  mutation CreateTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
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

const gqlRequest = async ({ createTaskInput }: Payload) => {
  const variables = { createTaskInput };
  const data = await graphqlClient.request<CreateTaskResponse>(
    CREATE_TASK,
    variables
  );
  return data.createTask;
};

/* Mutation to crate a task */
const useCreateTask = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["create-task"],
    mutationFn: gqlRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["all-tasks"] });
      dispatch(setOpenCreateTask());
    },
  });
};

export default useCreateTask;
