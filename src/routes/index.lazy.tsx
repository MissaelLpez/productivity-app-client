import ToDo from "@/pages/tasks/ToDo";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToDo />
    </Suspense>
  );
}
