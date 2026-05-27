import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="card">
      <h1>Dashboard</h1>
      <p>You are signed in as <strong>{user?.email}</strong>.</p>
      <p className="muted">User ID: {user?.id}</p>
      <p className="muted">
        Member since: {user ? new Date(user.created_at).toLocaleString() : "—"}
      </p>
      <button type="button" onClick={logout}>
        Sign out
      </button>
    </main>
  );
}
