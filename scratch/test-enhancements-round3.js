// scratch/test-enhancements-round3.js
import { mmtState } from '../js/mmt-state.js';

console.log('=== RUNNING VERIFICATION FOR USER REQUEST ROUND 3 ===');

// TEST 1: Split Screen Width Adjustment (Requirement 1)
console.log('\n--- TEST 1: Adjustable Chat & Preview Widths ---');
console.log('Initial splitPaneWidth:', mmtState.state.splitPaneWidth);
mmtState.setSplitPaneWidth(320); // 30% preset
console.log('After 30% ratio:', mmtState.state.splitPaneWidth);
if (mmtState.state.splitPaneWidth !== 320) throw new Error('Failed to set 320px');

mmtState.setSplitPaneWidth(500); // 50% preset
console.log('After 50% ratio:', mmtState.state.splitPaneWidth);
if (mmtState.state.splitPaneWidth !== 500) throw new Error('Failed to set 500px');

// Clamping test
mmtState.setSplitPaneWidth(150);
console.log('Clamped min width (expected >= 260):', mmtState.state.splitPaneWidth);
if (mmtState.state.splitPaneWidth < 260) throw new Error('Min clamping failed');

// TEST 2: Sequential Step Locking & Highlighting (Requirement 2)
console.log('\n--- TEST 2: Sequential Step Locking ---');
console.log('Initial maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);
if (mmtState.state.maxUnlockedSubStep !== 1) throw new Error('Initial maxUnlockedSubStep should be 1');

// Attempt to skip to step 3 directly (should be blocked)
const jumped = mmtState.setItinerarySubStep('itinerary_schedule');
console.log('Attempted jump to Step 3 before completing Step 1 & 2. Allowed?', jumped);
if (jumped) throw new Error('Should NOT allow skipping ahead!');

// Step 1: Complete and advance
console.log('Advancing from Step 1 (macro_overview)...');
mmtState.advanceFromMacroOverview();
console.log('After Step 1 completion, maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);
console.log('Current itinerarySubStep:', mmtState.state.itinerarySubStep);
if (mmtState.state.maxUnlockedSubStep !== 2) throw new Error('maxUnlockedSubStep should be 2');
if (mmtState.state.itinerarySubStep !== 'activities_selection') throw new Error('Should be in activities_selection');

// Step 2: Synthesize activities
console.log('Synthesizing Day 2 activities in Step 2...');
mmtState.synthesizeDayItinerary(2);
console.log('After Day 2 synthesis, maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);
console.log('Current itinerarySubStep:', mmtState.state.itinerarySubStep);
if (mmtState.state.maxUnlockedSubStep !== 3) throw new Error('maxUnlockedSubStep should be 3');
if (mmtState.state.itinerarySubStep !== 'itinerary_schedule') throw new Error('Should be in itinerary_schedule');

// Step 3: Advance to cuisines
console.log('Advancing from Step 3 (itinerary_schedule)...');
mmtState.advanceFromScheduleToCuisines();
console.log('After Step 3 completion, maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);
console.log('Current itinerarySubStep:', mmtState.state.itinerarySubStep);
if (mmtState.state.maxUnlockedSubStep !== 4) throw new Error('maxUnlockedSubStep should be 4');
if (mmtState.state.itinerarySubStep !== 'cuisines_markets') throw new Error('Should be in cuisines_markets');

// TEST 3: Cuisines & Markets Itinerary Incorporation (Requirement 3)
console.log('\n--- TEST 3: Cuisines & Markets Live Itinerary Integration ---');
const jadoh = mmtState.state.localCuisinesAndMarkets[0]; // Day 1 Khasi Jadoh
console.log('Adding cuisine to Day 1:', jadoh.title);
mmtState.addCuisineOrMarketToDayItinerary(jadoh.id);

const day1 = mmtState.state.itinerary[0];
const addedStop = day1.stops.find(s => s.flavourId === jadoh.id);
console.log('Day 1 stops count:', day1.stops.length);
console.log('Found added flavour stop in Day 1 itinerary:', !!addedStop);
console.log('Time slot assigned:', addedStop?.time);
console.log('Stop title:', addedStop?.title);
if (!addedStop) throw new Error('Cuisine stop was not added to itinerary!');

const tea = mmtState.state.localCuisinesAndMarkets[5]; // Day 2 High-Tea (flavour-6)
console.log('Adding high-tea to Day 2:', tea.title);
mmtState.addCuisineOrMarketToDayItinerary(tea.id);
const day2 = mmtState.state.itinerary[1];
const addedTeaStop = day2.stops.find(s => s.flavourId === tea.id);
console.log('Found added tea stop in Day 2 itinerary:', !!addedTeaStop);
if (!addedTeaStop) throw new Error('Tea stop was not added to Day 2 itinerary!');

// Step 4 Completion -> Step 5 (Scoped Booking)
console.log('Approving Final Plan and advancing to Step 5...');
mmtState.approveItineraryAndProceedToBooking();
console.log('After approval, maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);
console.log('Current itinerarySubStep:', mmtState.state.itinerarySubStep);
if (mmtState.state.maxUnlockedSubStep !== 5) throw new Error('maxUnlockedSubStep should be 5');
if (mmtState.state.itinerarySubStep !== 'grantex_accounts') throw new Error('Should be in grantex_accounts');

console.log('\n✅ ALL 3 REQUIREMENTS VERIFIED SUCCESSFULLY!');
