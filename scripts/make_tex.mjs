// Generates one LaTeX file per resume version from data/resume.json.
// Usage: node scripts/make_tex.mjs   (writes build/<file>.tex)
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('data/resume.json', 'utf8'));

const PREAMBLE = String.raw`\documentclass[a4paper,8pt]{extarticle}

\usepackage[utf8]{inputenc}
\usepackage{geometry}
\geometry{left=0.45in,right=0.45in,top=0.2in,bottom=0.2in}

\usepackage{titlesec}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}

\linespread{0.95}
\pagenumbering{gobble}

\titleformat{\section}{\large\bfseries}{}{0em}{}[\titlerule]
\titlespacing*{\section}{0pt}{5pt}{3pt}

\setlist[itemize]{
    noitemsep,
    topsep=1pt,
    leftmargin=*,
    itemsep=1pt
}

\begin{document}
`;

const MAP = {
  '\\': '\\textbackslash{}', '&': '\\&', '%': '\\%', '$': '\\$', '#': '\\#',
  '_': '\\_', '{': '\\{', '}': '\\}', '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}', '—': '---', '–': '--', '’': "'",
};
const esc = (s) => s.replace(/[\\&%$#_{}~^—–’]/g, (c) => MAP[c]).replace(/•/g, '\\textbullet\\ ');

const vis = (n, v) => !n.v || n.v.includes(v);
// text node: main text + visible inline extras + optional tail
const text = (n, v) =>
  esc(n.t || '') + (n.extra || []).filter((x) => vis(x, v)).map((x) => esc(x.t)).join('') + esc(n.tail || '');

function build(v) {
  const out = [PREAMBLE];
  const links = data.links.map((l) => `\\href{${l.url}}{${esc(l.label)}}`).join('\n\\;|\\;\n');
  out.push(`\\begin{center}\n{\\Large \\textbf{${esc(data.name)}}}\\\\\n${esc(data.taglines[v])}\\\\\n${links}\n\\end{center}\n`);

  const E = data.education;
  out.push(
    `\\section*{Education}\n\n\\noindent\n\\textbf{${esc(E.school)}} \\hfill \\textit{${esc(E.date)}}\\\\\n` +
      `\\noindent\n${esc(E.degree)} \\hfill ${esc(E.gpa)}\\\\\n\\noindent\n\\textbf{Honors:} ${text(E.honors, v)}\n`,
  );

  for (const s of data.sections) {
    if (!vis(s, v)) continue;
    out.push(`\\section*{${esc(s.title)}}\n`);
    if (s.kind === 'text') out.push(`\\noindent\n${esc(s.text)}\n`);
    if (s.kind === 'skills') {
      for (const l of s.items.filter((x) => vis(x, v))) out.push(`\\noindent\n\\textbf{${esc(l.label)}:} ${text(l, v)}\n`);
    }
    if (s.kind === 'entries') {
      for (const e of s.items.filter((x) => vis(x, v))) {
        const bullets = e.bullets.filter((b) => vis(b, v));
        if (!bullets.length) continue;
        out.push(
          `\\noindent\n\\textbf{${esc(e.head)}}${e.after ? ` --- ${esc(e.after)}` : ''}${e.date ? `\n\\hfill \\textit{${esc(e.date)}}` : ''}\n\n` +
            `\\begin{itemize}\n${bullets.map((b) => `\\item ${text(b, v)}`).join('\n')}\n\\end{itemize}\n`,
        );
      }
    }
  }
  out.push('\\end{document}\n');
  return out.join('\n');
}

fs.mkdirSync('build', { recursive: true });
for (const [v, info] of Object.entries(data.variants)) {
  fs.writeFileSync(`build/${info.file}.tex`, build(v));
  console.log(`build/${info.file}.tex`);
}
