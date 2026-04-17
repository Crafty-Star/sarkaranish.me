"use client";

import { FormEvent, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

// Replace YOUR_ID with your Formspree form ID after creating a form at https://formspree.io/
const FORMSPREE_URL = "https://formspree.io/f/YOUR_ID";

const fieldClass =
  "w-full rounded-none border border-rule bg-bg px-4 py-3 text-base text-foreground focus:border-fg focus:outline-none";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("Engineering");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          about,
          message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          typeof data.error === "string" && data.error
            ? data.error
            : "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-container flex-1 px-4 py-8">
      <div className="space-y-8 md:space-y-10">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Contact
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-foreground">
          However you want to reach out, just reach out. Whether you&apos;re
          looking to hire a photographer for an event, want to talk through a
          project or research question, or just found something here interesting,
          I&apos;m happy to hear from you.
        </p>

        <div className="max-w-prose">
          {status === "success" ? (
            <p className="text-base leading-relaxed text-foreground md:text-lg">
              Got it. I&apos;ll reply within a day or two.
            </p>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted"
                  htmlFor="contact-name"
                >
                  Name
                </label>
                <input
                  required
                  autoComplete="name"
                  className={fieldClass}
                  id="contact-name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  type="text"
                  value={name}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted"
                  htmlFor="contact-email"
                >
                  Email
                </label>
                <input
                  required
                  autoComplete="email"
                  className={fieldClass}
                  id="contact-email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted"
                  htmlFor="contact-about"
                >
                  What&apos;s this about?
                </label>
                <select
                  required
                  className={fieldClass}
                  id="contact-about"
                  name="about"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Photography Inquiry">
                    Photography Inquiry
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted"
                  htmlFor="contact-message"
                >
                  Message
                </label>
                <textarea
                  required
                  className={`${fieldClass} min-h-[8rem] resize-y`}
                  id="contact-message"
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What&apos;s on your mind?"
                  rows={5}
                  value={message}
                />
              </div>
              <button
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-fg px-6 py-3 text-center text-base font-medium text-bg transition-colors hover:bg-accent hover:text-background disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                disabled={status === "submitting"}
                type="submit"
              >
                {status === "submitting" ? "Sending..." : "Send it"}
              </button>
              {status === "error" ? (
                <p className="text-sm text-accent" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          )}
        </div>

        <hr className="border-0 border-t border-rule" />

        <section className="max-w-prose space-y-4">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
            Or reach me directly
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                className="inline-flex min-h-11 items-center gap-3 text-base text-foreground underline-offset-4 transition-colors hover:underline"
                href="mailto:anishsarkarpaper@gmail.com"
              >
                <Mail aria-hidden className="size-5 shrink-0 text-muted" />
                <span>anishsarkarpaper@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex min-h-11 items-center gap-3 text-base text-foreground underline-offset-4 transition-colors hover:underline"
                href="https://linkedin.com/in/sarkaranish"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin aria-hidden className="size-5 shrink-0 text-muted" />
                <span>linkedin.com/in/sarkaranish</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex min-h-11 items-center gap-3 text-base text-foreground underline-offset-4 transition-colors hover:underline"
                href="https://github.com/Crafty-Star"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github aria-hidden className="size-5 shrink-0 text-muted" />
                <span>github.com/Crafty-Star</span>
              </a>
            </li>
          </ul>
        </section>

        <section className="max-w-prose space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Elsewhere
          </p>
          <ul className="space-y-3">
            <li>
              {/* Replace href `#` with your real Signal username / contact link */}
              <a
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                href="#"
              >
                Signal — YOUR_SIGNAL_USERNAME
              </a>
            </li>
            <li>
              {/* Replace YOUR_STEAM_USERNAME in the URL with your Steam profile id */}
              <a
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                href="https://steamcommunity.com/id/YOUR_STEAM_USERNAME"
                rel="noopener noreferrer"
                target="_blank"
              >
                Steam — YOUR_STEAM_USERNAME
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
