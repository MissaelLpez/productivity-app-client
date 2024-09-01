import { setOpenMenu } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import { MenuIcon } from "lucide-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const isOpen = useSelector((state: RootState) => state.menu.menuOpen);
  const dispatch = useDispatch();

  return (
    <div className="block lg:hidden">
      <MenuIcon onClick={() => dispatch(setOpenMenu())} />
      <Drawer
        open={isOpen}
        onClose={() => dispatch(setOpenMenu())}
        direction="left"
      >
        <div className="bg-white dark:bg-dark h-screen">Options</div>
      </Drawer>
    </div>
  );
};

export default Menu;
