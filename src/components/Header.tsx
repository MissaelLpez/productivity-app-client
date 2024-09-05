import Menu from "./Menu";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <header className="py-5 px-2 lg:py-5 lg:px-10 flex justify-between">
      <Menu />

      <h1 className="font-bold text-xl">Productivity App</h1>
      <p className="block md:hidden">SM</p>
      <p className="hidden md:block lg:hidden">MD</p>
      <p className="hidden lg:block xl:hidden">LG</p>
      <p className="hidden xl:block 2xl:hidden">XL</p>
      <p className="hidden 2xl:block">2XL</p>
      <ToggleTheme />
    </header>
  );
};

export default Header;
