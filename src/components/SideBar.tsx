import useCreateManyTasks from "@/api/mutations/useCreateManyTasks";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "./ui/button";

const SideBar = () => {
  const { pathname } = useLocation();

  const { mutate: createManyTasks, isPending } = useCreateManyTasks();

  /* Menu Items */
  const items = [
    { text: "Pendientes", link: "/" },
    { text: "Completadas", link: "/completed" },
    { text: "Estadisticas", link: "/stats" },
  ];

  return (
    <section className="p-2 lg:p-5 hidden lg:block col-span-1 bg-transparent mr-10">
      <div className="flex flex-col">
        {items.map((elm, i) => (
          <Link
            key={i}
            to={elm.link}
            className={`truncate mb-3 tracking-wider px-4 py-1 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-700 cursor-pointer ${
              pathname === elm.link
                ? "bg-primary-100 dark:bg-primary-700"
                : "bg-transparent"
            }`}
          >
            {elm.text}
          </Link>
        ))}

        <Button
          onClick={() => createManyTasks()}
          disabled={isPending}
          className="rounded-xl bg-primary-700 fixed bottom-16"
        >
          Crear tareas aleatorias
        </Button>
      </div>
    </section>
  );
};

export default SideBar;
