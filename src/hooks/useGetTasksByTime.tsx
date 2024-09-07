import useGetTasks from "@/api/queries/useGetTasks";
import { Stats, Task } from "@/vite-env";

interface Props {
  type: "short" | "medium" | "long" | "all";
  status: "completed" | "in_progress";
}

const useGetTasksByTime = ({
  type,
  status,
}: Props): { tasks: Task[]; stats: Stats | null; isLoading: boolean } => {
  const { data: tasks, isLoading, isFetching, isPending } = useGetTasks();

  if (!tasks) {
    return {
      tasks: [],
      stats: null,
      isLoading: isLoading || isFetching || isPending,
    };
  }

  /* To in progress list */
  if (status === "in_progress") {
    const { todo, stats } = tasks;
    let filterTasks = todo;

    if (type === "short") {
      const shorts = todo.filter((elm) => Number(elm.defined_time) <= 1800000);

      filterTasks = shorts;
    }

    if (type === "medium") {
      const mediums = todo.filter(
        (elm) =>
          Number(elm.defined_time) > 1800000 &&
          Number(elm.defined_time) <= 2700000
      );

      filterTasks = mediums;
    }

    if (type === "long") {
      const long = todo.filter((elm) => Number(elm.defined_time) > 2700000);

      filterTasks = long;
    }

    return {
      tasks: filterTasks,
      stats,
      isLoading: isLoading || isFetching || isPending,
    };
  }

  /* To completed list */
  const { completed, stats } = tasks;
  let filterTasks = completed;

  if (type === "short") {
    const shorts = completed.filter(
      (elm) => Number(elm.defined_time) <= 1800000
    );

    filterTasks = shorts;
  }

  if (type === "medium") {
    const mediums = completed.filter(
      (elm) =>
        Number(elm.defined_time) > 1800000 &&
        Number(elm.defined_time) <= 2700000
    );

    filterTasks = mediums;
  }

  if (type === "long") {
    const long = completed.filter((elm) => Number(elm.defined_time) > 2700000);

    filterTasks = long;
  }

  return {
    tasks: filterTasks,
    stats,
    isLoading: isLoading || isFetching || isPending,
  };
};

export default useGetTasksByTime;
