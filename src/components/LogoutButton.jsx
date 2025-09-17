import { supabase } from "../supabase";

export default function LogoutButton() {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button onClick={logout} style={{ padding: "8px 12px", marginTop: 12 }}>
      🔒 Logout
    </button>
  );
}


