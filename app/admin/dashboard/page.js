"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STATUS = ["new", "contacted", "trial", "confirmed", "dropped"];

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState(null);
  const [error, setError] = useState("");

  // UI auth guard
  useEffect(() => {
    if (!document.cookie.includes("admin_ui=")) {
      router.replace("/admin/login");
    }
  }, []);

  // Data fetch
  useEffect(() => {
    fetch("/api/admin/leads", { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Unauthorized");
          setLeads([]);
          return;
        }
        setLeads(data.leads || []);
      })
      .catch(() => {
        setError("Network error");
        setLeads([]);
      });
  }, []);

  async function updateStatus(id, status) {
    await fetch(`/api/admin/leads/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });

    setLeads((prev) =>
      prev.map((l) => (l._id === id ? { ...l, status } : l))
    );
  }

  function format(d) {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-semibold">Leads Dashboard</h1>

        <button
          className="px-3 py-1 border rounded text-xs sm:text-sm"
          onClick={() => window.open("/api/admin/leads/export", "_blank")}
        >
          Export CSV
        </button>
      </div>

      {error && (
        <div className="border border-red-500 text-red-700 p-2 rounded text-sm">
          {error}
        </div>
      )}

      {leads === null && <div>Loading...</div>}

      {Array.isArray(leads) && leads.length === 0 && (
        <div className="text-sm text-gray-500">No leads yet</div>
      )}

      {Array.isArray(leads) && leads.length > 0 && (
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-[1100px] w-full text-xs sm:text-sm whitespace-nowrap">
            <thead className="bg-gray-100 border-b text-left">
              <tr>
                <th className="p-2">Area</th>
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Meal</th>
                <th className="p-2">Weekend</th>
                <th className="p-2">Start</th>
                <th className="p-2">Notes</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((l) => (
                <tr key={l._id} className="border-b">
                  <td className="p-2">{l.area}</td>
                  <td className="p-2">{l.name}</td>
                  <td className="p-2">+91 {l.phone}</td>
                  <td className="p-2">{l.meal}</td>
                  <td className="p-2">{l.weekend}</td>
                  <td className="p-2">{l.startDate}</td>
                  <td className="p-2">{l.notes}</td>
                  <td className="p-2">
                    <select
                      className="border rounded px-1 py-0.5 text-xs"
                      value={l.status}
                      onChange={(e) => updateStatus(l._id, e.target.value)}
                    >
                      {STATUS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">{format(l.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
