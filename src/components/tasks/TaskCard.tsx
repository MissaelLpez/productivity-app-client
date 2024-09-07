import useFormattedTime from "@/hooks/useFormattedTime";
import { setOpenTask } from "@/store/slices/modalSlice";
import { Task } from "@/vite-env";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CircleCheck, Clock, PauseCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { Card } from "../ui/card";
import TaskCountdown from "./TaskCountdown";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  /* Hooks */
  const { formattedTime } = useFormattedTime({
    task: null,
    time: Number(task.defined_time),
    inStats: true,
  });
  const dispatch = useDispatch();

  /* Sortable hook */
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  /* Draggable component styles */
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const border =
    task.status === "continuing" || task.status === "in_progress"
      ? "border border-primary-500"
      : "border dark:border-transparent";

  return (
    <Card
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className={`flex justify-between p-5 rounded-xl cursor-pointer h-40 z-50 ${border}`}
      onClick={() => dispatch(setOpenTask(task))}
    >
      {/* Task name and description */}
      <div className="w-10/12">
        <p className="text-xl first-letter:uppercase tracking-wide font-bold mb-2">
          {task.name}
        </p>
        <p className="text-lg first-letter:uppercase tracking-wide font-medium mb-6">
          {formattedTime}
        </p>

        <p className="text-base truncate overflow-hidden first-letter:uppercase tracking-wide font-b">
          {task.description}
        </p>
      </div>

      {/* Task actions */}
      <div className="w-1/12 flex flex-col items-center">
        <div className="flex gap-x-1 justify-center items-center">
          {(task.status === "in_progress" || task.status === "continuing") && (
            <div className="flex flex-col items-center justify-center gap-y-1">
              <Clock size={30} />
              <TaskCountdown size="text-sm" taskId={task.id} />
            </div>
          )}

          {task.status === "paused" && <PauseCircle size={30} />}

          {task.status === "todo" && <Clock size={30} />}

          {task.status === "completed" && <CircleCheck size={30} />}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
