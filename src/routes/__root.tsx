import Menu from "@/components/Menu";
import ToggleTheme from "@/components/ToggleTheme";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="h-screen bg-white dark:bg-dark text-dark dark:text-white transition-colors duration-500 ease-in-out">
        <header className="py-5 px-2 lg:py-10 lg:px-10 flex justify-between">
          <Menu />

          <h1 className="font-bold text-xl">Productivity App</h1>
          <ToggleTheme />
        </header>

        <main className="p-5 grid grid-cols-5 gap-x-5">
          <section className="p-2 lg:p-5 hidden lg:block col-span-1 border-none bg-transparent rounded-xl">
            Menu
          </section>

          <section className="p-2 lg:p-5 col-span-5 lg:col-span-4 border-none rounded-xl overflow-hidden">
            <Outlet />
          </section>
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
