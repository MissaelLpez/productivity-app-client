import TaskList from "@/components/tasks/TaskList";
import { Helmet } from "react-helmet";

const ToDo = () => {
  return (
    <div>
      <Helmet>
        <title>Tareas</title>
        <meta name="description" content="Tareas Por hacer" />
      </Helmet>
      <TaskList />
    </div>
  );
};

export default ToDo;
