import { GetAllTasksData, Stats, Task } from "@/vite-env";
import { gql, useSuspenseQuery } from "@apollo/client";

export const GET_ALL_TASKS = gql`
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

  const tasks = data.getAllTasks;

  /* Get task stats */
  const completed: Task[] = tasks.filter((task) => task.status === "completed");
  const todo: Task[] = tasks.filter((task) => task.status === "todo");
  const inProgress: Task[] = tasks.filter(
    (task) => task.status === "in_progress"
  );
  const showInTodoList: Task[] = tasks.filter((task) =>
    ["continuing", "paused", "todo"].includes(task.status)
  );

  const rangTime = tasks.reduce((acc, act) => {
    const diff = Number(act.completed_at) - Number(act.started_at);
    return acc + diff;
  }, 0);

  const seconds = rangTime / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  const focusedTime = {
    hours,
    minutes,
    seconds,
  };

  const stats: Stats = {
    completed: completed.length,
    todo: todo.length,
    inProgress: inProgress.length,
    focusedTime,
  };

  console.log(tasks);

  return { tasks, todo, inProgress, showInTodoList, stats };
};

export default useGetTasks;
