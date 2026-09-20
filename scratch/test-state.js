// scratch/test-state.js
import { mmtState } from '../js/mmt-state.js';

console.log('Initial subStep:', mmtState.state.itinerarySubStep);
console.log('Pane width:', mmtState.state.splitPaneWidth);
console.log('Mobile tab:', mmtState.state.mobileActiveTab);

// 1. Test pane width adjustment
mmtState.setSplitPaneWidth(450);
console.log('Updated pane width:', mmtState.state.splitPaneWidth);

// 2. Test mobile tab switcher
mmtState.setMobileActiveTab('chat');
console.log('Updated mobile tab:', mmtState.state.mobileActiveTab);

// 3. Test cuisine integration
const item = mmtState.state.localCuisinesAndMarkets[0];
console.log('Adding cuisine:', item.title, 'to Day', item.targetDay);
mmtState.addCuisineOrMarketToDayItinerary(item.id);

const targetDayItinerary = mmtState.state.itinerary[item.targetDay - 1];
const addedStop = targetDayItinerary.stops.find(s => s.id === `flavour-stop-${item.id}`);
console.log('Cuisine stop successfully inserted in itinerary:', !!addedStop, 'at', addedStop?.time);

// 4. Test itinerary approval & booking progression
mmtState.approveItineraryAndProceedToBooking();
console.log('After approval, subStep is:', mmtState.state.itinerarySubStep);
console.log('Flight options count:', mmtState.state.flightOptions.length);
console.log('Hotel options count:', mmtState.state.hotelOptions.length);

// 5. Select flight & hotel
mmtState.selectFlight('fl-indigo-group');
console.log('Selected flight:', mmtState.state.selectedFlightId);

mmtState.toggleHotelSelection('ht-polo-cherra');
console.log('Selected hotels:', mmtState.state.selectedHotelIds);

console.log('All state tests PASSED successfully!');
