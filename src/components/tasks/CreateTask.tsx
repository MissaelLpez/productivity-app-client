import useCreateTask from "@/api/mutations/useCreateTask";
import { setOpenCreateTask } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";
import { CreateTaskInput } from "@/vite-env";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CreateTask = () => {
  const { mutate: createTask } = useCreateTask();
  const isOpen = useSelector((state: RootState) => state.modals.openCreateTask);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    const { name, description, defined_time, custom_time } = form;

    const milliseconds =
      custom_time !== ""
        ? String(Number(custom_time) * 60 * 1000)
        : String(defined_time);

    const data: CreateTaskInput = {
      name: String(name),
      description: String(description),
      defined_time: milliseconds,
      redefined_time: milliseconds,
    };

    createTask({
      createTaskInput: data,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setOpenCreateTask())}>
      <DialogContent className="bg-white dark:bg-dark text-dark dark:text-white h-1/2 w-11/12 border-primary-200">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Agregar Tarea
          </DialogTitle>
        </DialogHeader>

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <label>
            Tarea
            <input
              name="name"
              placeholder="Crear pagina web"
              className="bg-transparent border border-primary-500 rounded-xl p-2 w-full mt-2 mb-4 outline-none"
              autoComplete="off"
              required
            />
          </label>

          <label>
            Descripcion
            <input
              name="description"
              placeholder="Pagina web para ..."
              className="bg-transparent border border-primary-500 rounded-xl p-2 w-full mt-2 mb-4 outline-none"
              autoComplete="off"
              required
            />
          </label>

          <div className="flex w-full gap-x-10">
            <label className="w-1/2">
              Tiempo
              <Select name="defined_time" defaultValue="3600000">
                <SelectTrigger className="w-full mt-2 p-2 outline-none rounded-xl border border-primary-500">
                  <SelectValue placeholder="Definir tiempo" />
                </SelectTrigger>
                <SelectContent className="text-white outline-none bg-white dark:bg-dark">
                  <SelectItem value="3600000">30 mins.</SelectItem>
                  <SelectItem value="5400000">45 mins.</SelectItem>
                  <SelectItem value="7200000">1 hora</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label className="w-1/2">
              Definir minutos
              <input
                type="number"
                name="custom_time"
                placeholder="90"
                className="bg-transparent border border-primary-500 rounded-xl p-2 w-full mt-2 mb-4 outline-none"
                autoComplete="off"
                title="Escribe un tiempo en minutos"
                min={1}
                max={120}
                onChange={(e) => {
                  if (Number(e.target.value) > 120) {
                    e.target.value = "120";
                  }
                  if (Number(e.target.value) < 0) {
                    e.target.value = "0";
                  }
                }}
              />
            </label>
          </div>

          <Button type="submit" className="my-5 mx-auto rounded-xl w-1/3">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
