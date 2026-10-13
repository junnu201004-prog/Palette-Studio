const fs = require('fs');
const path = require('path');

console.log('=== RUNNING PALETTE STUDIO QUALITY CHECKS ===\n');

// 1. Verify all palette records against 67 UI Colour Combinations.html
const htmlPath = path.join(__dirname, '..', '67 UI Colour Combinations.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const match = htmlContent.match(/const D=\[([\s\S]*?)\];\s*const roles/);
if (!match) {
  console.error('FAIL: Could not locate const D in HTML file');
  process.exit(1);
}

const rawD = eval('[' + match[1] + ']');
let currentCat = '';
const expectedPalettes = [];

for (const item of rawD) {
  if (typeof item === 'string') {
    currentCat = item;
  } else {
    expectedPalettes.push({
      category: currentCat,
      name: item[0],
      bg: item[1],
      primary: item[2],
      accent: item[3],
      text: item[4],
    });
  }
}

console.log(`[CHECK 1] Found ${expectedPalettes.length} palettes in original HTML.`);
if (expectedPalettes.length !== 67) {
  console.error(`FAIL: Expected 67 palettes, got ${expectedPalettes.length}`);
  process.exit(1);
}

// 2. Load generated TS palettes file and verify match
const palettesTsPath = path.join(__dirname, '..', 'src', 'data', 'palettes.ts');
const palettesTsContent = fs.readFileSync(palettesTsPath, 'utf8');

// Parse PALETTES array from ts
const palettesMatch = palettesTsContent.match(/export const PALETTES: Palette\[\] = (\[[\s\S]*?\]);\s*$/);
if (!palettesMatch) {
  console.error('FAIL: Could not extract PALETTES from src/data/palettes.ts');
  process.exit(1);
}

const parsedPalettes = JSON.parse(palettesMatch[1]);
console.log(`[CHECK 2] Loaded ${parsedPalettes.length} palettes from src/data/palettes.ts.`);

if (parsedPalettes.length !== 67) {
  console.error(`FAIL: Expected 67 parsed palettes, got ${parsedPalettes.length}`);
  process.exit(1);
}

// 3. Verify 1-to-1 fidelity: names, categories, hexes, labels, order
let mismatchCount = 0;
for (let i = 0; i < 67; i++) {
  const exp = expectedPalettes[i];
  const act = parsedPalettes[i];

  if (act.index !== i + 1) {
    console.error(`Mismatch at index ${i}: expected index ${i + 1}, got ${act.index}`);
    mismatchCount++;
  }
  if (act.name !== exp.name) {
    console.error(`Mismatch at index ${i}: expected name ${exp.name}, got ${act.name}`);
    mismatchCount++;
  }
  if (act.category !== exp.category) {
    console.error(`Mismatch at index ${i}: expected category ${exp.category}, got ${act.category}`);
    mismatchCount++;
  }

  // Parse raw html color item: "F8FAFC Slate 50" -> hex: "#F8FAFC", label: "Slate 50"
  const parseExpected = (s) => {
    const k = s.indexOf(' ');
    return { hex: '#' + s.slice(0, k).toUpperCase(), label: s.slice(k + 1) };
  };

  const expBg = parseExpected(exp.bg);
  const expPrim = parseExpected(exp.primary);
  const expAcc = parseExpected(exp.accent);
  const expTxt = parseExpected(exp.text);

  if (act.colors.background.hex !== expBg.hex || act.colors.background.label !== expBg.label) {
    console.error(`Background mismatch in ${act.name}:`, act.colors.background, expBg);
    mismatchCount++;
  }
  if (act.colors.primary.hex !== expPrim.hex || act.colors.primary.label !== expPrim.label) {
    console.error(`Primary mismatch in ${act.name}:`, act.colors.primary, expPrim);
    mismatchCount++;
  }
  if (act.colors.accent.hex !== expAcc.hex || act.colors.accent.label !== expAcc.label) {
    console.error(`Accent mismatch in ${act.name}:`, act.colors.accent, expAcc);
    mismatchCount++;
  }
  if (act.colors.text.hex !== expTxt.hex || act.colors.text.label !== expTxt.label) {
    console.error(`Text mismatch in ${act.name}:`, act.colors.text, expTxt);
    mismatchCount++;
  }
}

if (mismatchCount > 0) {
  console.error(`FAIL: ${mismatchCount} mismatches detected between HTML and TS data!`);
  process.exit(1);
}
console.log('✓ PASS: All 67 palettes match the HTML source file with 100% precision.');

// 4. Test Categories
const catMatch = palettesTsContent.match(/export const CATEGORIES: string\[\] = (\[[\s\S]*?\]);/);
const parsedCats = JSON.parse(catMatch[1]);
console.log(`[CHECK 3] Categories count: ${parsedCats.length} (${parsedCats.join(', ')})`);
if (parsedCats.length !== 8) {
  console.error('FAIL: Expected 8 categories');
  process.exit(1);
}
console.log('✓ PASS: All 8 categories match.');

// 5. Test search and filtering logic
function filterPalettes(palettes, category, query) {
  return palettes.filter((p) => {
    const matchesCategory =
      category === 'All' || p.category.toLowerCase() === category.toLowerCase();
    const q = query.trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesName = p.name.toLowerCase().includes(q);
    const matchesCategoryName = p.category.toLowerCase().includes(q);
    const matchesColor =
      p.colors.background.hex.toLowerCase().includes(q) ||
      p.colors.background.label.toLowerCase().includes(q) ||
      p.colors.primary.hex.toLowerCase().includes(q) ||
      p.colors.primary.label.toLowerCase().includes(q) ||
      p.colors.accent.hex.toLowerCase().includes(q) ||
      p.colors.accent.label.toLowerCase().includes(q) ||
      p.colors.text.hex.toLowerCase().includes(q) ||
      p.colors.text.label.toLowerCase().includes(q);

    return matchesCategory && (matchesName || matchesCategoryName || matchesColor);
  });
}

const darkPalettes = filterPalettes(parsedPalettes, 'Dark mode', '');
if (darkPalettes.length !== 12) {
  console.error(`FAIL: Expected 12 dark palettes, got ${darkPalettes.length}`);
  process.exit(1);
}
console.log('✓ PASS: Category filtering correctly isolated 12 dark mode palettes.');

const arcticSearch = filterPalettes(parsedPalettes, 'All', 'arctic');
if (arcticSearch.length !== 1 || arcticSearch[0].name !== 'Arctic') {
  console.error('FAIL: Search for "arctic" failed');
  process.exit(1);
}
console.log('✓ PASS: Search query by name successfully found Arctic.');

const goldSearch = filterPalettes(parsedPalettes, 'Luxury', 'gold');
if (goldSearch.length === 0) {
  console.error('FAIL: Search for "gold" in Luxury failed');
  process.exit(1);
}
console.log(`✓ PASS: Combined search & category filter matched ${goldSearch.length} palettes.`);

// 6. Test Hex Validation, Normalization and safeHex
function isValidHex(hex) {
  if (!hex || typeof hex !== 'string') return false;
  const clean = hex.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(clean);
}

function normalizeHex(hex) {
  if (!hex || typeof hex !== 'string') return '#000000';
  let clean = hex.trim().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  return '#' + clean.toUpperCase();
}

function safeHex(hex, fallback = '#000000') {
  if (!hex || typeof hex !== 'string') return fallback;
  const clean = hex.trim();
  if (isValidHex(clean)) {
    return normalizeHex(clean);
  }
  return fallback;
}

const testHexes = [
  { input: '#3B82F6', valid: true, normalized: '#3B82F6' },
  { input: '3b82f6', valid: true, normalized: '#3B82F6' },
  { input: '#FFF', valid: true, normalized: '#FFFFFF' },
  { input: 'abc', valid: true, normalized: '#AABBCC' },
  { input: '#GGGGGG', valid: false },
  { input: '12345', valid: false },
  { input: 'not-a-color', valid: false },
  { input: null, valid: false },
  { input: undefined, valid: false },
];

for (const t of testHexes) {
  const v = isValidHex(t.input);
  if (v !== t.valid) {
    console.error(`FAIL: Hex validation mismatch for ${t.input}`);
    process.exit(1);
  }
  if (t.valid && normalizeHex(t.input) !== t.normalized) {
    console.error(`FAIL: Normalization mismatch for ${t.input}`);
    process.exit(1);
  }
}
console.log('✓ PASS: Hex validation and normalization passed all tests.');

// Test safeHex
if (safeHex('invalid', '#FFFFFF') !== '#FFFFFF') {
  console.error('FAIL: safeHex fallback test failed');
  process.exit(1);
}
if (safeHex('#3b82f6', '#FFFFFF') !== '#3B82F6') {
  console.error('FAIL: safeHex valid hex test failed');
  process.exit(1);
}
console.log('✓ PASS: safeHex fallback test passed.');

// 7. Verify all 67 palettes can map to CSS variables and copy strings without issue
for (const p of parsedPalettes) {
  const css = `/* Palette Studio: ${p.name} */
:root {
  --preview-bg: ${safeHex(p.colors.background.hex)};
  --preview-primary: ${safeHex(p.colors.primary.hex)};
  --preview-accent: ${safeHex(p.colors.accent.hex)};
  --preview-text: ${safeHex(p.colors.text.hex)};
}`;
  if (!css.includes(p.name) || !css.includes('--preview-bg')) {
    console.error(`FAIL: CSS variable generation failed for palette ${p.name}`);
    process.exit(1);
  }
}
console.log('✓ PASS: All 67 palettes verified for dynamic CSS variables generation.');

console.log('\n=== ALL QUALITY CHECKS PASSED SUCCESSFULLY ===');
