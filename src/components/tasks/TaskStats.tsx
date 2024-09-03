import useGetTasks from "@/api/queries/useGetTasks";
import StatsCard from "./StatsCard";

const TaskStats = () => {
  const { stats } = useGetTasks();

  const {
    focusedTime: { hours, minutes },
  } = stats;

  return (
    <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 mb-5 gap-2 lg:gap-5">
      <StatsCard title="Tareas Pendientes" value={stats.todo} />
      <StatsCard title="Tareas Completadas" value={stats.completed} />
      <StatsCard
        title="Tiempo enfocado"
        value={`${hours < 10 && "0"}${hours}:${minutes < 10 && "0"}${minutes}`}
      />
    </div>
  );
};

export default TaskStats;
