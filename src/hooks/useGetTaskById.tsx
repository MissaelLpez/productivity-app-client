import useGetTasks from "@/api/queries/useGetTasks";

const useGetTaskById = (taskId: number) => {
  const { data, isLoading, isFetching } = useGetTasks();

  if (!data) {
    return { task: null };
  }

  const { all: tasks } = data;

  const task = tasks.find((elm) => elm.id === taskId);

  return { task, isLoading: isLoading || isFetching };
};

export default useGetTaskById;
