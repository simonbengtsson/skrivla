const MCP_AUTHORIZATION_SERVER = "https://auth.luvabase.com"

export type McpOAuthEnv = {
  LUVABASE_POD_URL?: string
}

const MCP_OAUTH_CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-expose-headers": "WWW-Authenticate",
}

export function mcpUnauthorizedResponse(request: Request, env: McpOAuthEnv) {
  const resourceMetadata = new URL(
    "/.well-known/oauth-protected-resource",
    canonicalPodOrigin(request, env),
  )

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      ...MCP_OAUTH_CORS_HEADERS,
      "www-authenticate": `Bearer resource_metadata="${resourceMetadata.href}"`,
    },
  })
}

export function handleOAuthProtectedResourceMetadataRequest(request: Request, env: McpOAuthEnv) {
  const resource = new URL("/mcp", canonicalPodOrigin(request, env))

  return Response.json(
    {
      resource: resource.href,
      authorization_servers: [MCP_AUTHORIZATION_SERVER],
    },
    {
      headers: MCP_OAUTH_CORS_HEADERS,
    },
  )
}

function canonicalPodOrigin(request: Request, env: McpOAuthEnv) {
  const configuredPodUrl = env.LUVABASE_POD_URL?.trim()
  return new URL(configuredPodUrl || request.url).origin
}
