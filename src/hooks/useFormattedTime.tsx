import { Task } from "@/vite-env";

interface Props {
  task: Task | null | undefined;
  time?: number;
  inStats?: boolean;
}

const useFormattedTime = ({ task, time = 0, inStats = false }: Props) => {
  if (!task && !inStats) {
    return { formattedTime: "" };
  }

  let milliseconds = Number(task?.redefined_time);

  if (task?.status === "completed") {
    milliseconds = Number(task?.defined_time) - Number(task?.remaining_time);
  }

  if (inStats) {
    milliseconds = time;
  }

  const totalSeconds = Math.floor(milliseconds / 1000);

  /* Calculate hours, minutes, and seconds */
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const totalMinutes = minutes + hours * 60;

  /* Format to two digits */
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  /* Result in hh:mm:ss format */
  const formattedTime =
    hours > 0
      ? `${String(formattedHours).padStart(
          2,
          "0"
        )}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`;

  return { formattedTime, minutes: totalMinutes, seconds };
};

export default useFormattedTime;
