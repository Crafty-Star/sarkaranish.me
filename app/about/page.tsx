import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const PORTRAIT_SRC = "/images/about/anish-portrait.jpg";
const ENGINEERING_SRC = "/images/about/engineering-process.jpg";

export default function AboutPage() {
  const portraitFile = path.join(
    process.cwd(),
    "public",
    "images",
    "about",
    "anish-portrait.jpg",
  );
  const engineeringFile = path.join(
    process.cwd(),
    "public",
    "images",
    "about",
    "engineering-process.jpg",
  );
  const portraitExists = fs.existsSync(portraitFile);
  const engineeringExists = fs.existsSync(engineeringFile);

  return (
    <main className="mx-auto w-full max-w-container flex-1 px-4 py-8">
      <div className="space-y-12 md:space-y-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          About
        </h1>

        <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 max-w-prose flex-1 space-y-6">
            <p className="text-base leading-relaxed text-foreground md:text-lg">
              My training is in mechanical engineering, but what actually got me
              here was a stubborn interest in how physical things fail, and how
              to tell before they do. That&apos;s what finite element analysis
              does — you build a computational version of a prosthetic socket
              or a brain under current and run it until you understand where the
              stress concentrates. Photography is the same instinct pointed at
              people: watch a room long enough and the picture tells you where
              to stand.
            </p>
            <p className="text-base leading-relaxed text-foreground md:text-lg">
              I&apos;m in my first year at Purdue studying mechanical
              engineering. My research has centered on finite element analysis of
              biomedical systems — first a prosthetic socket redesign that cut
              peak gait-cycle stress by 40% over conventional fit, then a
              comparison of electroconvulsive therapy montages using
              high-resolution brain models, done in collaboration with the
              University of Poitiers and first-authored at the 6th European
              Conference on Brain Stimulation in Mental Health in Lisbon. Ansys
              Advantage and the Ansys blog have written about this work twice. I
              start as an intern at Ansys this summer.
            </p>
          </div>
          <div className="w-full shrink-0 lg:w-[min(100%,18rem)]">
            {portraitExists ? (
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden border border-rule lg:mx-0 lg:max-w-none">
                <Image
                  src={PORTRAIT_SRC}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 18rem"
                />
              </div>
            ) : (
              <div
                aria-label="Future portrait"
                className="mx-auto flex aspect-[3/4] w-full max-w-xs flex-col items-center justify-center border border-rule bg-background px-4 text-center lg:mx-0 lg:max-w-none"
                role="img"
              >
                <span className="text-xs text-muted">Future portrait</span>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-prose space-y-6">
          <p className="text-base leading-relaxed text-foreground md:text-lg">
            Outside research, I build things. Lafayette Feeds — a Next.js app
            connecting food banks to donors in Greater Lafayette — won the
            Tech4Change hackathon sponsored by Synopsys last November. A polar
            plotter driven by NEMA 17 steppers, an Arduino, and GRBL firmware
            draws CAD output at wall-sized scale. A dual-axis mechanical rig
            paired with a Raspberry Pi runs a small holographic display I&apos;ve
            been iterating on. My business card is a layered cardstock NFC tag
            cut on a Silhouette Cameo because I wanted to know if it would work.
            The VIP AAMED team at Purdue pulled me onto their bioregenerative
            sensor stack for sealed plant-growth chambers — closed-loop life
            support at a very small scale.
          </p>
        </div>

        <div className="max-w-3xl">
          {engineeringExists ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule">
              <Image
                src={ENGINEERING_SRC}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
              />
            </div>
          ) : (
            <div
              aria-label="Future engineering/process image"
              className="flex aspect-[4/3] w-full flex-col items-center justify-center border border-rule bg-background px-4 text-center"
              role="img"
            >
              <span className="text-xs text-muted">
                Future engineering/process image
              </span>
            </div>
          )}
        </div>

        <div className="max-w-prose space-y-6">
          <p className="text-base leading-relaxed text-foreground md:text-lg">
            The camera work grew out of the same habit as the engineering. I
            shoot Purdue events on paid assignment and portraits through the
            photography club, and take outside bookings for campus events,
            portraits, and small commercial work in the Greater Lafayette area.
          </p>
        </div>

        <section className="max-w-prose space-y-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Tools I work in
          </h2>
          <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed text-foreground md:text-lg">
            <li>
              Simulation &amp; analysis — Ansys Mechanical, Ansys SpaceClaim,
              Python (PyTorch)
            </li>
            <li>CAD — Fusion 360, NX Siemens, SpaceClaim</li>
            <li>Code — TypeScript, React, Next.js, Tailwind, Python</li>
            <li>
              Fabrication — Arduino/GRBL, 3D printing, laser cutting, Silhouette
              Cameo
            </li>
            <li>
              Photography &amp; graphics — Lightroom, Photoshop, Illustrator
            </li>
          </ul>
        </section>

        <div className="max-w-prose space-y-8">
          <p className="text-base leading-relaxed text-foreground md:text-lg">
            Off the clock: manga shelves I&apos;ve run out of room for,{'  '}what else?
          </p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-foreground bg-transparent px-6 py-3 text-center text-base font-medium text-foreground transition-colors hover:bg-foreground hover:text-background sm:w-auto"
          >
            Download resume
          </a>
        </div>
      </div>
    </main>
  );
}
