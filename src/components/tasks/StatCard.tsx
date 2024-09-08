import { Card } from "../ui/card";

interface Props {
  title: string;
  value: string | number;
  name: string;
}

const StatCard = ({ title, value, name }: Props) => {
  return (
    <Card className="col-span-3 lg:col-span-1 text-center shadow-xl rounded-xl bg-gradient-to-t from-primary-200 dark:from-primary-600 from-10% via-transparent via-80% to-primary-700 to-90% border-0 min-h-32 break-words">
      <div className="rounded-xl p-5 backdrop-blur-3xl w-full h-full">
        <p className="tracking-wider font-medium">{title}</p>

        <p className="text-xl lg:text-4xl 2xl:text-5xl font-bold my-2 lg:my-5">
          {value}
        </p>

        <p className="tracking-wider font-bold text-lg">{name}</p>
      </div>
    </Card>
  );
};

export default StatCard;
