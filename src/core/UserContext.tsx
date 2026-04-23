"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { identifyUser } from "./analytics"
import { getCurrentUser, queryKeys } from "./api"

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: getCurrentUser,
  })
}

export function useCurrentUserState() {
  const currentUserQuery = useCurrentUserQuery()
  const isPending = currentUserQuery.isPending
  const user = currentUserQuery.data ?? null

  return {
    user,
    isPending,
  }
}

export function CurrentUserTracker() {
  const { user } = useCurrentUserState()
  const reportedUserIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!user || reportedUserIdRef.current === user.id) {
      return
    }

    identifyUser(user)
    reportedUserIdRef.current = user.id
  }, [user])

  return null
}

export function useCurrentUser() {
  return useCurrentUserState().user
}
