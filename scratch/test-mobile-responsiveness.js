// scratch/test-mobile-responsiveness.js - Automated Test Suite for Mobile Responsiveness & Bottom Navigation
import { mmtState } from '../js/mmt-state.js';
import { renderFullscreenChat } from '../js/views/fullscreen-chat.js';

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

// Mock DOM Container
function createMockContainer() {
  const listeners = {};
  const container = {
    innerHTML: '',
    querySelector(selector) {
      if (selector.startsWith('#')) {
        const id = selector.slice(1);
        if (this.innerHTML.includes(`id="${id}"`)) {
          return {
            id,
            addEventListener: (event, handler) => {
              listeners[`${id}:${event}`] = handler;
            },
            trigger: (event) => {
              if (listeners[`${id}:${event}`]) listeners[`${id}:${event}`]();
            }
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
          getAttribute: () => 'test'
        }));
      }
      return [];
    }
  };
  return container;
}

console.log('🚀 Starting Mobile Responsiveness & Bottom Navigation Test Suite...\n');

// 1. Test Bottom Navigation Bar presence and placement
console.log('--- TEST 1: Bottom Navigation Bar Structure & Location ---');
mmtState.setDeviceMode('mobile');
let container = createMockContainer();
renderFullscreenChat(container);

assert(container.innerHTML.includes('class="mobile-bottom-nav-bar'), 'Mobile Bottom Navigation Bar renders with class .mobile-bottom-nav-bar');
assert(container.innerHTML.includes('id="mobile-bottom-nav"'), 'Mobile Bottom Navigation Bar has id #mobile-bottom-nav');
assert(container.innerHTML.includes('id="btn-m-segment-chat"'), 'Chat tab button exists with id #btn-m-segment-chat');
assert(container.innerHTML.includes('id="btn-m-segment-preview"'), 'Preview tab button exists with id #btn-m-segment-preview');
assert(container.innerHTML.includes('Planning & Chat'), 'Bottom tab contains "Planning & Chat" label');
assert(container.innerHTML.includes('Review Canvas'), 'Bottom tab contains "Review Canvas" label');
assert(!container.innerHTML.includes('class="mobile-segmented-strip'), 'Old top .mobile-segmented-strip is removed');

// 2. Test Placement: Navigation Bar must come AFTER .split-workspace-body (at the bottom)
const splitBodyIndex = container.innerHTML.indexOf('id="split-workspace-body"');
const bottomNavIndex = container.innerHTML.indexOf('id="mobile-bottom-nav"');
assert(bottomNavIndex > splitBodyIndex, 'Bottom Navigation Bar is positioned AFTER split-workspace-body in DOM tree');

// 3. Test Tab Switching via mmtState
console.log('\n--- TEST 2: Bottom Navigation Tab Switching ---');
mmtState.setMobileActiveTab('chat');
assert(mmtState.state.mobileActiveTab === 'chat', 'State mobileActiveTab switches to "chat"');

container = createMockContainer();
renderFullscreenChat(container);
assert(container.innerHTML.includes('btn-m-bottom-tab btn-m-segment active" id="btn-m-segment-chat"'), 'Chat tab has .active class when mobileActiveTab is "chat"');
assert(container.innerHTML.includes('split-preview-column mobile-pane-hidden'), 'Review canvas column has .mobile-pane-hidden when chat tab active');
assert(!container.innerHTML.includes('split-chat-column mobile-pane-hidden'), 'Chat column is visible when chat tab active');

mmtState.setMobileActiveTab('preview');
assert(mmtState.state.mobileActiveTab === 'preview', 'State mobileActiveTab switches to "preview"');

container = createMockContainer();
renderFullscreenChat(container);
assert(container.innerHTML.includes('btn-m-bottom-tab btn-m-segment active" id="btn-m-segment-preview"'), 'Preview tab has .active class when mobileActiveTab is "preview"');
assert(container.innerHTML.includes('split-chat-column mobile-pane-hidden'), 'Chat column has .mobile-pane-hidden when preview tab active');
assert(!container.innerHTML.includes('split-preview-column mobile-pane-hidden'), 'Review canvas column is visible when preview tab active');

// 4. Test Mobile Mode Rendering across All 11 Stages
console.log('\n--- TEST 3: Mobile Mode Stage Rendering ---');
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
  const c = createMockContainer();
  try {
    renderFullscreenChat(c);
    assert(c.innerHTML.includes('id="mobile-bottom-nav"'), `Stage "${stage}" renders mobile bottom nav bar cleanly`);
    assert(!c.innerHTML.includes('undefined'), `Stage "${stage}" has zero "undefined" text`);
  } catch (err) {
    assert(false, `Stage "${stage}" failed in mobile mode: ${err.message}`);
  }
});

// 5. Reset to Desktop Mode
mmtState.setDeviceMode('desktop');
assert(mmtState.state.deviceMode === 'desktop', 'Device mode successfully toggles back to desktop');

console.log(`\n========================================`);
console.log(`Mobile Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
