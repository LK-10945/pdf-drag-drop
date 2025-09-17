import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Auth from "./components/Auth";
import LogoutButton from "./components/LogoutButton";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>📄 Secure PDF Uploader</h1>
      {!session ? (
        <Auth />
      ) : (
        <>
          <p>✅ Logged in as {session.user.email}</p>
          <LogoutButton />
        </>
      )}
    </div>
  );
}

