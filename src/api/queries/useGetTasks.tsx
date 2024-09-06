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
      remaining_time
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
  const completed = tasks.filter((elm) => elm.status === "completed");
  const todo = tasks.filter(
    (task) => task.status === "todo" || task.status === "paused"
  );
  const inProgress = tasks.filter(
    (task) => task.status === "in_progress" || task.status === "continuing"
  );

  const focusedTime = completed.reduce((acc, act) => {
    return acc + (Number(act.defined_time) - Number(act.remaining_time));
  }, 0);

  const stats: Stats = {
    completed: completed.length,
    todo: todo.length + inProgress.length,
    inProgress: inProgress.length,
    focusedTime,
  };

  return { all, completed, todo, inProgress, stats };
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
