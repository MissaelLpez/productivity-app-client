import useGetTaskById from "@/hooks/useGetTaskById";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$taskId")({
  component: Task,
});

function Task() {
  const { taskId } = Route.useParams();
  const { task } = useGetTaskById(Number(taskId));

  if (!task) {
    return null;
  }

  return <div className="text-dark dark:text-white">{task.name}</div>;
}
