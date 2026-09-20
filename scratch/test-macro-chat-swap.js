// scratch/test-macro-chat-swap.js - Unit tests for chat-based day swapping with Myra

import { mmtState } from '../js/mmt-state.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

console.log('=== RUNNING TESTS: CHAT-BASED DAY SWAPPING WITH MYRA ===\n');

// Reset to initial baseline
mmtState.resetMacroDaysToRecommended();

const initialDay1Title = mmtState.state.macroDays[0].title;
const initialDay2Title = mmtState.state.macroDays[1].title;
const initialDay3Title = mmtState.state.macroDays[2].title;
const initialDay4Title = mmtState.state.macroDays[3].title;

// --- TEST 1: Direct Intent Parser Unit Tests ---
console.log('--- TEST 1: parseDaySwapIntent unit checks ---');

const intent1 = mmtState.parseDaySwapIntent('@Myra swap Day 2 and Day 3');
assert(intent1 && intent1.isSwapIntent, 'Intent 1 is swap intent');
assert(intent1.dayA === 2 && intent1.dayB === 3, 'Intent 1 correctly parsed Day 2 and Day 3');
assert(intent1.idxA === 1 && intent1.idxB === 2, 'Intent 1 indices 1 and 2');

const intent2 = mmtState.parseDaySwapIntent('@myra switch day 1 with day 4');
assert(intent2.dayA === 1 && intent2.dayB === 4, 'Intent 2 correctly parsed Day 1 and Day 4');

const intent3 = mmtState.parseDaySwapIntent('@myra swap 2 and 3');
assert(intent3.dayA === 2 && intent3.dayB === 3, 'Intent 3 correctly parsed numeric pair 2 and 3');

const intent4 = mmtState.parseDaySwapIntent('@Myra swap second day and third day');
assert(intent4.dayA === 2 && intent4.dayB === 3, 'Intent 4 correctly parsed ordinals second and third day');

const intent5 = mmtState.parseDaySwapIntent('@Myra swap Cherrapunji and Dawki');
assert(intent5.dayA === 2 && intent5.dayB === 3, 'Intent 5 correctly parsed destination names Cherrapunji and Dawki');

const intentMissing = mmtState.parseDaySwapIntent('@Myra can you swap the days?');
assert(intentMissing && intentMissing.isSwapIntent && intentMissing.dayA === null, 'Swap intent without specific days detected');

// --- TEST 2: Direct swapMacroDays Logic ---
console.log('\n--- TEST 2: swapMacroDays direct execution ---');
const swapRes = mmtState.swapMacroDays(1, 2); // Swap Day 2 and Day 3
assert(swapRes === true, 'swapMacroDays(1, 2) succeeded');
assert(mmtState.state.macroDays[1].title === initialDay3Title, 'Day 2 is now Dawki (was Day 3)');
assert(mmtState.state.macroDays[2].title === initialDay2Title, 'Day 3 is now Cherrapunji (was Day 2)');
assert(mmtState.state.macroDays[0].title === initialDay1Title, 'Day 1 unchanged');
assert(mmtState.state.macroDays[3].title === initialDay4Title, 'Day 4 unchanged');
assert(mmtState.state.macroDays[1].dayNum === 2, 'Day 2 dayNum is re-indexed to 2');
assert(mmtState.state.macroDays[2].dayNum === 3, 'Day 3 dayNum is re-indexed to 3');
assert(mmtState.state.itinerary[1].title.includes(initialDay3Title.split('—')[0].trim()), 'Full itinerary Day 2 matches Dawki');
assert(mmtState.state.itinerary[2].title.includes(initialDay2Title.split('—')[0].trim()), 'Full itinerary Day 3 matches Cherrapunji');
assert(mmtState.state.lastSwappedDays[0] === 1 && mmtState.state.lastSwappedDays[1] === 2, 'lastSwappedDays tracked');

// Restore
mmtState.resetMacroDaysToRecommended();
assert(mmtState.state.macroDays[1].title === initialDay2Title, 'Day 2 restored to Cherrapunji');
assert(mmtState.state.macroDays[2].title === initialDay3Title, 'Day 3 restored to Dawki');

// --- TEST 3: sendChatMessage conversational execution ---
console.log('\n--- TEST 3: sendChatMessage with @Myra swap Day 2 and Day 3 ---');
const prevMsgCount = mmtState.state.chatMessages.length;
mmtState.sendChatMessage('@Myra swap Day 2 and Day 3');

// Give setTimeout 600ms to resolve Myra's reply
setTimeout(() => {
  assert(mmtState.state.chatMessages.length > prevMsgCount, 'Chat messages count increased');
  assert(mmtState.state.macroDays[1].title === initialDay3Title, 'Conversational swap executed: Day 2 is now Dawki');
  assert(mmtState.state.macroDays[2].title === initialDay2Title, 'Conversational swap executed: Day 3 is now Cherrapunji');

  const lastMyraMsg = mmtState.state.chatMessages[mmtState.state.chatMessages.length - 1];
  assert(lastMyraMsg.isAI === true, 'Last message is from Myra AI');
  assert(lastMyraMsg.text.includes('Swapped Day 2') || lastMyraMsg.text.includes('Shifted Day 2') || lastMyraMsg.text.includes('ITINERARY'), 'Myra response confirms swap');

  // --- TEST 4: Edge Cases: Out of range & Identical day ---
  console.log('\n--- TEST 4: Edge cases (out of range / identical day) ---');
  mmtState.sendChatMessage('@Myra swap Day 2 and Day 8');
  setTimeout(() => {
    const errorMsg = mmtState.state.chatMessages[mmtState.state.chatMessages.length - 1];
    assert(errorMsg.text.includes('4 days'), 'Polite error response for Day 8 out of bounds');

    mmtState.sendChatMessage('@Myra swap Day 2 and Day 2');
    setTimeout(() => {
      const sameDayMsg = mmtState.state.chatMessages[mmtState.state.chatMessages.length - 1];
      assert(sameDayMsg.text.includes('already in that position') || sameDayMsg.text.includes('already selected'), 'Response for identical day handles gracefully');

      console.log('\n🎉 ALL CHAT-BASED DAY SWAPPING AND ITINERARY TESTS PASSED!');
      process.exit(0);
    }, 600);
  }, 600);
}, 600);
