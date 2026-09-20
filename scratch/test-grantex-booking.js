// scratch/test-grantex-booking.js - Verification of Grantex Accounts & Agentic Booking
import { mmtState } from '../js/mmt-state.js';

console.log('=== RUNNING TESTS: GRANTEX ACCOUNTS & AGENTIC BOOKING ===\n');

// 1. Initial State & Progression to Step 4
console.log('--- TEST 1: Step Progression to Step 4 ---');
console.log('Initial subStep:', mmtState.state.itinerarySubStep);
console.log('Initial maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);

mmtState.advanceFromMacroOverview(); // 1 -> 2
console.log('After Step 1, maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);

mmtState.synthesizeDayItinerary(2); // 2 -> 3
console.log('After Step 2, maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);

mmtState.advanceFromScheduleToCuisines(); // 3 -> 4
console.log('After Step 3, maxUnlockedSubStep:', mmtState.state.maxUnlockedSubStep);

// 2. Admin Itinerary Approval -> Step 5 (Grantex Accounts)
console.log('\n--- TEST 2: Admin Itinerary Approval -> Step 5 (Grantex Accounts) ---');
mmtState.approveItineraryAndProceedToBooking();
console.log('Current subStep (expected grantex_accounts):', mmtState.state.itinerarySubStep);
console.log('maxUnlockedSubStep (expected 5):', mmtState.state.maxUnlockedSubStep);

if (mmtState.state.itinerarySubStep !== 'grantex_accounts') {
  throw new Error(`Expected subStep to be 'grantex_accounts', got ${mmtState.state.itinerarySubStep}`);
}
if (mmtState.state.maxUnlockedSubStep !== 5) {
  throw new Error(`Expected maxUnlockedSubStep to be 5, got ${mmtState.state.maxUnlockedSubStep}`);
}

// 3. Grantex Accounts & Pine Labs Delegation
console.log('\n--- TEST 3: Pine Labs Grantex Vault Authorization & Ledgers ---');
const accounts = mmtState.state.grantexAccounts;
console.log('Total member vaults:', accounts.length);
accounts.forEach(a => {
  console.log(`- ${a.memberName}: Deposit ₹${a.initialDeposit}, Balance ₹${a.balance}, Token: ${a.grantexToken}, Status: ${a.grantStatus}`);
  if (!a.grantexToken.startsWith('grntx_pinelabs_')) throw new Error(`Invalid token format for ${a.memberName}`);
});

// Authorize individual member
mmtState.authorizeGrantexDeposit('user-1');
console.log('After Kabir deposit, Kabir status:', mmtState.state.grantexAccounts.find(a => a.memberId === 'user-1').grantStatus);

// Authorize all members
mmtState.authorizeAllGrantexAccounts();
const allAuthorized = mmtState.state.grantexAccounts.every(a => a.grantStatus === 'authorized');
console.log('All members authorized?:', allAuthorized);
if (!allAuthorized) throw new Error('Not all members were authorized');

// 4. Advance to Step 6 (Flight Booking)
console.log('\n--- TEST 4: Advance to Step 6 (Flight Booking) ---');
mmtState.advanceFromGrantexToFlights();
console.log('Current subStep (expected flight_booking):', mmtState.state.itinerarySubStep);
console.log('maxUnlockedSubStep (expected 6):', mmtState.state.maxUnlockedSubStep);

if (mmtState.state.itinerarySubStep !== 'transit_booking' && mmtState.state.itinerarySubStep !== 'flight_booking') {
  throw new Error(`Expected transit_booking, got ${mmtState.state.itinerarySubStep}`);
}

// 5. Origin Airport Switching
console.log('\n--- TEST 5: Airport Selection & Flight Bundles ---');
console.log('Initial origin airport:', mmtState.state.originAirport);
console.log('Initial top flight:', mmtState.state.flightOptions[0].airline, mmtState.state.flightOptions[0].outboundFlight);

mmtState.setOriginAirport('BLR');
console.log('Updated origin airport:', mmtState.state.originAirport);
console.log('BLR top flight:', mmtState.state.flightOptions[0].airline, mmtState.state.flightOptions[0].outboundFlight);
if (mmtState.state.originAirport !== 'BLR') throw new Error('Failed to update origin airport');

// Switch back to DEL
mmtState.setOriginAirport('DEL');
console.log('Reset origin airport to DEL:', mmtState.state.originAirport);

// 6. Flight Voting & Consensus
console.log('\n--- TEST 6: Group Flight Voting & Consensus ---');
const bestFlight = mmtState.state.flightOptions.find(f => f.isRecommended);
const altFlight = mmtState.state.flightOptions.find(f => !f.isRecommended);

mmtState.castFlightVote('user-1', bestFlight.id);
mmtState.castFlightVote('user-2', bestFlight.id);
mmtState.castFlightVote('user-3', bestFlight.id);
mmtState.castFlightVote('user-4', altFlight.id);

console.log('Votes cast:', mmtState.state.flightVotes);
console.log('Selected consensus flight:', mmtState.state.selectedFlightId);
if (mmtState.state.selectedFlightId !== bestFlight.id) throw new Error('Consensus flight should be the best flight');

// 7. Autonomous Agentic Flight Booking with Grantex Deductions
console.log('\n--- TEST 7: Autonomous Agentic Flight Booking & Grantex Deductions ---');
const farePerHead = bestFlight.farePerPerson;
const kabirPreFlightBalance = mmtState.state.grantexAccounts.find(a => a.memberId === 'user-1').balance;
console.log('Pre-flight Kabir balance:', kabirPreFlightBalance);
console.log('Flight fare per head to deduct:', farePerHead);

mmtState.executeAgenticFlightBooking();

const kabirPostFlight = mmtState.state.grantexAccounts.find(a => a.memberId === 'user-1');
console.log('Post-flight Kabir balance:', kabirPostFlight.balance);
console.log('Post-flight Kabir spent:', kabirPostFlight.spent);
console.log('Flight PNR generated:', mmtState.state.flightBookingPnr);
console.log('isFlightBooked:', mmtState.state.isFlightBooked);
console.log('Current subStep (expected hotels_booking):', mmtState.state.itinerarySubStep);
console.log('maxUnlockedSubStep (expected 7):', mmtState.state.maxUnlockedSubStep);

if (kabirPostFlight.balance !== (kabirPreFlightBalance - farePerHead)) {
  throw new Error(`Balance deduction incorrect: expected ${kabirPreFlightBalance - farePerHead}, got ${kabirPostFlight.balance}`);
}
if (!mmtState.state.isFlightBooked) throw new Error('Flight booking flag not set');
if (mmtState.state.itinerarySubStep !== 'hotels_booking') throw new Error('Did not advance to hotels_booking');

// 8. Step 7: Hotel Booking with Grantex Deduction
console.log('\n--- TEST 8: Hotel Booking Execution & Final Ledger ---');
const kabirPreHotelBalance = kabirPostFlight.balance;
mmtState.executeAgenticHotelLocationBooking(0);

const kabirFinal = mmtState.state.grantexAccounts.find(a => a.memberId === 'user-1');
console.log('Post-hotel Kabir balance:', kabirFinal.balance);
console.log('Post-hotel Kabir total spent:', kabirFinal.spent);
console.log('Kabir deduction ledger:', kabirFinal.deductions);

if (kabirFinal.balance >= kabirPreHotelBalance) {
  throw new Error(`Hotel balance deduction did not decrease balance: was ${kabirPreHotelBalance}, got ${kabirFinal.balance}`);
}

// 9. Skip Flight Booking Verification
console.log('\n--- TEST 9: Skip Flight Booking Path ---');
// Reset to transit booking
mmtState.setItinerarySubStep('transit_booking');
mmtState.skipFlightBooking();
console.log('After skip, isFlightSkipped:', mmtState.state.isFlightSkipped);
console.log('After skip, current subStep:', mmtState.state.itinerarySubStep);
if (!mmtState.state.isFlightSkipped) throw new Error('Flight skip flag not set');
if (mmtState.state.itinerarySubStep !== 'hotels_booking') throw new Error('Skip did not transition to hotels_booking');

console.log('\n✅ ALL GRANTEX ACCOUNTS & AGENTIC BOOKING TESTS PASSED!');
