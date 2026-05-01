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
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "CriticalThinking.hu — Kritikus Gondolkodás & Digitális Tudatosság" },
      { name: "twitter:description", content: "Az emberi intelligencia védelme az AI korszakában. Vállalati tréningek, AI adoption és kognitív biztonság." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ee6ae32d-dbb9-4e05-87ce-92bd6b56f099/id-preview-30e48a35--819ba58c-e6b6-4ed4-b6b0-2439d27b57ff.lovable.app-1777642154968.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ee6ae32d-dbb9-4e05-87ce-92bd6b56f099/id-preview-30e48a35--819ba58c-e6b6-4ed4-b6b0-2439d27b57ff.lovable.app-1777642154968.png" },
    ],
    links: [
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
  return (
    <html lang="en">
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
