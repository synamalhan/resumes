#!/bin/sh
# Local build: data/resume.json -> LaTeX -> PDFs in ./out. Needs node and pdflatex.
node scripts/make_tex.mjs
mkdir -p out
for f in build/*.tex; do
  pdflatex -interaction=nonstopmode -halt-on-error -output-directory=out "$f" >/dev/null || echo "FAILED: $f"
done
rm -f out/*.aux out/*.log out/*.out
ls out
