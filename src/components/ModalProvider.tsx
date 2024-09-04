import CreateTask from "./tasks/CreateTask";
import EditTask from "./tasks/EditTask";

const ModalProvider = () => {
  return (
    <>
      <CreateTask />
      <EditTask />
    </>
  );
};

export default ModalProvider;
