import useUpdateTask from "@/api/mutations/useUpdateTask";
import useFormattedTime from "@/hooks/useFormattedTime";
import { setOpenTask } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskTimerActions from "./TaskTimerActions";

const Task = () => {
  /* Modal state */
  const isOpen = useSelector((state: RootState) => state.modals.openTask);

  /* Task data */
  const task = useSelector((state: RootState) => state.modals.task);

  /* Hooks */
  const { updateTask } = useUpdateTask();
  const { minutes, seconds } = useFormattedTime({
    task,
    used_in: "timer",
  });
  const dispatch = useDispatch();

  const currentTime = Date.now();

  if (!task) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setOpenTask(task))}>
      <DialogContent className="bg-white dark:bg-dark text-dark dark:text-white h-3/4 w-11/12 border-primary-200">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Detalles de la Tarea
          </DialogTitle>
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

          <div className="mb-8 w-64 h-64 bg-transparent border-8 border-primary-500 rounded-full flex justify-center items-center">
            <p className="text-3xl">
              {minutes}:{seconds}
            </p>
          </div>

          <TaskTimerActions task={task} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Task;
