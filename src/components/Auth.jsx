import { useState } from "react";
import { supabase } from "../supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("❌ Login failed: " + error.message);
    setBusy(false);
  };

  const signup = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("❌ Signup failed: " + error.message);
    else alert("✅ Check your email to confirm signup.");
    setBusy(false);
  };

  return (
    <form onSubmit={login} style={{ display: "grid", gap: 12, maxWidth: 300 }}>
      <h2>Sign In or Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: 8 }}
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: 8 }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={busy} style={{ padding: "8px 12px" }}>
          {busy ? "…" : "Sign In"}
        </button>
        <button onClick={signup} disabled={busy} style={{ padding: "8px 12px" }}>
          {busy ? "…" : "Sign Up"}
        </button>
      </div>
    </form>
  );
}


