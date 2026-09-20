// js/views/review-view.js - Authentic MakeMyTrip Review Booking & Scoped Permission Contract (Stages 16-18 & Section 8)

import { mmtState } from '../mmt-state.js';

export function renderReviewView(container) {
  const members = mmtState.state.members;
  const flight = mmtState.state.selectedFlight;
  const hotels = mmtState.state.selectedHotels;
  const isSpikeOpen = mmtState.state.isPriceSpikeModalOpen;

  const flightTotal = flight.price * 4;
  const hotelTotal = (hotels[0].pricePerNight + hotels[1].pricePerNight) * 2; // 2 nights each
  const groundTransport = 9900;
  const activities = 3200;
  const discount = 6800;
  const grossTotal = flightTotal + hotelTotal + groundTransport + activities;
  const netTotal = grossTotal - discount;
  const perPerson = Math.round(netTotal / 4);

  container.innerHTML = `
    <div class="mmt-page-main">
      <div style="margin-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 700; color: #7e7e7e; text-transform: uppercase;">
          Stage 18 • Scoped Booking Permission & Review
        </span>
        <h2 style="font-size: 22px; font-weight: 800; color: #0a223d;">
          Review Your Meghalaya Group Booking
        </h2>
      </div>

      <!-- Price Spike Exception Modal (Stage 19 & Level 5 Escalation) -->
      ${isSpikeOpen ? `
        <div style="background: #fff0f0; border: 2px solid #eb2026; border-radius: 8px; padding: 18px 22px; margin-bottom: 20px; animation: pulse-border 2s infinite alternate;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <span style="font-size: 24px;">🛑</span>
            <h4 style="font-size: 16px; font-weight: 800; color: #eb2026;">
              Level 5 Escalation Checkpoint: Agentic Booking Paused
            </h4>
          </div>
          <p style="font-size: 13px; color: #333; margin-bottom: 12px;">
            <strong>Exception Detected:</strong> IndiGo 6E-542 last 2 seats experienced a fare surge from ₹6,200 to ₹7,850 (+₹1,650/seat). This exceeds your agreed <strong>₹1,500 tolerance cap</strong>. Myra has paused automated booking and escalated for human confirmation.
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-book-mmt" id="btn-accept-surge" style="font-size: 12px; background: #eb2026;">
              Accept ₹1,650 Surge & Continue
            </button>
            <button class="btn-open-prefs" id="btn-switch-flight" style="font-size: 12px;">
              Switch to Air India (₹6,400)
            </button>
            <button class="btn-open-prefs" id="btn-dismiss-surge" style="font-size: 12px; color: #555; border-color: #ccc;">
              Keep on Hold
            </button>
          </div>
        </div>
      ` : ''}

      <div class="review-booking-container">
        <!-- Left Main Column -->
        <div class="review-main-column">
          <!-- Flight Card Summary -->
          <div class="review-card">
            <h3 class="review-card-title">1. Flight Details (4 Travellers)</h3>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${flight.logo}" alt="${flight.airline}" style="width: 32px; height: 32px; object-fit: contain;" />
                <div>
                  <div style="font-weight: 800; font-size: 15px;">${flight.airline} • ${flight.flightNumber}</div>
                  <div style="font-size: 12px; color: #7e7e7e;">Economy • Non Stop (${flight.duration})</div>
                </div>
              </div>

              <div style="text-align: right;">
                <div style="font-size: 14px; font-weight: 800;">
                  ${flight.depCity} (${flight.depTime}) ➔ ${flight.arrCity} (${flight.arrTime})
                </div>
                <div style="font-size: 12px; color: #1ab64f; font-weight: 700;">✓ Respects Rohan's 11:30 AM Client Call</div>
              </div>
            </div>
          </div>

          <!-- Stays Summary -->
          <div class="review-card">
            <h3 class="review-card-title">2. Accommodation Details (2 Rooms for 4 Pax)</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${hotels.map(h => `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e0e0e0; padding-bottom: 10px;">
                  <div>
                    <div style="font-weight: 800; font-size: 14px;">${h.name}</div>
                    <div style="font-size: 12px; color: #7e7e7e;">${h.location} • ${h.roomType}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 800;">₹${(h.pricePerNight * 2).toLocaleString()}</div>
                    <div style="font-size: 11px; color: #008542; font-weight: 700;">🥗 Pure Veg Dining Certified</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Travellers & Meal Preferences -->
          <div class="review-card">
            <h3 class="review-card-title">3. Traveller Profiles & Preferences</h3>
            ${members.map(m => `
              <div class="passenger-card">
                <div class="passenger-meta">
                  <img src="${m.avatar}" alt="${m.name}" class="passenger-avatar" />
                  <div>
                    <div style="font-size: 13px; font-weight: 800;">${m.name} (${m.role})</div>
                    <div style="font-size: 11px; color: #666;">Seat: ${m.flightSeat} • Diet: ${m.diet}</div>
                  </div>
                </div>
                <div style="font-size: 11px; font-weight: 700; color: #005f9e;">
                  ${m.isBudgetPrivate ? '🔒 Private Budget Synced' : '👥 Budget Visible'}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Scoped Booking Permission Contract (Stage 18 & Section 8) -->
          <div class="hitl-scoped-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="hitl-badge">Level 3: Scoped Execution Contract</span>
              <button class="btn-open-prefs" id="btn-test-spike-demo" style="font-size: 11px; padding: 4px 10px;">
                ⚡ Simulate Price Spike Exception
              </button>
            </div>
            <h4 style="font-size: 14px; font-weight: 800; color: #003e6b; margin-bottom: 6px;">
              Myra Agentic Booking Boundaries Pre-Authorized by Admin
            </h4>
            <ul style="font-size: 12px; color: #334e68; padding-left: 18px; line-height: 1.6;">
              <li><strong>Spending Cap:</strong> Maximum ₹28,000 per member authorized.</li>
              <li><strong>Price Tolerance:</strong> ₹1,500 auto-variance allowance for ticket surges.</li>
              <li><strong>Scarcity Execution Order:</strong> IndiGo flights locked first ➔ Ri Kynjai Cottages ➔ Cabs.</li>
              <li><strong>Safeguard:</strong> Any non-refundable change or price spike &gt; ₹1,500 halts execution for human sign-off.</li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Fare Summary -->
        <div class="review-sidebar-column">
          <div class="fare-summary-card">
            <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px;">Fare Summary (4 Pax)</h3>
            
            <div class="fare-row">
              <span>Flights (IndiGo 4 Seats):</span>
              <span>₹${flightTotal.toLocaleString()}</span>
            </div>
            <div class="fare-row">
              <span>Resorts (2 Rooms, 3 Nights):</span>
              <span>₹${hotelTotal.toLocaleString()}</span>
            </div>
            <div class="fare-row">
              <span>Ground Cabs (Innova Crysta):</span>
              <span>₹${groundTransport.toLocaleString()}</span>
            </div>
            <div class="fare-row">
              <span>Activities & QR Passes:</span>
              <span>₹${activities.toLocaleString()}</span>
            </div>
            <div class="fare-row" style="color: #008542; font-weight: 700;">
              <span>MMT Group Coupon (MEGHALAYAGROUP4):</span>
              <span>-₹${discount.toLocaleString()}</span>
            </div>

            <div class="fare-row total">
              <div>
                <div>Total Package</div>
                <div style="font-size: 12px; font-weight: 400; color: #777;">₹${perPerson.toLocaleString()} per member</div>
              </div>
              <div style="color: #0084ff;">₹${netTotal.toLocaleString()}</div>
            </div>

            <button class="btn-proceed-cta" id="btn-proceed-to-payment">
              Set Up Member Mandates ➔
            </button>

            <div style="margin-top: 12px; font-size: 11px; color: #7e7e7e; text-align: center;">
              🔒 Individual progressive capture. No unverified pooled escrow.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach handlers
  container.querySelector('#btn-proceed-to-payment')?.addEventListener('click', () => {
    mmtState.setStep('payment');
  });

  container.querySelector('#btn-test-spike-demo')?.addEventListener('click', () => {
    mmtState.triggerPriceSpikeModal();
  });

  container.querySelector('#btn-accept-surge')?.addEventListener('click', () => {
    mmtState.resolvePriceSpike();
  });

  container.querySelector('#btn-switch-flight')?.addEventListener('click', () => {
    mmtState.resolvePriceSpike();
  });

  container.querySelector('#btn-dismiss-surge')?.addEventListener('click', () => {
    mmtState.resolvePriceSpike();
  });
}
