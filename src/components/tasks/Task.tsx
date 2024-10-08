import useDeleteTask from "@/api/mutations/useDeleteTask";
import useFormattedTime from "@/hooks/useFormattedTime";
import useGetTaskById from "@/hooks/useGetTaskById";
import { setOpenEditTask, setOpenTask } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";
import { Edit, TrashIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskCountdown from "./TaskCountdown";
import TaskTimerActions from "./TaskTimerActions";

const Task = () => {
  /* Modal state */
  const isOpen = useSelector((state: RootState) => state.modals.openTask);

  /* Task data */
  const taskInRedux = useSelector((state: RootState) => state.modals.task);

  const { task, isLoading } = useGetTaskById(Number(taskInRedux?.id));

  /* Hooks */
  const { formattedTime } = useFormattedTime({
    task,
  });
  const { mutate: deleteTask, isPending } = useDeleteTask();

  const dispatch = useDispatch();

  if (!task) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setOpenTask(task))}>
      <DialogContent className="bg-white dark:bg-dark text-dark dark:text-white h-11/12 w-11/12 border-primary-200">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center mb-5 md:mb-10">
            <DialogTitle className="text-lg md:text-xl font-medium">
              Detalles de la Tarea
            </DialogTitle>

            {(task.status === "paused" || task.status === "todo") && (
              <div className="flex gap-5 mt-2">
                <TrashIcon
                  onClick={() => deleteTask({ taskId: task.id })}
                  size={30}
                  className="cursor-pointer text-primary-500 hover:text-primary-900"
                />
                <Edit
                  onClick={() => dispatch(setOpenEditTask())}
                  size={30}
                  className="cursor-pointer text-primary-500 hover:text-primary-700"
                />
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <p className="first-letter:uppercase font-bold text-2xl mb-2">
              {task.name}
            </p>
            <p className="first-letter:uppercase tracking-wide text-base">
              {task.description}
            </p>
          </div>

          <div className="mb-5 md:mb-10 w-48 h-48 md:w-64 md:h-64 bg-transparent border-8 $border-primary-500 rounded-full flex justify-center items-center">
            {task.status === "in_progress" || task.status === "continuing" ? (
              <TaskCountdown taskId={task.id} />
            ) : (
              <p className="text-3xl text-dark dark:text-white">
                {isLoading || isPending ? "--:--" : formattedTime}
              </p>
            )}
          </div>

          {isLoading || isPending ? (
            <div className="my-5 md:my-10"></div>
          ) : (
            <>
              {task.status === "completed" && (
                <p className="text-2xl">Completada</p>
              )}

              <div className="my-10">
                {task.status !== "completed" && (
                  <TaskTimerActions taskId={task.id} />
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Task;
