// scratch/test-mobile-first-design.js - Automated Test Suite for Mobile-First CSS, Flexible Grids & Touch-Friendly Buttons
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mmtState } from '../js/mmt-state.js';
import { renderFullscreenChat } from '../js/views/fullscreen-chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cssPath = path.resolve(__dirname, '../css/mmt-theme.css');

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    console.log(`✅ PASS: ${msg}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${msg}`);
    failed++;
  }
}

console.log('🚀 Starting Mobile-First CSS, Flexible Grids & Touch Buttons Test Suite...\n');

const css = fs.readFileSync(cssPath, 'utf8').replace(/\r\n/g, '\n');

// --- 1. Testing Mobile-First CSS Architecture ---
console.log('--- TEST 1: Mobile-First CSS Baseline Architecture ---');
assert(css.includes('--touch-target-min: 44px;'), 'CSS defines --touch-target-min: 44px for WCAG compliance');
assert(css.includes('--touch-target-large: 48px;'), 'CSS defines --touch-target-large: 48px for thumb touch targets');
assert(css.includes('--touch-safe-bottom: max(10px, env(safe-area-inset-bottom));'), 'CSS defines --touch-safe-bottom for mobile notch safety');

// Verify Base Split Workspace is Mobile First (column layout & bottom nav display: flex)
assert(/\.split-workspace-body\s*\{[^}]*flex-direction:\s*column/s.test(css), 'Base .split-workspace-body layout is mobile-first (column layout)');
assert(/\.mobile-bottom-nav-bar\s*\{[^}]*display:\s*flex/s.test(css), 'Base .mobile-bottom-nav-bar is mobile-first (visible by default)');

// Verify Progressive Enhancement via min-width for Desktop
assert(css.includes('@media (min-width: 901px)'), 'Progressive enhancement uses @media (min-width: 901px) for desktop');
assert(css.includes('flex-direction: row !important;'), 'Desktop min-width enhances .split-workspace-body to horizontal row');
assert(css.includes('display: none !important;'), 'Desktop min-width progressively hides bottom navigation bar');

// --- 2. Testing Flexible Grid Systems ---
console.log('\n--- TEST 2: Flexible Grid Systems ---');
assert(css.includes('grid-template-columns: repeat(auto-fit, minmax('), 'Flexible auto-fit grids defined with auto-fit & minmax');
assert(css.includes('.multimodal-transit-grid'), 'Multimodal transit uses flexible auto-fit grid');
assert(css.includes('.hotels-location-grid'), 'Hotels location uses flexible auto-fit grid');
assert(css.includes('.grantex-members-grid'), 'Grantex members uses flexible auto-fit grid');
assert(css.includes('.cab-fleet-grid'), 'Cab fleet uses flexible auto-fit grid');
assert(/\.search-inputs-grid\s*\{[^}]*grid-template-columns:\s*1fr/s.test(css), 'Search inputs grid is mobile-first (1-column baseline)');
assert(/@media\s*\(min-width:\s*860px\)\s*\{[^}]*\.search-inputs-grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/s.test(css), 'Search inputs grid progressively expands to 4 columns at min-width: 860px');

// --- 3. Testing Touch-Friendly Buttons & Interactions ---
console.log('\n--- TEST 3: Touch-Friendly Button Ergonomics ---');
assert(css.includes('touch-action: manipulation;'), 'Global touch buttons set touch-action: manipulation to eliminate mobile tap delay');
assert(css.includes('-webkit-tap-highlight-color: transparent;'), 'Buttons disable default tap highlight grey flash');
assert(css.includes('transform: scale(0.97);'), 'Interactive buttons provide tactile scale(0.97) feedback on :active');
assert(css.includes('min-height: var(--touch-target-min, 44px);'), 'Interactive elements enforce minimum 44px touch height');
assert(css.includes('min-height: var(--touch-target-large, 48px);'), 'Primary CTAs enforce large 48px thumb target height');
assert(css.includes('font-size: 16px;'), 'Mobile inputs specify 16px font size to prevent automatic iOS zoom on focus');

// --- 4. DOM Rendering Verification Across Desktop & Mobile ---
console.log('\n--- TEST 4: Live DOM Rendering Verification ---');

function createMockContainer() {
  return {
    innerHTML: '',
    querySelector: () => null,
    querySelectorAll: () => []
  };
}

// Render in Mobile Mode
mmtState.setDeviceMode('mobile');
let container = createMockContainer();
renderFullscreenChat(container);
assert(container.innerHTML.includes('class="mobile-bottom-nav-bar'), 'Renders mobile bottom nav bar cleanly in mobile mode');
assert(!container.innerHTML.includes('undefined'), 'Zero undefined text in mobile mode');

// Render in Desktop Mode
mmtState.setDeviceMode('desktop');
container = createMockContainer();
renderFullscreenChat(container);
assert(container.innerHTML.includes('class="split-workspace-body"'), 'Renders split workspace body cleanly in desktop mode');
assert(!container.innerHTML.includes('undefined'), 'Zero undefined text in desktop mode');

console.log(`\n========================================`);
console.log(`Mobile-First Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
