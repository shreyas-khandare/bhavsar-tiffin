import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // delete secure auth cookie
  res.cookies.set("auth_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  // delete UI indicator
  res.cookies.set("admin_ui", "", {
    httpOnly: false,
    path: "/",
    maxAge: 0,
  });

  return res;
}
