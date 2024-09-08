import { Card } from "../ui/card";
import TaskCountdown from "./TaskCountdown";

interface Props {
  title: string;
  value: string | number;
  isProgres?: boolean;
  taskId?: number | null;
}

const StatsCard = ({
  title,
  value,
  isProgres = false,
  taskId = null,
}: Props) => {
  return (
    <Card className="text-center shadow-xl rounded-xl border-0 min-h-32 break-words">
      <div className="rounded-xl p-5 backdrop-blur-3xl w-full h-full">
        {isProgres && <p className="tracking-wider font-medium">En Progreso</p>}

        <p className="text-xl lg:text-4xl 2xl:text-5xl font-bold mb-2 lg:mb-5">
          {isProgres ? <TaskCountdown taskId={Number(taskId)} /> : value}
        </p>
        <p className="tracking-wider font-medium">{title}</p>
      </div>
    </Card>
  );
};

export default StatsCard;
