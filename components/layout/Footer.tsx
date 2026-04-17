export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule px-4 py-8 text-sm text-foreground/80">
      <div className="mx-auto flex max-w-container flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="font-medium text-foreground">Anish Sarkar</p>
        <a
          className="underline-offset-4 hover:underline"
          href="mailto:you@example.com"
        >
          you@example.com
        </a>
        <a
          className="underline-offset-4 hover:underline"
          href="https://linkedin.com/in/your-profile"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn (placeholder)
        </a>
        <a
          className="underline-offset-4 hover:underline"
          href="https://github.com/your-username"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub (placeholder)
        </a>
        <p className="text-foreground/60">© {year} Anish Sarkar</p>
      </div>
    </footer>
  );
}
