// js/views/payment-view.js - MMT Progressive Mandate Payment Gateway (Stages 19-20 & Section 9)

import { mmtState } from '../mmt-state.js';

export function renderPaymentView(container) {
  const members = mmtState.state.members;

  container.innerHTML = `
    <div class="mmt-page-main">
      <div style="margin-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 700; color: #7e7e7e; text-transform: uppercase;">
          Stages 19–20 & Section 9 • Regulated Payment Architecture
        </span>
        <h2 style="font-size: 22px; font-weight: 800; color: #0a223d;">
          Progressive Payment Mandates & Booking Execution
        </h2>
      </div>

      <!-- Progressive Mandate Explainer -->
      <div style="background: #e6f7ec; border-left: 4px solid #1ab64f; border-radius: 4px; padding: 14px 18px; margin-bottom: 20px; font-size: 13px; color: #008542;">
        <strong>Section 9 Safeguard — Individual Authorisations:</strong> MMT does not hold pooled customer money in an informal account. Each member signs an individual UPI/Card mandate. Funds are progressively captured strictly as each booking component is successfully confirmed.
      </div>

      <div class="review-booking-container">
        <!-- Main Column: Member Mandate Cards -->
        <div class="review-main-column">
          <div class="mandate-progress-card">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e7e7e7; padding-bottom: 12px;">
              <h3 style="font-size: 16px; font-weight: 800;">Member Payment Mandates Status</h3>
              <span style="font-size: 11px; font-weight: 800; color: #008542; background: #e6f7ec; padding: 3px 8px; border-radius: 12px;">
                4/4 Mandates Active (RBI Compliant)
              </span>
            </div>

            <!-- 4 Member Cards -->
            <div class="mandates-grid">
              ${members.map(m => `
                <div class="mandate-box">
                  <div class="mandate-box-top">
                    <span>${m.name} (${m.role})</span>
                    <span style="color: #008542;">✓ Mandate Set</span>
                  </div>
                  <div style="font-size: 11px; color: #666; margin-bottom: 8px;">
                    UPI ID: <strong>${m.upiId}</strong>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px; background: #f0f0f0; padding: 6px 8px; border-radius: 4px; margin-bottom: 6px;">
                    <div>Authorized: <strong>₹${m.mandateAmount.toLocaleString()}</strong></div>
                    <div>Captured: <strong style="color: #008542;">₹${m.capturedAmount.toLocaleString()}</strong></div>
                  </div>

                  <div style="font-size: 10px; color: #7e7e7e;">
                    🔒 Remaining ₹${(m.mandateAmount - m.capturedAmount).toLocaleString()} held in user's bank & auto-released post-trip.
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Execution Order Timeline (Scarcity Order) -->
          <div class="mandate-progress-card">
            <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px;">
              Stage 19: Scarcity-First Execution Pipeline
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fbff; border: 1px solid #c2e0ff; padding: 10px 14px; border-radius: 6px;">
                <div>
                  <div style="font-weight: 700; font-size: 13px;">#1 Priority: IndiGo 6E-542 Flight Seats (4 Pax)</div>
                  <div style="font-size: 11px; color: #eb2026; font-weight: 700;">⚡ Scarcity Alert: Only 4 seats left at this fare</div>
                </div>
                <span style="color: #008542; font-weight: 800; font-size: 12px;">✓ Confirmed & Captured</span>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fbff; border: 1px solid #c2e0ff; padding: 10px 14px; border-radius: 6px;">
                <div>
                  <div style="font-weight: 700; font-size: 13px;">#2 Priority: Ri Kynjai Lake Resort (2 Cottages)</div>
                  <div style="font-size: 11px; color: #555;">Boutique lake property • Pure veg dining confirmed</div>
                </div>
                <span style="color: #008542; font-weight: 800; font-size: 12px;">✓ Confirmed & Captured</span>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fbff; border: 1px solid #c2e0ff; padding: 10px 14px; border-radius: 6px;">
                <div>
                  <div style="font-weight: 700; font-size: 13px;">#3 Priority: Innova Crysta Chauffeur Transfer</div>
                  <div style="font-size: 11px; color: #555;">4 Days Dedicated Chauffeur AS-01-EQ-9821</div>
                </div>
                <span style="color: #008542; font-weight: 800; font-size: 12px;">✓ Confirmed & Captured</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Summary -->
        <div class="review-sidebar-column">
          <div class="fare-summary-card">
            <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px;">Mandate Summary</h3>
            <div class="fare-row">
              <span>Total Package:</span>
              <span>₹1,03,700</span>
            </div>
            <div class="fare-row">
              <span>Total Authorized:</span>
              <span>₹1,30,000</span>
            </div>
            <div class="fare-row" style="color: #008542; font-weight: 700;">
              <span>Total Captured:</span>
              <span>₹1,00,100</span>
            </div>
            <div class="fare-row total">
              <div>Booking State</div>
              <div style="color: #1ab64f;">CONFIRMED</div>
            </div>

            <button class="btn-proceed-cta" id="btn-open-live-trip">
              View Live Trip Dashboard ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach handlers
  container.querySelector('#btn-open-live-trip')?.addEventListener('click', () => {
    mmtState.setStep('live');
  });
}
