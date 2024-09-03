import Menu from "@/components/Menu";
import ModalProvider from "@/components/ModalProvider";
import ToggleTheme from "@/components/ToggleTheme";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white transition-colors duration-500 ease-in-out">
        <header className="py-5 px-2 lg:py-10 lg:px-10 flex justify-between">
          <Menu />

          <h1 className="font-bold text-xl">Productivity App</h1>
          <p className="block md:hidden">SM</p>
          <p className="hidden md:block lg:hidden">MD</p>
          <p className="hidden lg:block xl:hidden">LG</p>
          <p className="hidden xl:block 2xl:hidden">XL</p>
          <p className="hidden 2xl:block">2XL</p>
          <ToggleTheme />
        </header>

        <main className="p-5 xl:px-72 2xl:px-80 grid grid-cols-5 gap-x-5">
          <ModalProvider />
          <section className="p-2 lg:p-5 hidden lg:block col-span-1 border-none bg-transparent rounded-xl">
            <div className="py-16">
              <ul>
                <li className="mb-3 tracking-wider">
                  <Link to="/">Tareas Pendientes</Link>
                </li>
              </ul>
            </div>
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
