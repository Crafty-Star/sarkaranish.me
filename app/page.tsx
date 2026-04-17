import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const PORTRAIT_SRC = "/images/portrait/anish-self-portrait.jpg";

export default function HomePage() {
  const portraitFile = path.join(
    process.cwd(),
    "public",
    "images",
    "portrait",
    "anish-self-portrait.jpg",
  );
  const portraitExists = fs.existsSync(portraitFile);

  return (
    <main className="mx-auto w-full max-w-container flex-1 px-4 py-8">
      <section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 flex-1 space-y-6">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground">
              Anish Sarkar
            </h1>
            <p className="font-display text-2xl not-italic text-foreground">
              Mechanical engineering, product thinking, and photography.
            </p>
            <p className="max-w-prose text-lg text-muted">
              I&apos;m a mechanical engineering student at Purdue interested in
              how things are built, tested, and experienced. My work spans
              engineering projects, photography, and experiments in
              making—from simulation and hardware to portraits, events, and
              paper-based forms.
            </p>
            <div className="flex w-full max-w-prose flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/projects"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-foreground px-6 py-3 text-center text-base font-medium text-background transition-colors hover:bg-accent hover:text-background sm:w-auto"
              >
                See the work
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-foreground bg-transparent px-6 py-3 text-center text-base font-medium text-foreground transition-colors hover:bg-foreground hover:text-background sm:w-auto"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <div className="w-full shrink-0 lg:w-[min(100%,20rem)]">
            {portraitExists ? (
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden border border-rule lg:mx-0 lg:max-w-none">
                <Image
                  src={PORTRAIT_SRC}
                  alt="Anish Sarkar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 20rem"
                  priority
                />
              </div>
            ) : (
              <div
                aria-label="Future self-portrait"
                className="mx-auto flex aspect-[3/4] w-full max-w-xs flex-col items-center justify-center border border-rule bg-background px-4 text-center lg:mx-0 lg:max-w-none"
                role="img"
              >
                <span className="text-xs text-muted">Future self-portrait</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-section space-y-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          The work
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="/projects"
            className="block border border-rule p-5 transition-[border-color,transform] hover:-translate-y-[2px] hover:border-foreground"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Engineering
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
              Research, hardware, and software
            </h3>
            <p className="mt-2 text-base text-muted">
              Simulations, physical builds, and engineering experiments.
            </p>
          </Link>
          <Link
            href="/photography"
            className="block border border-rule p-5 transition-[border-color,transform] hover:-translate-y-[2px] hover:border-foreground"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Photography
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
              Events, portraits, and landscapes
            </h3>
            <p className="mt-2 text-base text-muted">
              Client work and personal images from Purdue, Lafayette, and beyond.
            </p>
          </Link>
          <Link
            href="/recommender"
            className="block border border-rule p-5 transition-[border-color,transform] hover:-translate-y-[2px] hover:border-foreground"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Experiment
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
              A claw machine that reads what I&apos;ve read
            </h3>
            <p className="mt-2 text-base text-muted">
              A small interactive project built from my media log.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
