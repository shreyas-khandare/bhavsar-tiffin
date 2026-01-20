"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const [logged, setLogged] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLogged(document.cookie.includes("admin_ui="));
  }, [pathname]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <footer className="p-4 text-xs text-center text-gray-500 border-t">
      © {new Date().getFullYear()} Bhavsar Tiffin —
      {logged ? (
        <button onClick={logout} className="underline ml-2">
          Logout
        </button>
      ) : (
        <button
          className="underline ml-2"
          onClick={() => router.push("/admin/login")}
        >
          Admin Login
        </button>
      )}
    </footer>
  );
}
