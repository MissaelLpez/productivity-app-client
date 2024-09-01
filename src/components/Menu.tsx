import { RootState } from "@/store/store";
import { MenuIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const isOpen = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch();

  return <MenuIcon />;
};

export default Menu;
