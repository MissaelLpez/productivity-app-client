import useFormattedTime from "@/hooks/useFormattedTime";
import { setOpenTask } from "@/store/slices/modalSlice";
import { Task } from "@/vite-env";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { Card } from "../ui/card";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  /* Hooks */
  const { formattedTime } = useFormattedTime({ task, used_in: "card" });
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

  return (
    <Card
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="flex justify-between p-5 rounded-xl cursor-pointer h-32 z-50"
      onClick={() => dispatch(setOpenTask(task))}
    >
      {/* Task name and description */}
      <div className="w-10/12">
        <p className="text-xl first-letter:uppercase tracking-wide font-bold mb-6">
          {task.name}
        </p>
        <p className="text-base truncate overflow-hidden first-letter:uppercase tracking-wide">
          {task.description}
        </p>
      </div>

      {/* Task actions */}
      <div className="w-1/12 flex flex-col items-center">
        <div className="flex gap-x-1 justify-center items-center">
          <Clock size={20} />
          <p>{formattedTime}</p>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
