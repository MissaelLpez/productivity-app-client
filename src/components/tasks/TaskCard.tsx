import { Task } from "@/vite-env";
import { TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../ui/card";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  useSensors(useSensor(TouchSensor));

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
      className="p-5 rounded-xl cursor-pointer h-32"
    >
      <p className="text-lg capitalize tracking-wide font-bold">{task.name}</p>
      <p className="text-base capitalize tracking-wide">{task.description}</p>
    </Card>
  );
};

export default TaskCard;
