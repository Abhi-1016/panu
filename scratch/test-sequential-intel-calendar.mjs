// scratch/test-sequential-intel-calendar.mjs
import { mmtState } from '../js/mmt-state.js';
import { DESTINATION_PACKAGES, CALENDAR_SLOTS_DATA } from '../js/mmt-data.js';
import { renderFullscreenChat } from '../js/views/fullscreen-chat.js';

console.log("=== RUNNING FULL TEST SUITE FOR SEQUENTIAL CHAT, DEST INTEL & CALENDAR SYNTHESIS ===");

// 1. Verify CALENDAR_SLOTS_DATA and DESTINATION_PACKAGES
console.log("Checking DESTINATION_PACKAGES keys:", Object.keys(DESTINATION_PACKAGES));
for (const [key, pkg] of Object.entries(DESTINATION_PACKAGES)) {
  if (!pkg.destinationIntelligence) {
    throw new Error(`Missing destinationIntelligence in pkg ${key}`);
  }
  console.log(`✓ ${key}: tagline="${pkg.destinationIntelligence.tagline}", climate=${pkg.destinationIntelligence.climateIntelligence?.length} months, altitude="${pkg.destinationIntelligence.altitude}"`);
}

if (!CALENDAR_SLOTS_DATA || Object.keys(CALENDAR_SLOTS_DATA).length < 2) {
  throw new Error("CALENDAR_SLOTS_DATA missing or empty");
}
console.log(`✓ CALENDAR_SLOTS_DATA loaded with keys: ${Object.keys(CALENDAR_SLOTS_DATA).join(', ')}.`);

// 2. Test Sequential Chat Initialization
console.log("\n--- Testing Sequential Chat Streaming ---");
mmtState.openFullChat();
console.log(`Initial revealedCount: ${mmtState.state.revealedMessageCount}, totalMessages: ${mmtState.state.chatMessages.length}, isStreaming: ${mmtState.state.isChatStreaming}`);

// Fast forward / skip animation
mmtState.skipChatAnimation();
console.log(`After skipChatAnimation: revealedCount: ${mmtState.state.revealedMessageCount}, isStreaming: ${mmtState.state.isChatStreaming}`);
if (mmtState.state.revealedMessageCount !== mmtState.state.chatMessages.length) {
  throw new Error("skipChatAnimation did not reveal all messages");
}

// 3. Test Destination Switching and Dynamic Destination Intelligence
console.log("\n--- Testing Destination Switch ---");
mmtState.setDestination("goa");
console.log(`After setDestination("goa"): trip.destination="${mmtState.state.trip.destination}", trip.title="${mmtState.state.trip.title}"`);
if (!mmtState.state.trip.destination.toLowerCase().includes("goa")) {
  throw new Error("Destination did not switch to goa");
}
mmtState.skipChatAnimation();

// Switch back to Meghalaya
mmtState.setDestination("meghalaya");
console.log(`Switched back to Meghalaya: trip.title="${mmtState.state.trip.title}"`);
mmtState.skipChatAnimation();

// 4. Test Seasonal Voting & Consensus Brief Generation
console.log("\n--- Testing Seasonal Voting Consensus ---");
const winId = mmtState.state.seasonalWindows[0].id;
console.log(`Voting window: ${winId} ("${mmtState.state.seasonalWindows[0].title}")`);

// Vote 1: Kabir (Admin)
mmtState.voteSeasonalWindow(winId, 'user-1');
console.log(`Vote 1 cast. isConsensusReached=${mmtState.state.isSeasonalConsensusReached}`);

// Vote 2: Priya
mmtState.voteSeasonalWindow(winId, 'user-2');
console.log(`Vote 2 cast. isConsensusReached=${mmtState.state.isSeasonalConsensusReached}`);

// Vote 3: Rohan
mmtState.voteSeasonalWindow(winId, 'user-3');
console.log(`Vote 3 cast. isConsensusReached=${mmtState.state.isSeasonalConsensusReached}`);

// Vote 4: Ananya (Completes 4/4)
mmtState.voteSeasonalWindow(winId, 'user-4');
console.log(`Vote 4 cast. isConsensusReached=${mmtState.state.isSeasonalConsensusReached}`);

if (!mmtState.state.isSeasonalConsensusReached) {
  throw new Error("Seasonal consensus was not reached after 4/4 votes!");
}

// Verify that Myra added a consensus summary message
const lastMsg = mmtState.state.chatMessages[mmtState.state.chatMessages.length - 1];
console.log(`Last message sender: ${lastMsg.senderName || lastMsg.sender}`);
console.log(`Last message snippet: ${lastMsg.text.slice(0, 80)}...`);
if (!lastMsg.text.includes("VOTING SUMMARY BRIEF") && !lastMsg.text.includes("Consensus")) {
  throw new Error("Consensus brief message missing from chat!");
}

// 5. Test Admin Confirm Seasonal Window & Open Calendar
console.log("\n--- Testing Travel Window Confirmation by Admin ---");
mmtState.confirmSeasonalWindow(winId);
console.log(`isSeasonalWindowConfirmed: ${mmtState.state.isSeasonalWindowConfirmed}`);
console.log(`activeChatInterventionStage: ${mmtState.state.activeChatInterventionStage}`);
if (!mmtState.state.isSeasonalWindowConfirmed) {
  throw new Error("Travel window was not marked confirmed!");
}
if (mmtState.state.activeChatInterventionStage !== 'calendar_dates') {
  throw new Error("Active intervention stage did not transition to calendar_dates");
}

// 6. Test Calendar Availability Picking & Date Synthesis
console.log("\n--- Testing Member Availability Calendar ---");
// Toggle a date for current user
const firstSlot = mmtState.state.calendarSlots[0];
mmtState.toggleMemberDate('mem-1', firstSlot.dateKey);
console.log(`Toggled ${firstSlot.dateKey} for mem-1. Count=${mmtState.state.memberDateSelections['mem-1'].length}`);

// Record all member availabilities
mmtState.recordAllMemberDates();
console.log("Recorded all member dates across all 4 travellers.");

// Check synthesis verdict
const synth = mmtState.synthesizeOptimalGroupDates();
console.log(`Synthesized dates: "${synth.dates}", overlap: ${synth.overlapCount}/4 members, constraint: ${synth.constraintCheck}`);
if (!synth.dates || synth.overlapCount !== 4) {
  throw new Error("Date synthesis failed to find optimal overlapping dates!");
}

// 7. Test Admin Approve Final Dates & Unlock Itinerary Selection
console.log("\n--- Testing Admin Final Date Approval ---");
mmtState.approveFinalTravelDates();
console.log(`After approval: trip.dates="${mmtState.state.trip.dates}"`);
console.log(`isDecisionLocked: ${mmtState.state.isDecisionLocked}`);
console.log(`activeChatInterventionStage: ${mmtState.state.activeChatInterventionStage}`);
console.log(`itinerarySubStep: ${mmtState.state.itinerarySubStep}`);

if (!mmtState.state.isDecisionLocked) {
  throw new Error("Decision was not locked upon final date approval!");
}
if (mmtState.state.itinerarySubStep !== 'macro_overview') {
  throw new Error("Did not advance to macro_overview itinerary selection!");
}

// 8. Test DOM Rendering of Fullscreen Chat
console.log("\n--- Testing DOM Rendering of fullscreen-chat.js ---");
// Create mock DOM container
const mockContainer = {
  innerHTML: '',
  querySelector: () => null,
  querySelectorAll: () => []
};

// Should render without throwing exceptions
renderFullscreenChat(mockContainer);
console.log(`Rendered HTML length: ${mockContainer.innerHTML.length} characters.`);
if (!mockContainer.innerHTML.includes("Destination Intelligence")) {
  throw new Error("Rendered HTML missing Destination Intelligence");
}
if (!mockContainer.innerHTML.includes("Review Canvas")) {
  throw new Error("Rendered HTML missing Review Canvas");
}

console.log("\n✅ ALL 8 TESTS PASSED SUCCESSFULLY!");
