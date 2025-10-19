import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App
});

function App() {
  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </main>
  );
}
