"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // redirect if already logged in
  useEffect(() => {
    const hasUI = /(?:^|; )admin_ui=/.test(document.cookie);
    if (hasUI) router.replace("/admin/dashboard");
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error || "Login failed");

    router.replace("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-xs sm:max-w-sm border rounded-lg p-6 shadow-sm space-y-4"
      >
        <h1 className="text-lg sm:text-xl font-semibold text-center">
          Admin Login
        </h1>

        {error && (
          <div className="text-sm text-red-600 border border-red-400 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Login
        </button>

        <div className="text-[10px] sm:text-xs text-center text-gray-400">
          Authorized personnel only
        </div>
      </form>
    </div>
  );
}
