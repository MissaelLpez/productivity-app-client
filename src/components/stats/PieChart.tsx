import useGetStats from "@/api/queries/useGetStats";
import { Cell, PieChart as Chart, Pie } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const PieChart = () => {
  const { data: stats } = useGetStats();

  if (!stats) {
    return null;
  }

  const chartConfig = {
    short: {
      label: "Corta",
    },
    medium: {
      label: "Media",
    },
    long: {
      label: "Larga",
    },
  } satisfies ChartConfig;

  const COLORS = ["#22c55e", "#0ea5e9", "#7f1d1d"];

  const data = [
    { name: "Corta", value: stats.taskCategories.short },
    { name: "Media", value: stats.taskCategories.medium },
    { name: "Larga", value: stats.taskCategories.long },
  ];

  return (
    <div className="col-span-1 flex flex-col border border-primary-200 items-center justify-center text-center">
      <div className="flex flex-col w-full">
        <p className="text-xl font-bold my-5">
          Tareas completadas por duracion
        </p>
        <ChartContainer
          config={chartConfig}
          className="min-h-[400px] w-full text-center flex"
        >
          <Chart width={1000} height={400} className="mx-auto">
            <Pie
              data={data}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          </Chart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default PieChart;
