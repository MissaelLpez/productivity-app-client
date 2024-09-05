import { Task } from "@/vite-env";

export const getTime = (task: Task | null | undefined) => {
  if (!task) {
    return 0;
  }

  const now = Date.now();
  const definedTimeInMs = Number(task.redefined_time);
  if (isNaN(definedTimeInMs)) {
    return 0;
  }

  if (!task.started_at) {
    return 0;
  }

  const startedAtDate = new Date(
    task.status === "todo" ? task.started_at : task.paused_in
  ).getTime();
  const endTime = now + definedTimeInMs;
  return endTime - now;

  return 0;
};
