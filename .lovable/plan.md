
# Fix dependency vulnerabilities

Update the flagged packages to versions that resolve the High and Medium advisories, then verify the app builds and key flows still work.

## Packages to update

- `@supabase/supabase-js` → latest 2.x (pulls in patched `ws`)
- `react-router-dom` + `react-router` → latest 6.x patch (fixes XSS / open redirect)
- `recharts` → latest 2.x (pulls in patched `lodash`)
- `dompurify` → latest 3.x (fixes all listed DOMPurify advisories)
- `@types/dompurify` → align with new `dompurify`
- `@tiptap/starter-kit` → latest 3.x (pulls in patched `markdown-it`)

All updates stay within the current major versions, so no API breakage is expected.

## Steps

1. Run `bun add` for each package above at its latest compatible version (single batched install).
2. Run `bun audit` (or equivalent) to confirm the High advisories are gone and only acceptable noise remains.
3. Let the harness typecheck/build; smoke-check that:
   - Blog rendering (DOMPurify in `RichTextEditor` / blog post view) still works
   - Routing still works (`react-router-dom`)
   - Supabase client still connects
   - Recharts is currently only pulled by shadcn `chart.tsx` (not actively used) — no UI check needed
4. Mark both findings (`vulnerable_dependencies_high`, `vulnerable_dependencies_medium`) as fixed via `manage_security_finding`.

## Notes / risks

- If any package's latest version inside the same major introduces a breaking change, fall back to the closest patched minor.
- Residual transitive advisories that have no upstream fix yet will be left and noted; nothing in this list currently falls in that bucket.
