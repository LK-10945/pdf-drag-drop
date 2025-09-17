import { supabase } from "../supabase";

export default function LogoutButton() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
      alert("❌ Sign out failed: " + error.message);
    } else {
      console.log("✅ Signed out");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Log out
    </button>
  );
}
