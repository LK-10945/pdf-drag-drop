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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          📄 Secure PDF Uploader
        </h1>

        {!session ? (
          <Auth />
        ) : (
          <>
            <p className="text-gray-700 mb-6">
              ✅ Logged in as{" "}
              <span className="font-semibold">{session.user.email}</span>
            </p>

            <div className="flex flex-col items-center gap-4">
              <LogoutButton />
              <PDFDropZone />
            </div>
          </>
        )}
      </div>
    </div>
  );
}



