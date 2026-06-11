import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/client";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.verifyEmail(token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="card">
        <h1>Email Verified!</h1>
        <p>Your email has been successfully verified. Redirecting to login...</p>
      </main>
    );
  }

  return (
    <main className="card">
      <h1>Verify Email</h1>
      <p className="muted" style={{ marginBottom: "1rem" }}>
        Please enter the verification code to activate your account.
        (For local testing, check your backend console output)
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Verification Token
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            autoComplete="off"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Verifying..." : "Verify"}
        </button>
      </form>
    </main>
  );
}
