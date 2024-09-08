import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CreateTask from "./tasks/CreateTask";
import EditTask from "./tasks/EditTask";
import Task from "./tasks/Task";

const ModalProvider = () => {
  const taskModalOpen = useSelector(
    (state: RootState) => state.modals.openTask
  );

  const createTaskModalOpen = useSelector(
    (state: RootState) => state.modals.openCreateTask
  );

  const editTaskModalOpen = useSelector(
    (state: RootState) => state.modals.openEditTask
  );

  return (
    <>
      {createTaskModalOpen && <CreateTask />}
      {editTaskModalOpen && <EditTask />}
      {taskModalOpen && <Task />}
    </>
  );
};

export default ModalProvider;
