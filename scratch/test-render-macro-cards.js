// scratch/test-render-macro-cards.js - Test HTML output of Macro Day Cards & Chat Workspace

import { mmtState } from '../js/mmt-state.js';
import { renderFullscreenChat } from '../js/views/fullscreen-chat.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

console.log('=== RUNNING TESTS: MACRO DAY CARDS HTML & INTERACTION RENDERING ===\n');

// 1. Advance state to macro_overview stage
mmtState.state.isFullChatOpen = true;
mmtState.state.isSeasonalWindowConfirmed = true;
mmtState.state.isDecisionLocked = true;
mmtState.state.itinerarySubStep = 'macro_overview';
mmtState.state.activeChatInterventionStage = 'macro_overview';
mmtState.state.previewViewMode = 'master_itinerary';

// Mock DOM container
const container = {
  innerHTML: '',
  querySelectorAll: (selector) => [],
  querySelector: (selector) => null
};

// Render
renderFullscreenChat(container);

const html = container.innerHTML;

// Check Route Feasibility Radar
assert(html.includes('macro-feasibility-radar-bar'), 'Contains Route Feasibility Radar banner');
assert(html.includes('Anti-Backtracking Score'), 'Contains Anti-Backtracking score metric');
assert(html.includes('swap Day 2 and Day 3'), 'Contains prompt hint for chat swap');

// Check Quick Swaps Bar
assert(html.includes('btn-quick-swap-chip'), 'Contains 1-Click Quick Swaps action chips');
assert(html.includes('data-swap-a="1" data-swap-b="2"'), 'Contains Day 2 & 3 quick swap chip');

// Check Day Cards & Elements
assert(html.includes('macro-day-row-card'), 'Renders macro-day-row-card elements');
assert(html.includes('macro-day-thumb-wrap'), 'Renders macro-day-thumb-wrap thumbnail container');
assert(html.includes('macro-day-img'), 'Renders macro-day-img photo elements');
assert(html.includes('macro-hub-pill'), 'Renders macro-hub-pill category badge');
assert(html.includes('macro-day-number-badge'), 'Renders DAY number badges');
assert(html.includes('macro-spec-chip'), 'Renders metadata specs chips (km, hotel, daylight)');
assert(html.includes('macro-swap-select'), 'Renders 1-click macro-swap-select dropdowns');

// Check Ask @Myra Chat Chips
assert(html.includes('@Myra swap Day 2 and Day 3'), 'Contains @Myra swap Day 2 & 3 chat tag chip');
assert(html.includes('@Myra swap Day 1 and Day 2'), 'Contains @Myra swap Day 1 & 2 chat tag chip');

// Check Master Review Canvas Day Cards
assert(html.includes('master-swap-select'), 'Renders master-swap-select on review canvas day cards');

console.log('\n🎉 ALL MACRO DAY CARDS AND UI RENDERING TESTS PASSED PERFECTLY!');
