import useUpdateTask from "@/api/mutations/useUpdateTask";
import useGetTaskById from "@/hooks/useGetTaskById";
import { setOpenEditTask } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";
import { UpdateTaskInput } from "@/vite-env";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useState } from "react";
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

const EditTask = () => {
  const { mutate: updateTask } = useUpdateTask();
  const taskInState = useSelector((state: RootState) => state.modals.task);
  const isOpen = useSelector((state: RootState) => state.modals.openEditTask);
  const dispatch = useDispatch();

  const { task } = useGetTaskById(Number(taskInState?.id));
  const [formState, setFormState] = useState({
    description: String(task?.description),
    custom_time: String(Number(task?.defined_time) / 1000 / 60),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    let value = e.target.value;

    if (field === "custom_time" && Number(value) > 120) {
      value = "120";
    }

    if (field === "custom_time" && Number(value) < 0) {
      value = "0";
    }

    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    const { description, defined_time, custom_time } = form;

    const milliseconds =
      custom_time !== ""
        ? String(Number(custom_time) * 60 * 1000)
        : String(defined_time);

    const data: UpdateTaskInput = {
      id: Number(task?.id),
      description: String(description),
      defined_time: milliseconds,
      redefined_time: milliseconds,
      status: "todo",
      started_at: null,
      finish_in: null,
      paused_in: null,
      remaining_time: null,
    };

    updateTask({ updateTaskInput: data });

    dispatch(setOpenEditTask());
  };

  if (!task) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(setOpenEditTask())}>
      <DialogContent className="bg-white dark:bg-dark text-dark dark:text-white h-11/12 w-11/12 border-primary-200">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Editar Tarea
          </DialogTitle>
        </DialogHeader>

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <label>
            Tarea
            <input
              disabled
              name="name"
              placeholder="Crear pagina web"
              className="bg-transparent font-bold border-none rounded-xl p-2 w-full mt-2 mb-4 outline-none"
              value={task.name}
              required
            />
          </label>

          <label>
            Descripcion
            <input
              onChange={handleChange}
              name="description"
              placeholder="Pagina web para ..."
              className="bg-transparent border border-primary-500 rounded-xl p-2 w-full mt-2 mb-4 outline-none"
              autoComplete="off"
              required
              value={formState.description}
              autoFocus
            />
          </label>

          <label className="w-1/2">
            Tiempo Predeterminado
            <Select
              onValueChange={() => {
                setFormState((prev) => ({ ...prev, custom_time: "" }));
              }}
              name="defined_time"
              defaultValue={task.defined_time}
            >
              <SelectTrigger className="w-full mt-2 mb-4 p-2 outline-none rounded-xl border border-primary-500">
                <SelectValue placeholder="Definir tiempo" />
              </SelectTrigger>
              <SelectContent className="text-white outline-none bg-white dark:bg-dark">
                <SelectItem value="1800000">30 mins.</SelectItem>
                <SelectItem value="2700000">45 mins.</SelectItem>
                <SelectItem value="3600000">1 hora</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <label className="w-1/2">
            Tiempo Personalizado (minutos)
            <input
              value={formState.custom_time}
              type="number"
              name="custom_time"
              placeholder="90"
              className="bg-transparent border border-primary-500 rounded-xl p-2 w-full mt-2 mb-4 outline-none"
              autoComplete="off"
              title="Escribe un tiempo en minutos"
              min={1}
              max={120}
              onChange={handleChange}
            />
          </label>

          <Button type="submit" className="my-5 mx-auto rounded-xl w-1/3">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
