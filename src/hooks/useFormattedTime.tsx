import { Task } from "@/vite-env";

interface Props {
  task: Task | null;
  used_in: "card" | "timer";
}

const useFormattedTime = ({ task, used_in }: Props) => {
  if (!task) {
    return { formattedTime: "" };
  }

  let milliseconds = 0;

  if (task.status === "todo" || used_in === "card") {
    console.log(task.name, "in todo", task.defined_time);
    milliseconds = Number(task.defined_time);
  }

  /* if (task.status === "paused") {
    const startedAt = new Date(String(task.started_at));
    const pausedIn = new Date(String(task.paused_in));
    const diff = Number(pausedIn) - Number(startedAt);
    const remainingTime = Number(task.defined_time) - diff;

    milliseconds = remainingTime <= 0 ? 0 : remainingTime;
  }

  if (task.status === "continuing") {
    const startedAt = new Date(String(task.started_at));
    const pausedIn = new Date(String(task.paused_in));
    const diff = Number(pausedIn) - Number(startedAt);
    const remainingTime = Number(task.defined_time) - diff;

    milliseconds = remainingTime <= 0 ? 0 : remainingTime;
  } */

  /* Convert milliseconds to seconds */
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
