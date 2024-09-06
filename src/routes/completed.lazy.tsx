import useGetTasks from "@/api/queries/useGetTasks";
import TaskCard from "@/components/tasks/TaskCard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/completed")({
  component: Completed,
});

function Completed() {
  const { data } = useGetTasks();

  if (!data) {
    return null;
  }

  const { completed, stats } = data;

  return stats.completed > 0 ? (
    <div className="grid grid-cols-1 gap-y-4">
      {completed.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  ) : (
    <div>No hay tareas Completadas</div>
  );
}
