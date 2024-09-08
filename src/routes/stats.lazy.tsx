import useGetStats from "@/api/queries/useGetStats";
import BarChart from "@/components/stats/BarChart";
import PieChart from "@/components/stats/PieChart";
import StatCard from "@/components/tasks/StatCard";
import useFormattedTime from "@/hooks/useFormattedTime";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";

export const Route = createLazyFileRoute("/stats")({
  component: Stats,
});

function Stats() {
  const { data: stats, isLoading, isFetching, isPending } = useGetStats();
  const { formattedTime: avgCompletion } = useFormattedTime({
    task: null,
    time: stats?.averageCompletionTime,
    inStats: true,
  });
  const { formattedTime: longTime } = useFormattedTime({
    task: null,
    time:
      Number(stats?.longestTask.defined_time) -
      Number(stats?.longestTask.remaining_time),
    inStats: true,
  });
  const { formattedTime: shortTime } = useFormattedTime({
    task: null,
    time:
      Number(stats?.shortestTask.defined_time) -
      Number(stats?.shortestTask.remaining_time),
    inStats: true,
  });

  if (isLoading || isFetching || isPending) {
    return (
      <h3 className="text-center text-xl font-bold my-10">
        Obteniendo datos...
      </h3>
    );
  }

  if (!stats) {
    return (
      <h3 className="text-center text-xl font-bold my-10">Aun no hay datos</h3>
    );
  }

  return (
    <>
      <Helmet>
        <title>Estadísticas</title>
        <meta name="description" content="Estadísticas de tus tareas" />
      </Helmet>
      <div className="grid grid-cols-3 gap-5">
        <StatCard
          title="Tarea completada en el mayor tiempo"
          value={longTime}
          name={stats.longestTask.name}
        />

        <StatCard
          title="Tarea completada en el menor tiempo"
          value={shortTime}
          name={stats.shortestTask.name}
        />

        <StatCard
          title="Tiempo promedio en completar tareas"
          value={avgCompletion}
          name=""
        />

        <PieChart />

        <BarChart week={stats.tasksCompletedByWeek[0]} isCurrent />

        {stats.tasksCompletedByWeek.length > 1 && (
          <>
            <p className="mt-10 mb-5 text-2xl">Semanas anteriores</p>

            {stats.tasksCompletedByWeek.slice(1).map((week) => (
              <>
                <BarChart week={week} />
              </>
            ))}
          </>
        )}
      </div>{" "}
    </>
  );
}
