import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    // --- AUTH ---
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value; // FIX cookie name

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // --- DB FETCH ---
    const db = await getDb();
    const leads = await db.collection("leads")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    // --- EMPTY STATE ---
    if (!leads.length) {
      return new NextResponse("No leads available", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // --- CSV GEN ---
    const header = [
      "Area",
      "Name",
      "Phone",
      "Meal",
      "Weekend",
      "Start",
      "Notes",
      "Status",
      "Created"
    ];

    const rows = leads.map(l => [
      l.area || "",
      l.name || "",
      l.phone || "",
      l.meal || "",
      l.weekend || "",
      l.startDate || "",
      (l.notes || "").replace(/,/g, ";"),
      l.status || "new",
      l.createdAt ? new Date(l.createdAt).toISOString() : ""
    ]);

    const csv =
      header.join(",") +
      "\n" +
      rows.map(r => r.join(",")).join("\n");

    // --- RESPONSE ---
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads.csv"`
      }
    });

  } catch (err) {
    console.error("CSV EXPORT ERROR:", err);
    return NextResponse.json({ error: "Failed to export" }, { status: 500 });
  }
}
