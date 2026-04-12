// 🚀 SaaS Clock App Starter (Next.js Style Single File Demo)
// This is a FRONTEND product-level structure (ready to connect backend)

import { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState("");
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("neon");

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const login = () => {
    // fake auth (replace with real backend)
    setUser({ name: "Roy" });
  };

  const logout = () => setUser(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* NAVBAR */}
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">⏱ Clock SaaS</h1>
        <div>
          {user ? (
            <button onClick={logout} className="px-4 py-2 bg-white/10 rounded-xl">Logout</button>
          ) : (
            <button onClick={login} className="px-4 py-2 bg-blue-500 rounded-xl">Login</button>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <div className="w-64 border-r border-white/10 p-4 space-y-4">
          <button className="block w-full text-left">Dashboard</button>
          <button className="block w-full text-left">Themes</button>
          <button className="block w-full text-left">Settings</button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col items-center justify-center">

          {/* CLOCK CARD */}
          <div className="w-80 h-80 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center text-3xl font-bold shadow-2xl">
            {time}
          </div>

          {/* THEME SWITCH */}
          <div className="mt-6 flex gap-3">
            {["neon","ocean","fire"].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className="px-4 py-2 bg-white/10 rounded-lg"
              >
                {t}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
