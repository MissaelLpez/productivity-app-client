import useGetTasks from "@/api/queries/useGetTasks";

const useGetTaskById = (taskId: number) => {
  const { tasks } = useGetTasks();

  const task = tasks.find((elm) => elm.id === taskId);

  return { task };
};

export default useGetTaskById;
