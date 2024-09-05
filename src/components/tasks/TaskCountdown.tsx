import useCountdown from "@/hooks/useCountdown";
import useGetTaskById from "@/hooks/useGetTaskById";

interface Props {
  taskId: number;
  size?: string;
}

const TaskCountdown = ({ size = "text-3xl", taskId }: Props) => {
  const { task } = useGetTaskById(taskId);

  const targetTime = new Date(String(task?.finish_in));

  const [days, hours, minutes, seconds] = useCountdown(Number(targetTime));

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
