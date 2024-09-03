import { Card } from "../ui/card";

interface Props {
  title: string;
  value: string | number;
}

const StatsCard = ({ title, value }: Props) => {
  return (
    <Card className="text-center shadow-xl rounded-xl bg-gradient-to-t from-primary-200 dark:from-primary-600 from-10% via-transparent via-80% to-primary-700 to-90% border-0 min-h-32 break-words">
      <div className="rounded-xl p-5 backdrop-blur-3xl w-full h-full">
        <p className="text-xl lg:text-4xl 2xl:text-5xl font-bold mb-2 lg:mb-5">
          {value}
        </p>
        <p className="tracking-wider font-medium">{title}</p>
      </div>
    </Card>
  );
};

export default StatsCard;
