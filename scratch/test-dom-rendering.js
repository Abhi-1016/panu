// scratch/test-dom-rendering.js
import { mmtState } from '../js/mmt-state.js';
import { renderFullscreenChat, downloadItineraryAsPdf } from '../js/views/fullscreen-chat.js';

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

// Simple DOM Mock
function createMockContainer() {
  const elements = [];
  const container = {
    innerHTML: '',
    querySelector(selector) {
      if (selector.startsWith('#')) {
        const id = selector.slice(1);
        if (this.innerHTML.includes(`id="${id}"`)) {
          return {
            id,
            addEventListener: () => {},
            getAttribute: (attr) => attr === 'data-day' ? '1' : null
          };
        }
      }
      return null;
    },
    querySelectorAll(selector) {
      if (selector.startsWith('.')) {
        const cls = selector.slice(1);
        const matches = (this.innerHTML.match(new RegExp(`class="[^"]*${cls}[^"]*"`, 'g')) || []);
        return matches.map(() => ({
          addEventListener: () => {},
          getAttribute: (attr) => 'test-id',
          checked: true
        }));
      }
      return [];
    }
  };
  return container;
}

console.log('--- Testing renderFullscreenChat across all stages ---');

const stages = [
  'seasons',
  'calendar_dates',
  'macro_overview',
  'activities_selection',
  'cuisines_markets',
  'grantex_accounts',
  'transit_booking',
  'hotels_booking',
  'cab_booking',
  'activities_prebook',
  'live_radar'
];

stages.forEach(stage => {
  mmtState.setActiveChatInterventionStage(stage);
  const container = createMockContainer();
  try {
    renderFullscreenChat(container);
    assert(container.innerHTML.length > 500, `Stage "${stage}" rendered successfully (${container.innerHTML.length} chars)`);
  } catch (err) {
    assert(false, `Stage "${stage}" failed with error: ${err.message}`);
  }
});

console.log('\n--- Testing Preview Canvases ---');
// 1. Places and Activities Preview (Gated before cuisines)
mmtState.state.isCuisinesConfirmed = false;
mmtState.state.scheduledCuisineIds = [];
mmtState.setPreviewViewMode('master_itinerary');
let container = createMockContainer();
renderFullscreenChat(container);
assert(container.innerHTML.includes('PLACES & ACTIVITIES PREVIEW'), 'Preview renders Places & Activities visual showcase when cuisines unconfirmed');
assert(!container.innerHTML.includes('undefined'), 'No undefined text in Places & Activities preview');

// 2. Full Master Itinerary (After cuisines)
mmtState.state.scheduledCuisineIds = ['flavour-1'];
container = createMockContainer();
renderFullscreenChat(container);
assert(container.innerHTML.includes('COMPLETE MASTER SCHEDULE SYNCHRONIZED'), 'Master schedule revealed after cuisine selection');
assert(container.innerHTML.includes('id="btn-download-itinerary-pdf"'), 'Download Itinerary (PDF) button rendered in master schedule');
assert(!container.innerHTML.includes('undefined'), 'No undefined text in Master Schedule preview');

// 3. Central Repository (trip_locker)
mmtState.setPreviewViewMode('trip_locker');
container = createMockContainer();
renderFullscreenChat(container);
assert(container.innerHTML.includes('Central Group Travel Repository & Locker'), 'Group Locker rendered');
assert(container.innerHTML.includes('Pine Labs Grantex Escrow Settlement Ledger'), 'Grantex Settlement Ledger rendered');
assert(container.innerHTML.includes('id="btn-download-itinerary-pdf-locker"'), 'PDF export button rendered inside Locker');
assert(!container.innerHTML.includes('undefined'), 'No undefined text in Group Locker canvas');

console.log(`\n========================================`);
console.log(`DOM Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
