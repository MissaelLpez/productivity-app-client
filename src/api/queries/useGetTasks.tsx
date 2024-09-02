import { gql, useSuspenseQuery } from "@apollo/client";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  defined_time: string;
  started_at: string | null;
  completed_at: string | null;
  paused_in: string | null;
  list_number: number;
}

interface GetAllTasksData {
  getAllTasks: Task[];
}

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
