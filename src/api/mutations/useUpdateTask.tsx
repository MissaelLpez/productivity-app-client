import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GET_ALL_TASKS } from "../queries/useGetTasks";

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

const useUpdateTask = (type: "edit" | "status") => {
  const dispatch = useDispatch();

  const [updateTask, { data }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  /* if (type === "status") {
    dispatch(setOpenTask(data));
  } */

  return { updateTask };
};

export default useUpdateTask;
