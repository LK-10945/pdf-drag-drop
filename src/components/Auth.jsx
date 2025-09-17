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
    <form onSubmit={login} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          disabled={busy}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {busy ? "…" : "Sign In"}
        </button>
        <button
          onClick={signup}
          disabled={busy}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {busy ? "…" : "Sign Up"}
        </button>
      </div>
    </form>
  );
}
