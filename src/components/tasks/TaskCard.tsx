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
      className="mb-5 p-5 rounded-xl"
    >
      {task.id} {task.name} list: {task.list_number}
    </Card>
  );
};

export default TaskCard;
