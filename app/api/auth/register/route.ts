import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/auth/schemas";
import { createUser, findUserByEmail } from "@/lib/auth/users-store";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await createUser({
      id: randomUUID(),
      email,
      passwordHash,
    });
  } catch (e) {
    const status = (e as Error & { statusCode?: number }).statusCode;
    if (status === 409) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    throw e;
  }

  return NextResponse.json({ ok: true });
}
