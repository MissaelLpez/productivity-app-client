import useCreateManyTasks from "@/api/mutations/useCreateManyTasks";
import { setOpenMenu } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import { Link, useLocation } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

const Menu = () => {
  const isOpen = useSelector((state: RootState) => state.menu.menuOpen);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { mutate: createManyTasks, isPending } = useCreateManyTasks();

  const items = [
    { text: "Pendientes", link: "/" },
    { text: "Completadas", link: "/completed" },
    { text: "Estadisticas", link: "/stats" },
  ];

  return (
    <div className="block lg:hidden">
      <MenuIcon onClick={() => dispatch(setOpenMenu())} />
      <Drawer
        open={isOpen}
        onClose={() => dispatch(setOpenMenu())}
        direction="left"
      >
        <div className="bg-white dark:bg-dark h-screen py-10 px-5 text-lg flex flex-col">
          {items.map((elm, i) => (
            <Link
              onClick={() => dispatch(setOpenMenu())}
              key={i}
              to={elm.link}
              className={`mb-3 tracking-wider px-4 py-1 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-700 cursor-pointer ${
                pathname === elm.link
                  ? "bg-primary-100 dark:bg-primary-700"
                  : "bg-transparent"
              }`}
            >
              {elm.text}
            </Link>
          ))}

          <Button
            onClick={() => {
              createManyTasks();
              dispatch(setOpenMenu());
            }}
            disabled={isPending}
            className="text-xs rounded-xl bg-primary-700 fixed bottom-16"
          >
            Crear tareas aleatorias
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
