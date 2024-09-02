import useGetTasks from "@/api/queries/useGetTasks";
import TaskCard from "@/components/tasks/TaskCard";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

const TasksList = () => {
  const { tasks } = useGetTasks();
  const [list, setList] = useState(tasks);

  /* execute in drag end */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setList((list) => {
      const oldIndex = list.findIndex((task) => task.id === active.id);
      const newIndex = list.findIndex((task) => task.id === over?.id);

      const newOrder = arrayMove(list, oldIndex, newIndex);

      return newOrder;
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {/* Sortable List */}
      <SortableContext items={list} strategy={verticalListSortingStrategy}>
        {/* Render task card component */}
        {list.map((elm) => (
          <TaskCard key={elm.id} task={elm} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TasksList;
