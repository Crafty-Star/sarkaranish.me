# sarkaranish.me (Simplified)

This repo hosts a simplified Jekyll site for a personal portfolio. The goal is a minimal, clean baseline that preserves core content (photos, projects, and about text) while removing complex effects and heavy dependencies.

## What Changed
- Reduced head to a single stylesheet (`css/main.css`) and basic meta.
- Simplified layout: minimal `default` layout with `nav`, `main`, and `footer` includes.
- Replaced Bootstrap- and JS-heavy navigation/footer with lightweight HTML/CSS.
- Simplified pages: `index.html`, `gallery/index.html`, `about/index.md`, `projects/index.md`, and `404.html`.
- Kept all photos and project markdown files intact.

## Structure
- `_layouts/default.html`: Base HTML shell. Renders `nav`, page content, and `footer`.
- `_includes/head.html`: Minimal meta, title, favicon, and `css/main.css`.
- `_includes/nav.html`: Simple top nav with links from `_config.yml > nav`.
- `_includes/footer.html`: Minimal footer with copyright, email link, and RSS.
- `index.html`: Simple home with links to About, Gallery, Projects.
- `gallery/index.html`: Basic album grid linking into existing album folders.
- `about/index.md`: About text using `layout: default`.
- `projects/index.md`: Lists items from `_projects` collection.
- `_projects/*.md`: Project entries (unchanged).

## Content You Edit
- About text: `about/index.md`
- Projects: add/edit files in `_projects/` (front matter: `title`, `description`)
- Navigation: `_config.yml` under `nav`
- Homepage copy: `index.html` (inline text)
- Gallery albums: folder structure and `photo_*.jpg` inside `gallery/`

## Keep/Remove Assets
- Kept: `css/main.css` (site-wide basics)
- Considered optional (can be deleted if unused): `bootstrap.min.css`, `galleries.css`, `journal.css`, `magnificpopup.css`, `super-search.css`, `tags-wrap.css`, `WYSIWYG.css`
- JS libraries are not referenced by the simplified site; you may remove `js/*` libs like `kenburns.min.js`, `jquery.*`, `super-search.js`, etc., once confident you won’t re-enable prior features.

## Local Development
1. Install Ruby + Bundler.
2. Install `jekyll` and run:
   ```bash
   bundle install
   bundle exec jekyll serve
   ```
3. Visit `http://localhost:4000`.

## Notes
- Album pages inside `gallery/*/*/index.html` remain as-is. The top-level gallery page is simplified to link into those folders.
- The site is now a lean baseline ready for new features.