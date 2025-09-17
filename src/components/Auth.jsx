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
    if (error) alert("Login failed: " + error.message);
    setBusy(false);
  };

  const signup = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Signup failed: " + error.message);
    else alert("✅ Check your email to confirm your account.");
    setBusy(false);
  };

  return (
    <form className="space-y-4" onSubmit={login}>
      <h2 className="text-xl font-semibold">Sign in or create an account</h2>

      <input
        className="w-full p-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-70"
          disabled={busy}
          onClick={login}
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-70"
          disabled={busy}
          onClick={signup}
        >
          {busy ? "Creating..." : "Sign up"}
        </button>
      </div>
    </form>
  );
}
