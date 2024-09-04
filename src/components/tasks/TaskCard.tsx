import { Task } from "@/vite-env";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { Card } from "../ui/card";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
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
    <Link to={`/tasks/${task.id}`}>
      <Card
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="flex justify-between p-5 rounded-xl cursor-pointer h-32 z-50"
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
        <div className="w-1/12 flex flex-col justify-center items-center">
          <div>
            <PlayCircle size={36} className="hover:text-primary-500" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TaskCard;
