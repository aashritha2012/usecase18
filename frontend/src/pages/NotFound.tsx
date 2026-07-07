import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid place-items-center py-24 text-center">
      <div>
        <div className="text-5xl font-bold text-primary">404</div>
        <p className="mt-2 text-muted">This screen doesn't exist.</p>
        <Link to="/" className="btn-primary mt-6">Back to Overview</Link>
      </div>
    </div>
  );
}
