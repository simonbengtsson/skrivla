import { getSession, queryKeys } from "@/core/api"
import type { QueryClient } from "@tanstack/react-query"
import { redirect } from "@tanstack/react-router"

const LOGIN_PATH = "/luvabase/login"

export async function requireAuthenticatedSession(queryClient: QueryClient) {
  const session = await queryClient.query({
    queryKey: queryKeys.currentUser,
    queryFn: getSession,
    staleTime: 0,
  })

  if (!session.user) {
    throw redirect({
      href: LOGIN_PATH,
      reloadDocument: true,
      replace: true,
    })
  }

  return session
}
