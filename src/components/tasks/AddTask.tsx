import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const AddTask = () => {
  return (
    <div className="w-full mb-5 hidden lg:flex">
      <Button className="rounded-xl ml-auto">
        <Plus /> Agregar Tarea
      </Button>
    </div>
  );
};

export default AddTask;
