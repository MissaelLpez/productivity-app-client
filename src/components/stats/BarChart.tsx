import useGetStats from "@/api/queries/useGetStats";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart as Chart, XAxis } from "recharts";

const BarChart = () => {
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
    <div className="col-span-2 flex flex-col border border-primary-200 items-center justify-center text-center">
      <div className="flex flex-col w-full">
        <p className="text-2xl font-bold my-5">Tareas completadas por dia</p>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <Chart data={stats.tasksCompletedByWeek[0].days}>
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
