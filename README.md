# Skrivla

Write together with anyone and bring your own AI

<a target="_blank" href="https://luvabase.com/apps/skrivla/install"><img src="https://luvabase.com/deploy.svg" alt="Deploy to Luvabase"/></a>

🌎 Just share a link and instantly write together. No login needed.<br>
🤖 Connect your AI through MCP to find, read, and write your pages.<br>
🎨 Rich text editing and Markdown shortcuts.
<br>
❤️ Free forever, open source, and self-hostable on Luvabase or Cloudflare.
<br>

![Screenshot of Skrivla](/public/screenshot.png)

## What is Skrivla?

Skrivla is where people and AI write together. It's like a minimal Google Docs or Notion where you can easily bring your own AI. Perfect for quick brainstorming sessions, feature specs, meeting notes, and more.

## Getting started

The easiest way to use Skrivla is to [install it on Luvabase](https://luvabase.com/apps/skrivla/install). On Luvabase, authentication is managed for you.

You can also [deploy to your own Cloudflare account](https://deploy.workers.cloudflare.com/?url=https://github.com/simonbengtsson/skrivla) and protect your Skrivla instance with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access).

## Stack

Skrivla is built as a single-page application with a lightweight server API and persistence layer on Cloudflare Durable Objects.

- Server: Cloudflare Workers and Durable Objects
- Client: shadcn/ui, TanStack Router, Vite, and Tailwind CSS
- Rich text editing with [Tiptap](http://tiptap.dev)

## Contributions

Contributions are very welcome! The goal is to keep the editor minimal, but the following are some examples of what would be in scope:

- Attachments
- Agent integration in the editor (with Workers AI)
- A small desktop sync application to sync pages to a local folder for easier access by local agents
- Folders, tags or page pinning to better support organizing many pages
