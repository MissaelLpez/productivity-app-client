import AddTask from "@/components/tasks/AddTask";
import TaskList from "@/components/tasks/TaskList";
import TaskStats from "@/components/tasks/TaskStats";
import { Helmet } from "react-helmet";

const ToDo = () => {
  return (
    <div>
      <Helmet>
        <title>Tareas</title>
        <meta name="description" content="Tareas Por hacer" />
      </Helmet>

      <AddTask />
      <TaskStats />
      <TaskList />
    </div>
  );
};

export default ToDo;
