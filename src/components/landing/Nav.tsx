import { Github } from "lucide-react";

import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { Wordmark } from "@/components/landing/Wordmark";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/ui/button";

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
                <Github className="size-4" />
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
