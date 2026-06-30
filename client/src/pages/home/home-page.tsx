import type { JSX } from 'react';

export default function HomePage(): JSX.Element {
  return (
    <div className="bg-card text-card-foreground mx-auto w-full max-w-md rounded-xl border p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome 👋</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        The client foundation is running: React Router, the app shell, design tokens, and dark mode
        are all wired up.
      </p>
    </div>
  );
}
