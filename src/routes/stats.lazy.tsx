import useGetStats from "@/api/queries/useGetStats";
import BarChart from "@/components/stats/BarChart";
import PieChart from "@/components/stats/PieChart";
import useFormattedTime from "@/hooks/useFormattedTime";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";

export const Route = createLazyFileRoute("/stats")({
  component: Stats,
});

function Stats() {
  const { data: stats, isLoading, isFetching, isPending } = useGetStats();
  const { formattedTime } = useFormattedTime({
    task: null,
    time: stats?.averageCompletionTime,
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
        <div className="col-span-3 xl:col-span-1 flex flex-col border border-primary-200 items-center justify-center text-center">
          <p>Tarea mas tardada en completarse</p>
          <p>{stats.longestTask.name}</p>
        </div>

        <div className="col-span-3 xl:col-span-1 flex flex-col border border-primary-200 items-center justify-center text-center">
          <p>Tarea mas rapida en completarse</p>
          <p>{stats.shortestTask.name}</p>
        </div>

        <div className="col-span-3 xl:col-span-1 flex flex-col border border-primary-200 items-center justify-center text-center">
          <p>Tiempo promedio en completar tareas</p>
          <p>{formattedTime}</p>
        </div>

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
