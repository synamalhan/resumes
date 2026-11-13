# Resumes

Everything lives in `data/resume.json`. Each line carries an optional `v` list saying which versions include it (no `v` = all).

- **Site** (`site/index.html`, published at https://synamalhan.github.io/resumes/): pick a version, edit text, choose which versions include each line, download a PDF straight from the browser, or save changes back to this repo.
- **LaTeX PDFs**: every push to `main` regenerates LaTeX from the data (`scripts/make_tex.mjs`), compiles all versions, and publishes them at `.../resumes/<name>.pdf` (`ml`, `data-science`, `genai`, `computer-vision`, `research`, `swe`, `apple`, `syna-malhan`).
- **Local build**: `sh build.sh` (needs node and LaTeX).
- **Saving from the site** needs a GitHub fine-grained token with Contents read/write on this repo only. Paste it via the Token button; it stays in your browser.
