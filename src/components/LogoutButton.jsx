import { supabase } from "../supabase";

export default function LogoutButton() {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      🔒 Logout
    </button>
  );
}




