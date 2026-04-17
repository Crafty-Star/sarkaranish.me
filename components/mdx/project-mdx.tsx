import type { MDXRemoteProps } from "next-mdx-remote/rsc";

export const projectMdxComponents: NonNullable<MDXRemoteProps["components"]> =
  {
    h2: (props) => (
      <h2
        className="mt-10 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground first:mt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 text-lg font-semibold tracking-tight text-foreground"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mt-4 text-base leading-relaxed text-foreground/90"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-foreground/90"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    strong: (props) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    a: (props) => (
      <a
        className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
        {...props}
      />
    ),
  };
