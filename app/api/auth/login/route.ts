import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE_SEC } from "@/lib/auth/constants";
import { signSessionToken } from "@/lib/auth/jwt";
import { getJwtSecretBytes } from "@/lib/auth/secret";
import { loginSchema } from "@/lib/auth/schemas";
import { findUserByEmail } from "@/lib/auth/users-store";

export async function POST(request: Request) {
  if (!getJwtSecretBytes()) {
    return NextResponse.json(
      { error: "Server misconfiguration: set JWT_SECRET (min 32 characters)" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signSessionToken(user.id, user.email);
  const res = NextResponse.json({ ok: true, email: user.email });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  });
  return res;
}
