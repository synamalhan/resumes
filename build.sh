#!/bin/sh
# Builds every resume version from resume.tex into ./out with your file names.
# Needs a LaTeX install (pdflatex). Run:  sh build.sh
mkdir -p out
build() {  # $1 = variant, $2 = output name
  pdflatex -interaction=nonstopmode -output-directory=out -jobname="$2" \
    "\\def\\variant{$1}\\input{resume.tex}" >/dev/null || echo "FAILED: $2"
}
build main  "SYNA MALHAN"
build apple "SYNA MALHAN A"
build ds    "SYNA MALHAN DS"
build genai "SYNA MALHAN GENAI"
build cv    "SYNA MALHAN CV"
build ml    "SYNA MALHAN ML"
build res   "SYNA MALHAN R"
build swe   "SYNA MALHAN SWE"
rm -f out/*.aux out/*.log out/*.out
ls out
