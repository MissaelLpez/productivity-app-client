import ToggleTheme from "@/components/ToggleTheme";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-5 h-screen bg-white dark:bg-dark text-dark dark:text-white transition-colors duration-500 ease-in-out">
        <header className="flex justify-between">
          <h1 className=" font-bold text-xl">Productivity App</h1>
          <ToggleTheme />
        </header>

        <main className="py-10 grid grid-cols-4 gap-x-10">
          <section className="border dark:border-transparent bg-white dark:bg-[#18181b] rounded-xl text-center">
            Menu
          </section>
          <section className="col-span-2 border dark:border-transparent bg-white dark:bg-[#18181b] rounded-xl text-center">
            <Outlet />
          </section>
          <section className="border dark:border-transparent bg-white dark:bg-[#18181b] rounded-xl text-center">
            Details
          </section>
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
