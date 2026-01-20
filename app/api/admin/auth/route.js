import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  const { email, password } = await req.json();

  const db = await getDb();
  const admin = await db.collection("admins").findOne({ email });

  if (!admin) {
    return NextResponse.json({ error: "Email not found" }, { status: 401 });
  }

  const ok = bcrypt.compareSync(password, admin.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: admin._id.toString(), email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({ ok: true });

  // HTTP-only token for secure server auth
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 3600,
  });

  // UI cookie for browser logic
  res.cookies.set("admin_ui", "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 3600,
  });

  // delete old cookie if existed
  res.cookies.set("isAdmin", "", {
    httpOnly: false,
    path: "/",
    maxAge: 0
  });

  return res;
}
