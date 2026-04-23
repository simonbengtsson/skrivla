import { getMembers as getLuvabaseMembers } from "luvabase/runtime"
import { DEV_AUTH_ANONYMOUS_VALUE, DEV_AUTH_COOKIE_NAME } from "./core/shared"
import type { LuvabaseMember } from "./core/types"

const DEV_MEMBERS: LuvabaseMember[] = [
  {
    id: "123",
    name: "John Doe",
    imageUrl: "https://i.pravatar.cc/64?img=12",
  },
  {
    id: "456",
    name: "Jane Doe",
    imageUrl: "https://i.pravatar.cc/64?img=32",
  },
  {
    id: "789",
    name: "Alex Doe",
    imageUrl: "https://i.pravatar.cc/64?img=14",
  },
]

export async function getCurrentUser(request: Request): Promise<LuvabaseMember | null> {
  if (import.meta.env.DEV) {
    const selectedUserId = getCookieValue(request, DEV_AUTH_COOKIE_NAME)
    if (selectedUserId === DEV_AUTH_ANONYMOUS_VALUE) {
      return null
    }

    if (selectedUserId) {
      return DEV_MEMBERS.find((member) => member.id === selectedUserId) ?? DEV_MEMBERS[0] ?? null
    }

    return DEV_MEMBERS[0] ?? null
  }

  const id = request.headers.get("x-luvabase-user-id") || request.headers.get("x-luvabase-actor-id")
  const name =
    request.headers.get("x-luvabase-user-name") || request.headers.get("x-luvabase-actor-name")

  if (!id || !name) {
    return null
  }

  return {
    id,
    name,
    imageUrl:
      request.headers.get("x-luvabase-user-image-url") ||
      request.headers.get("x-luvabase-actor-image-url") ||
      null,
  }
}

export async function getMembers(request: Request): Promise<LuvabaseMember[]> {
  if (import.meta.env.DEV) {
    return DEV_MEMBERS
  }

  const members = await getLuvabaseMembers(request)
  return members
}

function getCookieValue(request: Request, cookieName: string) {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) {
    return null
  }

  for (const cookiePart of cookieHeader.split(";")) {
    const [rawName, ...rawValueParts] = cookiePart.trim().split("=")
    if (rawName !== cookieName) {
      continue
    }

    return decodeURIComponent(rawValueParts.join("="))
  }

  return null
}
