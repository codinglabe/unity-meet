/**
 * HS256 key material. Production requires JWT_SECRET (≥32 chars).
 * Development falls back to a fixed dev secret so local file auth works without .env.
 */
export function getJwtSecretBytes(): Uint8Array | null {
  const s = process.env.JWT_SECRET;
  if (s && s.length >= 32) {
    return new TextEncoder().encode(s);
  }
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("meetflow-dev-secret-not-for-production");
  }
  return null;
}
