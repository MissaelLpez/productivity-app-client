import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CreateTask from "./tasks/CreateTask";
import EditTask from "./tasks/EditTask";
import Task from "./tasks/Task";

const ModalProvider = () => {
  const taskModalOpen = useSelector(
    (state: RootState) => state.modals.openTask
  );

  return (
    <>
      <CreateTask />
      <EditTask />
      {taskModalOpen && <Task />}
    </>
  );
};

export default ModalProvider;
