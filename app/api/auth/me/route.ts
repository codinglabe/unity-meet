import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/jwt";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const session = await verifySessionToken(token);
    return NextResponse.json({
      user: { id: session.sub, email: session.email },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
