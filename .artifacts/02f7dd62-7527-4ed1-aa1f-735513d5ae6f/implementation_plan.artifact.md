# Implementation Plan - Website Improvements for Fravora

This plan outlines the steps to migrate the Fravora static site to a Jekyll-based architecture, optimize performance with next-gen images and external CSS, and add user-facing features like search and social proof.

## User Review Required

> [!IMPORTANT]
> The migration to Jekyll assumes that the GitHub Pages environment is configured to build the site using Jekyll. If you are currently serving the site as raw HTML, you will need to ensure no `vendor/` or other Jekyll-excluded directories are accidentally included.

> [!WARNING]
> Image conversion to WebP/AVIF needs to be performed on the actual assets. I will update the HTML/CSS to point to `.webp` files, but you will need to ensure these files exist in the `images/` directory.

## Proposed Changes

### 1. Jekyll Infrastructure & Layouts
Establish a proper Jekyll structure to eliminate JS-based HTML injection.

#### [NEW] [_config.yml](file:///C:/Users/Bumbi/dev/fravora-site/_config.yml)
- Basic Jekyll configuration (site title, description, baseurl).
- Exclude unnecessary files from the build.

#### [NEW] [_layouts/default.html](file:///C:/Users/Bumbi/dev/fravora-site/_layouts/default.html)
- Move the boilerplate `<head>`, `<body>` wrapper, and navigation/footer includes here.
- Include the theme-switching logic directly in the layout to prevent flickering.

#### [MODIFY] [index.html](file:///C:/Users/Bumbi/dev/fravora-site/index.html)
- Add Jekyll front matter (`layout: default`).
- Remove the redundant `<head>`, CSS, and JS injection scripts.

---

### 2. CSS & Performance Optimization
Refactor internal styles to an external file and prepare for next-gen images.

#### [NEW] [css/global.css](file:///C:/Users/Bumbi/dev/fravora-site/css/global.css)
- Extract all CSS from `index.html` and `shared-nav.js` into this file.

#### [MODIFY] [index.html](file:///C:/Users/Bumbi/dev/fravora-site/index.html) & other pages
- Update `<img>` tags to use WebP versions where applicable.
- Add `<picture>` tags for better browser support.

---

### 3. SEO & Dark Mode Persistence
Improve metadata consistency and move theme logic to a shared JS file.

#### [NEW] [js/theme.js](file:///C:/Users/Bumbi/dev/fravora-site/js/theme.js)
- Extract the theme-switching and `localStorage` logic from `shared-nav.js`.
- Ensure it runs as early as possible in the `<head>` to prevent flash of unstyled content.

---

### 4. Search Functionality (Lunr.js)
Implement a client-side search for the manual and blog.

#### [NEW] [search.json](file:///C:/Users/Bumbi/dev/fravora-site/search.json)
- A Jekyll-generated JSON file that indexes page titles, URLs, and content.

#### [MODIFY] [manual.html](file:///C:/Users/Bumbi/dev/fravora-site/manual.html)
- Add a search input field.
- Load `lunr.min.js` and implement the search results UI.

---

### 5. Conversion & Trust
Add social proof to the homepage.

#### [MODIFY] [index.html](file:///C:/Users/Bumbi/dev/fravora-site/index.html)
- Add a "Featured Reviews" section with hard-coded testimonials from Google Play users.

---

### 6. Automation
#### [NEW] [.github/workflows/link-checker.yml](file:///C:/Users/Bumbi/dev/fravora-site/.github/workflows/link-checker.yml)
- Set up a GitHub Action to run `lychee` or a similar broken link checker on every push.

## Verification Plan

### Automated Tests
- Run `jekyll build` locally to ensure no liquid syntax errors.
- Use a link checker tool to verify all internal anchors are valid.

### Manual Verification
- **Performance**: Test home page with PageSpeed Insights (expect higher scores due to external CSS and WebP).
- **Theme**: Verify dark mode persists when navigating between `index.html` and `manual.html`.
- **Search**: Test the search bar in the manual with keywords like "SMB", "Voice", or "Radio".
- **Visuals**: Ensure no "flicker" occurs during navigation now that Jekyll handles the layout.
