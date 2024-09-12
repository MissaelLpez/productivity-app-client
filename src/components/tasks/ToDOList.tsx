import useReorderTaskList from "@/api/mutations/useReorderTaskList";
import useGetTasks from "@/api/queries/useGetTasks";
import useGetTasksByTime from "@/hooks/useGetTasksByTime";
import { RootState } from "@/store/store";
import { Task } from "@/vite-env";
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
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const ToDoList = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const inProgressFilter = useSelector(
    (state: RootState) => state.filters.inProgressFilter
  );

  const { data } = useGetTasks();
  const { tasks, stats } = useGetTasksByTime({
    status: "in_progress",
    type: inProgressFilter,
  });

  const [list, setList] = useState<Task[]>(tasks);
  const { mutate: reorderTasks } = useReorderTaskList();

  /* execute in drag end */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setList((list) => {
      const oldIndex = list?.findIndex((task) => task.id === active.id);
      const newIndex = list?.findIndex((task) => task.id === over?.id);

      const newOrder = arrayMove(
        list || [],
        Number(oldIndex),
        Number(newIndex)
      );

      const newArray = newOrder.map((task, index) => ({
        id: task.id,
        list_number: index + 1,
      }));

      reorderTasks({ newOrder: newArray });

      return newOrder;
    });
  };

  useEffect(() => {
    setList(tasks);
  }, [tasks]);

  if (!data) {
    return null;
  }

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
          {list?.map((elm) => <TaskCard key={elm.id} task={elm} />)}
        </div>
      </SortableContext>
    </DndContext>
  ) : (
    <h3 className="text-center text-xl font-bold my-10">
      {Number(stats?.inProgress) <= 0 && "Sin tareas pendientes"}
    </h3>
  );
};

export default ToDoList;
