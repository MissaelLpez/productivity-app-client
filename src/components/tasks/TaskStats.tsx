import useGetTasks from "@/api/queries/useGetTasks";
import StatsCard from "./StatsCard";

const TaskStats = () => {
  const { stats } = useGetTasks();

  const {
    focusedTime: { hours, minutes },
  } = stats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 mb-5 gap-2 lg:gap-5">
      <StatsCard title="Tareas Pendientes" value={stats.todo} />
      <StatsCard title="Tareas Completadas" value={stats.completed} />
      <StatsCard
        title="Tiempo enfocado"
        value={`${hours < 10 && "0"}${hours}:${minutes < 10 && "0"}${minutes}`}
      />
      <StatsCard title="Tiempo enfocado" value={5} />
    </div>
  );
};

export default TaskStats;
