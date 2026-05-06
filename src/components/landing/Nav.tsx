import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { Wordmark } from "@/components/landing/Wordmark";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/ui/button";

function GithubGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const links = [
  { label: "Product", href: "#steps" },
  { label: "Developers", href: "#two-ways" },
  { label: "Roadmap", href: "#roadmap" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <Container>
        <div className="flex h-14 items-center justify-between gap-6">
          <Wordmark />
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              aria-label="GitHub repository"
            >
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <GithubGlyph className="size-4" />
              </a>
            </Button>
            <ThemeToggle />
            <Button asChild size="sm" className="ml-2 hidden md:inline-flex">
              <a href="#waitlist">Get early access</a>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
