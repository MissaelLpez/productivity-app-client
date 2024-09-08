import Menu from "./Menu";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <header className="py-5 px-2 lg:py-5 lg:px-10 flex justify-between">
      <Menu />

      <h1 className="font-bold text-xl">Productivity App</h1>

      <ToggleTheme />
    </header>
  );
};

export default Header;
