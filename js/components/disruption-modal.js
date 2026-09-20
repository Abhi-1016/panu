// js/components/disruption-modal.js - Live Trip Dashboard & Dynamic Disruption Recovery (Stages 21-25 & Section 10)

import { appState } from '../state.js';

export function renderLiveTripDashboard(container) {
  const disruption = appState.state.disruption;
  const isDisrupted = appState.state.disruptionActive;
  const isResolved = appState.state.disruptionResolved;
  const chosenOption = appState.state.selectedResolutionOption;

  container.innerHTML = `
    <div class="live-dashboard-panel">
      <!-- Top Live Trip Header -->
      <div class="live-header">
        <div class="live-trip-badge">
          <span class="live-pulse"></span> LIVE TRIP ACTIVE
        </div>
        <h2 class="panel-heading">Shillong & Cherrapunji Explorer</h2>
        <div class="live-quick-meta">
          <span>✈️ BLR ➔ GAU (IndiGo 6E-542)</span>
          <span>📅 Day 1 of 4</span>
          <span>👥 4 Travellers Checked-in</span>
        </div>
      </div>

      <!-- Live Monitoring Sentinel & Disruption Trigger Box -->
      <div class="monitoring-sentinel-card ${isDisrupted ? 'alert-active' : ''}">
        <div class="sentinel-left">
          <div class="sentinel-radar-icon">${isDisrupted ? '⚠️' : '📡'}</div>
          <div>
            <h4>${isDisrupted ? 'Real-Time Disruption Alert Detected' : 'Myra Real-Time Sentinel Active (Level 0: Observe)'}</h4>
            <p class="sentinel-text">
              ${isDisrupted 
                ? disruption.trigger 
                : 'Monitoring 1 flight route, 2 hotel check-in cutoffs, and Shillong weather radar. All systems operational.'
              }
            </p>
          </div>
        </div>

        <div class="sentinel-right">
          ${!isDisrupted && !isResolved ? `
            <button class="btn btn-warning" id="btn-trigger-disruption">
              ⚡ Simulate 90-Min Flight Delay
            </button>
          ` : isResolved ? `
            <span class="resolved-tag">✓ Replanned & Rescheduled</span>
          ` : `
            <span class="disrupt-eval-tag">Calculating Downstream Impact...</span>
          `}
        </div>
      </div>

      <!-- Disruption Impact & Recovery Resolution Workflow (Stages 23-24) -->
      ${isDisrupted ? `
        <div class="disruption-recovery-workflow">
          <div class="workflow-header">
            <h3>Disruption Impact Mapping & Recovery Options</h3>
            <span class="scope-pill">Section 10: Dynamic Disruption & Recovery</span>
          </div>

          <!-- Impact Mapping Matrix -->
          <div class="impact-mapping-grid">
            ${disruption.impactMapping.map(imp => `
              <div class="impact-item-box ${imp.severity.toLowerCase()}">
                <div class="impact-item-header">
                  <span class="severity-dot"></span>
                  <strong>${imp.item}</strong>
                </div>
                <div class="impact-desc">${imp.impact}</div>
              </div>
            `).join('')}
          </div>

          <!-- Scope Determination: Individual vs Group (Stage 24) -->
          <div class="scope-selection-banner">
            <span class="scope-banner-icon">👥</span>
            <div>
              <strong>Stage 24 — Scope Determination:</strong>
              Does this disruption affect all 4 members or only 1 person? All 4 members are on the same BLR-GAU flight, so a coordinated group change is required.
            </div>
          </div>

          <!-- Recovery Alternative Cards (Option Generation) -->
          <div class="recovery-options-grid">
            ${disruption.options.map(opt => `
              <div class="recovery-opt-card ${opt.recommended ? 'is-recommended' : ''}">
                ${opt.recommended ? '<div class="rec-badge">⭐ Recommended (Minimal Disruption)</div>' : ''}
                <h4 class="opt-title">${opt.title}</h4>
                <p class="opt-desc">${opt.desc}</p>

                <div class="opt-metrics-row">
                  <div class="opt-metric">
                    <span class="m-lbl">Time Impact:</span>
                    <span class="m-val">${opt.timeImpact}</span>
                  </div>
                  <div class="opt-metric">
                    <span class="m-lbl">Cost Impact:</span>
                    <span class="m-val text-green">${opt.costImpact}</span>
                  </div>
                  <div class="opt-metric">
                    <span class="m-lbl">Feasibility:</span>
                    <span class="m-val">${opt.feasibility}</span>
                  </div>
                </div>

                <button class="btn btn-sm ${opt.recommended ? 'btn-primary' : 'btn-secondary'} btn-select-recovery" data-option="${opt.id}">
                  Approve This Recovery Plan
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${isResolved ? `
        <div class="resolution-success-card">
          <div class="success-icon">✓</div>
          <div class="success-info">
            <h4>Adaptive Recovery Executed Successfully!</h4>
            <p>
              Myra rescheduled Innova Crysta pickup to 05:00 PM at Guwahati Airport, shifted Umiam Lake photoshoot to Day 4 return drive, and alerted Ri Kynjai Resort for a relaxed 07:30 PM check-in. All tickets & vouchers updated.
            </p>
          </div>
          <button class="btn btn-sm btn-ghost" id="btn-reset-disruption">Reset Disruption Simulation</button>
        </div>
      ` : ''}

      <!-- Live Vouchers, Passes & Digital Documents Grid -->
      <div class="live-documents-grid">
        <!-- Flight Boarding Pass -->
        <div class="live-doc-card">
          <div class="doc-card-top">
            <span class="doc-type">✈️ Digital Boarding Pass</span>
            <span class="doc-status status-active">On-Time</span>
          </div>
          <div class="doc-flight-route">
            <div class="flight-city">
              <div class="city-code">BLR</div>
              <div class="city-name">Bengaluru</div>
              <div class="flight-time">12:45 PM</div>
            </div>
            <div class="flight-arrow">➔</div>
            <div class="flight-city">
              <div class="city-code">GAU</div>
              <div class="city-name">Guwahati</div>
              <div class="flight-time">03:15 PM</div>
            </div>
          </div>
          <div class="doc-details-row">
            <span>Flight: 6E-542</span>
            <span>Gate: 14B</span>
            <span>Seats: 12A-12D (4 Pax)</span>
          </div>
        </div>

        <!-- Chauffeur Pickup Card -->
        <div class="live-doc-card">
          <div class="doc-card-top">
            <span class="doc-type">🚖 Airport Transfer Chauffeur</span>
            <span class="doc-status status-active">Assigned</span>
          </div>
          <div class="doc-chauffeur-info">
            <div class="driver-name">Biplab Sangma</div>
            <div class="car-number">Innova Crysta • AS-01-EQ-9821</div>
            <div class="driver-rating">★ 4.9 (420+ Trips in Meghalaya)</div>
          </div>
          <div class="doc-details-row">
            <span>Pickup: Guwahati Arrivals Gate 2</span>
            <span>Contact: +91 98450 XXXXX</span>
          </div>
        </div>

        <!-- Hotel Voucher -->
        <div class="live-doc-card">
          <div class="doc-card-top">
            <span class="doc-type">🏨 Ri Kynjai Resort Voucher</span>
            <span class="doc-status status-confirmed">Confirmed</span>
          </div>
          <div class="doc-hotel-info">
            <div class="hotel-title">Ri Kynjai - Serenity by The Lake</div>
            <div class="hotel-dates">Oct 16 - Oct 17 • 2 Superior Lake Cottages</div>
            <div class="hotel-perks">✨ Complimentary Breakfast & High-Tea Included</div>
          </div>
          <div class="doc-details-row">
            <span>Booking ID: MMT-HTL-77412</span>
            <span>Veg Kitchen: Verified</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelector('#btn-trigger-disruption')?.addEventListener('click', () => {
    appState.triggerDisruption();
  });

  container.querySelectorAll('.btn-select-recovery').forEach(btn => {
    btn.addEventListener('click', () => {
      const optId = btn.getAttribute('data-option');
      appState.resolveDisruption(optId);
    });
  });

  container.querySelector('#btn-reset-disruption')?.addEventListener('click', () => {
    appState.state.disruptionActive = false;
    appState.state.disruptionResolved = false;
    appState.notify("DISRUPTION_RESET", {});
  });
}
