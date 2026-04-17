export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-container flex-1 space-y-6 px-4 py-8 md:space-y-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Resume
      </h1>
      <p className="max-w-prose text-lg leading-relaxed text-foreground">
        This resume covers my work through Spring 2026 — research in FEA-based
        simulation of prosthetic sockets and transcranial electrical
        stimulation, engineering projects spanning hardware and software, and
        three years of event photography at Purdue. If you want the full picture
        in one document, this is it.
      </p>
      <a
        href="/resume.pdf"
        download
        className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-foreground px-6 py-3 text-center text-base font-medium text-background transition-colors hover:bg-accent hover:text-background sm:w-auto"
      >
        Download PDF
      </a>
      <div className="w-full">
        <iframe
          src="/resume.pdf"
          title="Resume PDF"
          className="hidden h-[80vh] w-full border border-rule md:block"
        />
        <p className="text-base text-muted md:hidden">Download to view on mobile.</p>
      </div>
      <p className="text-sm text-muted">Last updated January 2026</p>
    </main>
  );
}
