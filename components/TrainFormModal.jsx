"use client";

import { useState } from "react";

export default function TrainFormModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [trainName, setTrainName] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [meal, setMeal] = useState("Lunch");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    if (!name || !trainName || !trainNumber || !arrivalTime) {
      alert("Name, Train Name, Train Number & Arrival required");
      return;
    }

    const msg = encodeURIComponent(
      `TRAIN DELIVERY INQUIRY\n\n` +
      `Name: ${name}\n` +
      `Train Name: ${trainName}\n` +
      `Train Number: ${trainNumber}\n` +
      `From: ${fromStation || "NA"}\n` +
      `To: ${toStation || "NA"}\n` +
      `Arrival: ${arrivalTime}\n` +
      `Meal: ${meal}\n`
    );

    setLoading(true);
    window.location.href = `https://wa.me/919967639919?text=${msg}`;
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded space-y-4 shadow-lg">
        <h2 className="text-lg font-semibold">Train Delivery (Pre-Order)</h2>

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

        {/* Train Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Train Name</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full text-sm"
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
          />
        </div>

        {/* Train Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Train Number</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full text-sm"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
          />
        </div>

        {/* From / To */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">From</label>
            <input
              type="text"
              placeholder="e.g. Mumbai"
              className="border rounded px-2 py-1 w-full text-sm"
              value={fromStation}
              onChange={(e) => setFromStation(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">To</label>
            <input
              type="text"
              placeholder="e.g. Pune"
              className="border rounded px-2 py-1 w-full text-sm"
              value={toStation}
              onChange={(e) => setToStation(e.target.value)}
            />
          </div>
        </div>

        {/* Arrival */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Arrival Time</label>
          <input
            type="text"
            placeholder="e.g. 4:30 PM"
            className="border rounded px-2 py-1 w-full text-sm"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
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
            <option value="Brunch">Brunch</option>
            <option value="Dinner">Dinner</option>
          </select>
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
            {loading ? "Submitting..." : "Send on WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
}
