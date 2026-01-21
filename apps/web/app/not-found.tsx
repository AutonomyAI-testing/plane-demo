import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-surface-1">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-lg text-secondary">Page not found</p>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
