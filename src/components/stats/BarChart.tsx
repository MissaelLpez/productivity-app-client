import useGetStats from "@/api/queries/useGetStats";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WeekStats } from "@/vite-env";
import { Bar, BarChart as Chart, XAxis } from "recharts";

interface Props {
  week: WeekStats;
  isCurrent?: boolean;
}

const BarChart = ({ week, isCurrent = false }: Props) => {
  const { data: stats } = useGetStats();

  const chartConfig = {
    completadas: {
      label: "completadas",
    },
  } satisfies ChartConfig;

  if (!stats) {
    return null;
  }

  return (
    <div
      className={`${
        isCurrent ? "col-span-3 xl:col-span-2" : "col-span-3"
      } flex flex-col border border-primary-200 items-center justify-center text-center`}
    >
      <div className="flex flex-col w-full">
        <p className="flex flex-col text-2xl font-bold my-5">
          Tareas completadas
          <span className="text-base">
            {isCurrent
              ? "Semana actual"
              : `${week.weekStart} - ${week.days[week.days.length - 1].date}`}
          </span>
        </p>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <Chart data={week.days}>
            <XAxis
              className="hidden md:block"
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            />
            <Bar barSize={40} dataKey="count" fill="#f49d0c" radius={4} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          </Chart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default BarChart;
