import TasksList from "@/pages/tasks/TasksList";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TasksList />
    </Suspense>
  );
}
