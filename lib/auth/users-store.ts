import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type UserFileShape = { users: StoredUser[] };

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

let writeChain: Promise<unknown> = Promise.resolve();

function withUsersStore<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeChain.then(fn, fn);
  writeChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function readFileData(): Promise<UserFileShape> {
  try {
    const raw = await readFile(USERS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as UserFileShape;
    if (!parsed.users || !Array.isArray(parsed.users)) {
      return { users: [] };
    }
    return parsed;
  } catch {
    return { users: [] };
  }
}

async function writeFileData(data: UserFileShape): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function findUserByEmail(
  email: string
): Promise<StoredUser | undefined> {
  const normalized = email.toLowerCase().trim();
  const { users } = await readFileData();
  return users.find((u) => u.email === normalized);
}

export async function createUser(input: {
  id: string;
  email: string;
  passwordHash: string;
}): Promise<StoredUser> {
  return withUsersStore(async () => {
    const data = await readFileData();
    const email = input.email.toLowerCase().trim();
    if (data.users.some((u) => u.email === email)) {
      const err = new Error("Email already registered");
      (err as Error & { statusCode: number }).statusCode = 409;
      throw err;
    }
    const user: StoredUser = {
      id: input.id,
      email,
      passwordHash: input.passwordHash,
      createdAt: new Date().toISOString(),
    };
    data.users.push(user);
    await writeFileData(data);
    return user;
  });
}
