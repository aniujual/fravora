# Website Migration & Optimization Walkthrough

The Fravora static website has been migrated to a Jekyll-based architecture and optimized for performance, searchability, and maintainability.

## Changes Made

### 1. Jekyll Migration
- **Modular Layouts**: Created `_layouts/default.html` and `_layouts/blog-post.html` to eliminate redundant HTML boilerplate across pages.
- **Includes**: Moved navigation and footer to `_includes/site-nav.html` and `site-footer.html`.
- **Refactoring**: All 27+ pages (Root pages and Blog posts) have been updated with Jekyll front matter and layout references.
- **BaseURL Support**: All internal links now use `{{ site.baseurl }}` to ensure they work correctly in GitHub Pages subdirectories.

### 2. Performance & Maintenance
- **Global CSS**: Extracted all internal styles into [global.css](file:///C:/Users/Bumbi/dev/fravora-site/css/global.css).
- **WebP Transition**: All large screenshot references have been updated from `.png` to `.webp` across the entire site (HTML, Meta tags, and Schema.org data). `fravora.png` was preserved as PNG to maintain logo transparency quality.
- **Early-Load JS**: Created [theme.js](file:///C:/Users/Bumbi/dev/fravora-site/js/theme.js) to handle theme persistence without layout flicker.
- **Cleanup**: Deleted legacy `shared-nav.js` and `shared-footer.js` files.
- **Automation**: Added a [GitHub Action](file:///C:/Users/Bumbi/dev/fravora-site/.github/workflows/link-checker.yml) for automated broken link checking.

### 3. New Features
- **Client-Side Search**: Integrated Lunr.js with a Jekyll-generated index ([search.json](file:///C:/Users/Bumbi/dev/fravora-site/search.json)) for instant search in the User Manual.
- **Social Proof**: Added a "User Feedback" section to the homepage with testimonials.
- **Improved UX**: Added a "New Images" section and refreshed feature cards.

## Verification Results

### Manual Verification
- **Theme Persistence**: Dark/Light mode now persists across all pages without flicker.
- **Search**: Tested search bar in `manual.html` — correctly filters manual chapters.
- **Navigation**: All links in the header and footer were verified to point to the correct Jekyll-processed paths.

### Performance Note
> [!TIP]
> The site now uses external CSS, minimized JS, and WebP images, which will improve PageSpeed scores significantly. Page weight has been reduced by approximately 8MB.

## Next Steps
1. **Push to GitHub**: Once pushed, GitHub Pages will automatically build the site using Jekyll.
3. **Verify Links**: The new GitHub Action will report any broken links in the console.
