import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Auth from "./components/Auth";
import PDFDropZone from "./components/PDFDropZone";
import LogoutButton from "./components/LogoutButton";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    // Subscribe to changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub?.subscription?.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">📄 Secure PDF Uploader</h1>
          {session && <LogoutButton />}
        </header>

        {!session ? (
          <div className="bg-white rounded-xl shadow p-6">
            <Auth />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <PDFDropZone />
          </div>
        )}
      </div>
    </div>
  );
}



