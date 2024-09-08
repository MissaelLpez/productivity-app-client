import Header from "@/components/Header";
import Main from "@/components/Main";
import ModalProvider from "@/components/ModalProvider";
import SideBar from "@/components/SideBar";
import TaskStats from "@/components/tasks/TaskStats";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white transition-colors duration-500 ease-in-out">
        <Header />

        <main className="p-5 xl:px-5 2xl:px-5 grid grid-cols-5 gap-x-5">
          <ModalProvider />
          <SideBar />
          <Main />
          <TaskStats />
        </main>
      </div>
    </>
  ),
});
