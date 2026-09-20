// js/components/booking-console.js - Scoped Agentic Booking & Progressive Payment (Stages 18-20 & Sections 8-9)

import { appState } from '../state.js';

export function renderBookingConsole(container) {
  const pipeline = appState.state.bookingPipeline;
  const members = appState.state.members;
  const isPaused = appState.state.isBookingPaused;
  const pauseDetails = appState.state.pauseExceptionDetails;

  const totalTripCost = pipeline.reduce((sum, item) => sum + item.amount, 0);
  const perPersonCost = Math.round(totalTripCost / members.length);

  container.innerHTML = `
    <div class="booking-workspace-panel">
      <!-- Section Header -->
      <div class="booking-header">
        <div>
          <div class="section-kicker">Stages 18–20 & Sections 8–9 • Agentic Booking & Progressive Capture</div>
          <h2 class="panel-heading">Permissioned Booking Console</h2>
          <p class="panel-subtext">
            Myra executes pre-approved bookings in scarcity priority order. Funds are captured progressively from individual member mandates.
          </p>
        </div>
        
        <div class="booking-summary-pill">
          <div class="pill-label">Total Group Booking</div>
          <div class="pill-amount">₹${totalTripCost.toLocaleString()} <span class="per-person">(₹${perPersonCost.toLocaleString()}/person)</span></div>
        </div>
      </div>

      <!-- Scoped Permission Card (HITL Level 3) -->
      <div class="permission-scope-card">
        <div class="scope-icon-wrap">🛡️</div>
        <div class="scope-text-wrap">
          <div class="scope-title-row">
            <h4>Human-in-the-Loop Booking Permission Granted</h4>
            <span class="scope-badge">Level 3: Scoped Execution</span>
          </div>
          <div class="scope-rules-grid">
            <div class="scope-rule"><strong>Approved Scope:</strong> Flights (IndiGo) + Ri Kynjai & Polo Orchid Resorts</div>
            <div class="scope-rule"><strong>Spending Cap:</strong> Max ₹28,000 / member</div>
            <div class="scope-rule"><strong>Price Tolerance Cap:</strong> ₹1,500 max auto-variation allowance</div>
            <div class="scope-rule"><strong>Pause Trigger:</strong> Non-refundable change or price spike &gt; ₹1,500 requires Level 5 escalation</div>
          </div>
        </div>
        <button class="btn btn-sm btn-ghost" id="btn-trigger-pause-demo">
          ⚡ Simulate Price Spike Exception
        </button>
      </div>

      <!-- Exception Alert Modal / Banner if Paused -->
      ${isPaused && pauseDetails ? `
        <div class="exception-alert-banner">
          <div class="exception-header">
            <span class="exception-icon">🛑</span>
            <div class="exception-title-group">
              <h3>Myra Agentic Booking Paused: Human Checkpoint Needed</h3>
              <span class="exception-level">Escalated to Level 5: Human Confirmation Required</span>
            </div>
          </div>
          
          <div class="exception-body">
            <p><strong>Item Affected:</strong> ${pauseDetails.item}</p>
            <p class="exception-reason-text"><strong>Issue:</strong> ${pauseDetails.issue} (${pauseDetails.reason})</p>
            
            <div class="exception-actions">
              <button class="btn btn-sm btn-primary" id="btn-accept-spike">
                Accept Price Spike & Resume Booking
              </button>
              <button class="btn btn-sm btn-secondary" id="btn-alt-flight">
                Switch to Air India (₹6,400)
              </button>
              <button class="btn btn-sm btn-ghost" id="btn-cancel-spike">
                Keep on Hold
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Booking Execution Pipeline (Scarcity Priority Order) -->
      <div class="booking-columns-grid">
        <div class="pipeline-column">
          <div class="column-header-row">
            <h3>Scarcity Priority Execution Order</h3>
            <span class="dependency-hint">Rule: High Scarcity items booked first to prevent orphaned reservations</span>
          </div>

          <div class="pipeline-items-list">
            ${pipeline.map((item, idx) => `
              <div class="pipeline-item-card status-${item.status.toLowerCase().replace(/\s+/g, '-')}">
                <div class="pipeline-rank-badge">#${idx + 1} Priority</div>
                
                <div class="pipeline-item-main">
                  <div class="pipeline-item-top">
                    <h4 class="pipeline-item-title">${item.component}</h4>
                    <span class="pipeline-cost">₹${item.amount.toLocaleString()}</span>
                  </div>
                  <div class="pipeline-provider">${item.provider}</div>
                  <div class="pipeline-scarcity">
                    <span class="scarcity-indicator">⚡ ${item.scarcity}</span>
                  </div>

                  <div class="pipeline-progress-bar-wrap">
                    <div class="progress-track">
                      <div class="progress-fill" style="width: ${item.progress}%;"></div>
                    </div>
                    <div class="progress-text-row">
                      <span class="status-label">✓ ${item.status}</span>
                      <span class="capture-label">${item.captureStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 9: Regulated Individual Payment Mandates -->
        <div class="payment-safeguards-column">
          <div class="column-header-row">
            <h3>Section 9: Progressive Mandate Architecture</h3>
            <span class="mandate-badge">RBI Compliant Individual Mandates</span>
          </div>

          <p class="payment-model-explainer">
            Instead of holding customer money in an informal pooled escrow, each member signs an individual UPI/Card mandate. Money is progressively captured strictly as each booking confirms.
          </p>

          <div class="member-mandates-list">
            ${members.map(m => `
              <div class="member-mandate-card">
                <div class="mandate-member-top">
                  <div class="member-info-mini">
                    <img src="${m.avatar}" alt="${m.name}" class="member-mandate-avatar" />
                    <div>
                      <div class="member-mandate-name">${m.name}</div>
                      <div class="member-mandate-role">${m.role}</div>
                    </div>
                  </div>
                  <span class="mandate-tag">Mandate Active</span>
                </div>

                <div class="mandate-stats-grid">
                  <div class="mandate-stat">
                    <span class="stat-lbl">Authorized:</span>
                    <span class="stat-val">₹${m.authAmount.toLocaleString()}</span>
                  </div>
                  <div class="mandate-stat">
                    <span class="stat-lbl">Captured:</span>
                    <span class="stat-val text-green">₹${m.paidAmount.toLocaleString()}</span>
                  </div>
                  <div class="mandate-stat">
                    <span class="stat-lbl">Uncaptured:</span>
                    <span class="stat-val text-muted">₹${(m.authAmount - m.paidAmount).toLocaleString()}</span>
                  </div>
                </div>

                <div class="mandate-footer-audit">
                  <span>🔒 Auto-releases remaining ₹${(m.authAmount - m.paidAmount).toLocaleString()} after trip</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Exception trigger demo
  container.querySelector('#btn-trigger-pause-demo')?.addEventListener('click', () => {
    appState.triggerBookingPauseSimulation();
  });

  container.querySelector('#btn-accept-spike')?.addEventListener('click', () => {
    appState.resumeBookingWithResolution('Accepted Spike');
  });

  container.querySelector('#btn-alt-flight')?.addEventListener('click', () => {
    appState.resumeBookingWithResolution('Switched to Air India');
  });

  container.querySelector('#btn-cancel-spike')?.addEventListener('click', () => {
    appState.resumeBookingWithResolution('Cancelled Spike');
  });
}
