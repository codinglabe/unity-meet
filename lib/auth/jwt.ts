import { SignJWT, jwtVerify } from "jose";
import { SESSION_MAX_AGE_SEC } from "./constants";
import { getJwtSecretBytes } from "./secret";

export type SessionPayload = { sub: string; email: string };

export async function signSessionToken(userId: string, email: string): Promise<string> {
  const secret = getJwtSecretBytes();
  if (!secret) {
    throw new Error("JWT_SECRET is required in production (min 32 characters)");
  }
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionPayload> {
  const secret = getJwtSecretBytes();
  if (!secret) {
    throw new Error("JWT_SECRET is required in production (min 32 characters)");
  }
  const { payload } = await jwtVerify(token, secret);
  const sub = typeof payload.sub === "string" ? payload.sub : "";
  const email = typeof payload.email === "string" ? payload.email : "";
  if (!sub || !email) {
    throw new Error("Invalid session");
  }
  return { sub, email };
}
