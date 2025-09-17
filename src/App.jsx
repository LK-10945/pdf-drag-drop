import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Auth from "./components/Auth";
import LogoutButton from "./components/LogoutButton";
import PDFDropZone from "./components/PDFDropZone";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">📄 Secure PDF Uploader</h1>
        {!session ? (
          <Auth />
        ) : (
          <>
            <p className="text-gray-700 mb-4">
              ✅ Logged in as{" "}
              <span className="font-semibold">{session.user.email}</span>
            </p>
            <LogoutButton />
            <PDFDropZone />
          </>
        )}
      </div>
    </div>
  );
}


