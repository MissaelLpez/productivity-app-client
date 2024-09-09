import {
  setCompletedFilter,
  setInProgressFilter,
} from "@/store/slices/filtersSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  type: "in_progress" | "completed";
}

const FilterTasks = ({ type }: Props) => {
  const inProgressFilter = useSelector(
    (state: RootState) => state.filters.inProgressFilter
  );

  const completedFilter = useSelector(
    (state: RootState) => state.filters.completedFilter
  );

  const dispatch = useDispatch();

  const value = type === "in_progress" ? inProgressFilter : completedFilter;

  const handleChange = (e: string) => {
    if (type === "in_progress") {
      return dispatch(setInProgressFilter(e));
    }

    return dispatch(setCompletedFilter(e));
  };

  return (
    <div className="w-full md:w-1/3 mb-5 z-50">
      <label className="w-full flex gap-x-2 items-center justify-center">
        <p className="mt-2 mb-4">Filtrar: </p>
        <Select
          name="defined_time"
          defaultValue={value}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-full mt-2 mb-4 p-2 outline-none rounded-xl border border-primary-500">
            <SelectValue placeholder="Definir tiempo" />
          </SelectTrigger>
          <SelectContent className="text-dark dark:text-white outline-none bg-white dark:bg-dark">
            <SelectItem value="all">Todas las tareas</SelectItem>
            <SelectItem value="short">Corta duración</SelectItem>
            <SelectItem value="medium">Mediana duración</SelectItem>
            <SelectItem value="long">Larga duración</SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  );
};

export default FilterTasks;
