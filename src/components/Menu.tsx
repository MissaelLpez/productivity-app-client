import { setOpenMenu } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import { Link, useLocation } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const isOpen = useSelector((state: RootState) => state.menu.menuOpen);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const items = [
    { text: "Pendientes", link: "/" },
    { text: "Completadas", link: "/complets" },
    { text: "Todas", link: "/all" },
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
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
