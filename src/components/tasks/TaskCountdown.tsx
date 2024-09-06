import useUpdateTask from "@/api/mutations/useUpdateTask";
import useCountdown from "@/hooks/useCountdown";
import useGetTaskById from "@/hooks/useGetTaskById";
import { setOpenTask } from "@/store/slices/modalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  taskId: number;
  size?: string;
}

const TaskCountdown = ({ size = "text-3xl", taskId }: Props) => {
  const { task } = useGetTaskById(taskId);
  const { mutate: updateTask } = useUpdateTask();
  const dispatch = useDispatch();

  const currentTime = Date.now();
  const targetTime = new Date(String(task?.finish_in));

  const [hours, minutes, seconds, difference] = useCountdown(
    Number(targetTime)
  );

  useEffect(() => {
    if (Number(hours) <= 0 && Number(minutes) <= 0 && Number(seconds) <= 0) {
      updateTask({
        updateTaskInput: {
          id: Number(task?.id),
          status: "completed",
          completed_at: currentTime,
          remaining_time: "0",
        },
      });
      dispatch(setOpenTask(null));
    }
  }, [hours, minutes, seconds]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      updateTask({
        updateTaskInput: {
          id: Number(task?.id),
          status: "paused",
          redefined_time: String(difference),
        },
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [difference, task?.id, updateTask]);

  const formatTime = (time: number | undefined) =>
    Number(time).toString().padStart(2, "0");

  if (!task) {
    return null;
  }

  return (
    <div>
      <p className={`${size} text-dark dark:text-white`}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
    </div>
  );
};

export default TaskCountdown;
