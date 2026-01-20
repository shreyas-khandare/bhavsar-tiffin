import jwt from "jsonwebtoken";

export async function authAdmin(req) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
