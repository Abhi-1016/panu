// scratch/test-full-agentic-journey.js
// Automated verification script for the full 9-step MakeMyTrip Myra agentic journey

import { mmtState } from '../js/mmt-state.js';
import { 
  INTERCITY_TRANSIT_MODES, 
  LOCATION_HOTEL_OPTIONS, 
  SIGHTSEEING_CAB_FLEET, 
  PREBOOKABLE_ACTIVITIES 
} from '../js/mmt-data.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

console.log("=== STARTING FULL AGENTIC JOURNEY VERIFICATION ===");

// 1. Verify Data Constants
assert(Array.isArray(INTERCITY_TRANSIT_MODES) && INTERCITY_TRANSIT_MODES.length === 3, "Intercity transit modes (Flight, Train, SUV) loaded");
assert(Array.isArray(LOCATION_HOTEL_OPTIONS) && LOCATION_HOTEL_OPTIONS.length === 2, "Location hotel options for Shillong (Loc 1) and Cherrapunji (Loc 2) loaded");
assert(LOCATION_HOTEL_OPTIONS[0].hotels.length === 3, "Location 1 has 3 curated hotels");
assert(LOCATION_HOTEL_OPTIONS[1].hotels.length === 3, "Location 2 has 3 curated hotels");
assert(Array.isArray(SIGHTSEEING_CAB_FLEET) && SIGHTSEEING_CAB_FLEET.length === 3, "Sightseeing cab fleet options loaded");
assert(Array.isArray(PREBOOKABLE_ACTIVITIES) && PREBOOKABLE_ACTIVITIES.length === 4, "Prebookable activities loaded");

// 2. Initial State Verification
assert(mmtState.state.itinerarySubStep === 'macro_overview', "Initial substep is macro_overview");
assert(mmtState.state.maxUnlockedSubStep >= 1, "Initial maxUnlockedSubStep is at least 1");

// 3. Advance Step 1 -> Step 2
mmtState.advanceFromMacroOverview();
assert(mmtState.state.itinerarySubStep === 'activities_selection', "Advanced to Step 2: activities_selection");
assert(mmtState.state.maxUnlockedSubStep >= 2, "Step 2 unlocked");

// 4. Advance Step 2 -> Step 3
mmtState.synthesizeDayItinerary(2);
assert(mmtState.state.itinerarySubStep === 'itinerary_schedule', "Advanced to Step 3: itinerary_schedule");
assert(mmtState.state.maxUnlockedSubStep >= 3, "Step 3 unlocked");

// 5. Advance Step 3 -> Step 4
mmtState.advanceFromScheduleToCuisines();
assert(mmtState.state.itinerarySubStep === 'cuisines_markets', "Advanced to Step 4: cuisines_markets");
assert(mmtState.state.maxUnlockedSubStep >= 4, "Step 4 unlocked");

// 6. Advance Step 4 -> Step 5 (Approve & Proceed to Grantex)
mmtState.approveItineraryAndProceedToBooking();
assert(mmtState.state.itinerarySubStep === 'grantex_accounts', "Advanced to Step 5: grantex_accounts");
assert(mmtState.state.maxUnlockedSubStep >= 5, "Step 5 unlocked");

// Authorize Grantex Vaults
mmtState.authorizeAllGrantexAccounts();
assert(mmtState.state.grantexAccounts.every(a => a.grantStatus === 'authorized'), "All 4 members authorized Pine Labs Grantex vaults");
const initialDeposit = mmtState.state.grantexAccounts[0].initialDeposit;
assert(initialDeposit === 22000, "Initial member vault deposit is ₹22,000");

// 7. Advance Step 5 -> Step 6 (Transit Booking)
mmtState.advanceFromGrantexToFlights();
assert(mmtState.state.itinerarySubStep === 'transit_booking', "Advanced to Step 6: transit_booking");
assert(mmtState.state.maxUnlockedSubStep >= 6, "Step 6 unlocked");

// Test Multi-Modal Transit Mode Selection
mmtState.selectTransitMode('train');
assert(mmtState.state.selectedTransitMode === 'train', "Selected train transit mode");
mmtState.selectTransitMode('flight');
assert(mmtState.state.selectedTransitMode === 'flight', "Selected flight transit mode");

// Test Flight Airport Selection & Voting
mmtState.setOriginAirport('DEL');
assert(mmtState.state.originAirport === 'DEL', "Origin airport set to DEL");
mmtState.castFlightVote('user_kabir', 'flight_indigo_noon');
assert(mmtState.state.flightVotes['user_kabir'] === 'flight_indigo_noon', "Kabir voted for flight_indigo_noon");

// Execute Autonomous Flight Booking via Grantex
mmtState.executeAgenticFlightBooking();
assert(mmtState.state.isFlightBooked === true, "Flight booked successfully");
assert(typeof mmtState.state.flightBookingPnr === 'string' && mmtState.state.flightBookingPnr.startsWith('MMT-6E-'), "Flight PNR generated");
assert(mmtState.state.grantexAccounts[0].spent === 8900, "Grantex vault debited ₹8,900 for flight");
assert(mmtState.state.grantexAccounts[0].balance === 13100, "Grantex vault balance is ₹13,100");
assert(mmtState.state.itinerarySubStep === 'hotels_booking', "Auto-advanced to Step 7: hotels_booking");
assert(mmtState.state.maxUnlockedSubStep >= 7, "Step 7 unlocked");

// 8. Test Step 7: Location-Wise Hotels Studio
assert(mmtState.state.activeHotelLocationIdx === 0, "Active hotel location is Location 1 (Shillong & Umiam)");

// Test Voting & Meal Plan Selection for Location 1 (index 0)
mmtState.castHotelVote(0, 'user_kabir', 'htl-shl-rikynjai');
assert(mmtState.state.hotelVotesByLocation[0]['user_kabir'] === 'htl-shl-rikynjai', "Kabir voted for Ri Kynjai for Location 1");

mmtState.selectMealPlanForLocation(0, 'MAP');
assert(mmtState.state.selectedMealPlanByLocation[0] === 'MAP', "Selected MAP meal plan for Location 1");

// Execute Grantex Booking for Location 1
mmtState.executeAgenticHotelLocationBooking(0);
assert(!!mmtState.state.bookedHotelsByLocation[0], "Location 1 (Shillong & Umiam) booked");
assert(mmtState.state.activeHotelLocationIdx === 1, "Auto-advanced to Location 2 (Cherrapunji Sohra)");
const spentAfterLoc1 = mmtState.state.grantexAccounts[0].spent;
const loc1Cost = mmtState.state.bookedHotelsByLocation[0].costPerPerson;
assert(spentAfterLoc1 === 8900 + loc1Cost, `Grantex vault debited ₹${loc1Cost} for Location 1`);

// Test Location 2 (Cherrapunji, index 1) Voting & Booking
mmtState.castHotelVote(1, 'user_priya', 'htl-ch-polo');
assert(mmtState.state.hotelVotesByLocation[1]['user_priya'] === 'htl-ch-polo', "Priya voted for Polo Orchid for Location 2");

mmtState.selectMealPlanForLocation(1, 'CP');
mmtState.executeAgenticHotelLocationBooking(1);
assert(!!mmtState.state.bookedHotelsByLocation[1], "Location 2 (Cherrapunji) booked");
assert(mmtState.state.itinerarySubStep === 'cab_booking', "Auto-advanced to Step 8: cab_booking after both locations completed");
assert(mmtState.state.maxUnlockedSubStep >= 8, "Step 8 unlocked");

// 9. Test Step 8: Sightseeing Cab / Bus Fleet Studio
assert(mmtState.state.selectedCabId === 'cab-innova-crysta', "Default cab is Innova Crysta recommended for 4 pax");
mmtState.selectCabVehicle('cab-force-urbania');
assert(mmtState.state.selectedCabId === 'cab-force-urbania', "Switched to Force Urbania");
mmtState.selectCabVehicle('cab-innova-crysta');
assert(mmtState.state.selectedCabId === 'cab-innova-crysta', "Switched back to Innova Crysta");

// Execute Grantex Booking for Sightseeing Cab
mmtState.executeAgenticCabBooking();
assert(mmtState.state.isCabBooked === true, "Sightseeing cab booked");
assert(typeof mmtState.state.cabBookingPnr === 'string' && mmtState.state.cabBookingPnr.startsWith('MMT-CAB-'), "Cab booking PNR generated");
assert(mmtState.state.itinerarySubStep === 'activities_prebook', "Auto-advanced to Step 9: activities_prebook");
assert(mmtState.state.maxUnlockedSubStep >= 9, "Step 9 unlocked");
const cabCost = 3200; // Innova Crysta costPerPerson
const spentAfterCab = mmtState.state.grantexAccounts[0].spent;
assert(spentAfterCab === 8900 + loc1Cost + mmtState.state.bookedHotelsByLocation[1].costPerPerson + cabCost, "Grantex vault debited for Innova Crysta");

// 10. Test Step 9: Individual Activity Pre-Booking
assert(mmtState.state.selectedPrebookActivityIds.length === 3, "Default 3 prebookable activities selected");
const firstActId = mmtState.state.selectedPrebookActivityIds[0];
mmtState.togglePrebookActivity(firstActId);
assert(mmtState.state.selectedPrebookActivityIds.length === 2, "Toggled off one activity");
mmtState.togglePrebookActivity(firstActId);
assert(mmtState.state.selectedPrebookActivityIds.length === 3, "Toggled back on activity");

// Execute Pre-Booking via Grantex
mmtState.executeAgenticActivityPrebooking();
assert(mmtState.state.isActivitiesPrebooked === true, "Activity passes pre-booked");
assert(typeof mmtState.state.activitiesPnr === 'string' && mmtState.state.activitiesPnr.startsWith('MMT-ACT-'), "Activity passes PNR generated");

const finalSpent = mmtState.state.grantexAccounts[0].spent;
const finalBalance = mmtState.state.grantexAccounts[0].balance;
assert(finalBalance === 22000 - finalSpent, `Remaining balance correctly computed: ₹${finalBalance}`);

// 11. Test Universal Skip Capability across all stages
console.log("\n--- TESTING UNIVERSAL SKIP CAPABILITY ---");
const freshState = new (mmtState.constructor)();
freshState.advanceFromMacroOverview();
freshState.synthesizeDayItinerary(2);
freshState.advanceFromScheduleToCuisines();
freshState.approveItineraryAndProceedToBooking();
freshState.authorizeAllGrantexAccounts();
freshState.advanceFromGrantexToFlights();

// Skip Flight
freshState.skipFlightBooking();
assert(freshState.state.isFlightSkipped === true, "Transit/Flight booking skipped by admin");
assert(freshState.state.itinerarySubStep === 'hotels_booking', "Moved to hotels_booking after flight skip");

// Skip Location 1 Hotel
freshState.skipHotelLocationBooking(0);
assert(freshState.state.skippedHotelsByLocation[0] === true, "Location 1 skipped");
assert(freshState.state.activeHotelLocationIdx === 1, "Moved to Location 2");

// Skip Location 2 Hotel
freshState.skipHotelLocationBooking(1);
assert(freshState.state.skippedHotelsByLocation[1] === true, "Location 2 skipped");
assert(freshState.state.itinerarySubStep === 'cab_booking', "Moved to cab_booking after all hotels skipped");

// Skip Cab
freshState.skipCabBooking();
assert(freshState.state.isCabSkipped === true, "Cab booking skipped");
assert(freshState.state.itinerarySubStep === 'activities_prebook', "Moved to activities_prebook after cab skip");

// Skip Activity Passes
freshState.skipActivityPrebooking();
assert(freshState.state.isActivitiesSkipped === true, "Activity passes skipped");
assert(freshState.state.grantexAccounts[0].spent === 0, "Grantex deductions remain exactly ₹0 when all steps are skipped");
assert(freshState.state.grantexAccounts[0].balance === 22000, "Grantex balance remains ₹22,000 intact");

console.log("\n🎉 ALL 32 VERIFICATION ASSERTIONS PASSED PERFECTLY!");
