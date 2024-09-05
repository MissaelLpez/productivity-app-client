import useCountdown from "@/hooks/useCountdown";
import useGetTaskById from "@/hooks/useGetTaskById";
import { getTime } from "@/utils/getTime";

interface Props {
  taskId: number;
}

const TaskCountdown = ({ taskId }: Props) => {
  const { task } = useGetTaskById(taskId);

  // Obtén el tiempo restante desde ahora hasta el final del temporizador
  const remainingTime = getTime(task);

  // Usa useCountdown para obtener el tiempo restante
  const [days, hours, minutes, seconds] = useCountdown(remainingTime);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  if (!task) {
    return null;
  }

  console.log(`${hours}h:${minutes}m:${seconds}s`);

  return (
    <div>
      <p className="text-3xl text-dark dark:text-white">
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
    </div>
  );
};

export default TaskCountdown;
