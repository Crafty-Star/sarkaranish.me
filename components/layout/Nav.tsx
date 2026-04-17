import Link from "next/link";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/photography", label: "Photography" },
  { href: "/media", label: "Media" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function Nav() {
  return (
    <header className="relative sticky top-0 z-50 border-b border-rule bg-background/95 backdrop-blur">
      <input
        type="checkbox"
        id="nav-toggle"
        className="peer sr-only"
      />
      <div className="relative mx-auto flex max-w-container items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          AS
        </Link>
        <label
          htmlFor="nav-toggle"
          className="inline-flex cursor-pointer flex-col gap-1.5 rounded-md border border-current/20 p-2 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="block h-0.5 w-6 bg-current" />
          <span className="block h-0.5 w-6 bg-current" />
        </label>
      </div>
      <nav
        id="site-nav"
        aria-label="Primary"
        className="absolute left-0 right-0 top-full z-40 hidden flex-col gap-1 border-b border-rule bg-background px-4 py-3 peer-checked:flex md:absolute md:right-4 md:top-1/2 md:left-auto md:mx-0 md:mt-0 md:flex md:w-auto md:-translate-y-1/2 md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:px-4 md:py-0 md:shadow-none"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-fg/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground md:py-1"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
