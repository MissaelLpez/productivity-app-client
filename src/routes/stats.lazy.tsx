import useGetStats from "@/api/queries/useGetStats";
import BarChart from "@/components/stats/BarChart";
import PieChart from "@/components/stats/PieChart";
import useFormattedTime from "@/hooks/useFormattedTime";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/stats")({
  component: Stats,
});

function Stats() {
  const { data: stats } = useGetStats();
  const { formattedTime } = useFormattedTime({
    task: null,
    time: stats?.averageCompletionTime,
    inStats: true,
  });

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
      <div className="flex flex-col border border-primary-200 items-center justify-center text-center">
        <p>Tarea mas tardada en completarse</p>
        <p>{stats.longestTask.name}</p>
      </div>

      <div className="flex flex-col border border-primary-200 items-center justify-center text-center">
        <p>Tarea mas rapida en completarse</p>
        <p>{stats.shortestTask.name}</p>
      </div>

      <div className="flex flex-col border border-primary-200 items-center justify-center text-center">
        <p>Tiempo promedio en completar tareas</p>
        <p>{formattedTime}</p>
      </div>

      <BarChart />

      <PieChart />
    </div>
  );
}
