import { gql, useMutation } from "@apollo/client";

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

const useCreateTask = () => {
  const [createTask, { data }] = useMutation(CREATE_TASK);
  return { createTask, data };
};

export default useCreateTask;
