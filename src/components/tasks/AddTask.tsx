import { setOpenCreateTask } from "@/store/slices/modalSlice";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

const AddTask = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full mb-5 flex">
      <Button
        onClick={() => dispatch(setOpenCreateTask())}
        className="rounded-xl ml-auto"
      >
        <Plus />
        <p>Agregar Tarea</p>
      </Button>
    </div>
  );
};

export default AddTask;
