const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const files = ['index.html', ...fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => 'pages/' + f)];
let errors = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${file}: duplicate IDs`);
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|data:|mailto:)/.test(url)) continue;
    const [raw, hash] = url.split('#');
    const target = raw ? path.resolve(path.dirname(file), raw.split('?')[0]) : path.resolve(file);
    if (!fs.existsSync(target)) errors.push(`${file}: missing ${url}`);
    else if (hash && target.endsWith('.html') && !fs.readFileSync(target, 'utf8').includes(`id="${hash}"`)) {
      const dynamicCategory = file === 'pages/works.html' && /^works-(social|graphic|video|tshirt|uiux)$/.test(hash) && fs.readFileSync('js/main.js', 'utf8').includes('id="works-${banner.id}"');
      if (!dynamicCategory) errors.push(`${file}: missing anchor ${url}`);
    }
  }
  if (!html.includes('Skip to content')) errors.push(`${file}: missing skip link`);
}
for (const file of fs.readdirSync('js').filter(f => f.endsWith('.js'))) new vm.Script(fs.readFileSync('js/' + file, 'utf8'), { filename: file });
const data = fs.readFileSync('js/data.js', 'utf8');
const content = vm.runInNewContext(data + '\n({PROJECTS, SOCIAL_MEDIA_BRANDS, SOFTWARE})');
function checkMedia(value) {
  if (typeof value === 'string' && value.startsWith('assets/') && !fs.existsSync(value)) errors.push(`Project data: missing ${value}`);
  else if (Array.isArray(value)) value.forEach(checkMedia);
  else if (value && typeof value === 'object') Object.values(value).forEach(checkMedia);
}
checkMedia(content);
if (/\blevel:\s*\d/.test(data)) errors.push('Unsupported numeric skill levels');
if (fs.readFileSync('js/main.js', 'utf8').includes('${s.level}%')) errors.push('Unsupported numeric skill rendering');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${files.length} pages; local links, anchors, shared assets, unique IDs, skip links, and JavaScript syntax.`);
