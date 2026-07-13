import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "lasu_token";

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

// Payload should be small: { id, role } is enough. Never put the password in here.
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function setAuthCookie(token) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAuthCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

// Call this inside a Server Component or API route to get the logged-in user's payload
export function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
