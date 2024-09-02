import { GetAllTasksData } from "@/vite-env";
import { gql, useSuspenseQuery } from "@apollo/client";

const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
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

const useGetTasks = () => {
  const { data } = useSuspenseQuery<GetAllTasksData>(GET_ALL_TASKS, {
    fetchPolicy: "cache-and-network",
  });

  return { tasks: data.getAllTasks };
};

export default useGetTasks;
