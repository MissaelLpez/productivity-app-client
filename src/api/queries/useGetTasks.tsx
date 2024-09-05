import { graphqlClient } from "@/gqlClient";
import { GetAllTasksDataResponse, Stats } from "@/vite-env";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      name
      description
      status
      defined_time
      redefined_time
      started_at
      finish_in
      completed_at
      paused_in
      list_number
    }
  }
`;

const gqlRequest = async () => {
  const data = await graphqlClient.request<GetAllTasksDataResponse>(
    GET_ALL_TASKS
  );

  const { getAllTasks: tasks } = data;

  const all = tasks;
  const todo = tasks.filter(
    (task) => task.status === "todo" || task.status === "paused"
  );
  const inProgress = tasks.filter(
    (task) => task.status === "in_progress" || task.status === "continuing"
  );

  const stats: Stats = {
    completed: 0,
    todo: todo.length,
    inProgress: inProgress.length,
    focusedTime: { hours: 0, minutes: 0, seconds: 0 },
  };

  return { all, todo, inProgress, stats };
};

const useGetTasks = () => {
  return useQuery({
    queryKey: ["all-tasks"],
    queryFn: gqlRequest,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetTasks;
