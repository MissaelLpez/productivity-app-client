import useGetTasks from "@/api/queries/useGetTasks";
import { Helmet } from "react-helmet";

const TasksList = () => {
  const { tasks } = useGetTasks();

  console.log(tasks);

  return (
    <div>
      <Helmet>
        <title>Tareas</title>
        <meta name="description" content="Lista de tareas" />
      </Helmet>
      TaskList
    </div>
  );
};

export default TasksList;
