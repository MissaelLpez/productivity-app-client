import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CreateTask from "./tasks/CreateTask";
import Task from "./tasks/Task";

const ModalProvider = () => {
  const taskModalOpen = useSelector(
    (state: RootState) => state.modals.openTask
  );

  const createTaskModalOpen = useSelector(
    (state: RootState) => state.modals.openCreateTask
  );

  return (
    <>
      {createTaskModalOpen && <CreateTask />}
      {/* <EditTask /> */}
      {taskModalOpen && <Task />}
    </>
  );
};

export default ModalProvider;
