import useGetTasks from "@/api/queries/useGetTasks";

const TasksList = () => {
  const { tasks } = useGetTasks();

  console.log(tasks);

  return <div>TasksList</div>;
};

export default TasksList;
