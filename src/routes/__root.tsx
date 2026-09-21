import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CriticalThinking.hu — Kritikus Gondolkodás & Digitális Tudatosság" },
      { name: "description", content: "Az emberi intelligencia védelme az AI korszakában. Vállalati tréningek, AI adoption és kognitív biztonság." },
      { name: "author", content: "Kemenes Andrea Sophie" },
      { property: "og:title", content: "CriticalThinking.hu — Kritikus Gondolkodás & Digitális Tudatosság" },
      { property: "og:description", content: "Az emberi intelligencia védelme az AI korszakában. Vállalati tréningek, AI adoption és kognitív biztonság." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CriticalThinking.hu — Kritikus Gondolkodás & Digitális Tudatosság" },
      { name: "twitter:description", content: "Az emberi intelligencia védelme az AI korszakában. Vállalati tréningek, AI adoption és kognitív biztonság." },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // Tried making this dynamic ("hu" vs "en" based on the current route) via
  // useRouterState, but that hook's useSyncExternalStore-based subscription
  // doesn't hydrate safely in this project's bypassed-SSR setup (renderToString
  // + manual hydrateRoot, not a real streaming SSR server) — it introduced a
  // site-wide hydration mismatch (client expected a <Suspense> the server
  // never rendered). Not worth that risk for a lang-attribute nicety; the
  // /en/* pages set their own per-page <title>/description via head(), which
  // matters far more for SEO than <html lang> does.
  return (
    <html lang="hu">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
