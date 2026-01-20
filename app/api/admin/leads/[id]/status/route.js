import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const VALID = ["new", "contacted", "trial", "confirmed", "dropped"];

export async function PATCH(req, context) {
  try {
    // AUTH
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // PARAMS — FIX
    const { id } = await context.params;

    // BODY
    const { status } = await req.json();
    if (!VALID.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const db = await getDb();
    await db.collection("leads")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("PATCH /status error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
