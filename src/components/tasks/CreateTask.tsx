import useCreateTask from "@/api/mutations/useCreateTask";
import { setOpenCreateTask } from "@/store/slices/modalSlice";
import { RootState } from "@/store/store";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

const CreateTask = () => {
  const { createTask } = useCreateTask();
  const isOpen = useSelector((state: RootState) => state.modals.openCreateTask);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    const data = { ...form, defined_time: "3600000" };

    createTask({ variables: { createTaskInput: data } });

    dispatch(setOpenCreateTask());
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
              autoComplete="true"
              required
            />
          </label>

          <label>
            Descripcion
            <input
              name="description"
              placeholder="Pagina web para ..."
              className="bg-transparent border border-primary-500 rounded-xl p-2 w-full mt-2 mb-4 outline-none"
              autoComplete="true"
              required
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

export default CreateTask;
