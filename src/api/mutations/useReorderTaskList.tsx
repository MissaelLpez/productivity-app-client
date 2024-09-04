import { gql, useMutation } from "@apollo/client";

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

/* Mutation to change order task list */
const useReorderTaskList = () => {
  const [reorderTasks, { data }] = useMutation(REORDER_TASK_LIST);
  return { reorderTasks, data };
};

export default useReorderTaskList;
