import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { area, name, phone, meal, weekend, startDate, notes } = body;

    const db = await getDb();

    await db.collection("leads").insertOne({
      area: area || null,
      name: name || null,
      phone: phone || null,
      meal: meal || null,
      weekend: weekend || null,
      startDate: startDate || null,
      notes: notes || null,
      status: "new",
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead Submit Error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
