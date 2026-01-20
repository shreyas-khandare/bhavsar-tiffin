"use client";

import { useState } from "react";

export default function LeadFormModal({ open, onClose }) {
  const [area, setArea] = useState("");
  const [otherArea, setOtherArea] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [meal, setMeal] = useState("Lunch");
  const [weekend, setWeekend] = useState("Yes");
  const [startDate, setStartDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    if (!name || !phone) {
      alert("Name & phone required");
      return;
    }

    const finalArea = otherArea || area;

    const payload = {
      area: finalArea,
      name,
      phone,
      meal,
      weekend,
      startDate,
      notes,
    };

    setLoading(true);

    const res = await fetch("/api/leads/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to submit. Try again.");
      return;
    }

    // --- WhatsApp redirect ---
    const msg = encodeURIComponent(
      `Hello, I'm interested in your tiffin service.\n\n` +
      `Name: ${name}\n` +
      `Area: ${finalArea}\n` +
      `Phone: ${phone}\n` +
      `Meal: ${meal}\n` +
      `Weekend: ${weekend}\n` +
      `Start: ${startDate || "NA"}\n` +
      `Notes: ${notes || "None"}`
    );

    window.location.href = `https://wa.me/919967639919?text=${msg}`;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded space-y-4 shadow-lg">
        <h2 className="text-lg font-semibold">Get Tiffin (Pre-Order)</h2>

        {/* Area */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Area / Locality</label>
          <select
            className="border rounded px-2 py-1 w-full text-sm"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="">Select Area</option>
            <option value="Dadar">Dadar</option>
            <option value="Kalyan">Kalyan</option>
            <option value="CSMT">CSMT</option>
            <option value="Pune">Pune</option>
            <option value="Nashik">Nashik</option>
            <option value="Solapur">Solapur</option>
          </select>

          <input
            type="text"
            placeholder="Other area (optional)"
            className="border rounded px-2 py-1 w-full text-sm"
            value={otherArea}
            onChange={(e) => setOtherArea(e.target.value)}
          />
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Phone</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full text-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Meal */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Meal</label>
          <select
            className="border rounded px-2 py-1 w-full text-sm"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          >
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Weekend */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Weekend?</label>
          <select
            className="border rounded px-2 py-1 w-full text-sm"
            value={weekend}
            onChange={(e) => setWeekend(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Start Date (Optional)</label>
          <input
            type="date"
            className="border rounded px-2 py-1 w-full text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Notes (Optional)</label>
          <textarea
            rows={2}
            placeholder="Any diet preference etc."
            className="border rounded px-2 py-1 w-full text-sm"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-3 py-1 text-sm border rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-1 text-sm text-white bg-green-600 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
