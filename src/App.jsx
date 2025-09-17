export default function App() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  console.log("SUPABASE_URL:", url);
  console.log("SUPABASE_ANON_KEY exists:", Boolean(key));

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>✅ App mounted</h1>
      <p>If you can see this, the entry/mount is fine.</p>
    </div>
  );
}




