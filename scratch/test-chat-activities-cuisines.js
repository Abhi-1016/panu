// scratch/test-chat-activities-cuisines.js
// Automated verification suite for the 6 new user requirements

import { mmtState } from '../js/mmt-state.js';
import { renderFullscreenChat } from '../js/views/fullscreen-chat.js';
import { renderChatDrawer } from '../js/views/chat-drawer.js';
import { renderChatView } from '../js/components/chat-view.js';

function createMockElement(id = 'mock-root') {
  let innerHtml = '';
  return {
    id,
    listeners: {},
    get innerHTML() {
      return innerHtml;
    },
    set innerHTML(val) {
      innerHtml = val;
    },
    querySelector(sel) {
      if (innerHtml.includes(sel.replace(/^[.#]/, ''))) {
        return {
          addEventListener: () => {},
          getAttribute: () => null,
          value: '',
          classList: { add: () => {}, remove: () => {} }
        };
      }
      return null;
    },
    querySelectorAll(sel) {
      return [];
    }
  };
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTests() {
  console.log('--- STARTING 6-POINT TEST SUITE ---');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passedTests++;
    } else {
      console.error(`❌ FAIL: ${message}`);
    }
  }

  // 1. Reset state to macro itinerary approved, ready for activity selection
  mmtState.approveMacroItinerary();
  assert(mmtState.state.itinerarySubStep === 'activities_selection', 'SubStep advanced to activities_selection after macro approval');

  // Clear selections to test incremental chat selection
  mmtState.state.dayActivitySelections = { 1: [], 2: [], 3: [], 4: [] };
  assert(!mmtState.isAllDaysActivitiesSelected(), 'Initially not all days have activities selected');

  // Test chat activity selection for Day 1
  console.log('\n--- 1. Testing Chat Activity Selection (@Myra) ---');
  mmtState.sendChatMessage("@Myra add Sunset High-Tea for Day 1");
  await sleep(600);
  const d1ActAfter = (mmtState.state.dayActivitySelections[1] || []).length;
  assert(d1ActAfter > 0, 'Chat message "@Myra add Sunset High-Tea for Day 1" added activity to Day 1');

  // Test chat activity selection for Day 2
  mmtState.sendChatMessage("@Myra choose Nohkalikai trek for Day 2");
  await sleep(600);
  const d2Act = (mmtState.state.dayActivitySelections[2] || []).length;
  assert(d2Act > 0, 'Chat message "@Myra choose Nohkalikai trek for Day 2" added activity to Day 2');

  // Test chat activity selection for Day 3
  mmtState.sendChatMessage("@Myra choose Living Root Bridges trek for Day 3");
  await sleep(600);
  const d3Act = (mmtState.state.dayActivitySelections[3] || []).length;
  assert(d3Act > 0, 'Chat message "@Myra choose Living Root Bridges trek for Day 3" added activity to Day 3');

  // Test chat activity selection for Day 4
  mmtState.sendChatMessage("@Myra choose Police Bazar evening walk for Day 4");
  await sleep(600);
  const d4Act = (mmtState.state.dayActivitySelections[4] || []).length;
  assert(d4Act > 0, 'Chat message "@Myra choose Police Bazar evening walk for Day 4" added activity to Day 4');

  // Verify isAllDaysActivitiesSelected()
  assert(mmtState.isAllDaysActivitiesSelected() === true, 'mmtState.isAllDaysActivitiesSelected() returns true when all 4 days have chosen activities');

  // 2. Test Preview Gating BEFORE Cuisines Selection
  console.log('\n--- 2. Testing Preview Gating BEFORE Cuisines Selection ---');
  mmtState.state.scheduledCuisineIds = [];
  mmtState.state.isCuisinesConfirmed = false;
  mmtState.state.maxUnlockedSubStep = 2;
  mmtState.setPreviewViewMode('itinerary');

  const mockContainer = createMockElement();
  renderFullscreenChat(mockContainer);
  const htmlBeforeCuisines = mockContainer.innerHTML;

  assert(htmlBeforeCuisines.includes('places-activities-preview-container'), 'Preview screen shows visual places & activities preview before cuisines are selected');
  assert(htmlBeforeCuisines.includes('preview-visual-day-card'), 'Preview screen contains visual day cards with destination photos');
  assert(!htmlBeforeCuisines.includes('COMPLETE MASTER SCHEDULE SYNCHRONIZED'), 'Master schedule timeline is gated (hidden) before cuisines are selected');
  assert(!htmlBeforeCuisines.includes('master-swap-select'), 'Preview screen has NO day swap controls (Requirement 2)');

  // 3. Test Absence of Bottom Quick Action Chips (Requirement 5)
  console.log('\n--- 3. Testing Absence of Bottom Quick Action Chips ---');
  assert(!htmlBeforeCuisines.includes('quick-tags-strip'), 'Fullscreen chat bottom has NO quick-tags-strip');
  assert(!htmlBeforeCuisines.includes('btn-tag-chip'), 'Fullscreen chat bottom has NO btn-tag-chip prompt buttons');

  // Check chat-drawer.js
  const mockDrawer = createMockElement();
  renderChatDrawer(mockDrawer);
  assert(!mockDrawer.innerHTML.includes('quick-p-btn'), 'Chat drawer has NO quick-p-btn chips');

  // Check chat-view.js
  const mockView = createMockElement();
  renderChatView(mockView);
  assert(!mockView.innerHTML.includes('chat-quick-actions-bar'), 'Chat view has NO chat-quick-actions-bar');
  assert(!mockView.innerHTML.includes('quick-prompt-btn'), 'Chat view has NO quick-prompt-btn chips');

  // 4. Test One-Click Move to Cuisines (Requirement 3)
  console.log('\n--- 4. Testing One-Click Move to Cuisines ---');
  assert(htmlBeforeCuisines.includes('btn-advance-to-cuisines-oneclick'), 'Fullscreen chat renders #btn-advance-to-cuisines-oneclick when all activities are selected');

  mmtState.advanceToCuisinesMarkets();
  assert(mmtState.state.itinerarySubStep === 'cuisines_markets', 'advanceToCuisinesMarkets() advances itinerarySubStep to cuisines_markets');
  assert(mmtState.state.activeChatInterventionStage === 'cuisines_markets', 'advanceToCuisinesMarkets() sets activeChatInterventionStage to cuisines_markets');

  // 5. Test Chat Cuisine Selection (Requirement 4)
  console.log('\n--- 5. Testing Chat Cuisine Selection (@Myra) ---');
  const cuisinesBefore = mmtState.state.scheduledCuisineIds.length;
  mmtState.sendChatMessage("@Myra add Jadoh Rice Stall");
  await sleep(600);
  const cuisinesAfter = mmtState.state.scheduledCuisineIds.length;
  assert(cuisinesAfter > cuisinesBefore, 'Chat message "@Myra add Jadoh Rice Stall" added cuisine to scheduledCuisineIds');
  assert(mmtState.state.isCuisinesConfirmed === true, 'isCuisinesConfirmed is set to true after adding cuisine');

  // Add second cuisine via chat
  mmtState.sendChatMessage("@Myra choose Orange Roots Thali");
  await sleep(600);
  assert(mmtState.state.scheduledCuisineIds.length >= 2, 'Chat message "@Myra choose Orange Roots Thali" added second cuisine');

  // 6. Test Preview Gating AFTER Cuisines Selection (Requirement 6)
  console.log('\n--- 6. Testing Preview Gating AFTER Cuisines Selection ---');
  const mockContainerAfter = createMockElement();
  renderFullscreenChat(mockContainerAfter);
  const htmlAfterCuisines = mockContainerAfter.innerHTML;

  assert(htmlAfterCuisines.includes('COMPLETE MASTER SCHEDULE SYNCHRONIZED'), 'Master complete itinerary schedule timeline is revealed after cuisines selection');
  assert(htmlAfterCuisines.includes('master-itinerary-container'), 'Complete master-itinerary-container rendered');
  assert(!htmlAfterCuisines.includes('master-swap-select'), 'Master itinerary timeline in preview screen still has NO master-swap-select controls');

  console.log(`\n================================`);
  console.log(`TEST RESULTS: ${passedTests} / ${totalTests} passed (${Math.round(passedTests / totalTests * 100)}%)`);
  console.log(`================================`);

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
