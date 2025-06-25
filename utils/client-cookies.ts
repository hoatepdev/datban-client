"use client";

import Cookies from "js-cookie";

interface ClientCookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export function getClientCookie(name: string): string | null {
  return Cookies.get(name) || null;
}

export function setClientCookie(
  name: string,
  value: string,
  options: ClientCookieOptions = {},
): void {
  const defaultOptions: ClientCookieOptions = {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...options,
  };

  Cookies.set(name, value, defaultOptions);
}

export function deleteClientCookie(
  name: string,
  options: Pick<ClientCookieOptions, "path" | "domain"> = {},
): void {
  Cookies.remove(name, options);
}

export function getClientJSONCookie<T>(name: string): T | null {
  const value = getClientCookie(name);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function setClientJSONCookie(
  name: string,
  value: any,
  options: ClientCookieOptions = {},
): void {
  setClientCookie(name, JSON.stringify(value), options);
}

export function getAllClientCookies(): Record<string, string> {
  return Cookies.get();
}
