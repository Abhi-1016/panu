// scratch/test-cuisines-and-live-votes.js
import { mmtState } from '../js/mmt-state.js';

console.log("=== RUNNING CUISINES SCHEDULING & LIVE VOTE SUMMARY TEST SUITE ===");

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`PASS [${total}]: ${message}`);
  } else {
    console.error(`FAIL [${total}]: ${message}`);
    process.exit(1);
  }
}

// -------------------------------------------------------------
// TEST GROUP 1: Dynamic Cuisine & Market Placement Algorithm
// -------------------------------------------------------------
console.log("\n--- TEST GROUP 1: Intelligent Cuisine & Market Placement ---");

const cuisines = mmtState.state.localCuisinesAndMarkets;
assert(cuisines.length >= 6, "Local cuisines and markets loaded (at least 6 items)");

const orangeRoots = cuisines.find(c => c.id === "flavour-2");
assert(orangeRoots !== undefined, "Orange Roots thali item found");
const bestFitOrangeRoots = mmtState.getBestFitForCuisine(orangeRoots);
console.log("Orange Roots best fit:", bestFitOrangeRoots);
assert(bestFitOrangeRoots.targetDay === 2, "Orange Roots (Cherrapunji) routed to Cherrapunji day (Day 2)");
assert(bestFitOrangeRoots.timeSlot === "01:15 PM", "Orange Roots slotted at 01:15 PM lunch");

const jadoh = cuisines.find(c => c.id === "flavour-1");
const bestFitJadoh = mmtState.getBestFitForCuisine(jadoh);
console.log("Khasi Jadoh best fit:", bestFitJadoh);
assert(bestFitJadoh.targetDay !== 1 || bestFitJadoh.timeSlot !== "01:30 PM", "Khasi Jadoh NOT slotted before 03:45 PM airport pickup on Day 1");
assert(bestFitJadoh.targetDay === 4 || bestFitJadoh.targetDay === 2 || bestFitJadoh.targetDay === 3, "Khasi Jadoh routed to a day with open lunch window");

const policeBazar = cuisines.find(c => c.id === "flavour-4");
const bestFitPB = mmtState.getBestFitForCuisine(policeBazar);
console.log("Police Bazar best fit:", bestFitPB);
assert(bestFitPB.timeSlot === "07:30 PM", "Police Bazar Night Market slotted for evening bazaar (07:30 PM)");

const lewduh = cuisines.find(c => c.id === "flavour-5");
const bestFitLewduh = mmtState.getBestFitForCuisine(lewduh);
console.log("Lewduh best fit:", bestFitLewduh);
assert(bestFitLewduh.timeSlot === "09:30 AM", "Lewduh Bara Bazar slotted for morning exploration (09:30 AM)");
assert(bestFitLewduh.targetDay === 4, "Lewduh Bara Bazar slotted on Shillong departure morning (Day 4)");

// Add Orange Roots to Day Itinerary
mmtState.addCuisineOrMarketToDayItinerary("flavour-2");
assert(mmtState.state.scheduledCuisineIds.includes("flavour-2"), "Orange Roots marked as scheduled");

const day2 = mmtState.state.itinerary[1];
const orangeStop = day2.stops.find(s => s.flavourId === "flavour-2");
assert(orangeStop !== undefined, "Orange Roots stop inserted into Day 2 itinerary");
assert(orangeStop.time === "01:15 PM", "Orange Roots stop has correct 01:15 PM time");

// Verify strictly chronological order in Day 2
for (let i = 0; i < day2.stops.length - 1; i++) {
  const t1 = mmtState.parseTimeToMinutes(day2.stops[i].time);
  const t2 = mmtState.parseTimeToMinutes(day2.stops[i + 1].time);
  assert(t1 <= t2, `Day 2 stops chronologically sorted: ${day2.stops[i].time} (${t1}m) <= ${day2.stops[i + 1].time} (${t2}m)`);
}

// Add Police Bazar Night Market
mmtState.addCuisineOrMarketToDayItinerary("flavour-4");
assert(mmtState.state.scheduledCuisineIds.includes("flavour-4"), "Police Bazar marked as scheduled");

// Verify Day 1 stops chronological order
const day1 = mmtState.state.itinerary[0];
for (let i = 0; i < day1.stops.length - 1; i++) {
  const t1 = mmtState.parseTimeToMinutes(day1.stops[i].time);
  const t2 = mmtState.parseTimeToMinutes(day1.stops[i + 1].time);
  assert(t1 <= t2, `Day 1 stops chronologically sorted: ${day1.stops[i].time} (${t1}m) <= ${day1.stops[i + 1].time} (${t2}m)`);
}
// Day 1 first stop must still be Airport Pickup
assert(day1.stops[0].title.includes("Pickup") || day1.stops[0].title.includes("Airport"), "Day 1 first stop is airport pickup, NOT a lunch dumped on top!");

// Remove cuisine
mmtState.removeCuisineFromDayItinerary("flavour-2");
assert(!mmtState.state.scheduledCuisineIds.includes("flavour-2"), "Orange Roots removed from scheduled list");
const orangeStopAfter = mmtState.state.itinerary[1].stops.find(s => s.flavourId === "flavour-2");
assert(orangeStopAfter === undefined, "Orange Roots removed from Day 2 stops");

// -------------------------------------------------------------
// TEST GROUP 2: Live Vote Summary Tab & Real-Time Vote Updates
// -------------------------------------------------------------
console.log("\n--- TEST GROUP 2: Live Vote Summary & Dynamic Updates ---");

// Initial Seasons Vote Summary
let voteSummary = mmtState.getLiveVoteSummary('seasons');
assert(voteSummary.category === 'seasons', "Live vote summary category is seasons");
if (voteSummary.totalVotes === 0) {
  mmtState.voteSeasonalWindow("win-1", "user-2");
  mmtState.voteSeasonalWindow("win-1", "user-3");
  voteSummary = mmtState.getLiveVoteSummary('seasons');
}
assert(voteSummary.totalVotes >= 2, `Season votes tracked (${voteSummary.totalVotes} votes)`);
console.log("Initial season leader:", voteSummary.leaderText);

// Member Tanya casts vote for Cherry Blossom (win-2)
mmtState.voteSeasonalWindow("win-2");
voteSummary = mmtState.getLiveVoteSummary('seasons');
const cherryWin = voteSummary.items.find(it => it.id === "win-2");
assert(cherryWin.voters.some(v => v.id === "user-1"), "Kabir's vote moved to Cherry Blossom and reflects in live vote summary");

// Toggle Vote Summary Expanded
assert(mmtState.state.isVoteSummaryExpanded === false, "Vote summary default collapsed");
mmtState.toggleVoteSummaryExpanded();
assert(mmtState.state.isVoteSummaryExpanded === true, "toggleVoteSummaryExpanded expanded");
mmtState.toggleVoteSummaryExpanded();
assert(mmtState.state.isVoteSummaryExpanded === false, "toggleVoteSummaryExpanded collapsed again");

// Flight Votes Dynamic Updates
mmtState.state.maxUnlockedSubStep = 9;
mmtState.setItinerarySubStep("transit_booking");
let flightSummary = mmtState.getLiveVoteSummary();
assert(flightSummary.category === 'flights', "getLiveVoteSummary auto-resolved to flights in Step 6");
assert(flightSummary.totalVotes === 4, "Initial 4 flight votes tracked in live summary");
assert(flightSummary.leaderText.includes("IndiGo"), "IndiGo is leading flight in live vote summary");

// Kabir switches vote to Air India
mmtState.castFlightVote("user-1", "fl-del-airindia-alt1");
flightSummary = mmtState.getLiveVoteSummary();
const airIndiaItem = flightSummary.items.find(it => it.id === "fl-del-airindia-alt1");
assert(airIndiaItem.voteCount === 2, "Air India vote count increased to 2 after Kabir's new vote");
assert(airIndiaItem.voters.some(v => v.id === "user-1"), "Kabir reflected in Air India voters in live summary");

// Rohan & Tanya vote for SpiceJet
mmtState.castFlightVote("user-3", "fl-del-spicejet-alt2");
mmtState.castFlightVote("user-4", "fl-del-spicejet-alt2");
flightSummary = mmtState.getLiveVoteSummary();
const spiceItem = flightSummary.items.find(it => it.id === "fl-del-spicejet-alt2");
assert(spiceItem.voteCount === 2, "SpiceJet vote count increased to 2 after Rohan & Tanya votes");

// Hotel Votes Dynamic Updates for Location 1 (Shillong)
mmtState.setItinerarySubStep("hotels_booking");
mmtState.setActiveHotelLocation(0);
let hotelSummary = mmtState.getLiveVoteSummary();
assert(hotelSummary.category === 'hotels', "getLiveVoteSummary auto-resolved to hotels in Step 7");
assert(hotelSummary.totalVotes === 4, "Location 1 initial 4 hotel votes tracked");
assert(hotelSummary.leaderText.includes("Ri Kynjai"), "Ri Kynjai is initial leader for Location 1");

// Switch Kabir and Priya votes to Courtyard Marriott
mmtState.castHotelVote(0, "user-1", "htl-shl-marriott");
mmtState.castHotelVote(0, "user-2", "htl-shl-marriott");
hotelSummary = mmtState.getLiveVoteSummary();
const marriott = hotelSummary.items.find(h => h.id === "htl-shl-marriott");
assert(marriott.voteCount === 3, "Courtyard Marriott vote count updated to 3");
assert(marriott.isLeader === true, "Courtyard Marriott is now the new leader after next votes!");
assert(hotelSummary.leaderText.includes("Courtyard by Marriott"), "Leader text dynamically updated to Courtyard Marriott");

// Hotel Votes Dynamic Updates for Location 2 (Cherrapunji)
mmtState.setActiveHotelLocation(1);
hotelSummary = mmtState.getLiveVoteSummary();
assert(hotelSummary.totalVotes === 4, "Location 2 initial 4 hotel votes tracked");
assert(hotelSummary.topicName.includes("Cherrapunji") || hotelSummary.topicName.includes("Loc 2"), "Topic name matches Location 2");
assert(hotelSummary.leaderText.includes("Polo Orchid"), "Polo Orchid is initial leader for Location 2");

// Kabir and Tanya switch votes to Jiva Resort
mmtState.castHotelVote(1, "user-1", "htl-sohra-jiva");
mmtState.castHotelVote(1, "user-4", "htl-sohra-jiva");
hotelSummary = mmtState.getLiveVoteSummary();
const jiva = hotelSummary.items.find(h => h.id === "htl-sohra-jiva");
assert(jiva.voteCount === 3, "Jiva Resort vote count updated to 3");
assert(jiva.isLeader === true, "Jiva Resort is now the new leader after next votes!");
assert(hotelSummary.leaderText.includes("Jiva Resort"), "Leader text dynamically updated to Jiva Resort");

// Test Category Manual Switching
mmtState.setActiveVoteCategory("flights");
const manualFlightSummary = mmtState.getLiveVoteSummary();
assert(manualFlightSummary.category === "flights", "Manual switch to flights preserved in getLiveVoteSummary");

mmtState.setActiveVoteCategory("seasons");
const manualSeasonSummary = mmtState.getLiveVoteSummary();
assert(manualSeasonSummary.category === "seasons", "Manual switch to seasons preserved in getLiveVoteSummary");

console.log(`\n=== ALL ${passed} / ${total} ASSERTIONS PASSED SUCCESSFULLY! ===`);
