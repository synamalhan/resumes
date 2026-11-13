# Resumes

One LaTeX source (`resume.tex`) builds every resume version. Pushing to `main` rebuilds and publishes them.

- Edit `resume.tex`. Tags like `\v{ml,swe}{...}` control which versions show a line.
- Versions: main, ml, ds, genai, cv, res, swe, apple.
- Local build: `sh build.sh` (needs LaTeX). Outputs go in `out/`.
- Published at https://synamalhan.github.io/resumes/ (bookmark this on your phone).
