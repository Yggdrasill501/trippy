import { Wordmark } from "@/components/landing/Wordmark";
import { Container } from "@/components/primitives/Container";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Chat", href: "#two-ways" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "MCP server", href: "#two-ways" },
      { label: "Architecture", href: "#architecture" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "mailto:hi@trippy.app" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="waitlist" className="border-t bg-background/60">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_2fr] md:py-20">
          <div className="flex flex-col gap-4">
            <Wordmark />
            <p className="max-w-xs text-sm text-muted-foreground">
              An MCP-native travel agent. Built on rails airlines already trust.
            </p>
            <form
              action="mailto:hi@trippy.app"
              method="post"
              encType="text/plain"
              className="mt-2 flex w-full max-w-sm items-center gap-2 rounded-lg border bg-background/60 p-1.5 backdrop-blur-sm"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@domain.com"
                aria-label="Email address"
                className="flex-1 bg-transparent px-2 text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:bg-foreground/90"
              >
                Notify me
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-foreground/75 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Trippy. Built with Bun, Hono, and MCP.</span>
          <span className="font-mono">v0.1 · M0</span>
        </div>
      </Container>
    </footer>
  );
}
