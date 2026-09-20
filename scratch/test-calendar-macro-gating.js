// scratch/test-calendar-macro-gating.js
// Verification of:
// 1. Seasonal voting with highest parity summary & Admin confirmation
// 2. Entire month calendar dropdown & availability picking
// 3. Myra AI group date synthesis & Admin approval
// 4. Macro day-wise itinerary, day toggling, reshuffling & Admin approval
// 5. Strict stage gating (upcoming stages locked/greyed out)

import { mmtState } from '../js/mmt-state.js';

function assert(condition, msg) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${msg}`);
    process.exit(1);
  }
  console.log(`✓ ${msg}`);
}

console.log('=== RUNNING TESTS: CALENDAR DROPDOWN, MACRO ITINERARY & STEP GATING ===\n');

// 1. Initial State & Strict Stage Gating at Step 1
console.log('--- TEST 1: Initial Gating & Seasonal Parity ---');
assert(mmtState.isStageUnlocked('seasons') === true, 'Stage 1 (seasons) is unlocked initially');
assert(mmtState.isStageUnlocked('calendar_dates') === false, 'Stage 2 (calendar_dates) is locked initially');
assert(mmtState.isStageUnlocked('macro_overview') === false, 'Stage 3 (macro_overview) is locked initially');
assert(mmtState.isStageUnlocked('activities_selection') === false, 'Stage 4 (activities_selection) is locked initially');
assert(mmtState.isStageUnlocked('grantex_accounts') === false, 'Stage 6 (grantex_accounts) is locked initially');

const initialParity = mmtState.getHighestParitySeasonalWindow();
assert(initialParity.window && initialParity.window.id === 'win-1', 'Initial highest parity window is win-1 (Mid-October)');
assert(initialParity.votesCount === 3, 'Initial votes for lead is 3');
assert(initialParity.parityPercent === 75, 'Initial parity percent is 75%');

// Cast 4th vote from user-3 to win-1 to make it 100% consensus
mmtState.voteSeasonalWindow('win-1', 'user-3');
const consensusParity = mmtState.getHighestParitySeasonalWindow();
assert(consensusParity.votesCount === 4, 'All 4 members now voted for win-1');
assert(consensusParity.parityPercent === 100, 'Consensus parity is now 100%');
assert(mmtState.state.isSeasonalConsensusReached === true, 'isSeasonalConsensusReached flag is set');

// 2. Admin Confirms Seasonal Window -> Unlocks Stage 2 (Calendar)
console.log('\n--- TEST 2: Admin Confirms Seasonal Window & Unlocks Month Calendar ---');
mmtState.confirmSeasonalWindow('win-1');
assert(mmtState.state.isSeasonalWindowConfirmed === true, 'Seasonal window confirmed by Admin');
assert(mmtState.isStageUnlocked('seasons') === true, 'Stage 1 still unlocked');
assert(mmtState.isStageCompleted('seasons') === true, 'Stage 1 is completed');
assert(mmtState.isStageUnlocked('calendar_dates') === true, 'Stage 2 (calendar_dates) is now unlocked');
assert(mmtState.isStageUnlocked('macro_overview') === false, 'Stage 3 (macro_overview) is still locked');

// 3. Month Calendar Dropdown & 31-Day Grid Generation
console.log('\n--- TEST 3: Month Calendar Dropdown & 31-Day Grid ---');
assert(mmtState.state.isCalendarMonthDropdownOpen === true, 'Calendar month dropdown is open by default');
mmtState.toggleCalendarMonthDropdown(false);
assert(mmtState.state.isCalendarMonthDropdownOpen === false, 'Calendar month dropdown collapses');
mmtState.toggleCalendarMonthDropdown(true);
assert(mmtState.state.isCalendarMonthDropdownOpen === true, 'Calendar month dropdown expands');

const octDays = mmtState.generateMonthCalendarDays('2026-10');
assert(octDays.length === 31, 'October 2026 calendar has exactly 31 days');
assert(octDays[0].dateKey === '2026-10-01' && octDays[0].dayNum === 1, 'First day is Oct 1');
assert(octDays[30].dateKey === '2026-10-31' && octDays[30].dayNum === 31, 'Last day is Oct 31');
assert(octDays[15].flightSurge === 'Optimal Deal', 'Oct 16 has optimal deal rate');

// Toggle individual member availability
mmtState.toggleMemberDate('user-1', '2026-10-14');
assert(mmtState.state.memberDateSelections['user-1'].includes('2026-10-14'), 'Added Oct 14 to user-1 availability');
mmtState.toggleMemberDate('user-1', '2026-10-14');
assert(!mmtState.state.memberDateSelections['user-1'].includes('2026-10-14'), 'Removed Oct 14 from user-1 availability');

// Record all member dates & synthesize optimal window
mmtState.recordAllMemberDates();
const synth = mmtState.state.synthesizedDateResult;
assert(synth.overlapPercent === 100, 'Synthesized dates have 100% group consensus');
assert(synth.dates.includes('16 Oct') && synth.dates.includes('20 Oct'), 'Optimal group travel dates are 16 Oct - 20 Oct');

// 4. Admin Approves Group Travel Dates -> Unlocks Stage 3 (Macro Days)
console.log('\n--- TEST 4: Admin Approves Travel Dates -> Unlocks Macro Overview ---');
mmtState.approveFinalTravelDates();
assert(mmtState.state.isDecisionLocked === true, 'Decision is locked by Admin');
assert(mmtState.isStageUnlocked('calendar_dates') === true, 'Stage 2 is unlocked');
assert(mmtState.isStageCompleted('calendar_dates') === true, 'Stage 2 is completed');
assert(mmtState.isStageUnlocked('macro_overview') === true, 'Stage 3 (macro_overview) is unlocked');
assert(mmtState.isStageUnlocked('activities_selection') === false, 'Stage 4 (activities_selection) is still locked');
assert(mmtState.state.itinerarySubStep === 'macro_overview', 'Current substep is macro_overview');

// 5. Macro Day-Wise Itinerary: Day Toggling, Reshuffling & Reset
console.log('\n--- TEST 5: Macro Day Toggling, Reshuffling & Recommendation Reset ---');
assert(mmtState.state.macroDays.length === 4, 'Macro days loaded 4 days');
const origDay1 = mmtState.state.macroDays[0].title;
const origDay2 = mmtState.state.macroDays[1].title;

// Toggle active macro day
mmtState.setActiveMacroDay(1);
assert(mmtState.state.activeMacroDayIdx === 1, 'Active macro day index set to 1');
assert(mmtState.state.activeConfiguringDayNum === 2, 'Active configuring day set to Day 2');

// Reorder/swap days
mmtState.swapMacroDays(0, 1);
assert(mmtState.state.macroDays[0].title === origDay2, 'Day 1 is now what was previously Day 2');
assert(mmtState.state.macroDays[1].title === origDay1, 'Day 2 is now what was previously Day 1');

// Keep / Reset to Myra's recommendation
mmtState.resetMacroDaysToRecommended();
assert(mmtState.state.macroDays[0].title === origDay1, 'Day 1 restored to original recommendation');
assert(mmtState.state.macroDays[1].title === origDay2, 'Day 2 restored to original recommendation');

// 6. Admin Approves Macro Day-Wise Itinerary -> Unlocks Stage 4 (Activities)
console.log('\n--- TEST 6: Admin Approves Macro Itinerary -> Unlocks Activities Selection ---');
mmtState.approveMacroItinerary();
assert(mmtState.state.maxUnlockedSubStep >= 2, 'maxUnlockedSubStep advanced to at least 2');
assert(mmtState.state.itinerarySubStep === 'activities_selection', 'Advanced to activities_selection');
assert(mmtState.isStageUnlocked('macro_overview') === true, 'Stage 3 is unlocked');
assert(mmtState.isStageCompleted('macro_overview') === true, 'Stage 3 is completed');
assert(mmtState.isStageUnlocked('activities_selection') === true, 'Stage 4 (activities_selection) is now unlocked');
assert(mmtState.isStageUnlocked('grantex_accounts') === false, 'Stage 6 (grantex_accounts) is still locked');

console.log('\n🎉 ALL 20 CALENDAR DROPDOWN, MACRO ITINERARY & STEP GATING TESTS PASSED PERFECTLY!');
