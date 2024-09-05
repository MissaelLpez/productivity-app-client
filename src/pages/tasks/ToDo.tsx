import useGetTasks from "@/api/queries/useGetTasks";
import AddTask from "@/components/tasks/AddTask";
import TaskCard from "@/components/tasks/TaskCard";
import ToDoList from "@/components/tasks/ToDOList";
import { Helmet } from "react-helmet";

const ToDo = () => {
  const { data } = useGetTasks();

  if (!data) {
    return null;
  }

  const { stats, inProgress } = data;

  return (
    <div>
      <Helmet>
        <title>Tareas</title>
        <meta name="description" content="Tareas Por hacer" />
      </Helmet>

      <AddTask />

      {stats.inProgress > 0 && (
        <div className="mb-4">
          <TaskCard task={inProgress[0]} />
        </div>
      )}
      <ToDoList />
    </div>
  );
};

export default ToDo;
