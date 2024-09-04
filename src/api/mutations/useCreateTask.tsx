import { gql, useMutation } from "@apollo/client";
import { GET_ALL_TASKS } from "../queries/useGetTasks";

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

/* Mutation to crate a task */
const useCreateTask = () => {
  const [createTask, { data }] = useMutation(CREATE_TASK, {
    /* Update tasks data */
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });
  return { createTask, data };
};

export default useCreateTask;
