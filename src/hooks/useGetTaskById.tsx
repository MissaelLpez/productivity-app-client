import useGetTasks from "@/api/queries/useGetTasks";

const useGetTaskById = (taskId: number) => {
  const { data } = useGetTasks();

  if (!data) {
    return { task: null };
  }

  const { all: tasks } = data;

  const task = tasks.find((elm) => elm.id === taskId);

  return { task };
};

export default useGetTaskById;
