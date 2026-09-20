// scratch/test-postbooking-suite.js
// Unit & Integration verification suite for Post-Booking Master Itinerary, Group Locker, Smart Cancellation & Sentinel Replanner

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

console.log('=== RUNNING POST-BOOKING MASTER VERIFICATION SUITE ===\n');

// 1. Check Initial State & Repository Extraction
console.log('--- 1. Testing Booking Repository Structure ---');
const repo = mmtState.getBookingRepository();
assert(repo !== null && typeof repo === 'object', 'Booking repository generated successfully');
assert(repo.flightTickets && repo.flightTickets.seats.length === 4, 'Contains 4 flight boarding passes');
assert(repo.flightTickets.seats[0].passengerName === 'Kabir Roy' && repo.flightTickets.seats[0].seat.startsWith('4A'), 'Kabir assigned seat 4A');
assert(repo.flightTickets.seats[1].passengerName === 'Priya Menon' && repo.flightTickets.seats[1].seat.startsWith('4B'), 'Priya assigned seat 4B');
assert(repo.hotels && repo.hotels.length === 2, 'Contains 2 hotel stay vouchers (Ri Kynjai & Polo Orchid)');
assert(repo.hotels[0].confirmationNumber === 'MMT-HTL-8891', 'Ri Kynjai confirmation number verified');
assert(repo.cabBooking && repo.cabBooking.driverName === 'Biplab Sangma', 'Chauffeur Biplab Sangma assigned to Innova Crysta');
assert(repo.activityPasses && repo.activityPasses.length === 4, 'Contains 4 pre-booked activity QR passes');

// 2. Testing Smart Cancellation Simulation
console.log('\n--- 2. Testing Smart Cancellation Simulation ---');
const sim = mmtState.simulateCancellation('user-2'); // Priya Menon
assert(sim.memberId === 'user-2', 'Simulation targeting Priya Menon');
assert(sim.flightPenalty === 3500, 'Flight penalty ₹3,500 accurately computed (₹3,000 airline + ₹500 MMT fee)');
assert(sim.hotelPenalty === 0, 'Hotel penalty ₹0 (waived >48h before check-in)');
assert(sim.cabPenalty === 0, 'Cab penalty ₹0 (waived >12h before pickup)');
assert(sim.activityPenalty === 150, 'Activity penalty ₹150 administrative processing fee');
assert(sim.cancellationLoss === 3650, 'Total cancellation loss is exactly ₹3,650 (₹3500 + ₹150)');
assert(sim.refundAmount > 0, `Net refund payable computed: ₹${sim.refundAmount}`);

// 3. Testing Cancellation Execution & Pine Labs Grantex Refund
console.log('\n--- 3. Testing Cancellation Execution & Grantex Vault Refund ---');
const priyaAcctBefore = mmtState.state.grantexAccounts.find(a => a.memberId === 'user-2');
const balanceBefore = priyaAcctBefore.balance;
const resCancel = mmtState.executeCancellation('user-2');
assert(resCancel.success === true, 'Cancellation executed successfully');
assert(mmtState.state.cancelledMemberIds.includes('user-2'), 'Priya added to cancelledMemberIds list');
const priyaAcctAfter = mmtState.state.grantexAccounts.find(a => a.memberId === 'user-2');
assert(priyaAcctAfter.balance >= balanceBefore, `Grantex vault balance preserved/credited (Before: ₹${balanceBefore}, After: ₹${priyaAcctAfter.balance})`);
const refundDeduction = priyaAcctAfter.deductions.find(d => d.amount < 0);
assert(refundDeduction !== undefined && refundDeduction.item.includes('Grantex Autonomous Refund'), 'Grantex vault refund transaction logged in ledger');

// 4. Testing Disruption Downstream Replanning
console.log('\n--- 4. Testing Disruption Downstream Replanning ---');
mmtState.triggerDisruptionScenario('flight_delay');
assert(mmtState.state.disruptionState.activeScenarioId === 'flight_delay', 'Flight delay scenario triggered');
const scenario = mmtState.getActiveDisruptionScenario();
assert(scenario.id === 'flight_delay' && scenario.delayMinutes === 150, 'Scenario delay is 150 minutes (2.5h)');
const replanOptions = mmtState.getReplanOptions();
assert(replanOptions.length === 3, 'Myra generated 3 tailored replanning options (A, B, C)');
assert(replanOptions[0].id === 'replan_min_disrupt', 'Option A is Minimal Disruption');
assert(replanOptions[1].id === 'replan_optimised', 'Option B is Optimised Replan');
assert(replanOptions[2].id === 'replan_cost_min', 'Option C is Cost-Minimising Replan');

// 5. Testing Scoped Decision (Solo vs Group Approval)
console.log('\n--- 5. Testing Scoped Decision (Solo vs Group Approval) ---');
mmtState.setDisruptionScope('group');
assert(mmtState.state.disruptionState.scope === 'group', 'Scope set to entire group');
assert(mmtState.state.disruptionState.adminApproved === false, 'Group replan initially unapproved by Admin');

// Kabir approves
mmtState.approveGroupDisruptionReplan();
assert(mmtState.state.disruptionState.adminApproved === true, 'Kabir (Admin) approved group replan');

// Apply replan
mmtState.selectReplanOption('replan_optimised');
const applyRes = mmtState.applyDisruptionReplan();
assert(applyRes.success === true, 'Optimised replan applied to itinerary');
assert(mmtState.state.disruptionState.isReplanApplied === true, 'Replan state marked as applied');

// 6. Testing Sentinel Monitoring Consent Settings
console.log('\n--- 6. Testing Sentinel Monitoring & Consent ---');
mmtState.updateSentinelConsent('whatsapp', false);
assert(mmtState.state.sentinelMonitoring.consentSettings.whatsapp === false, 'WhatsApp notification consent turned off');
mmtState.updateSentinelConsent('whatsapp', true);
assert(mmtState.state.sentinelMonitoring.consentSettings.whatsapp === true, 'WhatsApp notification consent restored');

// 7. Testing View Navigation & Locker Filter
console.log('\n--- 7. Testing View Mode & Locker Member Filtering ---');
mmtState.setPreviewViewMode('master_itinerary');
assert(mmtState.state.previewViewMode === 'master_itinerary', 'Preview mode switched to master_itinerary');
mmtState.setPreviewViewMode('trip_locker');
assert(mmtState.state.previewViewMode === 'trip_locker', 'Preview mode switched to trip_locker');
mmtState.setLockerMemberFilter('user-1');
assert(mmtState.state.activeLockerMemberId === 'user-1', 'Locker filtered to Kabir Roy (user-1)');
mmtState.setLockerMemberFilter('all');
assert(mmtState.state.activeLockerMemberId === 'all', 'Locker restored to all members');
mmtState.setPreviewViewMode('live_radar');
assert(mmtState.state.previewViewMode === 'live_radar', 'Preview mode switched to live_radar');

console.log(`\n=== SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL TESTS PASSED WITH 100% SUCCESS!');
}
