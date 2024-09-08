import useGetTasks from "@/api/queries/useGetTasks";
import useFormattedTime from "@/hooks/useFormattedTime";
import { useLocation } from "@tanstack/react-router";
import StatsCard from "./StatsCard";

const TaskStats = () => {
  const { pathname } = useLocation();
  const { data } = useGetTasks();
  const { formattedTime } = useFormattedTime({
    task: null,
    time: Number(data?.stats?.focusedTime),
    inStats: true,
  });

  if (!data) {
    return null;
  }

  const { stats, all, inProgress } = data;

  return (
    <section className="p-2 lg:p-5 hidden lg:flex flex-col gap-y-5 col-span-1 bg-transparent">
      {all.length ? (
        <>
          {stats.inProgress > 0 && pathname !== "/" && (
            <StatsCard
              title={inProgress[0].name}
              value="1"
              isProgres
              taskId={inProgress[0].id}
            />
          )}
          <StatsCard title="Tareas Pendientes" value={stats.todo} />
          <StatsCard title="Tareas Completadas" value={stats.completed} />
          <StatsCard title="Tiempo enfocado" value={formattedTime} />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default TaskStats;
