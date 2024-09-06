import useGetTasks from "@/api/queries/useGetTasks";
import useFormattedTime from "@/hooks/useFormattedTime";
import StatsCard from "./StatsCard";

const TaskStats = () => {
  const { data } = useGetTasks();
  const { formattedTime } = useFormattedTime({
    task: null,
    time: Number(data?.stats?.focusedTime),
    inStats: true,
  });

  console.log(formattedTime);

  if (!data) {
    return null;
  }

  const { stats, all } = data;

  return (
    <section className="border-l border-primary-900 p-2 lg:p-5 hidden lg:flex flex-col gap-y-5 col-span-1 bg-transparent">
      {all.length ? (
        <>
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
