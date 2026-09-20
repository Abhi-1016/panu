// js/views/live-view.js - Authentic MakeMyTrip "My Trips" Live Command Center & Disruption Recovery (Stages 21-26 & Section 10)

import { mmtState } from '../mmt-state.js';

export function renderLiveView(container) {
  const isDisrupted = mmtState.state.isDisruptionActive;
  const isResolved = mmtState.state.isDisruptionResolved;

  container.innerHTML = `
    <div class="mmt-page-main">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; color: #008542; background: #e6f7ec; padding: 3px 10px; border-radius: 12px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #1ab64f; display: inline-block;"></span>
            LIVE TRIP DASHBOARD (TRIP #MMT-GRP-8942)
          </div>
          <h2 style="font-size: 22px; font-weight: 800; color: #0a223d; margin-top: 4px;">
            Meghalaya Clouds & Waterfalls Escape
          </h2>
        </div>

        <div style="font-size: 13px; color: #555;">
          📅 16 Oct - 19 Oct 2026 • <strong>Day 1 of 4</strong>
        </div>
      </div>

      <!-- Real-Time Monitoring Sentinel Card (Stage 22) -->
      <div class="live-sentinel-banner ${isDisrupted ? 'alert-active' : ''}">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 28px;">${isDisrupted ? '⚠️' : '📡'}</span>
          <div>
            <h4 style="font-size: 15px; font-weight: 800; color: ${isDisrupted ? '#b35900' : '#008542'};">
              ${isDisrupted ? 'Disruption Detected: Flight IndiGo 6E-542 Delayed by 90 Mins' : 'Myra Live Sentinel: Active (Level 0: Observe)'}
            </h4>
            <p style="font-size: 12px; color: #555;">
              ${isDisrupted 
                ? 'Departure rescheduled to 02:15 PM from BLR. Downstream transit & resort check-in impact mapped below.'
                : 'Monitoring 1 flight radar, 2 hotel check-in cutoffs, Shillong weather and chauffeur location in real time.'
              }
            </p>
          </div>
        </div>

        <div>
          ${!isDisrupted && !isResolved ? `
            <button class="btn-book-mmt" id="btn-live-simulate-delay" style="background: #f5a623; color: #000; font-size: 12px;">
              ⚡ Simulate 90-Min Flight Delay
            </button>
          ` : isResolved ? `
            <span style="color: #008542; font-weight: 800; font-size: 13px;">✓ Adaptive Replanning Applied</span>
          ` : `
            <span style="color: #b35900; font-weight: 800; font-size: 12px;">Evaluating Resolution...</span>
          `}
        </div>
      </div>

      <!-- Disruption Impact Mapping & Adaptive Recovery Workflow (Stages 23-24 & Section 10) -->
      ${isDisrupted ? `
        <div class="disruption-action-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <h3 style="font-size: 16px; font-weight: 800; color: #eb2026;">
              Section 10 — Disruption Impact Mapping & Multi-Option Recovery
            </h3>
            <span style="font-size: 11px; background: #ffebeb; color: #eb2026; padding: 3px 8px; border-radius: 4px; font-weight: 700;">
              Scope: Entire Group (All 4 Pax on Flight 6E-542)
            </span>
          </div>

          <!-- Impact Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px;">
            <div style="background: #fff8f8; border-left: 3px solid #eb2026; padding: 10px; border-radius: 4px; font-size: 12px;">
              <strong>Umiam Lake Sunset Stop:</strong> Will be dark upon arrival at 06:15 PM; viewpoint boating closed.
            </div>
            <div style="background: #fffdf5; border-left: 3px solid #f5a623; padding: 10px; border-radius: 4px; font-size: 12px;">
              <strong>Airport Chauffeur:</strong> Needs rescheduled pickup window at Guwahati Arrivals Gate 2.
            </div>
            <div style="background: #f0fdf4; border-left: 3px solid #1ab64f; padding: 10px; border-radius: 4px; font-size: 12px;">
              <strong>Ri Kynjai Resort Check-in:</strong> Requires 08:30 PM late check-in notification.
            </div>
          </div>

          <!-- 3 Recovery Options -->
          <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 8px;">Generated Recovery Alternatives:</h4>
          <div class="recovery-cards-row">
            <!-- Option A -->
            <div class="recovery-choice-card is-best">
              <span style="font-size: 10px; font-weight: 800; color: #008542; text-transform: uppercase;">⭐ Recommended (Minimal Disruption)</span>
              <h5 style="font-size: 14px; font-weight: 800; margin: 4px 0;">Option A: Shift Lake Photoshoot to Day 4</h5>
              <p style="font-size: 12px; color: #555; margin-bottom: 10px;">
                Head straight to Shillong for Dylan's Cafe live acoustic dinner. Move Umiam photo-stop to Day 4 morning return drive.
              </p>
              <div style="font-size: 11px; background: #e6f7ec; padding: 6px; border-radius: 4px; margin-bottom: 10px;">
                Time impact: <strong>0 min wasted</strong> • Extra Cost: <strong style="color: #008542;">₹0</strong>
              </div>
              <button class="btn-book-mmt btn-choose-opt" data-opt="opt-a" style="width: 100%; font-size: 11px; padding: 6px;">
                Approve Option A (Admin)
              </button>
            </div>

            <!-- Option B -->
            <div class="recovery-choice-card">
              <span style="font-size: 10px; font-weight: 800; color: #666; text-transform: uppercase;">Option B: Fast Express Drive</span>
              <h5 style="font-size: 14px; font-weight: 800; margin: 4px 0;">Option B: Direct to Lake Night View</h5>
              <p style="font-size: 12px; color: #555; margin-bottom: 10px;">
                Skip Dylan's Cafe town crawl, proceed straight to lake night lights, dine at Ri Kynjai in-house restaurant.
              </p>
              <div style="font-size: 11px; background: #f0f0f0; padding: 6px; border-radius: 4px; margin-bottom: 10px;">
                Time impact: <strong>+40 min drive</strong> • Extra Cost: <strong>₹0</strong>
              </div>
              <button class="btn-open-prefs btn-choose-opt" data-opt="opt-b" style="width: 100%; font-size: 11px; padding: 6px;">
                Select Option B
              </button>
            </div>

            <!-- Option C -->
            <div class="recovery-choice-card">
              <span style="font-size: 10px; font-weight: 800; color: #666; text-transform: uppercase;">Option C: Individual Scope Split</span>
              <h5 style="font-size: 14px; font-weight: 800; margin: 4px 0;">Option C: Member Cab Split</h5>
              <p style="font-size: 12px; color: #555; margin-bottom: 10px;">
                If Priya or Rohan wish to rest at resort while Kabir & Tanya explore night street, split local cab drops.
              </p>
              <div style="font-size: 11px; background: #f0f0f0; padding: 6px; border-radius: 4px; margin-bottom: 10px;">
                Time impact: <strong>+20 mins</strong> • Extra Cost: <strong>+₹450 cab surcharge</strong>
              </div>
              <button class="btn-open-prefs btn-choose-opt" data-opt="opt-c" style="width: 100%; font-size: 11px; padding: 6px;">
                Select Option C
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      ${isResolved ? `
        <div style="background: #e6f7ec; border: 1px solid #a3e6ba; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">✅</span>
            <div>
              <h4 style="font-size: 15px; font-weight: 800; color: #008542;">Adaptive Rebooking Confirmed!</h4>
              <p style="font-size: 12px; color: #333;">
                Chauffeur Biplab notified of 04:45 PM pickup. Ri Kynjai late check-in registered. Umiam Lake rescheduled to Day 4.
              </p>
            </div>
          </div>
          <button class="btn-open-prefs" id="btn-reset-disruption" style="font-size: 11px;">
            Reset Simulation
          </button>
        </div>
      ` : ''}

      <!-- Authentic MMT Tickets, Passes & Vouchers Cards -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <!-- Boarding Pass Card -->
        <div style="background: #ffffff; border: 1px solid #e7e7e7; border-radius: 8px; padding: 18px; box-shadow: var(--mmt-shadow-sm);">
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 12px;">
            <span>✈️ IndiGo 6E-542</span>
            <span style="color: #008542;">Web Check-in Done</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div>
              <div style="font-size: 20px; font-weight: 900;">BLR</div>
              <div style="font-size: 11px; color: #7e7e7e;">Bengaluru</div>
              <div style="font-size: 12px; font-weight: 700;">12:45 PM</div>
            </div>
            <div style="color: #888;">➔</div>
            <div>
              <div style="font-size: 20px; font-weight: 900;">GAU</div>
              <div style="font-size: 11px; color: #7e7e7e;">Guwahati</div>
              <div style="font-size: 12px; font-weight: 700;">03:15 PM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #555; border-top: 1px solid #eee; padding-top: 8px;">
            Seats: <strong>12A, 12B, 12C, 12D (4 Pax)</strong> • Gate 14B
          </div>
        </div>

        <!-- Chauffeur Card -->
        <div style="background: #ffffff; border: 1px solid #e7e7e7; border-radius: 8px; padding: 18px; box-shadow: var(--mmt-shadow-sm);">
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 12px;">
            <span>🚖 MMT Dedicated Chauffeur</span>
            <span style="color: #008542;">Assigned</span>
          </div>
          <div style="font-size: 15px; font-weight: 800; margin-bottom: 2px;">Biplab Sangma</div>
          <div style="font-size: 12px; color: #555;">Toyota Innova Crysta AC (7-Seater)</div>
          <div style="font-size: 12px; font-weight: 700; color: #005f9e; margin-top: 4px;">Vehicle: AS-01-EQ-9821</div>
          <div style="font-size: 11px; color: #555; border-top: 1px solid #eee; padding-top: 8px; margin-top: 10px;">
            Contact: <strong>+91 98450 XXXXX</strong> • 4.9 ★ Rating
          </div>
        </div>

        <!-- Hotel Voucher -->
        <div style="background: #ffffff; border: 1px solid #e7e7e7; border-radius: 8px; padding: 18px; box-shadow: var(--mmt-shadow-sm);">
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 12px;">
            <span>🏨 Resort Voucher</span>
            <span style="color: #008542;">Confirmed</span>
          </div>
          <div style="font-size: 15px; font-weight: 800; margin-bottom: 2px;">Ri Kynjai Lake Resort</div>
          <div style="font-size: 12px; color: #555;">2 Superior Lake Cottages (Oct 16-17)</div>
          <div style="font-size: 11px; color: #008542; font-weight: 700; margin-top: 4px;">
            🥗 Pure Veg Breakfast Included
          </div>
          <div style="font-size: 11px; color: #555; border-top: 1px solid #eee; padding-top: 8px; margin-top: 10px;">
            Booking ID: <strong>MMT-HTL-77412</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach handlers
  container.querySelector('#btn-live-simulate-delay')?.addEventListener('click', () => {
    mmtState.triggerDisruption();
  });

  container.querySelectorAll('.btn-choose-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const opt = btn.getAttribute('data-opt');
      mmtState.resolveDisruption(opt);
    });
  });

  container.querySelector('#btn-reset-disruption')?.addEventListener('click', () => {
    mmtState.resetDisruption();
  });
}
