import useUpdateTask from "@/api/mutations/useUpdateTask";
import useGetTasks from "@/api/queries/useGetTasks";
import { Task, UpdateTaskInput } from "@/vite-env";
import { CircleCheck, PauseCircle, PlayCircle, RotateCcw } from "lucide-react";

interface Props {
  task: Task;
}

const TaskTimerActions = ({ task }: Props) => {
  const { stats } = useGetTasks();
  const { updateTask } = useUpdateTask();
  const currentTime = Date.now();

  /* Functions */
  const update = (updateTaskInput: UpdateTaskInput) => {
    if (updateTaskInput.status === "in_progress" && stats.inProgress > 0) {
      return alert(
        "Ya hay una tarea en progreso. Terminala on pausala para empezar una nueva"
      );
    }

    updateTask({
      variables: {
        updateTaskInput,
      },
    });

    return;
  };

  return (
    <div className="flex gap-x-5">
      <RotateCcw
        size={50}
        className="cursor-pointer text-primary-200 hover:text-primary-700"
      />

      {/* Start task */}
      {task.status === "todo" && (
        <PlayCircle
          onClick={() =>
            update({
              id: task.id,
              started_at: currentTime,
              status: "in_progress",
            })
          }
          size={50}
          className="cursor-pointer text-primary-200 hover:text-primary-700"
        />
      )}

      {/* Pause task */}
      {(task.status === "in_progress" || task.status === "continuing") && (
        <PauseCircle
          onClick={() =>
            update({
              id: task.id,
              status: "paused",
              paused_in: currentTime,
            })
          }
          size={50}
          className="cursor-pointer text-primary-200 hover:text-primary-700"
        />
      )}

      {/* Resume task */}
      {task.status === "paused" && (
        <PlayCircle
          onClick={() =>
            update({
              id: task.id,
              status: "continuing",
            })
          }
          size={50}
          className="cursor-pointer text-primary-200 hover:text-primary-700"
        />
      )}

      <CircleCheck
        size={50}
        className="cursor-pointer text-primary-200 hover:text-primary-700"
      />
    </div>
  );
};

export default TaskTimerActions;
