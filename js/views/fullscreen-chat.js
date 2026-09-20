// js/views/fullscreen-chat.js - MakeMyTrip Myra Split-Screen Workspace (50-50 Split: Chat Interventions on Left, Visual Review Canvas on Right)

import { mmtState } from '../mmt-state.js';
import { DESTINATION_PACKAGES } from '../mmt-data.js';

// Helper: 1-Click Printable PDF Generation for Final Master Itinerary
export function downloadItineraryAsPdf(itinerary, trip, members, bookingRepo) {
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  const membersList = (members || []).map(m => m.name).join(', ');
  const totalGrantexSpent = mmtState.calculateTotalGrantexSpent ? mmtState.calculateTotalGrantexSpent() : 0;
  
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>MakeMyTrip Final Group Itinerary - ${trip?.title || 'Meghalaya Trip'}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 36px; line-height: 1.5; background: #fff; }
          .header { border-bottom: 3px solid #eb2026; padding-bottom: 18px; margin-bottom: 24px; }
          .badge { font-size: 11px; font-weight: 800; color: #eb2026; letter-spacing: 0.5px; text-transform: uppercase; }
          h1 { margin: 6px 0 8px 0; color: #0a223d; font-size: 24px; }
          .meta { font-size: 12.5px; color: #64748b; display: flex; flex-wrap: wrap; gap: 16px; margin-top: 8px; }
          .stats-strip { display: flex; gap: 14px; margin: 16px 0 24px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; }
          .stat-item { flex: 1; }
          .stat-label { font-size: 10.5px; color: #64748b; text-transform: uppercase; font-weight: 700; }
          .stat-val { font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 2px; }
          .day-card { border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 20px; overflow: hidden; page-break-inside: avoid; }
          .day-header { background: #f1f5f9; padding: 10px 16px; font-weight: 800; font-size: 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; }
          .day-badge { background: #0a223d; color: #fff; padding: 2px 7px; border-radius: 4px; font-size: 11px; margin-right: 8px; }
          .hotel-tag { font-size: 12px; color: #0369a1; background: #e0f2fe; padding: 2px 8px; border-radius: 4px; font-weight: 700; }
          .stop-row { display: flex; padding: 11px 16px; border-bottom: 1px solid #f1f5f9; gap: 16px; }
          .stop-row:last-child { border-bottom: none; }
          .stop-time { width: 95px; font-weight: 800; font-size: 12.5px; color: #0a223d; }
          .stop-details { flex: 1; }
          .stop-title { font-weight: 700; font-size: 13.5px; color: #1e293b; }
          .stop-badge { font-size: 10px; font-weight: 700; background: #e2e8f0; color: #334155; padding: 1px 6px; border-radius: 3px; margin-left: 6px; }
          .stop-sub { font-size: 12px; color: #64748b; margin-top: 3px; }
          .stop-flavour { font-size: 10.5px; font-weight: 600; color: #92400e; background: #fef3c7; padding: 1px 6px; border-radius: 4px; display: inline-block; margin-top: 4px; }
          .footer { margin-top: 36px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 14px; }
          .print-btn { background: #eb2026; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px; }
          @media print {
            .no-print { display: none !important; }
            body { margin: 15mm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; justify-content: space-between; align-items: center;" class="no-print">
            <span class="badge">MakeMyTrip Co-Traveler Master Plan</span>
            <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
          </div>
          <h1>${trip?.title || 'Meghalaya Autumn Odyssey: Cascades & Living Bridges'}</h1>
          <div class="meta">
            <span>🗓️ 24 Oct – 28 Oct 2026 (4 Days)</span>
            <span>👥 Travellers: ${membersList || 'Rahul, Priya, Rohan, Vikram'}</span>
            <span>🚗 Innova Crysta (Biplab Sangma - 4.9★)</span>
            <span>🏨 Stays: Ri Kynjai & Polo Orchid</span>
          </div>
        </div>

        <div class="stats-strip">
          <div class="stat-item">
            <div class="stat-label">Grantex Escrow Spend</div>
            <div class="stat-val" style="color: #008542;">₹${totalGrantexSpent.toLocaleString()}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Flight PNR</div>
            <div class="stat-val">${bookingRepo?.flightTickets?.[0]?.pnr || 'MMT-6E-8060'}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Chauffeur</div>
            <div class="stat-val">Biplab Sangma (4.9★)</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Escrow Protocol</div>
            <div class="stat-val">Pine Labs Grantex</div>
          </div>
        </div>

        <div class="timeline">
          ${(itinerary || []).map(day => {
            const hotelName = day.hotel || (day.stops?.find(s => s.type === 'hotel')?.title?.replace('Check-in: ', '')) || (day.day === 3 ? 'Polo Orchid Resort' : 'Ri Kynjai Resort');
            return `
            <div class="day-card">
              <div class="day-header">
                <div>
                  <span class="day-badge">DAY ${day.day}</span>
                  <span>${day.title}</span>
                </div>
                <span class="hotel-tag">🏨 ${hotelName}</span>
              </div>
              <div class="stops-list">
                ${(day.stops || []).map(s => `
                  <div class="stop-row">
                    <div class="stop-time">${s.time}</div>
                    <div class="stop-details">
                      <div class="stop-title">
                        ${s.title || s.activity || 'Scheduled Experience'}
                        ${s.badge ? `<span class="stop-badge">${s.badge}</span>` : ''}
                        ${s.duration ? `<span style="font-size: 11px; color: #64748b; margin-left: 6px;">⏱️ ${s.duration}</span>` : ''}
                      </div>
                      <div class="stop-sub">📍 ${s.subtitle || s.location || s.venue || ''}</div>
                      ${s.flavourId || s.flavourTag ? `<div class="stop-flavour">🍽️ Local Food / Market • Route Synchronized</div>` : ''}
                    </div>
                    ${s.cost ? `<div style="font-weight: 700; color: #059669; font-size: 12.5px;">${typeof s.cost === 'number' ? '₹' + s.cost : s.cost}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          }).join('')}
        </div>

        <div class="footer">
          Generated via MakeMyTrip Collaborative Travel Planner • Secured by Pine Labs Grantex Escrow • 24x7 Trip Concierge: 1800-MMT-MYRA
        </div>
        <script>
          setTimeout(() => { window.print(); }, 400);
        </script>
      </body>
    </html>
  `;
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
  } else {
    window.print();
  }
}

export function renderFullscreenChat(container) {
  const trip = mmtState.state.trip;
  const members = mmtState.state.members;
  const messages = mmtState.state.chatMessages;
  const seasons = mmtState.state.seasonalWindows;
  const itinerary = mmtState.state.itinerary;
  const previewMode = mmtState.state.previewViewMode;
  const isLocked = mmtState.state.isDecisionLocked;
  const persona = mmtState.getActivePersona();
  const isBudgetOpen = mmtState.state.isBudgetEditorOpen;
  const isTravellerOpen = mmtState.state.isTravellerLookupOpen;
  const memberTransitChoices = mmtState.state.memberTransitChoices || {};

  // Progressive Itinerary State
  const flights = mmtState.state.flightAnchors;
  const macroDays = mmtState.state.macroDays;
  const subStep = mmtState.state.itinerarySubStep; // "macro_overview" | "activities_selection" | "itinerary_schedule" | "cuisines_markets" | "grantex_accounts" | "transit_booking" | "hotels_booking" | "cab_booking" | "activities_prebook"
  const activeDay = mmtState.state.activeConfiguringDayNum;
  const candidateActivities = mmtState.state.candidateActivities[activeDay] || [];
  const selectedActIds = mmtState.state.dayActivitySelections[activeDay] || [];
  const budgetAlert = mmtState.state.budgetAlert;
  const cuisinesMarkets = mmtState.state.localCuisinesAndMarkets;
  const savedFlavours = mmtState.state.savedFlavours;

  // Mobile & Grantex & Booking State
  const mobileActiveTab = mmtState.state.mobileActiveTab || 'preview';
  const grantexAccounts = mmtState.state.grantexAccounts || [];
  const grantexConfig = mmtState.state.grantexConfig || {};
  const originAirport = mmtState.state.originAirport || 'DEL';
  const airportOptions = mmtState.state.airportOptions || [];
  const flightOptions = mmtState.state.flightOptions || [];
  const hotelOptions = mmtState.state.hotelOptions || [];
  const selectedFlightId = mmtState.state.selectedFlightId;
  const flightVotes = mmtState.state.flightVotes || {};
  const isFlightBooked = mmtState.state.isFlightBooked;
  const flightBookingPnr = mmtState.state.flightBookingPnr;
  const isFlightSkipped = mmtState.state.isFlightSkipped;
  const isHotelBooked = mmtState.state.isHotelBooked;
  const hotelBookingPnr = mmtState.state.hotelBookingPnr;
  const scheduledCuisineIds = mmtState.state.scheduledCuisineIds || [];
  const deviceMode = mmtState.state.deviceMode;
  const maxUnlockedSubStep = mmtState.state.maxUnlockedSubStep || 1;
  const hasCuisinesSelected = (scheduledCuisineIds && scheduledCuisineIds.length > 0) || Boolean(mmtState.state.isCuisinesConfirmed) || (maxUnlockedSubStep >= 5);

  // Multi-Modal Transit, Location Hotels, Cab Fleet & Activity Pre-Book State
  const transitModes = mmtState.state.transitModes || [];
  const selectedTransitMode = mmtState.state.selectedTransitMode || 'flight';
  const isTransitSkipped = mmtState.state.isTransitSkipped;
  const locationHotelOptions = mmtState.state.locationHotelOptions || [];
  const activeHotelLocationIdx = mmtState.state.activeHotelLocationIdx || 0;
  const hotelVotesByLocation = mmtState.state.hotelVotesByLocation || {};
  const selectedHotelByLocation = mmtState.state.selectedHotelByLocation || {};
  const selectedMealPlanByLocation = mmtState.state.selectedMealPlanByLocation || {};
  const bookedHotelsByLocation = mmtState.state.bookedHotelsByLocation || {};
  const skippedHotelsByLocation = mmtState.state.skippedHotelsByLocation || {};
  const cabFleetOptions = mmtState.state.cabFleetOptions || [];
  const selectedCabId = mmtState.state.selectedCabId;
  const isCabBooked = mmtState.state.isCabBooked;
  const cabBookingPnr = mmtState.state.cabBookingPnr;
  const isCabSkipped = mmtState.state.isCabSkipped;
  const prebookableActivities = mmtState.state.prebookableActivities || [];
  const selectedPrebookActivityIds = mmtState.state.selectedPrebookActivityIds || [];
  const isActivitiesPrebooked = mmtState.state.isActivitiesPrebooked;
  const activitiesPnr = mmtState.state.activitiesPnr;
  const isActivitiesSkipped = mmtState.state.isActivitiesSkipped;

  // Live Vote Summary Tab State
  const isVoteSummaryExpanded = mmtState.state.isVoteSummaryExpanded;
  const activeVoteCategory = mmtState.state.activeVoteCategory || 'auto';
  const liveVoteSummary = mmtState.getLiveVoteSummary();

  // Post-Booking Data, Group Locker & Sentinel State
  const bookingRepo = mmtState.getBookingRepository();
  const cancellationSim = mmtState.state.cancellationSim || {};
  const disruptionState = mmtState.state.disruptionState || {};
  const sentinelMonitoring = mmtState.state.sentinelMonitoring || {};
  const isTripFullyBooked = mmtState.state.isTripFullyBooked;
  const cancelledMemberIds = mmtState.state.cancelledMemberIds || [];
  const activeLockerMemberId = mmtState.state.activeLockerMemberId || 'all';
  const cancellationPolicies = mmtState.state.cancellationPolicies || {};

  // Sequential Streaming & Consensus & Calendar state
  const revealedCount = mmtState.state.revealedMessageCount || messages.length;
  const isStreaming = mmtState.state.isChatStreaming;
  const isSeasonalConsensusReached = mmtState.state.isSeasonalConsensusReached;
  const isSeasonalWindowConfirmed = mmtState.state.isSeasonalWindowConfirmed;
  const calendarSlots = mmtState.state.calendarSlots || [];
  const memberDateSelections = mmtState.state.memberDateSelections || {};
  const synthesizedDateResult = mmtState.state.synthesizedDateResult || {};

  // Enhanced Requirements 1-5 State
  const seasonalParity = mmtState.getHighestParitySeasonalWindow();
  const activeCalMonth = mmtState.state.activeCalendarMonth || "2026-10";
  const isCalDropdownOpen = mmtState.state.isCalendarMonthDropdownOpen !== false;
  const monthDays = (mmtState.state.monthCalendarSlots && mmtState.state.monthCalendarSlots.length > 0)
    ? mmtState.state.monthCalendarSlots
    : mmtState.generateMonthCalendarDays(activeCalMonth);
  const activeMacroDayIdx = mmtState.state.activeMacroDayIdx || 0;

  // Dynamic Destination Intelligence
  const destQuery = (trip.destination || '').toLowerCase();
  let destKey = 'meghalaya';
  if (destQuery.includes('goa')) destKey = 'goa';
  else if (destQuery.includes('kashmir') || destQuery.includes('srinagar')) destKey = 'kashmir';
  else if (destQuery.includes('kerala') || destQuery.includes('munnar')) destKey = 'kerala';

  const currentPkg = DESTINATION_PACKAGES[destKey] || DESTINATION_PACKAGES['meghalaya'];
  const destIntel = currentPkg.destinationIntelligence || {};

  // Active Intervention Stage in Chat
  const activeChatStage = mmtState.state.activeChatInterventionStage || 'auto';
  const resolvedInterventionStage = activeChatStage !== 'auto' 
    ? activeChatStage 
    : (!isSeasonalWindowConfirmed 
        ? 'seasons' 
        : (!isLocked 
            ? 'calendar_dates' 
            : (isTripFullyBooked ? 'live_radar' : subStep)));

  // Strict Stage Navigation Definitions (Requirement 5)
  const STAGES_NAV = [
    { key: 'seasons', label: `1. Seasons (${isSeasonalWindowConfirmed ? '✓ Confirmed' : 'Voting'})`, shortLabel: '1. Seasons', emoji: '🌤️' },
    { key: 'calendar_dates', label: `2. Calendar (${isLocked ? '✓ Approved' : 'Picking'})`, shortLabel: '2. Calendar', emoji: '📅' },
    { key: 'macro_overview', label: `3. Macro Days (${maxUnlockedSubStep >= 2 ? '✓ Approved' : 'Review'})`, shortLabel: '3. Macro Days', emoji: '📋' },
    { key: 'activities_selection', label: `4. Day Activities (${maxUnlockedSubStep >= 3 ? '✓ Done' : 'Select'})`, shortLabel: '4. Day Activities', emoji: '🎯' },
    { key: 'cuisines_markets', label: `5. Cuisines & Markets (${maxUnlockedSubStep >= 5 ? '✓ Done' : ''})`, shortLabel: '5. Cuisines', emoji: '🍽️' },
    { key: 'grantex_accounts', label: `6. Grantex Vaults (${maxUnlockedSubStep >= 6 ? '✓ Done' : ''})`, shortLabel: '6. Grantex Vaults', emoji: '⚡' },
    { key: 'transit_booking', label: `7. Transit & Flights (${maxUnlockedSubStep >= 7 ? '✓ Done' : ''})`, shortLabel: '7. Flights', emoji: '✈️' },
    { key: 'hotels_booking', label: `8. Hotels (${activeHotelLocationIdx === 0 ? 'Shillong' : 'Cherrapunji'})`, shortLabel: '8. Hotels', emoji: '🏨' },
    { key: 'cab_booking', label: `9. Cab Fleet (${maxUnlockedSubStep >= 9 ? '✓ Done' : ''})`, shortLabel: '9. Cabs', emoji: '🚗' },
    { key: 'activities_prebook', label: `10. Activity Passes (${isTripFullyBooked ? '✓ Done' : ''})`, shortLabel: '10. Activities', emoji: '🎟️' },
    { key: 'live_radar', label: '11. Disruption & Delays', shortLabel: '11. Live Radar', emoji: '🛰️' },
    { key: 'cancellation_engine', label: '12. Cancellation & Refund', shortLabel: '12. Refunds', emoji: '🔄' }
  ];

  container.innerHTML = `
    <div class="myra-split-workspace-page">
      
      <!-- Top Workspace Navigation Header (Fixed 50-50, split options removed) -->
      <header class="split-workspace-header">
        <div class="header-brand-block">
          <div class="myra-sparkle-avatar">✨</div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 class="workspace-title">${trip.title}</h2>
              <span class="ai-status-tag">🤖 MakeMyTrip Myra AI • Active Intervention</span>
            </div>
            <div class="workspace-sub-meta">
              <span>📍 ${trip.destination}</span> • 
              <span>👥 ${members.length - cancelledMemberIds.length} Members Synced</span> •
              <span>🔒 50:50 Interactive Split</span>
            </div>
          </div>
        </div>

        <!-- Persistent Quick Controls -->
        <div class="header-controls-block">
          <!-- 1. Per-Person Budget Badge (Click to Edit) -->
          <div class="budget-badge-dropdown" style="position: relative;">
            <button class="btn-workspace-pill" id="btn-ws-open-budget" title="Click to update per-person budget anytime">
              <span>💰</span> Budget: <strong>₹${trip.budgetMin.toLocaleString()} - ₹${trip.budgetMax.toLocaleString()}</strong> / person ✎
            </button>

            ${isBudgetOpen ? `
              <div class="ws-popover-box" id="ws-budget-popover" style="position: absolute; top: 100%; right: 0; width: 280px; background: #fff; border: 1.5px solid #0084ff; box-shadow: 0 8px 24px rgba(0,0,0,0.25); border-radius: 8px; padding: 14px; z-index: 100; margin-top: 6px; color: #333;">
                <div style="font-size: 12px; font-weight: 800; color: #0a223d; margin-bottom: 8px;">Update Per-Person Budget</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
                  <div>
                    <label style="font-size: 10px; color: #777; font-weight: 700; display: block;">Min (₹)</label>
                    <input type="number" id="input-ws-bmin" value="${trip.budgetMin}" step="1000" style="width: 100%; padding: 4px 6px; font-size: 12px; font-weight: 800; border: 1px solid #ccc; border-radius: 4px;" />
                  </div>
                  <div>
                    <label style="font-size: 10px; color: #777; font-weight: 700; display: block;">Max (₹)</label>
                    <input type="number" id="input-ws-bmax" value="${trip.budgetMax}" step="1000" style="width: 100%; padding: 4px 6px; font-size: 12px; font-weight: 800; border: 1px solid #ccc; border-radius: 4px;" />
                  </div>
                </div>
                <div style="display: flex; justify-content: flex-end;">
                  <button class="btn-book-mmt" id="btn-ws-save-budget" style="font-size: 11px; padding: 5px 12px;">Save Budget</button>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- 2. Add Travellers by Phone Button -->
          <div class="traveller-add-dropdown" style="position: relative;">
            <button class="btn-workspace-pill" id="btn-ws-open-traveller" title="Add friends by MMT phone number anytime">
              <span>➕</span> Add Travellers (${members.length})
            </button>

            ${isTravellerOpen ? `
              <div class="ws-popover-box" id="ws-traveller-popover" style="position: absolute; top: 100%; right: 0; width: 320px; background: #fff; border: 1px solid #c2e0ff; box-shadow: 0 8px 24px rgba(0,0,0,0.25); border-radius: 8px; padding: 14px; z-index: 100; margin-top: 6px; color: #333;">
                <div style="font-size: 12px; font-weight: 800; color: #0a223d; margin-bottom: 6px;">Add Member by MMT Phone Number</div>
                <p style="font-size: 11px; color: #666; margin-bottom: 8px;">Fetches past travel records, meal preferences, and verified status.</p>
                <div style="display: flex; gap: 6px; margin-bottom: 10px;">
                  <input type="tel" id="input-ws-phone" placeholder="10-digit number (e.g. 9876543210)" maxlength="10" style="flex: 1; padding: 6px 8px; font-size: 12px; border: 1px solid #ccc; border-radius: 4px;" />
                  <button class="btn-book-mmt" id="btn-ws-add-phone" style="font-size: 11px; padding: 6px 10px;">Add</button>
                </div>
                <div id="ws-phone-toast" style="display: none; font-size: 11px; padding: 6px; border-radius: 4px; margin-bottom: 8px;"></div>
                
                <div style="font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 4px;">Active Travellers:</div>
                <div style="max-height: 120px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;">
                  ${members.map(m => `
                    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; background: #f9f9f9; padding: 4px 8px; border-radius: 4px;">
                      <span><strong>${m.name}</strong> (${m.role})</span>
                      <span style="color: #005f9e;">${m.diet}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Exit Button -->
          <button class="btn-exit-workspace" id="btn-exit-workspace-page" title="Return to Search">
            ✕ Exit
          </button>
        </div>
      </header>

      <!-- Mobile View Segmented Tab Switcher -->
      <div class="mobile-segmented-strip ${deviceMode === 'mobile' ? 'is-force-mobile' : ''}">
        <button class="btn-m-segment ${mobileActiveTab === 'chat' ? 'active' : ''}" id="btn-m-segment-chat">
          💬 Myra Planning & Interventions (${messages.length})
        </button>
        <button class="btn-m-segment ${mobileActiveTab === 'preview' ? 'active' : ''}" id="btn-m-segment-preview">
          🧭 Visual Review Canvas (${previewMode.toUpperCase()})
        </button>
      </div>

      <!-- SPLIT SCREEN LAYOUT: Fixed 50-50 Split (Left: Chat Interventions | Right: Visual Review Canvas) -->
      <div class="split-workspace-body" id="split-workspace-body">
        
        <!-- LEFT SIDE: MakeMyTrip Myra AI Chat & Intervention Hub (50%) -->
        <section class="split-chat-column ${mobileActiveTab !== 'chat' ? 'mobile-pane-hidden' : ''}" id="split-chat-col">
          
          <!-- Myra AI Brand Chat Header -->
          <div class="chat-column-header" style="background: #ffffff; padding: 12px 16px; border-bottom: 1.5px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="position: relative;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #eb2026 0%, #ff5252 100%); display: flex; align-items: center; justify-content: center; font-size: 18px; color: #fff; box-shadow: 0 2px 8px rgba(235, 32, 38, 0.3);">
                  ✨
                </div>
                <span style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #10b981; border: 2px solid #fff; border-radius: 50%;"></span>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <h3 style="font-size: 15px; font-weight: 800; color: #0a223d; margin: 0;">Myra</h3>
                  <span style="background: #e0f2fe; color: #0284c7; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 2px;">
                    ✓ MakeMyTrip AI Expert
                  </span>
                </div>
                <span style="font-size: 11px; color: #64748b;">Primary Trip Intervention Hub • Real-time Decision Engine</span>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              ${isStreaming ? `
                <button id="btn-skip-chat-seq" class="btn-workspace-pill" style="padding: 4px 10px; font-size: 11px; background: #fff; color: #0a223d; border: 1px solid #cbd5e1; cursor: pointer; font-weight: 700;">
                  ⚡ Skip sequence
                </button>
              ` : ''}
              <div style="font-size: 11px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 12px; color: #334155; font-weight: 700;">
                👤 You: <strong>${persona.name}</strong>
              </div>
            </div>
          </div>

          <!-- Myra Chat Intervention Stage Navigator (Requirement 5: Upcoming Stages Strictly Greyed Out & Disabled) -->
          <div class="myra-stage-pills-strip" id="chat-intervention-nav">
            <span style="font-size: 11px; font-weight: 800; color: #0a223d; display: flex; align-items: center; gap: 4px; padding-right: 4px;">
              🎯 Stage:
            </span>
            ${STAGES_NAV.map(s => {
              const isUnlocked = mmtState.isStageUnlocked(s.key);
              const isCompleted = mmtState.isStageCompleted(s.key);
              const isActive = resolvedInterventionStage === s.key;
              if (!isUnlocked) {
                return `
                  <button class="myra-stage-pill is-locked" data-stage-target="${s.key}" disabled title="Stage locked. Please complete prior steps first." style="opacity: 0.38; cursor: not-allowed !important; pointer-events: none; background: #f1f5f9 !important; color: #94a3b8 !important; border: 1px dashed #cbd5e1 !important; filter: grayscale(1);">
                    🔒 ${s.shortLabel} <span style="font-size: 9.5px; opacity: 0.75;">(Locked)</span>
                  </button>
                `;
              }
              return `
                <button class="myra-stage-pill ${isActive ? 'active' : ''} ${isCompleted ? 'is-completed' : ''}" data-stage-target="${s.key}">
                  ${s.emoji} ${s.label}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Chat Messages Scroll Stream with Progressive Micro-Animations -->
          <div class="chat-stream-scroll" id="chat-stream-scroll">
            ${messages.slice(0, revealedCount).map((m, idx) => `
              <div class="chat-msg-row ${m.isAI ? 'is-ai' : ''} ${m.sender === persona.name ? 'is-me' : ''}" style="animation-delay: ${Math.min(idx * 70, 900)}ms;">
                <div class="msg-bubble">
                  <div class="msg-author" style="${m.isAI ? 'color: #eb2026;' : ''}">
                    ${m.isAI ? '✨ Myra (AI Assistant)' : m.sender} ${m.role ? `<span style="font-size: 9px; color: #888; font-weight: 400;">(${m.role})</span>` : ''}
                  </div>
                  <div style="font-size: 13.5px; line-height: 1.5;">${m.text}</div>
                  <div class="msg-time">${m.time}</div>
                </div>
              </div>
            `).join('')}

            ${isStreaming ? `
              <div class="myra-typing-bubble" style="display: flex; align-items: center; gap: 8px; padding: 8px 14px; background: #fff; border-radius: 14px; width: fit-content; margin: 4px 0 10px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 3px solid #eb2026; animation: myraMessageEnter 0.3s ease-out;">
                <span style="font-size: 11px; font-weight: 700; color: #eb2026;">✨ Myra & group typing</span>
                <span class="typing-dot" style="width: 5px; height: 5px; background: #eb2026; border-radius: 50%; display: inline-block;"></span>
                <span class="typing-dot" style="width: 5px; height: 5px; background: #eb2026; border-radius: 50%; display: inline-block;"></span>
                <span class="typing-dot" style="width: 5px; height: 5px; background: #eb2026; border-radius: 50%; display: inline-block;"></span>
              </div>
            ` : ''}

            <!-- EMBEDDED ACTIVE INTERVENTION CARD FROM MYRA (Requirement 3: All User Interventions Inside Chat) -->
            <div class="myra-chat-intervention-wrap" id="chat-active-intervention-block" style="margin-top: 12px; animation: myraMessageEnter 0.4s ease-out both;">
              
              <!-- 1. Seasons & Dates Decision Intervention Card (Requirement 1: Highest Parity & Admin Approval) -->
              ${resolvedInterventionStage === 'seasons' ? `
                <div class="myra-intervention-card" style="border-top-color: #0284c7;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: SEASON & DATES DECISION</span>
                    <span style="font-size: 11px; color: #64748b;">${isSeasonalWindowConfirmed ? '✓ Window Confirmed' : 'Stage 1 • Group Consensus'}</span>
                  </div>

                  <p style="font-size: 13px; color: #334155; margin: 0 0 12px 0;">
                    Review seasonal travel windows and cast your vote below. Visual photos and best seasons guide are displayed on the right canvas. Once all members vote, Myra summarizes the highest parity choice for Trip Admin (Kabir) approval.
                  </p>

                  <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
                    ${seasons.map(win => {
                      const votesList = win.votedMemberIds || win.votes || [];
                      const isUserVoted = votesList.includes(persona?.id || 'user-1');
                      const prosText = Array.isArray(win.pros) ? win.pros[0] : (win.pros || '');
                      const dateText = win.dateRange || win.dates || '';
                      const isLeadWin = seasonalParity.window && seasonalParity.window.id === win.id;
                      return `
                      <div style="background: ${isLeadWin ? '#f0f9ff' : '#f8fafc'}; border: 1.5px solid ${isUserVoted ? '#0284c7' : (isLeadWin ? '#7dd3fc' : '#e2e8f0')}; border-radius: 10px; padding: 12px; position: relative;">
                        ${isLeadWin ? `
                          <span style="position: absolute; top: 10px; right: 120px; font-size: 10px; font-weight: 800; color: #0284c7; background: #e0f2fe; padding: 2px 7px; border-radius: 4px;">
                            ⭐ Highest Parity (${votesList.length}/${members.length})
                          </span>
                        ` : ''}
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                          <div>
                            <div style="font-weight: 800; font-size: 13.5px; color: #0a223d;">${win.title}</div>
                            <div style="font-size: 11.5px; color: #0284c7; font-weight: 700; margin: 2px 0 4px 0;">${dateText} • ${win.weather}</div>
                            <div style="font-size: 11px; color: #64748b;">${prosText}</div>
                          </div>
                          <button class="btn-workspace-pill btn-vote-season" data-win-id="${win.id}" style="padding: 6px 12px; font-size: 11px; background: ${isUserVoted ? '#0284c7' : '#fff'}; color: ${isUserVoted ? '#fff' : '#0a223d'}; border: 1px solid #cbd5e1; flex-shrink: 0; cursor: pointer;">
                            ${isUserVoted ? '✓ Voted' : 'Vote This'} (${votesList.length})
                          </button>
                        </div>
                      </div>
                      `;
                    }).join('')}
                  </div>

                  <!-- Requirement 1: Voting Summary Brief by Myra (Highest Parity Window & Admin Approval) -->
                  <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                      <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 13px; color: #166534;">
                        <span>📊</span> MYRA VOTING CONSENSUS BRIEF
                      </div>
                      <span style="font-size: 11px; font-weight: 800; color: #15803d; background: #dcfce7; padding: 2px 8px; border-radius: 4px;">
                        ✓ ${seasonalParity.parityPercent}% Highest Parity
                      </span>
                    </div>
                    <p style="font-size: 12px; color: #15803d; margin: 0 0 10px 0; line-height: 1.5;">
                      Highest parity window: <strong>${seasonalParity.window.title}</strong> (${seasonalParity.votesCount}/${members.length} votes). Constraints verified: Rohan's 11:30 AM client call cleared via afternoon flight logistics.
                    </p>
                    <button class="btn-book-mmt" id="btn-admin-confirm-season" data-win-id="${seasonalParity.window.id}" style="width: 100%; padding: 10px 16px; font-size: 12.5px; background: linear-gradient(90deg, #16a34a, #15803d);">
                      ${isSeasonalWindowConfirmed ? '✓ Travel Window Confirmed by Kabir (Admin)' : '🔒 Kabir (Admin): Confirm Travel Window & Open Calendar Dropdown ➔'}
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- 2. Interactive Entire Month Availability Calendar Dropdown & AI Synthesis (Requirements 2 & 3) -->
              ${resolvedInterventionStage === 'calendar_dates' ? `
                <div class="myra-intervention-card" style="border-top-color: #0284c7;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: ENTIRE MONTH CALENDAR AVAILABILITY</span>
                    <span style="font-size: 11px; color: #64748b;">${isLocked ? '✓ Dates Finalized' : 'Interactive Month Dropdown'}</span>
                  </div>

                  <p style="font-size: 13px; color: #334155; margin: 0 0 10px 0;">
                    Travel window approved! Open the month dropdown below to mark your available dates on the full 31-day calendar. Myra synthesizes group availability to pick the optimal travel window.
                  </p>

                  <!-- Requirement 2: Month Selector Dropdown & Toggle -->
                  <div class="month-calendar-dropdown-wrap" style="background: #f8fafc; border: 1.5px solid #0284c7; border-radius: 10px; padding: 12px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <label style="font-size: 12px; font-weight: 800; color: #0a223d; display: flex; align-items: center; gap: 6px;">
                        <span>📅</span> Select Travel Month:
                      </label>
                      <span style="font-size: 11px; color: #0284c7; font-weight: 700;">Entire Month Availability Grid</span>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                      <select id="select-calendar-month" style="flex: 1; min-width: 220px; padding: 8px 12px; font-size: 12.5px; font-weight: 700; border: 1px solid #93c5fd; border-radius: 6px; background: #fff; color: #0a223d; cursor: pointer;">
                        <option value="2026-10" ${activeCalMonth === '2026-10' ? 'selected' : ''}>October 2026 (Confirmed Window • 31 Days)</option>
                        <option value="2026-11" ${activeCalMonth === '2026-11' ? 'selected' : ''}>November 2026 (Winter Peak • 30 Days)</option>
                      </select>
                      <button id="btn-toggle-month-cal" class="btn-workspace-pill" style="padding: 8px 14px; font-size: 11.5px; font-weight: 700; background: #0284c7; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
                        ${isCalDropdownOpen ? '▲ Collapse Calendar' : '▼ Open Entire Month Calendar'}
                      </button>
                    </div>
                  </div>

                  <!-- Full Month Availability Calendar (Opens upon dropdown selection) -->
                  ${isCalDropdownOpen ? `
                    <div class="entire-month-calendar-panel" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px;">
                        <div style="font-size: 12px; color: #0a223d;">
                          Selecting dates for: <strong>${persona.name} (${persona.role})</strong>
                        </div>
                        <button class="btn-workspace-pill" id="btn-record-all-dates" style="padding: 5px 12px; font-size: 11px; background: #0a223d; color: #fff; border: none; font-weight: 700; cursor: pointer; border-radius: 6px;">
                          ⚡ Record All 4 Member Availabilities (Optimal: 16-20 Oct)
                        </button>
                      </div>

                      <!-- 7-Column Calendar Grid Header -->
                      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; font-size: 10.5px; font-weight: 800; color: #64748b; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span style="color: #ea580c;">Sat</span><span style="color: #ea580c;">Sun</span>
                      </div>

                      <!-- 31-Day Date Cells (Oct 1 is Thursday -> 3 empty offset cells: Mon, Tue, Wed) -->
                      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">
                        ${activeCalMonth === '2026-10' ? `
                          <div style="background: transparent; min-height: 52px;"></div>
                          <div style="background: transparent; min-height: 52px;"></div>
                          <div style="background: transparent; min-height: 52px;"></div>
                        ` : ''}
                        
                        ${monthDays.map(slot => {
                          const myDates = memberDateSelections[persona.id] || [];
                          const isSelectedByMe = myDates.includes(slot.dateKey);
                          const availableMembers = members.filter(m => (memberDateSelections[m.id] || []).includes(slot.dateKey));
                          const isAllAvailable = availableMembers.length === members.length;
                          return `
                            <div class="calendar-date-cell btn-toggle-calendar-date ${isSelectedByMe ? 'is-selected' : ''}" data-date-key="${slot.dateKey}" style="border: 1.5px solid ${isAllAvailable ? '#16a34a' : (isSelectedByMe ? '#0284c7' : '#cbd5e1')}; border-radius: 6px; padding: 4px 2px; text-align: center; cursor: pointer; background: ${isAllAvailable ? '#f0fdf4' : (isSelectedByMe ? '#f0f9ff' : '#fff')}; min-height: 52px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s ease;">
                              <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 2px;">
                                <span style="font-size: 8.5px; color: ${slot.isWeekend ? '#ea580c' : '#64748b'}; font-weight: 700;">${slot.dayName}</span>
                                <span style="font-size: 12px; font-weight: 900; color: #0a223d;">${slot.dayNum}</span>
                              </div>
                              <div style="font-size: 8px; color: ${slot.isRecommended ? '#15803d' : (slot.isWeekend ? '#ea580c' : '#64748b')}; font-weight: 700; line-height: 1;">
                                ${slot.flightSurge.split(' ')[0]}
                              </div>
                              <div style="display: flex; justify-content: center; gap: 1px; min-height: 11px;">
                                ${availableMembers.slice(0, 4).map(m => `
                                  <span title="${m.name} is available" style="width: 10px; height: 10px; border-radius: 50%; background: #0a223d; color: #fff; font-size: 6.5px; display: inline-flex; align-items: center; justify-content: center; font-weight: 800;">${m.name.charAt(0)}</span>
                                `).join('')}
                              </div>
                            </div>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  ` : ''}

                  <!-- Requirement 3: Myra AI Date Overlap & Synthesis Verdict Card -->
                  <div style="background: #fff7ed; border: 1.5px solid #fed7aa; border-radius: 10px; padding: 12px; margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                      <span style="font-weight: 800; font-size: 13px; color: #9a3412;">🤖 Myra Date Synthesis Verdict:</span>
                      <span style="font-size: 11px; font-weight: 800; color: #15803d; background: #dcfce7; padding: 2px 8px; border-radius: 4px;">✓ ${synthesizedDateResult.overlapPercent || 100}% Group Consensus</span>
                    </div>
                    <div style="font-size: 14.5px; font-weight: 900; color: #0a223d; margin-bottom: 4px;">
                      ${synthesizedDateResult.dates} (${synthesizedDateResult.duration})
                    </div>
                    <div style="font-size: 11.5px; color: #475569; margin-bottom: 4px;">
                      • ${synthesizedDateResult.feasibleFlight} • ${synthesizedDateResult.constraintCheck}
                    </div>
                    <div style="font-size: 11px; color: #0369a1; font-weight: 700;">
                      • ${synthesizedDateResult.fareAdvantage}
                    </div>
                  </div>

                  <!-- Requirement 3: Admin Approval of Travel Window & Dates -->
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <button class="btn-book-mmt" id="btn-admin-approve-dates" style="width: 100%; padding: 10px 18px; font-size: 12.5px; background: linear-gradient(90deg, #eb2026, #c5161b);">
                      ${isLocked ? '✓ Travel Dates Approved by Kabir (Admin)' : '⚡ Kabir (Admin): Approve Travel Window & Group Dates (16 Oct – 20 Oct) ➔'}
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- 3. Macro Days Overview Intervention Card (Requirement 4: Macro Day-Wise Itinerary & Reshuffling) -->
              ${resolvedInterventionStage === 'macro_overview' ? `
                <div class="myra-intervention-card" style="border-top-color: #0084ff;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: MACRO DAY-WISE ITINERARY</span>
                    <span style="font-size: 11px; color: #64748b;">Stage 3 • Day Allocation & Route Feasibility</span>
                  </div>

                  <!-- Route Feasibility Radar & Natural Language Helper Banner -->
                  <div class="macro-feasibility-radar-bar" style="background: linear-gradient(135deg, #0a223d 0%, #0369a1 100%); border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; box-shadow: 0 4px 12px rgba(2,132,199,0.18);">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 18px;">🧭</span>
                      <div>
                        <div style="font-size: 10.5px; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">Myra Autonomous Route Verification</div>
                        <div style="font-size: 12.5px; font-weight: 700;">Anti-Backtracking Score: <span style="color: #4ade80;">94% Optimal</span> • Mountain Road Feasibility: <span style="color: #67e8f9;">Verified</span></div>
                      </div>
                    </div>
                    <div style="font-size: 11px; background: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.25); backdrop-filter: blur(4px);">
                      💬 Chat with <strong>@Myra</strong>: <em>"swap Day 2 and Day 3"</em>
                    </div>
                  </div>

                  <!-- Day Toggling Tabs Strip -->
                  <div class="macro-day-tabs-strip" style="display: flex; gap: 6px; margin-bottom: 10px; overflow-x: auto; padding-bottom: 4px;">
                    ${macroDays.map((d, idx) => `
                      <button class="btn-macro-day-tab ${activeMacroDayIdx === idx ? 'active' : ''}" data-day-idx="${idx}" style="padding: 6px 12px; font-size: 11.5px; font-weight: 700; border-radius: 8px; border: 1.5px solid ${activeMacroDayIdx === idx ? '#0084ff' : '#cbd5e1'}; background: ${activeMacroDayIdx === idx ? '#0084ff' : '#fff'}; color: ${activeMacroDayIdx === idx ? '#fff' : '#0a223d'}; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 5px;">
                        <span>Day ${d.dayNum || (idx + 1)}:</span>
                        <span>${d.region || d.title.split('—')[0].trim()}</span>
                      </button>
                    `).join('')}
                  </div>

                  <!-- 1-Click Quick Swaps Bar -->
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 2px;">
                    <span style="font-size: 10.5px; font-weight: 800; color: #64748b; text-transform: uppercase; white-space: nowrap;">⚡ Quick Actions:</span>
                    <button class="btn-quick-swap-chip" data-swap-a="1" data-swap-b="2" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 12px; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; cursor: pointer; white-space: nowrap;" title="Swap Cherrapunji and Dawki">
                      ⇄ Swap Day 2 & 3
                    </button>
                    <button class="btn-quick-swap-chip" data-swap-a="0" data-swap-b="1" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 12px; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; cursor: pointer; white-space: nowrap;" title="Swap Shillong and Cherrapunji">
                      ⇄ Swap Day 1 & 2
                    </button>
                    <button class="btn-quick-swap-chip" data-swap-a="2" data-swap-b="3" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 12px; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; cursor: pointer; white-space: nowrap;" title="Swap Dawki and Heritage/Return">
                      ⇄ Swap Day 3 & 4
                    </button>
                  </div>

                  <!-- Upgraded High-UX Day Cards with Scenic Photos & Direct Swap Controls -->
                  <div class="macro-days-list" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
                    ${macroDays.map((d, idx) => {
                      const isRecentlySwapped = mmtState.state.lastSwappedDays && mmtState.state.lastSwappedDays.includes(idx);
                      const isActive = activeMacroDayIdx === idx;
                      const driveEst = d.distanceKm ? `~${Math.round(d.distanceKm / 35 * 10) / 10} hrs drive` : 'Scenic Transit';
                      return `
                        <div class="macro-day-row-card ${isActive ? 'is-active-day' : ''} ${isRecentlySwapped ? 'day-swapped-pulse' : ''}" data-day-idx="${idx}">
                          <!-- Left: Scenic Destination Photo Thumbnail with Hub Badge -->
                          <div class="macro-day-thumb-wrap">
                            <img src="${d.photo || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'}" alt="${d.region || d.title}" class="macro-day-img" loading="lazy" />
                            <span class="macro-day-number-badge">DAY ${d.dayNum || (idx + 1)}</span>
                            <span class="macro-hub-pill">${d.tag || d.region || 'Scenic Stop'}</span>
                          </div>

                          <!-- Center: Title, Destination Trail & Specs Badges -->
                          <div class="macro-day-body">
                            <div class="macro-day-topline">
                              <div class="macro-day-title-block">
                                <h4 class="macro-day-heading">${d.title}</h4>
                              </div>
                            </div>
                            <div class="macro-day-summary" title="${d.summary || ''}">
                              📍 ${d.summary || (Array.isArray(d.destinations) ? d.destinations.join(' ➔ ') : (d.region || ''))}
                            </div>
                            <div class="macro-day-specs-row">
                              <span class="macro-spec-chip" title="Transit road distance & drive estimate">
                                🚗 ${d.distanceKm ? `${d.distanceKm} km (${driveEst})` : 'Regional Transit'}
                              </span>
                              <span class="macro-spec-chip" title="Overnight accommodation">
                                🏨 ${d.baseHotel || 'Highland Resort'}
                              </span>
                              <span class="macro-spec-chip feasibility-chip" title="Mountain daylight visibility condition">
                                ☀️ 96% Optimal Road Sync
                              </span>
                            </div>
                          </div>

                          <!-- Right: Interactive Swap Dropdown & Up/Down Buttons -->
                          <div class="macro-day-controls">
                            <div class="macro-swap-dropdown-wrap">
                              <select class="macro-swap-select" data-from-idx="${idx}" title="Directly swap this day with another day">
                                <option value="" disabled selected>⇄ Swap with...</option>
                                ${macroDays.map((targetDay, tIdx) => tIdx !== idx ? `
                                  <option value="${tIdx}">Day ${targetDay.dayNum || (tIdx + 1)}: ${targetDay.region || targetDay.title.split('—')[0].trim()}</option>
                                ` : '').join('')}
                              </select>
                            </div>

                            <div class="macro-reorder-buttons">
                              <button class="btn-macro-order" data-idx="${idx}" data-dir="up" ${idx === 0 ? 'disabled' : ''} title="Move Day ${idx + 1} Earlier">
                                ▲
                              </button>
                              <button class="btn-macro-order" data-idx="${idx}" data-dir="down" ${idx === macroDays.length - 1 ? 'disabled' : ''} title="Move Day ${idx + 1} Later">
                                ▼
                              </button>
                            </div>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <!-- Reshuffle Actions & Admin Approval (Requirement 4) -->
                  <div style="display: flex; gap: 8px; flex-direction: column;">
                    <button class="btn-workspace-pill" id="btn-reset-macro-recommendation" style="width: 100%; padding: 8px 12px; font-size: 11.5px; font-weight: 700; background: #fff; border: 1px solid #cbd5e1; color: #475569; border-radius: 6px; cursor: pointer;">
                      ↺ Keep Myra's Suggested Order
                    </button>
                    <button class="btn-book-mmt" id="btn-approve-macro-itin" style="width: 100%; padding: 11px 18px; font-size: 12.5px; background: linear-gradient(90deg, #16a34a, #15803d);">
                      ${maxUnlockedSubStep >= 2 ? '✓ Macro Itinerary Approved by Kabir (Admin)' : '🏆 Kabir (Admin): Approve Macro Day-Wise Itinerary ➔'}
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- 3. Day Activities Selection Intervention Card -->
              ${resolvedInterventionStage === 'activities_selection' ? `
                <div class="myra-intervention-card" style="border-top-color: #0084ff;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: DAY ACTIVITIES & BUDGET</span>
                    <span style="font-size: 11px; color: #64748b;">Step 2 of 9</span>
                  </div>

                  <!-- Day Pill Selector -->
                  <div style="display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto;">
                    ${[1, 2, 3, 4].map(d => `
                      <button class="btn-day-pill-selector ${activeDay === d ? 'active' : ''}" data-day="${d}" style="padding: 5px 12px; font-size: 11px; font-weight: 700; border-radius: 12px; border: 1px solid ${activeDay === d ? '#0a223d' : '#cbd5e1'}; background: ${activeDay === d ? '#0a223d' : '#fff'}; color: ${activeDay === d ? '#fff' : '#334155'}; cursor: pointer;">
                        Day ${d}
                      </button>
                    `).join('')}
                  </div>

                  <!-- Budget Alert Banner if active -->
                  ${budgetAlert ? `
                    <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 12px; color: #991b1b;">
                      <div style="font-weight: 800; margin-bottom: 4px;">⚠️ Budget Alert for ${budgetAlert.member.name}</div>
                      <div>${budgetAlert.activity.title} (+₹${budgetAlert.cost}) would exceed personal budget ceiling (Cap: ₹${budgetAlert.budgetCap.toLocaleString()}).</div>
                      <div style="margin-top: 8px; display: flex; gap: 8px;">
                        <button class="btn-book-mmt" id="btn-accept-budget-increase" data-member="${budgetAlert.member.id}" data-amount="${budgetAlert.suggestedBudget}" style="padding: 4px 10px; font-size: 11px; background: #dc2626;">
                          Increase Budget to ₹${budgetAlert.suggestedBudget.toLocaleString()}
                        </button>
                        <button class="btn-workspace-pill" id="btn-cancel-budget-increase" style="padding: 4px 8px; font-size: 11px; background: #fff; color: #333; border: 1px solid #ccc;">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ` : ''}

                  <!-- Candidate Activities for Active Day -->
                  <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                    ${candidateActivities.map(act => {
                      const isSel = selectedActIds.includes(act.id);
                      return `
                        <div style="background: ${isSel ? '#f0f9ff' : '#f8fafc'}; border: 1px solid ${isSel ? '#7dd3fc' : '#e2e8f0'}; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                          <div>
                            <div style="font-weight: 700; font-size: 12.5px; color: #0f172a;">${act.title}</div>
                            <div style="font-size: 11px; color: #64748b;">${act.duration || ''} • <strong>₹${act.cost || 0}</strong> • ${act.category || act.pace || (act.tags && act.tags[0]) || 'Curated'}</div>
                          </div>
                          <button class="btn-act-toggle" data-day="${activeDay}" data-act-id="${act.id}" style="padding: 5px 12px; font-size: 11px; font-weight: 700; border-radius: 6px; border: 1px solid ${isSel ? '#0284c7' : '#cbd5e1'}; background: ${isSel ? '#0284c7' : '#fff'}; color: ${isSel ? '#fff' : '#0a223d'}; cursor: pointer;">
                            ${isSel ? '✓ Included' : '+ Add'}
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <button class="btn-workspace-pill" id="btn-synthesize-day-schedule" data-day="${activeDay}" style="flex: 1; padding: 9px; font-size: 11.5px; background: #0a223d; color: #fff; border: none; font-weight: 700;">
                      🤖 Synthesize Day ${activeDay} with Myra
                    </button>
                    <button class="btn-book-mmt" id="btn-advance-to-cuisines" style="flex: 1; padding: 9px; font-size: 11.5px; background: #008542;">
                      Save & Explore Cuisines ➔
                    </button>
                  </div>

                  <!-- 1-Click Move to Local Cuisines & Markets once all days have activities -->
                  ${mmtState.isAllDaysActivitiesSelected() ? `
                    <div class="all-activities-completed-card" style="margin-top: 12px; background: linear-gradient(135deg, #065f46 0%, #047857 100%); border-radius: 10px; padding: 14px 16px; color: #fff; box-shadow: 0 4px 14px rgba(4,120,87,0.25);">
                      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                          <div style="font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 6px;">
                            <span>🎉</span> All Day Activities Selected by Travellers!
                          </div>
                          <div style="font-size: 11.5px; color: #a7f3d0; margin-top: 2px;">
                            Days 1 to 4 activities confirmed. Move to local cuisines and tribal markets.
                          </div>
                        </div>
                        <button class="btn-book-mmt" id="btn-advance-to-cuisines-oneclick" style="padding: 10px 18px; font-size: 12px; font-weight: 800; background: #facc15; color: #713f12; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                          ⚡ Move to Local Cuisines & Markets ➔
                        </button>
                      </div>
                    </div>
                  ` : `
                    <div style="margin-top: 10px; padding: 8px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;">
                      <span>📌 Select at least 1 activity for each day (or tell <strong>@Myra</strong> in chat) to unlock cuisines</span>
                      <span style="font-weight: 700; color: #0284c7;">
                        ${[1,2,3,4].filter(d => (mmtState.state.dayActivitySelections[d] || []).length > 0).length}/4 Days Selected
                      </span>
                    </div>
                  `}
                </div>
              ` : ''}

              <!-- 4. Cuisines & Markets Intervention Card -->
              ${resolvedInterventionStage === 'cuisines_markets' ? `
                <div class="myra-intervention-card" style="border-top-color: #f59e0b;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: LOCAL CUISINES & BAZAARS</span>
                    <span style="font-size: 11px; color: #64748b;">Step 5 of 12</span>
                  </div>
                  <p style="font-size: 12.5px; color: #334155; margin: 0 0 12px 0; line-height: 1.45;">
                    Select authentic regional delicacies and tribal markets. Myra assigns appropriate time slots and synchronizes them into the itinerary based on geographic convenience, distance, and zero mountain backtracking.
                  </p>
                  <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                    ${cuisinesMarkets.map(c => {
                      const isAdded = scheduledCuisineIds.includes(c.id);
                      const bestFit = mmtState.getBestFitForCuisine(c);
                      return `
                        <div style="background: ${isAdded ? '#fefce8' : '#f8fafc'}; border: 1.5px solid ${isAdded ? '#fde047' : '#e2e8f0'}; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                          <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                              <span style="font-weight: 700; font-size: 12.5px; color: #0f172a;">${c.title}</span>
                              <span style="font-size: 10px; font-weight: 700; color: #b45309; background: #fef3c7; padding: 1px 6px; border-radius: 4px;">
                                ${c.tags && c.tags[0] ? c.tags[0] : 'Local Specialty'}
                              </span>
                            </div>
                            <div style="font-size: 11px; color: #b45309; font-weight: 600; margin-top: 2px;">
                              ⏱️ Slot: <strong>${c.preferredTimeSlot || bestFit.timeSlot}</strong> (${bestFit.categorySlot}) • 💰 ${c.priceTag || c.cost}
                            </div>
                            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                              📍 ${c.venue} • 🛣️ <span style="color: #047857; font-weight: 600;">${bestFit.routingReason}</span>
                            </div>
                          </div>
                          <button class="btn-toggle-cuisine-itinerary" data-flavour-id="${c.id}" style="padding: 6px 14px; font-size: 11px; font-weight: 700; border-radius: 6px; border: 1px solid ${isAdded ? '#d97706' : '#cbd5e1'}; background: ${isAdded ? '#d97706' : '#fff'}; color: ${isAdded ? '#fff' : '#0a223d'}; cursor: pointer; white-space: nowrap;">
                            ${isAdded ? '✓ Slotted' : '+ Add'}
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                  <button class="btn-book-mmt" id="btn-approve-proceed-booking" style="padding: 10px 18px; font-size: 12.5px; width: 100%; background: #008542; font-weight: 800; cursor: pointer; box-shadow: 0 2px 8px rgba(0,133,66,0.3);">
                    ✓ Approve Schedule & Proceed to Grantex Accounts ➔
                  </button>
                </div>
              ` : ''}

              <!-- 5. Pine Labs Grantex Accounts Intervention Card -->
              ${resolvedInterventionStage === 'grantex_accounts' ? `
                <div class="myra-intervention-card" style="border-top-color: #10b981;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: PINE LABS GRANTEX ESCROW VAULT</span>
                    <span style="font-size: 11px; color: #64748b;">Step 6 of 12</span>
                  </div>
                  <p style="font-size: 12.5px; color: #334155; margin: 0 0 12px 0; line-height: 1.45;">
                    Pine Labs Grantex enables users to submit their per-head budget (₹25,000) into a secure escrow account. Funds remain safely held in the vault. Admin (Rahul) approves once all 4 members have deposited. Myra acts as an agentic AI to provide reminders to members who have not submitted their contribution.
                  </p>

                  <!-- Member Deposits Grid -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
                    ${grantexAccounts.map(acct => {
                      const isDeposited = acct.isAuthorized || acct.grantStatus === 'authorized';
                      return `
                      <div style="background: #f8fafc; border: 1.5px solid ${isDeposited ? '#86efac' : '#fde047'}; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <strong style="font-size: 12px; color: #0a223d;">${acct.memberName}</strong>
                          <span style="font-size: 10px; font-weight: 700; color: ${isDeposited ? '#15803d' : '#d97706'}; background: ${isDeposited ? '#dcfce7' : '#fef3c7'}; padding: 2px 6px; border-radius: 4px;">
                            ${isDeposited ? '✓ Deposited' : '⚠️ Pending'}
                          </span>
                        </div>
                        <div style="font-size: 11px; color: #64748b; margin: 6px 0 4px 0;">
                          Budget Contribution: <strong style="color: #0f172a;">₹${acct.initialDeposit.toLocaleString()}</strong>
                        </div>
                        ${!isDeposited ? `
                          <button class="btn-deposit-member-grantex" data-member-id="${acct.memberId}" style="margin-top: 4px; padding: 5px 8px; font-size: 10.5px; font-weight: 700; border-radius: 4px; background: #10b981; color: #fff; border: none; cursor: pointer;">
                            💳 Deposit ₹${acct.initialDeposit.toLocaleString()}
                          </button>
                        ` : `
                          <span style="font-size: 10.5px; color: #15803d; font-weight: 700; margin-top: 4px;">✓ Funds in Grantex Vault</span>
                        `}
                      </div>
                    `;
                    }).join('')}
                  </div>

                  <!-- Agentic AI Nudge Action -->
                  <div style="background: #fefce8; border: 1px solid #fde047; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                    <div style="font-size: 11.5px; color: #713f12;">
                      🤖 <strong>Myra Agentic Nudge:</strong> Notify members with pending deposits via group chat.
                    </div>
                    <button class="btn-workspace-pill" id="btn-nudge-grantex-members" style="background: #f59e0b; color: #fff; border: none; font-weight: 700; font-size: 11px; padding: 6px 12px; border-radius: 6px; cursor: pointer; white-space: nowrap;">
                      🔔 Send Chat Nudge
                    </button>
                  </div>

                  <!-- Admin Pool Approval or Lock -->
                  ${mmtState.isAllGrantexDeposited() ? `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 8px 12px; font-size: 11.5px; color: #065f46; font-weight: 600;">
                        🎉 All 4 members deposited ₹1,00,000 total into Pine Labs Grantex Escrow!
                      </div>
                      <button class="btn-book-mmt" id="btn-admin-approve-grantex-pool" style="padding: 10px 16px; font-size: 12.5px; width: 100%; background: #008542; color: #fff; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,133,66,0.3);">
                        👑 Admin (Rahul): Approve Escrow Pool & Proceed to Mode of Transport ➔
                      </button>
                    </div>
                  ` : `
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <button class="btn-book-mmt" disabled style="padding: 10px 16px; font-size: 11.5px; width: 100%; background: #94a3b8; color: #fff; font-weight: 700; border: none; border-radius: 6px; cursor: not-allowed; opacity: 0.8;">
                        🔒 Admin Approval Locked — Waiting for All Contributions
                      </button>
                      <button class="btn-workspace-pill" id="btn-authorize-all-grantex" style="padding: 6px 10px; font-size: 11px; background: #fff; color: #0284c7; border: 1px dashed #0284c7; font-weight: 700; border-radius: 6px; cursor: pointer;">
                        ⚡ Fast-Track: Deposit All Members' Budgets (Demo)
                      </button>
                    </div>
                  `}
                </div>
              ` : ''}

              <!-- 6. Multi-Modal Transit & Flights Intervention Card -->
              ${resolvedInterventionStage === 'transit_booking' ? `
                <div class="myra-intervention-card" style="border-top-color: #0284c7;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: MODE OF TRANSPORT BOOKING</span>
                    <span style="font-size: 11px; color: #64748b;">Step 7 of 12</span>
                  </div>
                  <p style="font-size: 12.5px; color: #334155; margin: 0 0 10px 0; line-height: 1.45;">
                    Myra evaluates multimodal transit from your departure city to destination. Travellers can choose individual modes or vote on a common mode. Admin approves and payment is deducted from each user's Grantex vault.
                  </p>

                  <!-- Departure City Selector Pills -->
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 2px;">
                    <span style="font-size: 11px; font-weight: 700; color: #475569; white-space: nowrap;">Departure City:</span>
                    ${airportOptions.map(ap => `
                      <button class="btn-airport-pill ${originAirport === ap.code ? 'active' : ''}" data-airport-code="${ap.code}" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 12px; border: 1px solid ${originAirport === ap.code ? '#0a223d' : '#cbd5e1'}; background: ${originAirport === ap.code ? '#0a223d' : '#fff'}; color: ${originAirport === ap.code ? '#fff' : '#334155'}; cursor: pointer;">
                        ${ap.code} (${ap.city})
                      </button>
                    `).join('')}
                  </div>

                  <!-- Multimodal Comparison Cards (Probable Costs) -->
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-bottom: 12px;">
                    ${transitModes.map(tm => `
                      <div style="background: #f8fafc; border: 1.5px solid ${selectedTransitMode === tm.id ? '#0284c7' : '#e2e8f0'}; border-radius: 8px; padding: 8px; cursor: pointer;" class="btn-transit-mode-card" data-mode-id="${tm.id}">
                        <div style="font-size: 16px; margin-bottom: 2px;">${tm.icon}</div>
                        <div style="font-weight: 700; font-size: 11.5px; color: #0a223d;">${tm.name}</div>
                        <div style="font-size: 10.5px; color: #64748b;">${tm.duration}</div>
                        <div style="font-weight: 800; font-size: 12px; color: #059669; margin-top: 2px;">₹${tm.costPerPerson.toLocaleString()}<span style="font-size: 9.5px; font-weight: 400; color: #64748b;">/head</span></div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Individual Member Transit Selection -->
                  <div style="background: #f1f5f9; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
                    <div style="font-size: 11px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                      Individual Transit Preferences (Or align on group flight):
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                      ${members.map(m => {
                        const choice = (memberTransitChoices && memberTransitChoices[m.id]) || { mode: 'flight' };
                        return `
                          <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 6px 10px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 11.5px;">
                            <div style="display: flex; align-items: center; gap: 6px;">
                              <span>${m.avatar}</span>
                              <span style="font-weight: 700; color: #0f172a;">${m.name}</span>
                            </div>
                            <select class="member-transit-mode-select" data-member-id="${m.id}" style="padding: 3px 8px; font-size: 11px; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 600;">
                              <option value="flight" ${choice.mode === 'flight' ? 'selected' : ''}>✈️ Flight (₹8,900)</option>
                              <option value="train" ${choice.mode === 'train' ? 'selected' : ''}>🚆 Train + Cab (₹3,850)</option>
                              <option value="car" ${choice.mode === 'car' ? 'selected' : ''}>🚗 Outstation Car (₹5,200)</option>
                            </select>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>

                  <!-- Flight Options Voting (for Common Flight Mode) -->
                  <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                    <div style="font-size: 11px; font-weight: 700; color: #475569;">Group Flight Options Voting:</div>
                    ${flightOptions.map(f => {
                      const votes = Object.values(flightVotes).filter(v => v === f.id).length;
                      const isVoted = flightVotes[persona?.id || 'user-1'] === f.id;
                      const flightPrice = f.farePerPerson || f.pricePerPerson || 8900;
                      const flightTitle = `${f.airline || f.airlineName || 'Flight'} ${f.flightNo ? `(${f.flightNo})` : (f.flightNumber ? `(${f.flightNumber})` : '')}`;
                      const flightSchedule = f.outboundTimes || (f.departureTime ? `${f.departureTime} ➔ ${f.arrivalTime} (${f.duration})` : 'Afternoon non-stop');
                      return `
                        <div style="background: #f8fafc; border: 1.5px solid ${isVoted ? '#0284c7' : '#e2e8f0'}; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                          <div>
                            <div style="font-weight: 700; font-size: 12.5px; color: #0a223d;">${flightTitle}</div>
                            <div style="font-size: 11px; color: #64748b;">${flightSchedule} • <strong>₹${flightPrice.toLocaleString()}/head</strong></div>
                          </div>
                          <button class="btn-vote-flight" data-flight-id="${f.id}" style="padding: 5px 12px; font-size: 11px; font-weight: 700; border-radius: 6px; border: 1px solid #cbd5e1; background: ${isVoted ? '#0284c7' : '#fff'}; color: ${isVoted ? '#fff' : '#0a223d'}; cursor: pointer;">
                            ${isVoted ? '✓ Voted' : 'Vote'} (${votes})
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <!-- Action Buttons with Ubiquitous Skip -->
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-book-mmt" id="btn-execute-flight-booking" style="flex: 2; min-width: 180px; padding: 10px; font-size: 11.5px; background: linear-gradient(90deg, #0284c7, #0369a1); font-weight: 800; border: none; border-radius: 6px; cursor: pointer;">
                      👑 Admin Approve & Book via Grantex (₹8,900/head)
                    </button>
                    <button class="btn-workspace-pill" id="btn-skip-flight-booking" style="flex: 1; min-width: 110px; padding: 10px; font-size: 11.5px; background: #fff; color: #64748b; border: 1px solid #cbd5e1; font-weight: 700; cursor: pointer; border-radius: 6px;">
                      ⏭️ Skip Transit
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- 7. Location Hotels Intervention Card -->
              ${resolvedInterventionStage === 'hotels_booking' ? `
                <div class="myra-intervention-card" style="border-top-color: #8b5cf6;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: MULTI-LOCATION HOTELS (MMT RECOMMENDED)</span>
                    <span style="font-size: 11px; color: #64748b;">Step 8 of 12</span>
                  </div>
                  <p style="font-size: 12.5px; color: #334155; margin: 0 0 10px 0; line-height: 1.45;">
                    Myra curates the top 3 hotels per location based on MakeMyTrip recommendation intelligence. Group members vote; Admin approves with autonomous Grantex booking.
                  </p>

                  <!-- Location Tabs -->
                  <div style="display: flex; gap: 6px; margin-bottom: 12px;">
                    ${locationHotelOptions.map((loc, idx) => `
                      <button class="btn-hotel-loc-tab ${activeHotelLocationIdx === idx ? 'active' : ''}" data-loc-idx="${idx}" style="padding: 6px 12px; font-size: 11px; font-weight: 700; border-radius: 8px; border: 1.5px solid ${activeHotelLocationIdx === idx ? '#8b5cf6' : '#cbd5e1'}; background: ${activeHotelLocationIdx === idx ? '#8b5cf6' : '#fff'}; color: ${activeHotelLocationIdx === idx ? '#fff' : '#334155'}; cursor: pointer;">
                        📍 ${loc.locationTitle}
                      </button>
                    `).join('')}
                  </div>

                  <!-- Hotels for active location -->
                  ${(() => {
                    const activeLoc = locationHotelOptions[activeHotelLocationIdx] || locationHotelOptions[0];
                    const selectedHotelId = selectedHotelByLocation[activeHotelLocationIdx] || (activeLoc && activeLoc.hotels && activeLoc.hotels[0]?.id);
                    const votesObj = hotelVotesByLocation[activeHotelLocationIdx] || {};

                    return `
                      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                        ${(activeLoc?.hotels || []).map(h => {
                          const votes = Object.values(votesObj).filter(v => v === h.id).length;
                          const isVoted = votesObj[persona?.id || 'user-1'] === h.id;
                          const hotelPrice = h.costPerPerson || h.pricePerPerson || 3600;
                          const starRating = h.rating || (h.stars ? h.stars + '★' : '4.5★');
                          const mmtBadge = h.badge || '🏆 MMT Assured';
                          return `
                            <div style="background: #f8fafc; border: 1.5px solid ${h.id === selectedHotelId ? '#8b5cf6' : '#e2e8f0'}; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                              <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                  <span style="font-weight: 700; font-size: 12.5px; color: #0a223d;">${h.name}</span>
                                  <span style="font-size: 10px; font-weight: 700; color: #7c3aed; background: #ede9fe; padding: 1px 6px; border-radius: 4px;">${mmtBadge}</span>
                                </div>
                                <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                                  ⭐ ${starRating} • <strong>₹${hotelPrice.toLocaleString()}/person</strong> • ${h.roomCombination || ''}
                                </div>
                              </div>
                              <button class="btn-vote-hotel" data-loc-idx="${activeHotelLocationIdx}" data-hotel-id="${h.id}" style="padding: 5px 12px; font-size: 11px; font-weight: 700; border-radius: 6px; border: 1px solid #cbd5e1; background: ${isVoted ? '#8b5cf6' : '#fff'}; color: ${isVoted ? '#fff' : '#0a223d'}; cursor: pointer;">
                                ${isVoted ? '✓ Voted' : 'Vote'} (${votes})
                              </button>
                            </div>
                          `;
                        }).join('')}
                      </div>

                      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button class="btn-book-mmt" id="btn-book-location-hotel" data-loc-idx="${activeHotelLocationIdx}" style="flex: 2; min-width: 180px; padding: 10px; font-size: 11.5px; background: linear-gradient(90deg, #8b5cf6, #7c3aed); font-weight: 800; border: none; border-radius: 6px; cursor: pointer;">
                          👑 Admin Book ${activeLoc?.locationTitle || 'Stay'} via Grantex
                        </button>
                        <button class="btn-workspace-pill" id="btn-skip-location-hotel-btn" data-loc-idx="${activeHotelLocationIdx}" style="flex: 1; min-width: 110px; padding: 10px; font-size: 11.5px; background: #fff; color: #64748b; border: 1px solid #cbd5e1; font-weight: 700; cursor: pointer; border-radius: 6px;">
                          ⏭️ Skip Hotel
                        </button>
                      </div>
                    `;
                  })()}
                </div>
              ` : ''}

              <!-- 8. Cab Fleet Intervention Card -->
              ${resolvedInterventionStage === 'cab_booking' ? `
                <div class="myra-intervention-card" style="border-top-color: #ea580c;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: SIGHTSEEING CAB & CHAUFFEUR</span>
                    <span style="font-size: 11px; color: #64748b;">Step 9 of 12</span>
                  </div>
                  <p style="font-size: 12.5px; color: #334155; margin: 0 0 10px 0; line-height: 1.45;">
                    Based on your stays across Shillong and Cherrapunji, Myra sizes the group fleet. Booked directly from the remaining Grantex vault balance (₹${mmtState.getRemainingGrantexBalance().toLocaleString()} remaining).
                  </p>
                  <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                    ${cabFleetOptions.map(v => {
                      const isSel = selectedCabId === v.id;
                      const cabTotal = v.totalTripCost || v.totalCost || 9600;
                      const cabHead = v.costPerPerson || v.costPerHead || 2400;
                      const cabDriver = v.chauffeur || v.driverNote || 'Hill-certified Driver';
                      return `
                        <div style="background: ${isSel ? '#fff7ed' : '#f8fafc'}; border: 1.5px solid ${isSel ? '#fdba74' : '#e2e8f0'}; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                          <div>
                            <div style="font-weight: 700; font-size: 12.5px; color: #0a223d;">${v.model} (${v.capacity})</div>
                            <div style="font-size: 11px; color: #64748b;">₹${cabTotal.toLocaleString()} total (₹${cabHead.toLocaleString()}/head) • ${cabDriver}</div>
                          </div>
                          <button class="btn-select-cab-fleet" data-cab-id="${v.id}" style="padding: 5px 12px; font-size: 11px; font-weight: 700; border-radius: 6px; border: 1px solid #cbd5e1; background: ${isSel ? '#ea580c' : '#fff'}; color: ${isSel ? '#fff' : '#0a223d'}; cursor: pointer;">
                            ${isSel ? '✓ Selected' : 'Choose'}
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-book-mmt" id="btn-execute-cab-booking" style="flex: 2; min-width: 180px; padding: 10px; font-size: 11.5px; background: linear-gradient(90deg, #ea580c, #c2410c); font-weight: 800; border: none; border-radius: 6px; cursor: pointer;">
                      ⚡ Book Innova Crysta via Grantex (₹2,400/head)
                    </button>
                    <button class="btn-workspace-pill" id="btn-skip-cab-booking-bottom" style="flex: 1; min-width: 110px; padding: 10px; font-size: 11.5px; background: #fff; color: #64748b; border: 1px solid #cbd5e1; font-weight: 700; cursor: pointer; border-radius: 6px;">
                      ⏭️ Skip Cab
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- 9. Activity Pre-Booking Passes Intervention Card -->
              ${resolvedInterventionStage === 'activities_prebook' ? `
                <div class="myra-intervention-card" style="border-top-color: #10b981;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: ACTIVITY ENTRY PASSES</span>
                    <span style="font-size: 11px; color: #64748b;">Step 10 of 12</span>
                  </div>
                  <p style="font-size: 12.5px; color: #334155; margin: 0 0 10px 0; line-height: 1.45;">
                    Secure high-demand permits in advance from remaining Grantex balance (₹${mmtState.getRemainingGrantexBalance().toLocaleString()}) to skip queues.
                  </p>
                  <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                    ${prebookableActivities.map(act => {
                      const isSel = selectedPrebookActivityIds.includes(act.id);
                      const actTiming = act.timing || 'Daytime Slot';
                      const actNote = act.slotAdvice || act.badge || 'Fast-track Access';
                      return `
                        <div style="background: ${isSel ? '#f0fdf4' : '#f8fafc'}; border: 1.5px solid ${isSel ? '#86efac' : '#e2e8f0'}; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                          <div>
                            <div style="font-weight: 700; font-size: 12.5px; color: #0a223d;">${act.title}</div>
                            <div style="font-size: 11px; color: #64748b;">₹${act.costPerPerson}/person • ${actTiming} • ${actNote}</div>
                          </div>
                          <button class="btn-toggle-prebook-activity" data-act-id="${act.id}" style="padding: 5px 12px; font-size: 11px; font-weight: 700; border-radius: 6px; border: 1px solid #cbd5e1; background: ${isSel ? '#10b981' : '#fff'}; color: ${isSel ? '#fff' : '#0a223d'}; cursor: pointer;">
                            ${isSel ? '✓ Pre-book' : '+ Select'}
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-book-mmt" id="btn-execute-activities-prebooking" style="flex: 2; min-width: 180px; padding: 10px; font-size: 11.5px; background: linear-gradient(90deg, #10b981, #059669); font-weight: 800; border: none; border-radius: 6px; cursor: pointer;">
                      ⚡ Pre-Book Passes & Finalize Trip
                    </button>
                    <button class="btn-workspace-pill" id="btn-skip-activities-bottom" style="flex: 1; min-width: 110px; padding: 10px; font-size: 11.5px; background: #fff; color: #64748b; border: 1px solid #cbd5e1; font-weight: 700; cursor: pointer; border-radius: 6px;">
                      ⏭️ Skip Passes
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- 10. Disruption Replanner Intervention Card -->
              ${resolvedInterventionStage === 'live_radar' ? `
                <div class="myra-intervention-card" style="border-top-color: #f97316;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge">🎯 INTERVENTION: DISRUPTION REPLANNER</span>
                    <span style="font-size: 11px; color: #64748b;">Live Monitoring</span>
                  </div>

                  <!-- Central Group Repository Quick Link -->
                  <div style="background: #f0f9ff; border: 1.5px solid #bae6fd; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                    <div>
                      <div style="font-weight: 800; font-size: 12.5px; color: #0369a1;">📁 Central Group Travel Repository & Locker</div>
                      <div style="font-size: 11px; color: #64748b;">Access all boarding passes, vouchers, chauffeur details, and download PDF itinerary</div>
                    </div>
                    <button class="btn-workspace-pill" id="btn-view-central-repository" style="background: #0284c7; color: #fff; font-weight: 700; border: none; padding: 7px 14px; border-radius: 6px; cursor: pointer; white-space: nowrap; font-size: 11.5px;">
                      Open Locker ➔
                    </button>
                  </div>
                  
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
                    <span style="font-size: 11px; font-weight: 700; color: #475569; display: flex; align-items: center;">Simulate:</span>
                    <button class="btn-workspace-pill btn-trigger-disruption ${disruptionState.activeScenarioId === 'flight_delay' ? 'active' : ''}" data-scenario-id="flight_delay" style="padding: 4px 10px; font-size: 11px; background: #fff; color: #c2410c; border: 1px solid #fdba74;">
                      ✈️ IndiGo 2.5h Delay
                    </button>
                    <button class="btn-workspace-pill btn-trigger-disruption ${disruptionState.activeScenarioId === 'train_missed' ? 'active' : ''}" data-scenario-id="train_missed" style="padding: 4px 10px; font-size: 11px; background: #fff; color: #c2410c; border: 1px solid #fdba74;">
                      🚆 Missed Transit
                    </button>
                    <button class="btn-workspace-pill btn-trigger-disruption ${disruptionState.activeScenarioId === 'weather_fog' ? 'active' : ''}" data-scenario-id="weather_fog" style="padding: 4px 10px; font-size: 11px; background: #fff; color: #c2410c; border: 1px solid #fdba74;">
                      🌫️ Canyon Fog
                    </button>
                    <button class="btn-workspace-pill" id="btn-reset-disruption" style="padding: 4px 8px; font-size: 11px; background: #fff; color: #64748b; border: 1px solid #cbd5e1;">
                      ↩️ Reset
                    </button>
                  </div>

                  <!-- Scope Toggle -->
                  <div style="display: flex; align-items: center; justify-content: space-between; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 8px 12px; margin-bottom: 12px;">
                    <span style="font-size: 12px; font-weight: 700; color: #7c2d12;">Scope of Replan:</span>
                    <div style="display: flex; gap: 4px;">
                      <button class="btn-scope-toggle ${disruptionState.scope === 'solo' ? 'active' : ''}" data-scope="solo" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 6px; border: none; cursor: pointer; background: ${disruptionState.scope === 'solo' ? '#ea580c' : '#fff'}; color: ${disruptionState.scope === 'solo' ? '#fff' : '#7c2d12'};">
                        👤 Solo Scope
                      </button>
                      <button class="btn-scope-toggle ${disruptionState.scope === 'group' ? 'active' : ''}" data-scope="group" style="padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 6px; border: none; cursor: pointer; background: ${disruptionState.scope === 'group' ? '#ea580c' : '#fff'}; color: ${disruptionState.scope === 'group' ? '#fff' : '#7c2d12'};">
                        👥 Entire Group
                      </button>
                    </div>
                  </div>

                  <!-- 3 Replan Strategy Options -->
                  ${(() => {
                    const replanOptions = mmtState.getReplanOptions();
                    return `
                      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                        ${replanOptions.map(opt => {
                          const isSel = opt.id === disruptionState.selectedOptionId;
                          return `
                            <div class="replan-option-card ${isSel ? 'selected' : ''}" data-option-id="${opt.id}" style="border: 1.5px solid ${isSel ? '#0a223d' : '#e2e8f0'}; border-radius: 8px; padding: 10px; background: ${isSel ? '#f8fafc' : '#fff'}; cursor: pointer;">
                              <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong style="font-size: 12.5px; color: #0f172a;">${opt.name}</strong>
                                <span style="font-size: 11px; font-weight: 700; color: #0284c7;">${opt.timeImpact} • ${opt.costImpact}</span>
                              </div>
                              <div style="font-size: 11px; color: #475569; margin-top: 2px;">${opt.description}</div>
                            </div>
                          `;
                        }).join('')}
                      </div>

                      <div style="display: flex; gap: 8px;">
                        ${disruptionState.scope === 'group' && !disruptionState.adminApproved ? `
                          <button class="btn-book-mmt" id="btn-approve-group-replan" style="flex: 1; padding: 10px; font-size: 11.5px; background: linear-gradient(90deg, #f97316, #ea580c);">
                            ⚡ Kabir (Admin): Approve Group Replan
                          </button>
                        ` : `
                          <button class="btn-book-mmt" id="btn-apply-replan" style="flex: 1; padding: 10px; font-size: 11.5px; background: #008542;">
                            🚀 Apply Replan to Schedule
                          </button>
                        `}
                      </div>
                    `;
                  })()}
                </div>
              ` : ''}

              <!-- 11. Smart Cancellation & Grantex Refund Intervention Card -->
              ${resolvedInterventionStage === 'cancellation_engine' ? `
                <div class="myra-intervention-card" style="border-top-color: #dc2626;">
                  <div class="myra-intervention-header">
                    <span class="myra-intervention-badge" style="background: #fee2e2; color: #dc2626;">🎯 INTERVENTION: SMART CANCELLATION & REFUND</span>
                    <span style="font-size: 11px; color: #64748b;">Pine Labs Grantex</span>
                  </div>

                  <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px;">
                    <label style="font-size: 12px; font-weight: 700; color: #334155;">Select Member:</label>
                    <select id="cancel-member-select" style="flex: 1; padding: 6px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 12px; background: #fff;">
                      ${members.map(m => `
                        <option value="${m.id}" ${cancellationSim.memberId === m.id ? 'selected' : ''}>
                          ${m.name} ${m.isLead ? '(Admin)' : ''} ${cancelledMemberIds.includes(m.id) ? '[CANCELLED]' : ''}
                        </option>
                      `).join('')}
                    </select>
                    <button class="btn-workspace-pill" id="btn-simulate-cancel" style="padding: 6px 12px; font-size: 11px; background: #0a223d; color: #fff; border: none; font-weight: 700;">
                      🧮 Simulate
                    </button>
                  </div>

                  <!-- Penalty Breakdown Table -->
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 11.5px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span>✈️ IndiGo Flight Penalty (₹3,000 + ₹500 MMT fee):</span>
                      <strong style="color: #dc2626;">-₹${cancellationSim.flightPenalty || 3500}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span>🏨 Hotels (>48h Free Cancellation):</span>
                      <strong style="color: #15803d;">₹${cancellationSim.hotelPenalty || 0} (Waived)</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span>🚗 Cab Fleet (>12h Free Cancellation):</span>
                      <strong style="color: #15803d;">₹${cancellationSim.cabPenalty || 0} (Waived)</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                      <span>🎟️ Activity Pass Admin Fee:</span>
                      <strong style="color: #dc2626;">-₹${cancellationSim.activityPenalty || 150}</strong>
                    </div>
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 6px; display: flex; justify-content: space-between; font-weight: 800; font-size: 13px;">
                      <span>Net Refund Credited to Grantex Vault:</span>
                      <strong style="color: #008542;">₹${(cancellationSim.refundAmount || 16200).toLocaleString()}</strong>
                    </div>
                  </div>

                  <button class="btn-book-mmt" id="btn-confirm-cancel" style="width: 100%; padding: 10px; font-size: 12px; background: linear-gradient(93deg, #dc2626, #b91c1c);">
                    ⚠️ Confirm Cancellation & Execute Grantex Refund
                  </button>
                </div>
              ` : ''}

            </div>

          </div>

          <!-- Chat Bottom Bar with Live Vote Summary Tab & Prompts & Input -->
          <div class="chat-bottom-input-bar">
            
            <!-- Requirement 2: Live Vote Summary Tab (Docked at Bottom of Chat) -->
            <div class="chat-live-vote-tab ${isVoteSummaryExpanded ? 'is-expanded' : 'is-collapsed'}" id="chat-live-vote-tab">
              <div class="vote-tab-main-header">
                <div class="vote-tab-title-wrap" id="btn-toggle-vote-tab" title="Click to expand/collapse live vote breakdown">
                  <span class="live-vote-pulse"></span>
                  <div class="vote-tab-title-text">
                    <span class="vote-tab-kicker">Live Vote Summary</span>
                    <strong class="vote-tab-topic">${liveVoteSummary.topicName}</strong>
                  </div>
                </div>
                <div class="vote-tab-meta-wrap">
                  <span class="vote-tab-tally-pill">${liveVoteSummary.totalVotes}/${members.length} Voted</span>
                  <button class="btn-vote-tab-expand" id="btn-vote-tab-expand" title="Toggle Vote Breakdown">
                    ${isVoteSummaryExpanded ? '▼ Hide' : '▲ View Votes'}
                  </button>
                </div>
              </div>

              <!-- Vote Topic Category Pills -->
              <div class="vote-tab-cats-row">
                <button class="vote-cat-btn ${activeVoteCategory === 'auto' ? 'active' : ''}" data-vote-cat="auto">⚡ Auto</button>
                <button class="vote-cat-btn ${activeVoteCategory === 'seasons' ? 'active' : ''}" data-vote-cat="seasons">🌤️ Dates</button>
                <button class="vote-cat-btn ${activeVoteCategory === 'flights' ? 'active' : ''}" data-vote-cat="flights">✈️ Flights</button>
                <button class="vote-cat-btn ${activeVoteCategory === 'hotels' ? 'active' : ''}" data-vote-cat="hotels">🏨 Hotels</button>
              </div>

              <!-- Quick Leader Strip -->
              <div class="vote-tab-leader-strip">
                <span class="leader-trophy">🏆</span>
                <span class="leader-summary-text">${liveVoteSummary.leaderText}</span>
              </div>

              <!-- Expandable Detailed Breakdown Panel -->
              ${isVoteSummaryExpanded ? `
                <div class="vote-tab-breakdown-pane">
                  <div class="vote-items-list">
                    ${liveVoteSummary.items.map(it => `
                      <div class="vote-breakdown-item ${it.isLeader ? 'is-leader' : ''}">
                        <div class="vote-item-headline">
                          <span class="vote-item-name">${it.name}</span>
                          <span class="vote-item-badge ${it.isLeader ? 'badge-leader' : ''}">
                            ${it.voteCount} ${it.voteCount === 1 ? 'vote' : 'votes'}
                          </span>
                        </div>
                        <div class="vote-item-voters-row">
                          ${it.voters.map(v => `
                            <span class="voter-chip ${v.id === persona.id ? 'is-me' : ''}" title="${v.name} (${v.role})">
                              ${v.avatar ? `<img src="${v.avatar}" class="voter-mini-pic" alt="${v.name}" />` : ''}
                              ${v.name.split(' ')[0]} ${v.id === persona.id ? '(You)' : ''}
                            </span>
                          `).join('')}
                          ${it.voters.length === 0 ? '<span class="no-votes-hint">No votes yet</span>' : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <div class="vote-feasibility-note">
                    <span class="ai-bot-icon">🤖</span>
                    <span class="feasibility-text"><strong>Myra AI Feasibility:</strong> ${liveVoteSummary.feasibilityNote}</span>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Input Box Styled in MakeMyTrip Myra Design -->
            <form class="chat-send-form" id="split-chat-form">
              <input 
                type="text" 
                id="split-chat-input" 
                placeholder="Message group or tag @Myra (e.g. '@Myra swap Day 2 and Day 3', '@Myra add Nohkalikai trek', '@Myra choose Jadoh Rice')..." 
                autocomplete="off" 
              />
              <button type="submit" class="btn-send-chat" aria-label="Send message" style="background: linear-gradient(135deg, #eb2026, #c5161b); color: #fff;">➔</button>
            </form>
          </div>
        </section>

        <!-- RIGHT SIDE: Dedicated Visual Review Canvas (50% Fixed) -->
        <section class="split-preview-column ${mobileActiveTab !== 'preview' ? 'mobile-pane-hidden' : ''}" id="split-preview-col">
          
          <!-- Visual Review Canvas Top Mode Strip -->
          <div class="preview-mode-bar" style="background: #ffffff; border-bottom: 1.5px solid #e2e8f0; padding: 10px 18px;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span style="font-size: 11px; font-weight: 800; color: #0a223d; text-transform: uppercase; margin-right: 6px;">
                🧭 Review Canvas:
              </span>
              <button class="btn-preview-tab ${previewMode === 'destination_intel' ? 'active current-mode' : ''}" id="tab-preview-intel">
                🗺️ Destination Intel
              </button>
              <button class="btn-preview-tab ${previewMode === 'seasons' ? 'active current-mode' : ''}" id="tab-preview-seasons">
                🌤️ Seasons Review
              </button>
              <button class="btn-preview-tab ${(previewMode === 'itinerary' || previewMode === 'master_itinerary') ? 'active current-mode' : ''}" id="tab-preview-itinerary">
                ${hasCuisinesSelected ? '📅 Master Itinerary Review' : '📸 Places & Activities Preview'}
              </button>
              <button class="btn-preview-tab ${previewMode === 'trip_locker' ? 'active current-mode' : ''}" id="tab-preview-locker">
                📁 Group Locker & Passes
              </button>
              <button class="btn-preview-tab ${previewMode === 'live_radar' ? 'active current-mode' : ''}" id="tab-preview-radar">
                🛰️ Sentinel Status & Radar
              </button>
            </div>
            <div>
              <span style="font-size: 11px; color: #15803d; font-weight: 700; background: #dcfce7; padding: 3px 8px; border-radius: 4px;">
                ● Live Sync Active
              </span>
            </div>
          </div>

          <!-- Review Canvas Scrollable Content Container -->
          <div class="preview-content-scroll" id="preview-content-scroll" style="flex: 1; overflow-y: auto;">

            <!-- 0. Dynamic Destination Intelligence Canvas -->
            ${previewMode === 'destination_intel' ? `
              <div class="destination-intel-wrap" style="padding: 24px;">
                <!-- Hero Header -->
                <div class="preview-hero-banner" style="background: linear-gradient(135deg, #0a223d 0%, #1e3a8a 50%, #0284c7 100%); border-radius: 14px; padding: 22px; color: #fff; margin-bottom: 20px; box-shadow: 0 10px 25px rgba(2,132,199,0.15);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
                    <div>
                      <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.8px; color: #38bdf8; text-transform: uppercase;">
                        MMT DESTINATION INTELLIGENCE RADAR
                      </div>
                      <h2 style="font-size: 24px; font-weight: 800; margin: 4px 0 6px 0;">
                        ${currentPkg.name || trip.title}
                      </h2>
                      <p style="font-size: 13.5px; color: #e0f2fe; margin: 0; font-style: italic;">
                        “${destIntel.tagline || 'Experience extraordinary local beauty with group synchronization.'}”
                      </p>
                    </div>
                    <div style="background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.25); border-radius: 10px; padding: 10px 14px; font-size: 12px;">
                      <div style="color: #93c5fd; font-size: 10.5px; font-weight: 700; text-transform: uppercase;">Altitude Geography</div>
                      <strong style="color: #ffffff; font-size: 13px;">🏔️ ${destIntel.altitude || 'Sea Level to High Ridge'}</strong>
                    </div>
                  </div>
                </div>

                <!-- Climate & Micro-Climate Weather Curve Radar -->
                <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                    <div>
                      <h4 style="font-size: 15px; font-weight: 800; color: #0a223d; margin: 0 0 2px 0;">
                        🌤️ Seasonal Climate & Micro-Climates
                      </h4>
                      <p style="font-size: 11.5px; color: #64748b; margin: 0;">
                        Dynamic meteorological sensor feed & optimal comfort ratings for ${currentPkg.name}.
                      </p>
                    </div>
                    <span style="font-size: 10.5px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 3px 8px; border-radius: 6px;">
                      Real-time Radar Sync
                    </span>
                  </div>

                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;">
                    ${(destIntel.climateIntelligence || []).map(c => `
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center;">
                        <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${c.month}</div>
                        <div style="font-size: 14px; font-weight: 700; color: #ea580c; margin-bottom: 2px;">${c.temp}</div>
                        <div style="font-size: 11px; color: #0284c7; font-weight: 600; margin-bottom: 8px;">💧 ${c.rain}</div>
                        <span style="display: inline-block; font-size: 10.5px; font-weight: 700; color: #166534; background: #dcfce7; padding: 2px 6px; border-radius: 4px;">
                          ${c.verdict}
                        </span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- 3 Pillars Grid: Terrain, Connectivity, Cultural/Dietary -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;">
                  
                  <!-- Terrain & Highway Transit -->
                  <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 20px;">🚗</span>
                      <h4 style="font-size: 14.5px; font-weight: 800; color: #0a223d; margin: 0;">Terrain & Highway Transit</h4>
                    </div>
                    <div style="font-size: 12px; color: #334155; line-height: 1.6;">
                      <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                        <strong style="color: #0284c7;">Transit Hub:</strong> ${destIntel.terrainAndRoads?.transitHub || 'Nearest airport/railhead'}
                      </div>
                      <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                        <strong style="color: #0f172a;">Drive Dynamics:</strong> ${destIntel.terrainAndRoads?.hillDrives || 'Scenic highway transitions'}
                      </div>
                      <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 8px; font-size: 11.5px; color: #92400e;">
                        <strong>⚠️ Advisory:</strong> ${destIntel.terrainAndRoads?.roadCaution || 'Allow buffer for mountain fog'}
                      </div>
                    </div>
                  </div>

                  <!-- Telecom Connectivity Radar -->
                  <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 20px;">📶</span>
                      <h4 style="font-size: 14.5px; font-weight: 800; color: #0a223d; margin: 0;">Connectivity & Remote Radar</h4>
                    </div>
                    <div style="font-size: 12px; color: #334155; line-height: 1.6;">
                      <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                        <strong style="color: #16a34a;">4G/5G Primary:</strong> ${destIntel.connectivityRadar?.jioAirtel || 'Standard urban coverage'}
                      </div>
                      <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                        <strong style="color: #ea580c;">High Pass / Remote Zones:</strong> ${destIntel.connectivityRadar?.bsnlOnlyZones || 'Offline spots encountered'}
                      </div>
                      <div style="background: #eff6ff; border: 1px solid #dbeafe; border-radius: 8px; padding: 8px; font-size: 11.5px; color: #1e40af;">
                        <strong>💡 Sentinel Tip:</strong> ${destIntel.connectivityRadar?.offlineMapNotice || 'Download offline maps before descent'}
                      </div>
                    </div>
                  </div>

                  <!-- Cultural Etiquette & Dietary Guidelines -->
                  <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                      <span style="font-size: 20px;">🥗</span>
                      <h4 style="font-size: 14.5px; font-weight: 800; color: #0a223d; margin: 0;">Dining & Cultural Respect</h4>
                    </div>
                    <div style="font-size: 12px; color: #334155; line-height: 1.6;">
                      <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                        <strong style="color: #15803d;">Vegetarian/Jain Dining:</strong> ${destIntel.culturalAndDining?.vegDining || 'Verified partner options available'}
                      </div>
                      <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0;">
                        <strong style="color: #7c3aed;">Local Gastronomy:</strong> ${destIntel.culturalAndDining?.localSpecialities || 'Traditional authentic flavours'}
                      </div>
                      <div style="background: #fdf2f8; border: 1px solid #fce7f3; border-radius: 8px; padding: 8px; font-size: 11.5px; color: #9d174d;">
                        <strong>🌿 Cultural Etiquette:</strong> ${destIntel.culturalAndDining?.etiquette || 'Maintain respectful local customs'}
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Group Smart Packing Checklist -->
                <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 20px;">🎒</span>
                      <h4 style="font-size: 14.5px; font-weight: 800; color: #0a223d; margin: 0;">Smart Group Packing Checklist</h4>
                    </div>
                    <span style="font-size: 11px; color: #64748b;">AI-synthesized for ${destIntel.altitude || 'regional conditions'}</span>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px;">
                    ${(destIntel.packingChecklist || []).map(item => `
                      <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; font-size: 12px; color: #334155;">
                        <span style="color: #10b981; font-weight: 800;">✓</span>
                        <span>${item}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

              </div>
            ` : ''}

            <!-- 1. Seasons & Places Review Canvas (Requirement 1: Landmark Photos & Best Seasons Guide) -->
            ${previewMode === 'seasons' ? `
              <div class="seasons-preview-wrap" style="padding: 24px;">
                <div class="preview-hero-banner" style="background: linear-gradient(135deg, #0a223d 0%, #1a365d 60%, #0d9488 100%); border-radius: 14px; padding: 22px; color: #fff; margin-bottom: 20px;">
                  <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.5px; color: #38bdf8; text-transform: uppercase;">
                    DESTINATION INTELLIGENCE CANVAS
                  </div>
                  <h2 style="font-size: 24px; font-weight: 800; margin: 6px 0 4px 0;">${currentPkg.name || trip.title} — Places & Best Seasons to Visit</h2>
                  <p style="font-size: 13px; color: #cbd5e1; margin: 0;">
                    Review scenic destination photos, optimal visiting seasons, and weather curves below to inform your group voting on the left.
                  </p>
                </div>

                <!-- Places & Best Seasons Visual Showcase (Requirement 1) -->
                <div class="places-season-showcase" style="margin-bottom: 24px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div>
                      <h3 style="font-size: 16px; font-weight: 800; color: #0a223d; margin: 0 0 2px 0;">
                        📸 Key Places to Visit & Best Seasons Guide
                      </h3>
                      <p style="font-size: 11.5px; color: #64748b; margin: 0;">
                        Visual photo overview of major highlights with season suitability ratings.
                      </p>
                    </div>
                    <span style="font-size: 10.5px; font-weight: 800; color: #0284c7; background: #e0f2fe; padding: 3px 8px; border-radius: 6px;">
                      5 Iconic Stops
                    </span>
                  </div>

                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
                    <!-- Place 1: Nohkalikai Falls -->
                    <div class="place-preview-card" style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
                      <div style="height: 140px; position: relative; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80" alt="Nohkalikai Falls" style="width: 100%; height: 100%; object-fit: cover;" />
                        <span style="position: absolute; top: 8px; left: 8px; background: rgba(16,185,129,0.95); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; backdrop-filter: blur(4px);">
                          Best: Oct – Dec
                        </span>
                        <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(10,34,61,0.85); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                          19°C • Peak Falls
                        </span>
                      </div>
                      <div style="padding: 12px;">
                        <strong style="font-size: 13.5px; color: #0a223d; display: block;">Nohkalikai Falls & Seven Sisters</strong>
                        <p style="font-size: 11.5px; color: #475569; margin: 4px 0 6px 0;">India's tallest plunge waterfall (340m). Roaring cascade volume during October post-monsoon.</p>
                        <span style="font-size: 10.5px; color: #166534; font-weight: 700; background: #dcfce7; padding: 2px 6px; border-radius: 4px; display: inline-block;">
                          ✓ Optimal in Mid-October Window
                        </span>
                      </div>
                    </div>

                    <!-- Place 2: Umiam Lake -->
                    <div class="place-preview-card" style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
                      <div style="height: 140px; position: relative; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Umiam Lake" style="width: 100%; height: 100%; object-fit: cover;" />
                        <span style="position: absolute; top: 8px; left: 8px; background: rgba(2,132,199,0.95); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; backdrop-filter: blur(4px);">
                          Best: Sep – Mar
                        </span>
                        <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(10,34,61,0.85); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                          21°C • Golden Sunset
                        </span>
                      </div>
                      <div style="padding: 12px;">
                        <strong style="font-size: 13.5px; color: #0a223d; display: block;">Umiam Lake (Barapani Waterfront)</strong>
                        <p style="font-size: 11.5px; color: #475569; margin: 4px 0 6px 0;">Sprawling turquoise lake bordered by pine slopes. Golden sunset tea & water sports open.</p>
                        <span style="font-size: 10.5px; color: #166534; font-weight: 700; background: #dcfce7; padding: 2px 6px; border-radius: 4px; display: inline-block;">
                          ✓ Calm weather & scenic drives
                        </span>
                      </div>
                    </div>

                    <!-- Place 3: Living Root Bridges -->
                    <div class="place-preview-card" style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
                      <div style="height: 140px; position: relative; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80" alt="Living Root Bridges" style="width: 100%; height: 100%; object-fit: cover;" />
                        <span style="position: absolute; top: 8px; left: 8px; background: rgba(16,185,129,0.95); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; backdrop-filter: blur(4px);">
                          Best: Oct – Apr
                        </span>
                        <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(10,34,61,0.85); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                          20°C • Jungle Canopy
                        </span>
                      </div>
                      <div style="padding: 12px;">
                        <strong style="font-size: 13.5px; color: #0a223d; display: block;">Double Decker Living Root Bridges</strong>
                        <p style="font-size: 11.5px; color: #475569; margin: 4px 0 6px 0;">Centuries-old bio-engineering across gushing gorges. Safe non-slippery forest trails.</p>
                        <span style="font-size: 10.5px; color: #166534; font-weight: 700; background: #dcfce7; padding: 2px 6px; border-radius: 4px; display: inline-block;">
                          ✓ Prime trekking conditions
                        </span>
                      </div>
                    </div>

                    <!-- Place 4: Dawki Umngot River -->
                    <div class="place-preview-card" style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
                      <div style="height: 140px; position: relative; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80" alt="Dawki Umngot River" style="width: 100%; height: 100%; object-fit: cover;" />
                        <span style="position: absolute; top: 8px; left: 8px; background: rgba(2,132,199,0.95); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; backdrop-filter: blur(4px);">
                          Best: Nov – Feb
                        </span>
                        <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(10,34,61,0.85); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                          17°C • Crystal Clear
                        </span>
                      </div>
                      <div style="padding: 12px;">
                        <strong style="font-size: 13.5px; color: #0a223d; display: block;">Dawki Umngot River Boating</strong>
                        <p style="font-size: 11.5px; color: #475569; margin: 4px 0 6px 0;">Famous transparent glass waters on the Indo-Bangladesh border. Boats appear floating.</p>
                        <span style="font-size: 10.5px; color: #0369a1; font-weight: 700; background: #e0f2fe; padding: 2px 6px; border-radius: 4px; display: inline-block;">
                          ✓ High clarity starts late October
                        </span>
                      </div>
                    </div>

                    <!-- Place 5: Laitlum Canyons -->
                    <div class="place-preview-card" style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
                      <div style="height: 140px; position: relative; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" alt="Laitlum Canyons" style="width: 100%; height: 100%; object-fit: cover;" />
                        <span style="position: absolute; top: 8px; left: 8px; background: rgba(16,185,129,0.95); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; backdrop-filter: blur(4px);">
                          Best: Oct – Feb
                        </span>
                        <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(10,34,61,0.85); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                          18°C • 360° Ridges
                        </span>
                      </div>
                      <div style="padding: 12px;">
                        <strong style="font-size: 13.5px; color: #0a223d; display: block;">Laitlum Canyons Gorge Ridge</strong>
                        <p style="font-size: 11.5px; color: #475569; margin: 4px 0 6px 0;">Breathtaking amphitheater gorges with emerald cliffs and zero cloud obstructions.</p>
                        <span style="font-size: 10.5px; color: #166534; font-weight: 700; background: #dcfce7; padding: 2px 6px; border-radius: 4px; display: inline-block;">
                          ✓ Clear sunny mountain views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Seasonal Comparison Cards -->
                <h3 style="font-size: 16px; font-weight: 800; color: #0a223d; margin: 0 0 12px 0;">
                  🌤️ Seasonal Travel Windows Comparison
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                  ${seasons.map(win => `
                    <div style="background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                      <div style="height: 140px; position: relative; overflow: hidden;">
                        <img src="${win.image || win.photo}" alt="${win.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                        <div style="position: absolute; top: 10px; right: 10px; background: rgba(10,34,61,0.85); color: #fff; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; backdrop-filter: blur(4px);">
                          ${win.weather}
                        </div>
                      </div>
                      <div style="padding: 16px;">
                        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">${win.title}</h4>
                        <div style="font-size: 12px; color: #0284c7; font-weight: 700; margin-bottom: 10px;">${win.dateRange || win.dates}</div>
                        <p style="font-size: 12.5px; color: #475569; margin: 0 0 12px 0;">${win.description || (Array.isArray(win.pros) ? win.pros.join('. ') : '')}</p>
                        
                        <div style="background: #f8fafc; border-radius: 8px; padding: 10px; font-size: 11.5px;">
                          <div style="color: #15803d; font-weight: 700; margin-bottom: 4px;">✓ ${Array.isArray(win.pros) ? win.pros[0] : win.pros}</div>
                          <div style="color: #b91c1c; font-weight: 600;">⚠️ ${Array.isArray(win.cons) ? win.cons[0] : win.cons}</div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 2. Master Itinerary or Gated Places & Activities Preview Canvas -->
            ${(previewMode === 'itinerary' || previewMode === 'master_itinerary') ? `
              ${!hasCuisinesSelected ? `
                <!-- GATED PREVIEW: Visual Places & Activities Showcase (Prior to Cuisines Selection) -->
                <div class="places-activities-preview-container" style="padding: 24px;">
                  <!-- Top Banner -->
                  <div style="background: linear-gradient(135deg, #0a223d 0%, #1e3a8a 60%, #0369a1 100%); color: #fff; border-radius: 14px; padding: 22px; box-shadow: 0 8px 24px rgba(10,34,61,0.15); margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
                      <div>
                        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(56,189,248,0.2); border: 1px solid rgba(56,189,248,0.4); padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">
                          <span>📸 PLACES & ACTIVITIES PREVIEW</span>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; margin: 0 0 6px 0;">
                          Meghalaya Autumn Odyssey — Places & Activities Showcase
                        </h2>
                        <div style="font-size: 13px; color: #cbd5e1; max-width: 680px; line-height: 1.5;">
                          Explore key scenic places to visit and curated group activities for each day. 
                          <strong>Note:</strong> The full chronological master timeline will unlock here once your group selects local cuisines and markets.
                        </div>
                      </div>
                      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 10px 14px; text-align: right;">
                        <div style="font-size: 10.5px; color: #93c5fd; font-weight: 700; text-transform: uppercase;">Itinerary Gating</div>
                        <div style="font-size: 13px; font-weight: 800; color: #fde047;">🔒 Master Schedule Locked</div>
                        <div style="font-size: 10.5px; color: #e2e8f0; margin-top: 2px;">Awaiting Cuisines & Markets</div>
                      </div>
                    </div>

                    <!-- Quick Highlights Strip -->
                    <div style="display: flex; gap: 12px; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.15); flex-wrap: wrap; font-size: 12px;">
                      <span>🗓️ <strong>4 Days</strong> Planned</span>
                      <span>•</span>
                      <span>👥 <strong>${members.length - cancelledMemberIds.length} Travellers</strong> Active</span>
                      <span>•</span>
                      <span>📍 <strong>5 Iconic Regions</strong> (Shillong, Cherrapunji, Dawki, Mawlynnong, Guwahati)</span>
                      <span>•</span>
                      <span>💬 Choose activities via <strong>@Myra</strong> in chat</span>
                    </div>
                  </div>

                  <!-- Visual Showcase of Days: Photos, Places to Visit & Activities (NO swap controls) -->
                  <div style="display: flex; flex-direction: column; gap: 18px;">
                    ${macroDays.map((d, idx) => {
                      const dayNum = d.dayNum || (idx + 1);
                      const photo = d.photo || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
                      const cActivities = (mmtState.state.candidateActivities && mmtState.state.candidateActivities[dayNum]) || [];
                      const selActIds = (mmtState.state.dayActivitySelections && mmtState.state.dayActivitySelections[dayNum]) || [];
                      const placesList = Array.isArray(d.destinations) ? d.destinations : (d.summary ? d.summary.split('•') : [d.region]);

                      return `
                        <div class="preview-visual-day-card" style="background: #fff; border-radius: 14px; border: 1.5px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
                          <!-- Day Banner Photo with Overlay -->
                          <div style="height: 180px; position: relative; overflow: hidden;">
                            <img src="${photo}" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,34,61,0.85) 0%, rgba(10,34,61,0.2) 60%, transparent 100%);"></div>
                            <div style="position: absolute; top: 12px; left: 14px; display: flex; gap: 6px;">
                              <span style="background: #0084ff; color: #fff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                                DAY ${dayNum}
                              </span>
                              <span style="background: rgba(255,255,255,0.92); color: #0a223d; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">
                                ${d.tag || d.region || 'Scenic Hub'}
                              </span>
                            </div>
                            <div style="position: absolute; bottom: 12px; left: 14px; right: 14px;">
                              <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin: 0 0 2px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.4);">
                                ${d.title}
                              </h3>
                              <div style="font-size: 12px; color: #e2e8f0; text-shadow: 0 1px 3px rgba(0,0,0,0.4);">
                                🏨 Base: ${d.baseHotel || 'Highland Resort'} • 🚗 ${d.distanceKm ? `${d.distanceKm} km transit` : 'Scenic mountain roads'}
                              </div>
                            </div>
                          </div>

                          <!-- Card Body: Places to Visit & Activities -->
                          <div style="padding: 16px 18px;">
                            <!-- Key Places to Visit Text -->
                            <div style="margin-bottom: 14px;">
                              <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                <span>📍</span> KEY PLACES TO VISIT
                              </div>
                              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                ${placesList.map(place => `
                                  <span style="background: #f1f5f9; color: #1e293b; font-size: 11.5px; font-weight: 600; padding: 4px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                    ${place.trim()}
                                  </span>
                                `).join('')}
                              </div>
                            </div>

                            <!-- Activities for this Day -->
                            <div>
                              <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="display: flex; align-items: center; gap: 6px;">
                                  <span>🎯</span> ACTIVITIES FOR DAY ${dayNum}
                                </span>
                                <span style="font-size: 11px; font-weight: 700; color: #0284c7;">
                                  ${selActIds.length} Selected
                                </span>
                              </div>

                              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px;">
                                ${cActivities.map(act => {
                                  const isSelected = selActIds.includes(act.id);
                                  return `
                                    <div style="background: ${isSelected ? '#f0fdf4' : '#fafafa'}; border: 1.5px solid ${isSelected ? '#86efac' : '#e2e8f0'}; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                                      <div>
                                        <div style="font-weight: 700; font-size: 12px; color: #0f172a;">${act.title}</div>
                                        <div style="font-size: 10.5px; color: #64748b; margin-top: 2px;">${act.duration || ''} • <strong>₹${act.cost || 0}</strong> • ${act.category || act.pace || (act.tags && act.tags[0]) || 'Curated'}</div>
                                      </div>
                                      <span style="font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; ${isSelected ? 'background: #dcfce7; color: #15803d;' : 'background: #f1f5f9; color: #64748b;'}">
                                        ${isSelected ? '✓ Selected' : 'Available'}
                                      </span>
                                    </div>
                                  `;
                                }).join('')}
                              </div>
                              <div style="margin-top: 8px; font-size: 10.5px; color: #94a3b8; font-style: italic;">
                                💡 Tag <strong>@Myra</strong> in chat (e.g. <em>"@Myra add ${cActivities[0]?.title || 'activity'} for Day ${dayNum}"</em>) to choose activities.
                              </div>
                            </div>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : `
                <!-- COMPLETE MASTER ITINERARY SCHEDULE TIMELINE (Revealed after Cuisines Selection) -->
                <div class="master-itinerary-container" style="padding: 24px;">
                  <!-- Top Master Summary Header -->
                  <div style="background: linear-gradient(135deg, #0a223d 0%, #1a365d 60%, #0d9488 100%); color: #fff; border-radius: 14px; padding: 22px; box-shadow: 0 8px 24px rgba(10,34,61,0.15); margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
                      <div>
                        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #4ade80; margin-bottom: 8px;">
                          <span>● COMPLETE MASTER SCHEDULE SYNCHRONIZED</span>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; margin: 0 0 4px 0;">
                          ${trip?.title || 'Meghalaya Autumn Odyssey: Cascades & Living Bridges'}
                        </h2>
                        <div style="font-size: 13px; opacity: 0.9; display: flex; flex-wrap: wrap; gap: 12px;">
                          <span>🗓️ 24 Oct – 28 Oct 2026 (4 Days)</span>
                          <span>👥 ${members.length - cancelledMemberIds.length} Travellers Active</span>
                          <span>🚗 Innova Crysta (Biplab Sangma - 4.9★)</span>
                        </div>
                      </div>
                      <!-- 1-Click PDF Download Option -->
                      <div style="display: flex; gap: 10px; align-items: center;">
                        <button id="btn-download-itinerary-pdf" style="background: #2563eb; color: #fff; font-weight: 800; font-size: 12px; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(37,99,235,0.35); transition: transform 0.15s ease;">
                          <span style="font-size: 15px;">📄</span>
                          <span>Download Itinerary (PDF)</span>
                        </button>
                      </div>
                    </div>

                    <!-- Quick Stats Strip -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.15);">
                      <div style="background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 6px;">
                        <div style="font-size: 10.5px; opacity: 0.8;">Grantex Vault Spend</div>
                        <div style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹${mmtState.calculateTotalGrantexSpent().toLocaleString()}</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 6px;">
                        <div style="font-size: 10.5px; opacity: 0.8;">Flight PNR</div>
                        <div style="font-size: 15px; font-weight: 700; color: #fff;">${bookingRepo.flightTickets?.[0]?.pnr || 'MMT-6E-8060'}</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 6px;">
                        <div style="font-size: 10.5px; opacity: 0.8;">Stays</div>
                        <div style="font-size: 15px; font-weight: 700; color: #fff;">Ri Kynjai & Polo Orchid</div>
                      </div>
                      <div style="background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 6px;">
                        <div style="font-size: 10.5px; opacity: 0.8;">Chauffeur</div>
                        <div style="font-size: 15px; font-weight: 700; color: #fff;">Biplab Sangma (4.9★)</div>
                      </div>
                    </div>
                  </div>

                  <!-- Day-by-Day Master Schedule Timeline (Fixed Undefined Activities Bug) -->
                  <div style="display: flex; flex-direction: column; gap: 18px;">
                    ${itinerary.map(day => {
                      const macroMatch = macroDays[day.day - 1];
                      const photo = macroMatch?.photo || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';
                      const isRecentlySwapped = mmtState.state.lastSwappedDays && mmtState.state.lastSwappedDays.includes(day.day - 1);
                      const hotelName = day.hotel || (macroMatch?.baseHotel) || (day.day === 3 ? 'Polo Orchid Resort' : 'Ri Kynjai Resort');
                      return `
                      <div class="master-day-card ${isRecentlySwapped ? 'day-swapped-pulse' : ''}" style="background: #fff; border-radius: 12px; border: 1.5px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                        <!-- Day Header with Thumbnail & Hotel -->
                        <div style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                          <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${photo}" alt="Day ${day.day}" style="width: 50px; height: 44px; border-radius: 6px; object-fit: cover; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" />
                            <div>
                              <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="background: #0a223d; color: #fff; font-weight: 800; font-size: 11px; padding: 2px 7px; border-radius: 4px;">
                                  DAY ${day.day}
                                </span>
                                <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0;">${day.title}</h4>
                              </div>
                              <span style="font-size: 11.5px; color: #64748b; margin-top: 2px; display: block;">${day.summary}</span>
                            </div>
                          </div>

                          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span style="background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; padding: 4px 9px; border-radius: 6px;">
                              🏨 ${hotelName}
                            </span>
                            <span style="background: #f0fdf4; color: #166534; font-size: 11px; font-weight: 700; padding: 4px 9px; border-radius: 6px; border: 1px solid #bbf7d0;">
                              ✓ Route Synced
                            </span>
                          </div>
                        </div>

                        <!-- Stops List with Proper Time Schedules & Day Breakdown -->
                        <div style="padding: 14px 18px;">
                          <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${day.stops.map(stop => {
                              const stopTitle = stop.title || stop.activity || 'Scheduled Experience';
                              const stopLocation = stop.subtitle || stop.location || stop.venue || '';
                              const stopBadge = stop.badge || (stop.flavourId ? 'Local Flavour' : '');
                              const stopDuration = stop.duration || '';
                              return `
                              <div style="display: flex; gap: 14px; padding: 12px 14px; border-radius: 8px; background: #fafafa; border-left: 3px solid #0a223d; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                                <div style="min-width: 80px; font-weight: 800; font-size: 12px; color: #0a223d;">
                                  ${stop.time}
                                </div>
                                <div style="flex: 1;">
                                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                                    <div style="font-weight: 700; font-size: 13.5px; color: #1e293b; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                      <span>${stopTitle}</span>
                                      ${stopBadge ? `
                                        <span style="font-size: 10px; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 2px 7px; border-radius: 4px;">
                                          ${stopBadge}
                                        </span>
                                      ` : ''}
                                      ${stopDuration ? `
                                        <span style="font-size: 10.5px; color: #64748b; font-weight: 500;">⏱️ ${stopDuration}</span>
                                      ` : ''}
                                    </div>
                                    ${stop.cost ? `
                                      <span style="font-size: 11px; font-weight: 700; color: #059669; background: #ecfdf5; padding: 2px 7px; border-radius: 4px; white-space: nowrap;">
                                        ${typeof stop.cost === 'number' ? '₹' + stop.cost : stop.cost}
                                      </span>
                                    ` : ''}
                                  </div>
                                  ${stopLocation ? `
                                    <div style="font-size: 11.5px; color: #64748b; margin-top: 3px; line-height: 1.4;">
                                      📍 ${stopLocation}
                                    </div>
                                  ` : ''}
                                  ${(stop.flavourTag || stop.flavourId) ? `
                                    <div style="margin-top: 5px; display: inline-flex; align-items: center; gap: 4px; font-size: 10.5px; font-weight: 600; background: #fef3c7; color: #92400e; padding: 2px 7px; border-radius: 4px;">
                                      🍽️ Local Food / Market • Route Synchronized
                                    </div>
                                  ` : ''}
                                </div>
                              </div>
                            `;
                            }).join('')}
                          </div>
                        </div>
                      </div>
                    `;
                    }).join('')}
                  </div>
                </div>
              `}
            ` : ''}

            <!-- 3. Central Repository & Group Locker Canvas (Requirement 8) -->
            ${previewMode === 'trip_locker' ? `
              <div class="trip-locker-container" style="padding: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 20px;">
                  <div>
                    <div style="display: inline-flex; align-items: center; gap: 6px; background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 12px; margin-bottom: 6px;">
                      <span>✓ CENTRAL REPOSITORY SYNCED</span>
                    </div>
                    <h2 style="font-size: 22px; font-weight: 800; color: #0a223d; margin: 0 0 4px 0;">
                      📁 Central Group Travel Repository & Locker
                    </h2>
                    <p style="font-size: 13px; color: #64748b; margin: 0;">
                      Centralized group repository storing all member boarding passes, stay vouchers, chauffeur passes, and complete itinerary.
                    </p>
                  </div>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-workspace-pill" id="btn-download-itinerary-pdf-locker" style="background: #2563eb; color: #fff; font-weight: 700; border: none; padding: 9px 16px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                      <span>📄 Download Itinerary (PDF)</span>
                    </button>
                    <button class="btn-workspace-pill" id="btn-download-all-docs" style="background: #008542; color: #fff; font-weight: 700; border: none; padding: 9px 16px; border-radius: 6px; cursor: pointer;">
                      📥 Download All Passes (ZIP)
                    </button>
                  </div>
                </div>

                <!-- Pine Labs Grantex Escrow Settlement Ledger -->
                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                    <div>
                      <h4 style="font-size: 15px; font-weight: 800; color: #0a223d; margin: 0;">
                        💳 Pine Labs Grantex Escrow Settlement Ledger
                      </h4>
                      <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">
                        Funds allocated autonomously for confirmed bookings. Unspent amounts automatically refund to individual accounts.
                      </div>
                    </div>
                    <div style="font-size: 12px; font-weight: 800; color: #059669; background: #ecfdf5; padding: 4px 10px; border-radius: 6px;">
                      Total Pool Spend: ₹${mmtState.calculateTotalGrantexSpent().toLocaleString()}
                    </div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
                    ${grantexAccounts.map(acct => `
                      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <strong style="font-size: 12px; color: #0f172a;">${acct.memberName}</strong>
                          <span style="font-size: 10px; color: #166534; background: #dcfce7; padding: 1px 6px; border-radius: 3px; font-weight: 700;">Audited</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b; margin-top: 6px;">
                          <span>Deposit: ₹${acct.initialDeposit.toLocaleString()}</span>
                          <span style="color: #dc2626; font-weight: 600;">Spent: ₹${acct.spent.toLocaleString()}</span>
                        </div>
                        <div style="font-size: 11.5px; font-weight: 800; color: #0284c7; margin-top: 4px; padding-top: 4px; border-top: 1px dashed #e2e8f0;">
                          Refundable Balance: ₹${acct.balance.toLocaleString()}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Member Filter Tabs -->
                <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 10px; margin-bottom: 18px; border-bottom: 1px solid #e2e8f0;">
                  <button class="locker-filter-chip ${activeLockerMemberId === 'all' ? 'active' : ''}" data-filter-member="all" style="padding: 6px 14px; border-radius: 16px; font-size: 12px; font-weight: 700; cursor: pointer; border: 1px solid ${activeLockerMemberId === 'all' ? '#0a223d' : '#cbd5e1'}; background: ${activeLockerMemberId === 'all' ? '#0a223d' : '#fff'}; color: ${activeLockerMemberId === 'all' ? '#fff' : '#475569'};">
                    👥 All Travellers (4)
                  </button>
                  ${members.map(m => `
                    <button class="locker-filter-chip ${activeLockerMemberId === m.id ? 'active' : ''}" data-filter-member="${m.id}" style="padding: 6px 14px; border-radius: 16px; font-size: 12px; font-weight: 700; cursor: pointer; border: 1px solid ${activeLockerMemberId === m.id ? '#0a223d' : '#cbd5e1'}; background: ${activeLockerMemberId === m.id ? '#0a223d' : '#fff'}; color: ${activeLockerMemberId === m.id ? '#fff' : '#475569'};">
                      ${m.avatar} ${m.name} ${cancelledMemberIds.includes(m.id) ? '❌ (Cancelled)' : ''}
                    </button>
                  `).join('')}
                </div>

                <!-- 1. Flight Boarding Passes (or Skipped) -->
                <div style="margin-bottom: 28px;">
                  <h4 style="font-size: 16px; font-weight: 800; color: #1e293b; margin: 0 0 12px 0;">
                    ✈️ Mode of Transport Boarding Passes (PNR: ${bookingRepo.flightTickets?.[0]?.pnr || 'MMT-6E-8060'})
                  </h4>
                  ${isFlightSkipped ? `
                    <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 16px; color: #64748b; font-size: 12.5px;">
                      ⏭️ <strong>Transit Self-Arranged:</strong> Mode of transport booking was skipped by group. Each traveller coordinates their own arrival at Guwahati/Shillong.
                    </div>
                  ` : `
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
                      ${(bookingRepo.flightTickets || []).filter(s => activeLockerMemberId === 'all' || s.memberId === activeLockerMemberId).map(t => `
                        <div class="boarding-pass-card" style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.04);">
                          <div style="background: #001e4d; color: #fff; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                              <span style="font-size: 10px; text-transform: uppercase; color: #38bdf8; font-weight: 700;">${t.airline || 'IndiGo'} (${t.flightNum || '6E-2089'})</span>
                              <div style="font-weight: 800; font-size: 13px;">${t.route || 'DEL ➔ GAU'}</div>
                            </div>
                            <div style="font-size: 18px; font-weight: 900; color: #fbbf24;">${t.seat || '4C'}</div>
                          </div>
                          <div style="padding: 12px 14px;">
                            <div style="font-size: 10.5px; color: #64748b;">PASSENGER</div>
                            <div style="font-weight: 800; font-size: 13px; color: #0f172a;">${t.memberName}</div>
                            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Gate: ${t.gate || '42A'} • Dep: ${t.depTime || '12:15 PM'}</div>
                            <div style="font-family: monospace; font-size: 14px; letter-spacing: 2px; color: #1e293b; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; margin-top: 8px; text-align: center;">
                              ||||| ||| |||| || ${t.pnr}
                            </div>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  `}
                </div>

                <!-- 2. Hotel Stay Vouchers (or Skipped) -->
                <div style="margin-bottom: 28px;">
                  <h4 style="font-size: 16px; font-weight: 800; color: #1e293b; margin: 0 0 12px 0;">
                    🏨 Confirmed Hotel Stay Vouchers
                  </h4>
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px;">
                    ${(bookingRepo.hotelVouchers || []).map(h => `
                      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                          <div>
                            <h5 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0;">${h.hotelName}</h5>
                            <div style="font-size: 11.5px; color: #64748b;">${h.location} • Conf: <strong>${h.pnr}</strong></div>
                          </div>
                          <span style="font-size: 10px; color: #008542; font-weight: 700; background: #dcfce7; padding: 2px 6px; border-radius: 4px;">
                            ✓ ${h.status || 'Prepaid'}
                          </span>
                        </div>
                        <div style="font-size: 11.5px; color: #334155; margin-bottom: 4px;">${h.rooms}</div>
                        <div style="font-size: 11px; color: #64748b;">🍽️ ${h.mealPlan}</div>
                        <div style="font-size: 11px; color: #475569; margin-top: 4px;">📞 ${h.contact}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- 3. Chauffeur Pass (or Skipped) -->
                <div style="margin-bottom: 28px;">
                  <h4 style="font-size: 16px; font-weight: 800; color: #1e293b; margin: 0 0 12px 0;">
                    🚗 Chauffeur & Vehicle Credentials
                  </h4>
                  ${isCabSkipped ? `
                    <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 16px; color: #64748b; font-size: 12.5px;">
                      ⏭️ <strong>Cab Fleet Self-Arranged:</strong> Sightseeing cab booking was skipped. Local self-drive / shared cabs will be arranged directly.
                    </div>
                  ` : `
                    <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                      <div>
                        <div style="font-weight: 800; font-size: 15px; color: #0f172a;">${bookingRepo.cabVoucher?.chauffeur || 'Biplab Sangma'} (${bookingRepo.cabVoucher?.rating || '4.9 ★'})</div>
                        <div style="font-size: 12px; color: #64748b;">${bookingRepo.cabVoucher?.model || 'Toyota Innova Crysta'} • Plate: <strong>${bookingRepo.cabVoucher?.plate || 'AS-01-EQ-9821'}</strong></div>
                        <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">📞 ${bookingRepo.cabVoucher?.phone || '+91 98621 44920'} • OTP: <strong style="color: #008542;">8831</strong></div>
                      </div>
                      <button class="btn-workspace-pill" style="background: #008542; color: #fff; font-weight: 700; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer;" onclick="alert('Opening Live Chauffeur GPS Tracker (AS-01-EQ-9821)...')">
                        📍 Live GPS Tracker
                      </button>
                    </div>
                  `}
                </div>

                <!-- 4. Activity Passes -->
                <div style="margin-bottom: 28px;">
                  <h4 style="font-size: 16px; font-weight: 800; color: #1e293b; margin: 0 0 12px 0;">
                    🎟️ Activity Entry Passes & QR Codes
                  </h4>
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
                    ${(bookingRepo.activityPasses || []).map(act => `
                      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                        <div style="font-weight: 800; font-size: 13px; color: #0f172a;">${act.title}</div>
                        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">📍 ${act.venue} • ${act.date}</div>
                        <div style="font-family: monospace; font-size: 12px; background: #f1f5f9; padding: 6px; border-radius: 4px; margin-top: 8px; text-align: center; color: #0a223d; font-weight: 700;">
                          [QR: ${act.qrCode}]
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- 5. Complete Final Day-by-Day Master Itinerary inside Repository -->
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                    <h4 style="font-size: 16px; font-weight: 800; color: #1e293b; margin: 0;">
                      📅 Complete Synchronized Master Itinerary Schedule
                    </h4>
                    <button class="btn-workspace-pill" onclick="window.downloadItineraryAsPdf ? window.downloadItineraryAsPdf(mmtState.state.itinerary, mmtState.state.trip, mmtState.state.members, mmtState.getBookingRepository()) : window.print()" style="background: #2563eb; color: #fff; font-size: 11.5px; font-weight: 700; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">
                      📄 Export PDF
                    </button>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 14px;">
                    ${itinerary.map(day => {
                      const hotelName = day.hotel || (macroDays && macroDays[day.day - 1]?.baseHotel) || (day.day === 3 ? 'Polo Orchid Resort' : 'Ri Kynjai Resort');
                      return `
                      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 10px;">
                          <div style="font-weight: 800; font-size: 13.5px; color: #0a223d;">DAY ${day.day}: ${day.title}</div>
                          <span style="font-size: 11px; color: #0369a1; background: #e0f2fe; padding: 2px 7px; border-radius: 4px; font-weight: 700;">🏨 ${hotelName}</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                          ${(day.stops || []).map(s => `
                            <div style="display: flex; gap: 12px; font-size: 12px;">
                              <span style="min-width: 75px; font-weight: 700; color: #0a223d;">${s.time}</span>
                              <div style="flex: 1;">
                                <div style="font-weight: 700; color: #1e293b;">
                                  ${s.title || s.activity || 'Scheduled Experience'} 
                                  ${s.badge ? `<span style="font-size: 9.5px; background: #e2e8f0; padding: 1px 5px; border-radius: 3px; margin-left: 4px;">${s.badge}</span>` : ''}
                                </div>
                                <div style="font-size: 11px; color: #64748b;">📍 ${s.subtitle || s.location || s.venue || ''}</div>
                              </div>
                              ${s.cost ? `<span style="font-weight: 700; color: #059669; font-size: 11px;">${typeof s.cost === 'number' ? '₹' + s.cost : s.cost}</span>` : ''}
                            </div>
                          `).join('')}
                        </div>
                      </div>
                    `;
                    }).join('')}
                  </div>
                </div>

              </div>
            ` : ''}

            <!-- 4. Sentinel Status & Radar Canvas -->
            ${previewMode === 'live_radar' ? `
              <div class="live-radar-container" style="padding: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 20px;">
                  <div>
                    <h2 style="font-size: 22px; font-weight: 800; color: #0a223d; margin: 0 0 4px 0;">
                      🛰️ Myra Sentinel Live Monitoring HUD
                    </h2>
                    <p style="font-size: 13px; color: #64748b; margin: 0;">
                      Autonomous radar tracking transit delays, mountain fog, and late check-in protections.
                    </p>
                  </div>
                  <span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 12px; font-size: 11.5px; font-weight: 700;">
                    🟢 PING: 30s AGO
                  </span>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 20px;">
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px;">
                    <div style="font-size: 11px; font-weight: 800; color: #166534; margin-bottom: 4px;">🟢 FLIGHT TRACKER</div>
                    <div style="font-weight: 800; font-size: 13.5px; color: #0f172a;">IndiGo 6E-2041 (DEL ➔ GAU)</div>
                    <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">
                      ${disruptionState.activeScenarioId === 'flight_delay' ? '⚠️ Delayed 2h 30m due to ATC hold' : 'On-time 06:45 AM departure, Terminal 3 Gate 14B.'}
                    </div>
                  </div>

                  <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 14px;">
                    <div style="font-size: 11px; font-weight: 800; color: #075985; margin-bottom: 4px;">🟢 CHAUFFEUR SENTINEL</div>
                    <div style="font-weight: 800; font-size: 13.5px; color: #0f172a;">Innova Crysta (AS-01-ET-4492)</div>
                    <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">
                      Chauffeur Biplab Sangma on route to Guwahati Airport Pillar 3.
                    </div>
                  </div>

                  <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 10px; padding: 14px;">
                    <div style="font-size: 11px; font-weight: 800; color: #854d0e; margin-bottom: 4px;">🟢 METEOROLOGICAL RADAR</div>
                    <div style="font-weight: 800; font-size: 13.5px; color: #0f172a;">Cherrapunji & Sohra</div>
                    <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">
                      ${disruptionState.activeScenarioId === 'weather_fog' ? '⚠️ Heavy gorge fog alert' : '21°C, clear skies, zero rainfall forecast.'}
                    </div>
                  </div>
                </div>

                <!-- Sentinel Consent Toggles -->
                <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 20px;">
                  <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 10px 0;">
                    ⚙️ Notification & Proactive Alert Consent Preferences
                  </h4>
                  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #334155; cursor: pointer;">
                      <input type="checkbox" class="sentinel-consent-toggle" data-key="inApp" ${sentinelMonitoring.consentSettings?.inApp ? 'checked' : ''} />
                      In-App Live Stream Alerts
                    </label>
                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #334155; cursor: pointer;">
                      <input type="checkbox" class="sentinel-consent-toggle" data-key="whatsapp" ${sentinelMonitoring.consentSettings?.whatsapp ? 'checked' : ''} />
                      WhatsApp Broadcast
                    </label>
                    <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: #334155; cursor: pointer;">
                      <input type="checkbox" class="sentinel-consent-toggle" data-key="sms" ${sentinelMonitoring.consentSettings?.sms ? 'checked' : ''} />
                      Critical SMS Alerts
                    </label>
                  </div>
                </div>
              </div>
            ` : ''}

          </div>
        </section>

      </div>
    </div>
  `;

  // Auto-scroll chat stream to bottom
  const chatStream = container.querySelector('#chat-stream-scroll');
  if (chatStream) {
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  // Visual Review Mode Tabs (Right Column Review Canvas)
  container.querySelector('#tab-preview-intel')?.addEventListener('click', () => {
    mmtState.setPreviewViewMode('destination_intel');
  });

  container.querySelector('#tab-preview-seasons')?.addEventListener('click', () => {
    mmtState.setPreviewViewMode('seasons');
  });

  container.querySelector('#tab-preview-itinerary')?.addEventListener('click', () => {
    mmtState.setPreviewViewMode('master_itinerary');
  });

  container.querySelector('#tab-preview-master')?.addEventListener('click', () => {
    mmtState.setPreviewViewMode('master_itinerary');
  });

  container.querySelector('#tab-preview-locker')?.addEventListener('click', () => {
    mmtState.setPreviewViewMode('trip_locker');
  });

  container.querySelector('#tab-preview-radar')?.addEventListener('click', () => {
    mmtState.setPreviewViewMode('live_radar');
  });

  // Chat Intervention Stage Navigator Pills (Requirement 5: Strict Gating)
  container.querySelectorAll('.myra-stage-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.getAttribute('data-stage-target');
      if (!mmtState.isStageUnlocked(target)) return;

      if (target === 'seasons') {
        mmtState.setActiveChatInterventionStage('seasons');
        mmtState.setPreviewViewMode('seasons');
      } else if (target === 'calendar_dates') {
        mmtState.setActiveChatInterventionStage('calendar_dates');
        mmtState.setPreviewViewMode('destination_intel');
      } else if (target === 'live_radar') {
        mmtState.setActiveChatInterventionStage('live_radar');
        mmtState.setPreviewViewMode('live_radar');
      } else if (target === 'cancellation_engine') {
        mmtState.setActiveChatInterventionStage('cancellation_engine');
        mmtState.setPreviewViewMode('live_radar');
      } else {
        mmtState.setActiveChatInterventionStage(target);
        mmtState.setItinerarySubStep(target);
        mmtState.setPreviewViewMode('master_itinerary');
      }
    });
  });

  // Step 1: Reorder Macro Days Overview (Requirement 4: Reshuffle Controls)
  container.querySelectorAll('.btn-macro-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const dir = btn.getAttribute('data-dir');
      const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
      mmtState.reorderMacroDays(idx, targetIdx);
    });
  });

  // Direct Swap Dropdown on Macro Day Cards
  container.querySelectorAll('.macro-swap-select').forEach(select => {
    select.addEventListener('change', (e) => {
      e.stopPropagation();
      const fromIdx = parseInt(select.getAttribute('data-from-idx'), 10);
      const toIdx = parseInt(e.target.value, 10);
      if (!isNaN(fromIdx) && !isNaN(toIdx)) {
        mmtState.swapMacroDays(fromIdx, toIdx);
      }
    });
  });

  // Quick Swap Action Chips
  container.querySelectorAll('.btn-quick-swap-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = parseInt(btn.getAttribute('data-swap-a'), 10);
      const b = parseInt(btn.getAttribute('data-swap-b'), 10);
      if (!isNaN(a) && !isNaN(b)) {
        mmtState.swapMacroDays(a, b);
      }
    });
  });



  // Macro Day-Wise Row Card Click -> Select as Active Day
  container.querySelectorAll('.macro-day-row-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('select')) return;
      const idx = parseInt(card.getAttribute('data-day-idx'), 10);
      if (!isNaN(idx)) {
        mmtState.setActiveMacroDay(idx);
      }
    });
  });

  // Macro Day-Wise Tabs
  container.querySelectorAll('.btn-macro-day-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const dayIdx = parseInt(btn.getAttribute('data-day-idx'), 10);
      mmtState.setActiveMacroDay(dayIdx);
    });
  });

  // Keep Myra's Suggested Order
  container.querySelector('#btn-reset-macro-recommendation')?.addEventListener('click', () => {
    mmtState.resetMacroDaysToRecommended();
  });

  // Approve Macro Day-Wise Itinerary
  container.querySelector('#btn-approve-macro-itin')?.addEventListener('click', () => {
    mmtState.approveMacroItinerary();
  });

  container.querySelector('#btn-proceed-to-activities')?.addEventListener('click', () => {
    mmtState.advanceFromMacroOverview();
  });

  // Step 2: Day Pill Selectors
  container.querySelectorAll('.btn-day-pill-selector').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = parseInt(btn.getAttribute('data-day'), 10);
      mmtState.setActiveConfiguringDay(day);
    });
  });

  // Step 2: Toggle Activity Choice with Budget Guardrail
  container.querySelectorAll('.btn-act-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = parseInt(btn.getAttribute('data-day'), 10);
      const actId = btn.getAttribute('data-act-id');
      mmtState.toggleActivityChoice(day, actId);
    });
  });

  // Resolve Budget Increase Button
  container.querySelector('#btn-accept-budget-increase')?.addEventListener('click', () => {
    const memberId = container.querySelector('#btn-accept-budget-increase')?.getAttribute('data-member');
    const newAmount = parseInt(container.querySelector('#btn-accept-budget-increase')?.getAttribute('data-amount'), 10);
    if (memberId && newAmount) {
      mmtState.increaseMemberBudget(memberId, newAmount);
    }
  });

  container.querySelector('#btn-cancel-budget-increase')?.addEventListener('click', () => {
    mmtState.dismissBudgetAlert();
  });

  // Step 2: Synthesize Day Schedule with Myra
  container.querySelector('#btn-synthesize-day-schedule')?.addEventListener('click', (e) => {
    const day = parseInt(e.currentTarget.getAttribute('data-day') || activeDay, 10);
    mmtState.synthesizeDayItinerary(day);
  });

  container.querySelector('#btn-advance-to-cuisines')?.addEventListener('click', () => {
    mmtState.advanceFromScheduleToCuisines();
  });

  container.querySelector('#btn-advance-to-cuisines-oneclick')?.addEventListener('click', () => {
    mmtState.advanceToCuisinesMarkets();
  });

  // Step 4: Toggle Cuisine / Market in Itinerary
  container.querySelectorAll('.btn-toggle-cuisine-itinerary').forEach(btn => {
    btn.addEventListener('click', () => {
      const flavourId = btn.getAttribute('data-flavour-id');
      if (mmtState.state.scheduledCuisineIds.includes(flavourId)) {
        mmtState.removeCuisineFromDayItinerary(flavourId);
      } else {
        mmtState.addCuisineOrMarketToDayItinerary(flavourId);
      }
    });
  });

  container.querySelector('#btn-approve-proceed-booking')?.addEventListener('click', () => {
    mmtState.approveItineraryAndProceedToBooking();
  });

  // 1-Click Master Itinerary PDF Download (Requirements 2 & 8)
  if (typeof window !== 'undefined') {
    window.downloadItineraryAsPdf = downloadItineraryAsPdf;
  }
  container.querySelectorAll('#btn-download-itinerary-pdf, #btn-download-itinerary-pdf-locker').forEach(btn => {
    btn.addEventListener('click', () => {
      downloadItineraryAsPdf(mmtState.state.itinerary, mmtState.state.trip, mmtState.state.members, mmtState.getBookingRepository());
    });
  });

  // Step 5: Grantex Accounts Authorization & Individual Deposits (Requirement 3)
  container.querySelectorAll('.btn-deposit-member-grantex').forEach(btn => {
    btn.addEventListener('click', () => {
      const memberId = btn.getAttribute('data-member-id');
      if (memberId) {
        mmtState.depositMemberGrantexContribution(memberId);
      }
    });
  });

  container.querySelector('#btn-nudge-grantex-members')?.addEventListener('click', () => {
    mmtState.nudgePendingGrantexMembers();
  });

  container.querySelector('#btn-admin-approve-grantex-pool')?.addEventListener('click', () => {
    mmtState.approveAllGrantexDeposits();
  });

  container.querySelector('#btn-authorize-all-grantex')?.addEventListener('click', () => {
    mmtState.authorizeAllGrantexAccounts();
  });

  container.querySelector('#btn-proceed-to-flights')?.addEventListener('click', () => {
    mmtState.advanceFromGrantexToFlights();
  });

  // Step 6: Transit Mode Cards & Member Choice (Requirement 4)
  container.querySelectorAll('.btn-transit-mode-card').forEach(card => {
    card.addEventListener('click', () => {
      const modeId = card.getAttribute('data-mode-id');
      if (modeId) {
        mmtState.setTransitMode(modeId);
      }
    });
  });

  container.querySelectorAll('.member-transit-mode-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const memberId = sel.getAttribute('data-member-id');
      const mode = e.target.value;
      if (memberId && mode) {
        mmtState.setMemberTransitChoice(memberId, mode);
      }
    });
  });

  // Step 6: Transit Airport Selection & Voting
  container.querySelectorAll('.btn-airport-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const airportCode = btn.getAttribute('data-airport-code');
      mmtState.setOriginAirport(airportCode);
    });
  });

  container.querySelectorAll('.btn-vote-flight').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const flightId = btn.getAttribute('data-flight-id');
      const memberId = persona.id;
      mmtState.castFlightVote(memberId, flightId);
    });
  });

  container.querySelector('#btn-execute-flight-booking')?.addEventListener('click', () => {
    mmtState.executeAgenticFlightBooking();
  });

  container.querySelector('#btn-skip-flight-booking')?.addEventListener('click', () => {
    mmtState.skipTransitBooking ? mmtState.skipTransitBooking() : mmtState.skipFlightBooking();
  });

  container.querySelector('#btn-transit-to-hotels-next')?.addEventListener('click', () => {
    mmtState.setItinerarySubStep('hotels_booking');
    mmtState.setActiveChatInterventionStage('hotels_booking');
  });

  // Central Group Repository Quick Link
  container.querySelector('#btn-view-central-repository')?.addEventListener('click', () => {
    mmtState.finishTripAndOpenRepository ? mmtState.finishTripAndOpenRepository() : mmtState.setPreviewViewMode('trip_locker');
  });

  // Step 7: Location Hotel Tabs & Voting
  container.querySelectorAll('.btn-hotel-loc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-loc-idx'), 10);
      mmtState.setActiveHotelLocation(idx);
    });
  });

  container.querySelectorAll('.btn-vote-hotel').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const locIdx = parseInt(btn.getAttribute('data-loc-idx') || activeHotelLocationIdx, 10);
      const hotelId = btn.getAttribute('data-hotel-id');
      mmtState.castHotelVote(locIdx, persona.id, hotelId);
    });
  });

  container.querySelector('#btn-book-location-hotel')?.addEventListener('click', (e) => {
    const locIdx = parseInt(e.currentTarget.getAttribute('data-loc-idx') || activeHotelLocationIdx, 10);
    mmtState.executeAgenticHotelLocationBooking(locIdx);
  });

  container.querySelector('#btn-skip-location-hotel-btn')?.addEventListener('click', (e) => {
    const locIdx = parseInt(e.currentTarget.getAttribute('data-loc-idx') || activeHotelLocationIdx, 10);
    mmtState.skipHotelLocationBooking(locIdx);
  });

  container.querySelector('#btn-proceed-to-cab-fleet')?.addEventListener('click', () => {
    mmtState.setItinerarySubStep('cab_booking');
    mmtState.setActiveChatInterventionStage('cab_booking');
  });

  // Step 8: Sightseeing Cab Fleet Selection & Booking
  container.querySelectorAll('.btn-select-cab-fleet').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cabId = btn.getAttribute('data-cab-id');
      mmtState.selectCabVehicle(cabId);
    });
  });

  container.querySelector('#btn-execute-cab-booking')?.addEventListener('click', () => {
    mmtState.executeAgenticCabBooking();
  });

  container.querySelector('#btn-skip-cab-booking-bottom')?.addEventListener('click', () => {
    mmtState.skipCabBooking();
  });

  container.querySelector('#btn-cab-to-activities-next')?.addEventListener('click', () => {
    mmtState.setItinerarySubStep('activities_prebook');
    mmtState.setActiveChatInterventionStage('activities_prebook');
  });

  // Step 9: Activity Passes Pre-Booking Toggle
  container.querySelectorAll('.btn-toggle-prebook-activity').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const actId = btn.getAttribute('data-act-id');
      mmtState.togglePrebookActivity(actId);
    });
  });

  container.querySelector('#btn-execute-activities-prebooking')?.addEventListener('click', () => {
    mmtState.executeAgenticActivityPrebooking();
  });

  container.querySelector('#btn-skip-activities-bottom')?.addEventListener('click', () => {
    mmtState.skipActivityPrebooking();
  });

  container.querySelector('#btn-finish-trip-radar')?.addEventListener('click', () => {
    mmtState.setPreviewViewMode('master_itinerary');
    mmtState.setActiveChatInterventionStage('live_radar');
    mmtState.sendChatMessage("🎉 All bookings complete! Pine Labs Grantex autonomous checkout verified. Review master itinerary, group locker tickets, and live sentinel radar.");
  });

  // Group Locker Member Filter Chips
  container.querySelectorAll('.locker-filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const memberId = chip.getAttribute('data-filter-member');
      mmtState.setLockerMemberFilter(memberId);
    });
  });

  container.querySelector('#btn-download-all-docs')?.addEventListener('click', () => {
    alert("📦 Downloading Complete Group Travel Archive:\n\n• 4x Boarding Passes (DEL-GAU IndiGo 6E-2041)\n• 2x Luxury Resort Vouchers (Ri Kynjai & Polo Orchid)\n• 1x Chauffeur Credentials (Biplab Sangma AS-01-EQ-9821)\n• 4x Forest & Trek Eco-Permits\n\nArchive saved to MMT_Meghalaya_Passes.zip");
  });

  // Sentinel Notification Consent Toggles
  container.querySelectorAll('.sentinel-consent-toggle').forEach(chk => {
    chk.addEventListener('change', () => {
      const key = chk.getAttribute('data-key');
      const val = chk.checked;
      mmtState.updateSentinelConsent(key, val);
    });
  });

  // Disruption Simulator Triggers
  container.querySelectorAll('.btn-trigger-disruption').forEach(btn => {
    btn.addEventListener('click', () => {
      const scenarioId = btn.getAttribute('data-scenario-id');
      mmtState.triggerDisruptionScenario(scenarioId);
    });
  });

  container.querySelector('#btn-reset-disruption')?.addEventListener('click', () => {
    mmtState.resetDisruptionReplan();
  });

  container.querySelectorAll('.btn-scope-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const scope = btn.getAttribute('data-scope');
      mmtState.setDisruptionScope(scope);
    });
  });

  container.querySelectorAll('.replan-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const optionId = card.getAttribute('data-option-id');
      mmtState.selectReplanOption(optionId);
    });
  });

  container.querySelector('#btn-approve-group-replan')?.addEventListener('click', () => {
    mmtState.approveGroupDisruptionReplan();
  });

  container.querySelector('#btn-apply-replan')?.addEventListener('click', () => {
    mmtState.applyDisruptionReplan();
  });

  // Smart Cancellation & Grantex Refund
  container.querySelector('#cancel-member-select')?.addEventListener('change', (e) => {
    mmtState.simulateCancellation(e.target.value);
  });

  container.querySelector('#btn-simulate-cancel')?.addEventListener('click', () => {
    const memberId = container.querySelector('#cancel-member-select')?.value;
    if (memberId) mmtState.simulateCancellation(memberId);
  });

  container.querySelector('#btn-confirm-cancel')?.addEventListener('click', () => {
    const memberId = container.querySelector('#cancel-member-select')?.value || mmtState.state.cancellationSim?.memberId;
    if (!memberId) return;
    const sim = mmtState.state.cancellationSim;
    const passengerName = sim?.passengerName || "Traveller";
    const netRefund = sim?.refundAmount || 16200;
    if (confirm(`⚠️ CONFIRM CANCELLATION FOR ${passengerName.toUpperCase()}?\n\n• Airline & MMT Penalty: ₹${sim?.flightPenalty || 3500}\n• Activity Processing Fee: ₹${sim?.activityPenalty || 150}\n• Net Refund Payable: ₹${netRefund.toLocaleString()}\n\nFunds will be instantly deposited back to ${passengerName}'s Pine Labs Grantex Vault.`)) {
      mmtState.executeCancellation(memberId);
    }
  });

  // Mobile Segmented Switcher
  container.querySelector('#btn-m-segment-chat')?.addEventListener('click', () => {
    mmtState.setMobileActiveTab('chat');
  });

  container.querySelector('#btn-m-segment-preview')?.addEventListener('click', () => {
    mmtState.setMobileActiveTab('preview');
  });

  // Persistent Budget Popover
  container.querySelector('#btn-ws-open-budget')?.addEventListener('click', () => {
    mmtState.toggleBudgetEditor();
  });

  container.querySelector('#btn-ws-save-budget')?.addEventListener('click', () => {
    const min = container.querySelector('#input-ws-bmin')?.value;
    const max = container.querySelector('#input-ws-bmax')?.value;
    mmtState.setBudgetRange(min, max);
    mmtState.toggleBudgetEditor();
  });

  // Persistent Traveller Add Popover
  container.querySelector('#btn-ws-open-traveller')?.addEventListener('click', () => {
    mmtState.toggleTravellerLookup();
  });

  container.querySelector('#btn-ws-add-phone')?.addEventListener('click', () => {
    const phoneInp = container.querySelector('#input-ws-phone');
    const toast = container.querySelector('#ws-phone-toast');
    const phone = phoneInp?.value?.trim();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    const res = mmtState.addTravellerByPhone(phone);
    if (toast) {
      toast.style.display = 'block';
      toast.style.background = res.success ? '#e6f7ec' : '#fff0f0';
      toast.style.color = res.success ? '#008542' : '#eb2026';
      toast.textContent = res.message;
    }
    if (res.success && phoneInp) phoneInp.value = '';
  });

  // Sequential Streaming Skip Button
  container.querySelector('#btn-skip-chat-seq')?.addEventListener('click', () => {
    mmtState.skipChatAnimation();
  });

  // Seasonal Voting Buttons
  container.querySelectorAll('.btn-vote-season').forEach(btn => {
    btn.addEventListener('click', () => {
      const winId = btn.getAttribute('data-win-id');
      mmtState.voteSeasonalWindow(winId);
    });
  });

  // Admin Confirmation of Travel Window & Move to Calendar
  container.querySelector('#btn-admin-confirm-season')?.addEventListener('click', (e) => {
    const winId = e.currentTarget.getAttribute('data-win-id') || (seasons[0] && seasons[0].id) || 'win-aut';
    mmtState.confirmSeasonalWindow(winId);
  });

  // Requirement 2: Month Calendar Dropdown & Toggle
  container.querySelector('#select-calendar-month')?.addEventListener('change', (e) => {
    mmtState.setCalendarMonth(e.target.value);
  });

  container.querySelector('#btn-toggle-month-cal')?.addEventListener('click', () => {
    mmtState.toggleCalendarMonthDropdown();
  });

  // Member Availability Date Cell Toggles
  container.querySelectorAll('.btn-toggle-calendar-date').forEach(btn => {
    btn.addEventListener('click', () => {
      const dateKey = btn.getAttribute('data-date-key');
      mmtState.toggleMemberDate(persona.id, dateKey);
    });
  });

  // Fast-track Record All Member Availabilities
  container.querySelector('#btn-record-all-dates')?.addEventListener('click', () => {
    mmtState.recordAllMemberDates();
  });

  // Admin Final Dates Approval -> Locks Travel Window & Moves to Macro Itinerary Selection
  container.querySelector('#btn-admin-approve-dates')?.addEventListener('click', () => {
    mmtState.approveFinalTravelDates();
  });

  // Admin Decision Lock (Fallback)
  container.querySelector('#btn-admin-lock-decision')?.addEventListener('click', () => {
    mmtState.lockTripDecision(mmtState.state.seasonalWindows[0].id);
  });

  // Exit Workspace Button
  container.querySelector('#btn-exit-workspace-page')?.addEventListener('click', () => {
    mmtState.closeFullChat();
  });

  // Live Vote Summary Tab Toggle & Category Switcher
  container.querySelector('#btn-toggle-vote-tab')?.addEventListener('click', () => {
    mmtState.toggleVoteSummaryExpanded();
  });
  container.querySelector('#btn-vote-tab-expand')?.addEventListener('click', (e) => {
    e.stopPropagation();
    mmtState.toggleVoteSummaryExpanded();
  });
  container.querySelectorAll('.vote-cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cat = btn.getAttribute('data-vote-cat');
      mmtState.setActiveVoteCategory(cat);
    });
  });



  // Chat Form Submit
  container.querySelector('#split-chat-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = container.querySelector('#split-chat-input');
    const val = input?.value?.trim();
    if (val) {
      mmtState.sendChatMessage(val);
      input.value = '';
    }
  });
}
