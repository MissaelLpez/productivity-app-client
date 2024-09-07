import FilterTasks from "@/components/tasks/FilterTasks";
import TaskCard from "@/components/tasks/TaskCard";
import useGetTasksByTime from "@/hooks/useGetTasksByTime";
import { RootState } from "@/store/store";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/completed")({
  component: Completed,
});

function Completed() {
  const completedFilter = useSelector(
    (state: RootState) => state.filters.completedFilter
  );

  const { tasks, stats, isLoading } = useGetTasksByTime({
    status: "completed",
    type: completedFilter,
  });

  if (isLoading) {
    return (
      <h3 className="text-center text-xl font-bold my-10">
        Obteniendo datos...
      </h3>
    );
  }

  if (!tasks) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Tareas Completadas</title>
        <meta name="description" content="Tareas Completadas" />
      </Helmet>

      {Number(stats?.completed) > 0 ? (
        <div className="grid grid-cols-1 gap-y-4">
          <FilterTasks type="completed" />
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <h3 className="text-center text-xl font-bold my-10">
          No hay tareas Completadas
        </h3>
      )}
    </>
  );
}
