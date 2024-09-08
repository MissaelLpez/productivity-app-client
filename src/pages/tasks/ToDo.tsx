import useGetTasks from "@/api/queries/useGetTasks";
import AddTask from "@/components/tasks/AddTask";
import FilterTasks from "@/components/tasks/FilterTasks";
import TaskCard from "@/components/tasks/TaskCard";
import ToDoList from "@/components/tasks/ToDOList";
import { Helmet } from "react-helmet";

const ToDo = () => {
  const { data, isLoading, isFetching, isPending } = useGetTasks();

  if (isLoading || isFetching || isPending) {
    return (
      <h3 className="text-center text-xl font-bold my-10">
        Obteniendo datos...
      </h3>
    );
  }

  if (!data) {
    return null;
  }

  const { stats, inProgress } = data;

  return (
    <div className="mx-0 md:mx-20">
      <Helmet>
        <title>{stats.inProgress > 0 ? "(1)" : ""} Tareas Pendientes</title>
        <meta name="description" content="Tareas Pendientes" />
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <FilterTasks type="in_progress" />
        <AddTask />
      </div>

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
