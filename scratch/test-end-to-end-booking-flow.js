// scratch/test-end-to-end-booking-flow.js
// Automated verification suite for the 8 user requirements in MMT Collaborative Planner

import { mmtState } from '../js/mmt-state.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('🚀 Starting End-to-End Test Suite for Requirements 1-8...\n');

// ----------------------------------------------------
// Requirement 1: Local Cuisines with Slots & Myra Route Optimization
// ----------------------------------------------------
console.log('--- Testing Requirement 1: Local Cuisines & Route Optimization ---');
const cuisines = mmtState.state.localCuisinesAndMarkets;
assert(cuisines && cuisines.length >= 4, `Loaded ${cuisines.length} regional cuisines and markets`);

// Test best-fit slotting for a cuisine
const jadoh = cuisines.find(c => c.id === 'flavour-1');
assert(jadoh, 'Found Jadoh Khasi feast flavour option');
const fit1 = mmtState.getBestFitForCuisine(jadoh);
assert(fit1.timeSlot && fit1.categorySlot && fit1.routingReason, `Myra calculated slot: ${fit1.timeSlot} (${fit1.categorySlot}) - ${fit1.routingReason}`);

// Add cuisine to itinerary
mmtState.addCuisineOrMarketToDayItinerary(jadoh.id);
assert(mmtState.state.scheduledCuisineIds.includes(jadoh.id), 'Jadoh successfully scheduled into itinerary');

// Verify stop has proper time, title, and subtitle (not undefined)
const targetDay = mmtState.state.itinerary[fit1.targetDay - 1];
const addedStop = targetDay.stops.find(s => s.flavourId === jadoh.id);
assert(addedStop, `Stop placed on Day ${fit1.targetDay}`);
assert(addedStop.title && addedStop.title !== 'undefined', `Stop title is valid: "${addedStop.title}"`);
assert(addedStop.subtitle && addedStop.subtitle !== 'undefined', `Stop subtitle is valid: "${addedStop.subtitle}"`);
assert(addedStop.time && addedStop.time !== 'undefined', `Stop time is valid: "${addedStop.time}"`);

// ----------------------------------------------------
// Requirement 2: Preview Review Canvas & Day-Wise Breakdown (No undefined)
// ----------------------------------------------------
console.log('\n--- Testing Requirement 2: Master Itinerary Schedule & Stop Integrity ---');
let hasUndefined = false;
let totalStops = 0;
mmtState.state.itinerary.forEach(day => {
  assert(day.day && day.title, `Day ${day.day}: ${day.title} exists`);
  day.stops.forEach(stop => {
    totalStops++;
    const stopTitle = stop.title || stop.activity;
    const stopSub = stop.subtitle || stop.location || stop.venue;
    if (!stopTitle || stopTitle === 'undefined' || stopTitle.includes('undefined')) {
      hasUndefined = true;
    }
    if (!stopSub || stopSub === 'undefined' || stopSub.includes('undefined')) {
      hasUndefined = true;
    }
  });
});
assert(!hasUndefined, `All ${totalStops} itinerary stops have non-undefined title and location/subtitle`);

// ----------------------------------------------------
// Requirement 3: Pine Labs Grantex Accounts, Deposits, Nudges & Admin Approval
// ----------------------------------------------------
console.log('\n--- Testing Requirement 3: Pine Labs Grantex Accounts & Admin Gate ---');
const accounts = mmtState.state.grantexAccounts;
assert(accounts && accounts.length === 4, `Initialized 4 Pine Labs Grantex member accounts`);

// Reset all to pending to test deposit workflow
accounts.forEach(a => {
  a.grantStatus = 'pending';
  a.balance = 0;
  a.spent = 0;
});
assert(!mmtState.isAllGrantexDeposited(), 'Pool correctly recognizes pending deposits');

// Test Myra Agentic Nudge
const initialMsgCount = mmtState.state.chatMessages.length;
mmtState.nudgePendingGrantexMembers();
const nudgeMsg = mmtState.state.chatMessages[mmtState.state.chatMessages.length - 1];
assert(mmtState.state.chatMessages.length > initialMsgCount, 'Myra posted agentic nudge in group chat');
assert(nudgeMsg.text.includes('reminder') || nudgeMsg.text.includes('NUDGE'), `Nudge message content: "${nudgeMsg.text.substring(0, 70)}..."`);

// Test Individual Member Deposit
const rahul = accounts[0];
mmtState.depositMemberGrantexContribution(rahul.memberId, 25000);
assert(rahul.grantStatus === 'authorized', `Rahul deposited ₹${rahul.initialDeposit.toLocaleString()} into vault`);
assert(!mmtState.isAllGrantexDeposited(), 'Pool still locked because other 3 members are pending');

// Deposit remaining members
accounts.slice(1).forEach(a => {
  mmtState.depositMemberGrantexContribution(a.memberId, 25000);
});
assert(mmtState.isAllGrantexDeposited(), 'All 4 members have now deposited ₹25,000 each');

// Admin Approves Pool
mmtState.approveAllGrantexDeposits();
assert(mmtState.state.itinerarySubStep === 'transit_booking', 'Admin approval advanced stage to transit_booking');
assert(mmtState.state.activeChatInterventionStage === 'transit_booking', 'Active chat stage is now transit_booking');

// ----------------------------------------------------
// Requirement 4: Multimodal Transit Booking, Individual Choices, Voting & Skip
// ----------------------------------------------------
console.log('\n--- Testing Requirement 4: Multimodal Transit & Individual Mode Choices ---');
// Departure city selection
mmtState.setOriginAirport('BLR');
assert(mmtState.state.originAirport === 'BLR', 'Departure city successfully switched to BLR (Bengaluru)');

// Multimodal modes exist
const transitModes = mmtState.state.transitModes;
assert(transitModes && transitModes.length >= 3, `Found ${transitModes.length} multimodal transit options (Flights, Trains, SUV Cars)`);

// Individual Member Transit Choice
mmtState.setMemberTransitChoice('user-1', 'flight', 'BLR');
mmtState.setMemberTransitChoice('user-3', 'train', 'BLR');
assert(mmtState.state.memberTransitChoices['user-1'].mode === 'flight', 'User 1 chose Flight');
assert(mmtState.state.memberTransitChoices['user-3'].mode === 'train', 'User 3 chose Train + Highway Cab');

// Flight Voting
mmtState.castFlightVote('user-1', 'flt-1');
assert(mmtState.state.flightVotes['user-1'] === 'flt-1', 'Flight vote recorded');

// Autonomous Grantex Booking
const preFlightBalance = mmtState.getRemainingGrantexBalance();
mmtState.executeAgenticFlightBooking();
assert(mmtState.state.isFlightBooked, 'Flights booked autonomously via Grantex');
const postFlightBalance = mmtState.getRemainingGrantexBalance();
assert(postFlightBalance < preFlightBalance, `Grantex balance deducted: was ₹${preFlightBalance.toLocaleString()}, now ₹${postFlightBalance.toLocaleString()}`);
assert(mmtState.state.itinerarySubStep === 'hotels_booking', 'Advanced to hotels_booking');

// Test Transit Skip function as well
mmtState.skipTransitBooking();
assert(mmtState.state.isFlightSkipped || mmtState.state.isTransitSkipped, 'skipTransitBooking successfully marks transit as skipped');

// ----------------------------------------------------
// Requirement 5: Multi-Location Hotels Booking, MMT Recommendations & Skip
// ----------------------------------------------------
console.log('\n--- Testing Requirement 5: Multi-Location Hotels Booking & Skip ---');
const locHotels = mmtState.state.locationHotelOptions;
assert(locHotels && locHotels.length >= 2, `Multi-location hotels configured for ${locHotels.length} destinations (Shillong & Cherrapunji)`);

// Check 3 MMT-curated options per location
locHotels.forEach((loc, idx) => {
  assert(loc.hotels.length === 3, `Location ${idx + 1} (${loc.locationTitle}) has exactly 3 MMT-curated hotels`);
});

// Vote and book location 0 (Shillong)
mmtState.setActiveHotelLocation(0);
mmtState.castHotelVote(0, 'user-1', 'htl-rikynjai');
mmtState.executeAgenticHotelLocationBooking(0);
assert(mmtState.state.bookedHotelsByLocation[0], 'Location 1 (Ri Kynjai Shillong) booked via Grantex');

// Skip location 1 (Cherrapunji)
mmtState.skipHotelLocationBooking(1);
assert(mmtState.state.skippedHotelsByLocation[1], 'Location 2 (Cherrapunji) successfully skipped');
assert(mmtState.state.itinerarySubStep === 'cab_booking', 'Advanced to cab_booking');

// ----------------------------------------------------
// Requirement 6: Activities & Sightseeing Cab Booking from Remaining Balance & Skip
// ----------------------------------------------------
console.log('\n--- Testing Requirement 6: Sightseeing Cab & Activity Passes ---');
const cabOptions = mmtState.state.cabFleetOptions;
assert(cabOptions && cabOptions.length >= 2, `Sightseeing cab options available: ${cabOptions.map(c => c.model).join(', ')}`);

// Select and book cab
mmtState.selectCabVehicle('cab-innova');
const preCabBalance = mmtState.getRemainingGrantexBalance();
mmtState.executeAgenticCabBooking();
assert(mmtState.state.isCabBooked, 'Innova Crysta booked autonomously with chauffeur Biplab Sangma');
const postCabBalance = mmtState.getRemainingGrantexBalance();
assert(postCabBalance < preCabBalance, `Grantex deducted for cab: now ₹${postCabBalance.toLocaleString()} balance`);
assert(mmtState.state.itinerarySubStep === 'activities_prebook', 'Advanced to activities_prebook');

// Test Cab Skip
mmtState.skipCabBooking();
assert(mmtState.state.isCabSkipped, 'skipCabBooking functions properly');

// Activity Passes
const actPasses = mmtState.state.prebookableActivities;
assert(actPasses && actPasses.length >= 3, `Found ${actPasses.length} pre-bookable activity passes`);
mmtState.state.selectedPrebookActivityIds = [];
mmtState.togglePrebookActivity(actPasses[0].id);
mmtState.togglePrebookActivity(actPasses[1].id);
assert(mmtState.state.selectedPrebookActivityIds.length === 2, '2 activity passes selected');

// ----------------------------------------------------
// Requirement 7 & 8: Ubiquitous Skip & Transition to Central Repository
// ----------------------------------------------------
console.log('\n--- Testing Requirements 7 & 8: Ubiquitous Skip & Central Repository ---');
// Pre-book activities and finalize
mmtState.executeAgenticActivityPrebooking();
assert(mmtState.state.previewViewMode === 'trip_locker', 'Automatically transitioned to Central Repository (trip_locker)');

// Verify Repository Data
const repo = mmtState.getBookingRepository();
assert(repo.flightTickets && repo.flightTickets.length > 0, `Repository contains ${repo.flightTickets.length} flight boarding passes`);
assert(repo.hotelVouchers && repo.hotelVouchers.length > 0, `Repository contains ${repo.hotelVouchers.length} confirmed stay vouchers`);
assert(repo.cabVoucher && repo.cabVoucher.chauffeur, `Repository contains chauffeur credentials (${repo.cabVoucher.chauffeur})`);
assert(repo.activityPasses && repo.activityPasses.length > 0, `Repository contains ${repo.activityPasses.length} activity passes`);

// Test Skip Activity Prebooking transition
mmtState.skipActivityPrebooking();
assert(mmtState.state.isActivitiesSkipped, 'Activities skipped successfully');
assert(mmtState.state.previewViewMode === 'trip_locker', 'Transitioned to Central Repository upon skipping activities');

// Test Direct Finish and Open Repository
mmtState.finishTripAndOpenRepository();
assert(mmtState.state.previewViewMode === 'trip_locker', 'finishTripAndOpenRepository opens trip_locker');

console.log(`\n========================================`);
console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL REQUIREMENTS 1-8 VERIFIED SUCCESSFULLY!');
}
