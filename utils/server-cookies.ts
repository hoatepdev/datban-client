// server-cookies.ts
"use server";

import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Server-side cookie operations for Next.js App Router
 */

export async function getServerCookie(name: string): Promise<string | null> {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value || null;
}

export async function setServerCookie(
  name: string,
  value: string,
  options: Partial<ResponseCookie> = {},
): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set(name, value, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...options,
  });
}

export async function deleteServerCookie(name: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(name);
}

export async function getServerJSONCookie<T>(name: string): Promise<T | null> {
  const value = await getServerCookie(name);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function setServerJSONCookie(
  name: string,
  value: any,
  options: Partial<ResponseCookie> = {},
): Promise<void> {
  await setServerCookie(name, JSON.stringify(value), options);
}

export async function getAllServerCookies(): Promise<Record<string, string>> {
  const cookieStore = cookies();
  const cookieList = cookieStore.getAll();
  return cookieList.reduce(
    (acc, cookie) => {
      acc[cookie.name] = cookie.value;
      return acc;
    },
    {} as Record<string, string>,
  );
}
