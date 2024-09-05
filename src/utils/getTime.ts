import { Task } from "@/vite-env";

export const getTime = (task: Task | null | undefined) => {
  if (!task) {
    return 0;
  }

  const now = Date.now();
  const definedTimeInMs = Number(task.defined_time);
  if (isNaN(definedTimeInMs)) {
    return 0;
  }

  if (task.status === "in_progress") {
    if (!task.started_at) {
      return 0;
    }

    const startedAtDate = new Date(task.started_at).getTime();
    const endTime = startedAtDate + definedTimeInMs;
    return endTime - now; // Tiempo restante desde ahora
  }

  if (task.status === "continuing") {
    if (!task.started_at || !task.paused_in) {
      return 0;
    }

    const startedAtDate = new Date(task.started_at).getTime();
    const pausedInDate = new Date(task.paused_in).getTime();

    // Tiempo transcurrido desde el inicio hasta la pausa
    const elapsedTime = pausedInDate - startedAtDate;

    // Tiempo restante cuando la tarea fue pausada
    const remainingTimeWhenPaused = definedTimeInMs - elapsedTime;

    // Tiempo transcurrido desde la última pausa
    const elapsedSincePause = now - pausedInDate;

    // Tiempo restante actual
    const remainingTime = remainingTimeWhenPaused - elapsedSincePause;

    return remainingTime > 0 ? remainingTime : 0;
  }

  return 0;
};
