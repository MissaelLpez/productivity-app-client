import useUpdateTask from "@/api/mutations/useUpdateTask";
import useGetTasks from "@/api/queries/useGetTasks";
import useCountdown from "@/hooks/useCountdown";
import useGetTaskById from "@/hooks/useGetTaskById";
import { setOpenTask } from "@/store/slices/modalSlice";
import { UpdateTaskInput } from "@/vite-env";
import { CircleCheck, PauseCircle, PlayCircle, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";

interface Props {
  taskId: number;
}

const TaskTimerActions = ({ taskId }: Props) => {
  /* Hooks */
  const { task } = useGetTaskById(taskId);
  const { data, isLoading, isFetching } = useGetTasks();
  const { mutate: updateTask, isPending } = useUpdateTask();
  const dispatch = useDispatch();

  const currentTime = Date.now();

  const targetTime = new Date(String(task?.finish_in));

  const [, , , difference] = useCountdown(Number(targetTime));

  if (!data || !task) {
    return null;
  }

  const { stats } = data;

  /* Functions */
  const update = (updateTaskInput: UpdateTaskInput) => {
    if (isPending || isLoading || isFetching) {
      return;
    }

    if (
      (updateTaskInput.status === "in_progress" ||
        updateTaskInput.status === "continuing") &&
      stats.inProgress > 0
    ) {
      return alert(
        "Ya hay una tarea en progreso. Terminala on pausala para empezar una nueva"
      );
    }

    updateTask({ updateTaskInput });

    return;
  };

  return (
    <div className="flex gap-x-5">
      {task.status !== "todo" && (
        <RotateCcw
          onClick={() =>
            update({
              id: task.id,
              started_at: null,
              status: "todo",
              finish_in: null,
              paused_in: null,
              redefined_time: task.defined_time,
              remaining_time: null,
            })
          }
          size={50}
          className="cursor-pointer text-primary-500 hover:text-primary-700"
        />
      )}

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
          className="cursor-pointer text-primary-500 hover:text-primary-700"
        />
      )}

      {/* Pause task */}
      {(task.status === "in_progress" || task.status === "continuing") && (
        <PauseCircle
          onClick={() =>
            update({
              id: task.id,
              status: "paused",
              redefined_time: !isNaN(Number(difference))
                ? String(difference)
                : task.defined_time,
            })
          }
          size={50}
          className="cursor-pointer text-primary-500 hover:text-primary-700"
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
          className="cursor-pointer text-primary-500 hover:text-primary-700"
        />
      )}

      {task.status !== "todo" && (
        <CircleCheck
          onClick={() => {
            update({
              id: task.id,
              status: "completed",
              completed_at: currentTime,
              remaining_time:
                task.status !== "paused"
                  ? String(difference)
                  : String(task.redefined_time),
            });

            dispatch(setOpenTask(null));
          }}
          size={50}
          className="cursor-pointer text-primary-500 hover:text-primary-700"
        />
      )}
    </div>
  );
};

export default TaskTimerActions;
