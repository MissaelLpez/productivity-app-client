import useGetTasks from "@/api/queries/useGetTasks";
import StatsCard from "./StatsCard";

const TaskStats = () => {
  const { data } = useGetTasks();

  if (!data) {
    return null;
  }

  const { stats, all } = data;

  const {
    focusedTime: { hours, minutes },
  } = stats;

  return (
    <section className="border-l border-primary-900 p-2 lg:p-5 hidden lg:flex flex-col gap-y-5 col-span-1 bg-transparent">
      {all.length ? (
        <>
          <StatsCard title="Tareas Pendientes" value={stats.todo} />
          <StatsCard title="Tareas Completadas" value={stats.completed} />
          <StatsCard
            title="Tiempo enfocado"
            value={`${hours < 10 && "0"}${hours}:${
              minutes < 10 && "0"
            }${minutes}`}
          />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default TaskStats;
