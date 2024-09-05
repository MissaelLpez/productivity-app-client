import useReorderTaskList from "@/api/mutations/useReorderTaskList";
import useGetTasks from "@/api/queries/useGetTasks";
import TaskCard from "@/components/tasks/TaskCard";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const TaskList = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { tasks } = useGetTasks();
  const [list, setList] = useState(tasks);
  const { reorderTasks } = useReorderTaskList();

  /* execute in drag end */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setList((list) => {
      const oldIndex = list.findIndex((task) => task.id === active.id);
      const newIndex = list.findIndex((task) => task.id === over?.id);

      const newOrder = arrayMove(list, oldIndex, newIndex);

      const newArray = newOrder.map((task, index) => ({
        id: task.id,
        list_number: index + 1,
      }));

      reorderTasks({ variables: { newOrder: newArray } });

      return newOrder;
    });
  };

  useEffect(() => {
    setList(tasks);
  }, [tasks]);

  return tasks.length ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {/* Sortable List */}
      <SortableContext items={list} strategy={verticalListSortingStrategy}>
        {/* Render task card component */}
        <div className="grid grid-cols-1 gap-y-4">
          {list.map((elm) => (
            <TaskCard key={elm.id} task={elm} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  ) : (
    <h3 className="text-center text-xl font-bold my-10">No hay tareas</h3>
  );
};

export default TaskList;
