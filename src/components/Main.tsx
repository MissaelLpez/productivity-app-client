import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Outlet } from "@tanstack/react-router";

const Main = () => {
  return (
    <ScrollArea className="p-2 lg:p-5 col-span-5 lg:col-span-3 border-none rounded-xl">
      <Outlet />
    </ScrollArea>
  );
};

export default Main;
