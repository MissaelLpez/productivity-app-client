import CreateTask from "./tasks/CreateTask";
import EditTask from "./tasks/EditTask";
import Task from "./tasks/Task";

const ModalProvider = () => {
  return (
    <>
      <CreateTask />
      <EditTask />
      <Task />
    </>
  );
};

export default ModalProvider;
