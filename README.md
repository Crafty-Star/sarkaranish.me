This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Projects (MDX case studies)

### Where files live

- Each case study is a file: `content/projects/<slug>.mdx`.
- The public URL is `/projects/<slug>` (the filename without `.mdx` is the slug).

### Frontmatter (required fields)

Use YAML between `---` delimiters at the top of each file:

| Field | Notes |
| --- | --- |
| `title` | Short title for cards and metadata. |
| `headline` | Long line shown as the page `<h1>`. |
| `description` | One-line summary for cards and SEO. |
| `tags` | String array; first three show on cards, rest collapsed as `+N`. |
| `status` | `"completed"` or `"in-progress"` only. |
| `year` | Number (used for sorting and display). |
| `thumbnail` | Path for a future image, e.g. `/projects/my-slug/thumbnail.jpg`. Cards still use a **placeholder** until you add the file under `public/`. |
| `stackLine` | Comma-separated tools; split into pills under the headline on the case study page. |
| `category` | One of: `Hardware`, `Software`, `Research`, `Design` (drives the `/projects` filter bar). |
| `externalLinks` | Optional list of `{ label, url }` objects; rendered at the bottom of the case study page. |

### Body (MDX)

- Everything below the closing `---` is MDX/Markdown (sections like **Problem**, **Approach**, etc.).
- Typography for case studies is customized in `components/mdx/project-mdx.tsx`.

### Add a project

1. Create `content/projects/<new-slug>.mdx` with valid frontmatter and a body.
2. Set `category` so it appears under the right filter on `/projects`.
3. Run `npm run build` (or `npm run dev`) so `generateStaticParams` picks up the new slug.

### Remove a project

- Delete the corresponding `content/projects/<slug>.mdx` file.

### Thumbnails (optional, later)

1. Add an image at `public/projects/<slug>/thumbnail.jpg` (or match whatever path you put in `thumbnail`).
2. To wire cards to real images instead of placeholders, update `components/projects/ProjectCard.tsx` to use `next/image` (or `<img>`) when the file exists.

### Two MDX mechanisms in this repo

- **Case studies:** loaded from disk with `gray-matter` + `next-mdx-remote/rsc` in `lib/projects.ts` and `app/projects/[slug]/page.tsx`.
- **`@next/mdx`:** configured in `next.config.ts` for bundler support if you later import `.mdx` modules from the app tree. Keep `@next/mdx` on the **same minor version as `next`** (e.g. both `15.5.x`) so Turbopack config stays valid.

### Credibility and `[NEED: …]` flags

Some drafts include `[NEED: …]` placeholders for facts you must supply from notes or papers (mesh details, co-authors, URLs, etc.). **Do not treat those drafts as publication-ready engineering claims** until every flag is replaced or removed with verified wording your collaborators would endorse.
