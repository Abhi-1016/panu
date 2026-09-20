// js/components/permission-matrix.js - Human-in-the-Loop (HITL) Framework & Loopholes/Fixes (Sections 6 & 15)

import { PERMISSION_LEVELS, MEMBERS } from '../data.js';
import { appState } from '../state.js';

export function renderPermissionMatrix(container) {
  const currentPersona = appState.getActivePersona();

  const loopholes = [
    { risk: "Automatic exposure of booking history", problem: "Privacy breach & social discomfort", fix: "Consent-based private preference extraction; share only aggregate summaries to group." },
    { risk: "Mandatory app download for invitees", problem: "High onboarding friction & drop-offs", fix: "Deep link, lightweight web join; account creation only when booking/paying." },
    { risk: "Majority vote ignores member hard constraint", problem: "Infeasible trip / excluded friend", fix: "Hard constraints override simple majority. Admin review required." },
    { risk: "Rigid single fixed budget number", problem: "Too brittle for dynamic trip options", fix: "3-Tier budget: Preferred budget + flexible range + hard limit with privacy toggle." },
    { risk: "AI constantly interrupts group chat", problem: "Annoying & poor social experience", fix: "Passive-by-default; intervenes only when tagged @Myra or on hard conflict." },
    { risk: "Black-box destination scoring", problem: "Low customer trust & confusion", fix: "Explainable factors, transparent weights, 'Why this scored higher' breakdown." },
    { risk: "AI books without clear scoped authority", problem: "Severe financial & legal risk", fix: "Explicit scoped permissions, spending caps, and pause on exception." },
    { risk: "Informal pooled escrow account", problem: "Regulatory & refund nightmare", fix: "Compliant payment partner: individual member mandates & progressive capture." },
    { risk: "Hotel booked before scarce transport", problem: "Orphaned hotel without flight seats", fix: "Scarcity-first dependency-aware booking order." },
    { risk: "One member's disruption changes everyone's plan", problem: "Group conflict & derailed vacation", fix: "Individual vs group replanning with explicit scope selection." }
  ];

  container.innerHTML = `
    <div class="permission-matrix-panel">
      <!-- Section 6 Header -->
      <div class="perm-section-header">
        <div>
          <div class="section-kicker">Section 6 • Core Design Principle</div>
          <h2 class="panel-heading">Human-in-the-Loop Permission Framework</h2>
          <p class="panel-subtext">
            Myra can be agentic without becoming dangerously autonomous. Every action operates inside a defined permission boundary.
          </p>
        </div>
      </div>

      <!-- Permission Levels 0 - 5 Cards -->
      <div class="perm-levels-grid">
        ${PERMISSION_LEVELS.map(lvl => `
          <div class="perm-level-card ${lvl.badgeClass}">
            <div class="perm-card-top">
              <span class="level-indicator">${lvl.level}</span>
              <span class="risk-badge">${lvl.risk}</span>
            </div>
            <h4 class="level-name">${lvl.name}</h4>
            <div class="level-desc">
              <div class="desc-row"><strong>Examples:</strong> ${lvl.example}</div>
              <div class="desc-row"><strong>Control Rule:</strong> ${lvl.controlRule}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Active Persona Settings & Privacy Drawer -->
      <div class="persona-context-box">
        <div class="persona-context-header">
          <h3>Member Profile & Privacy Layer</h3>
          <span class="persona-active-badge">Active View: ${currentPersona.name} (${currentPersona.role})</span>
        </div>
        
        <div class="persona-details-grid">
          <div class="p-col">
            <span class="p-lbl">3-Tier Budget:</span>
            <div class="p-budget-chips">
              <span class="chip chip-pref">Preferred: ₹${currentPersona.prefBudget.toLocaleString()}</span>
              <span class="chip chip-flex">Flex: ₹${currentPersona.flexBudget.toLocaleString()}</span>
              <span class="chip chip-hard">Hard Limit: ₹${currentPersona.hardLimit.toLocaleString()}</span>
            </div>
            <span class="privacy-note">${currentPersona.isBudgetPrivate ? '🔒 Exact budget is hidden from group (private to Myra)' : '👥 Budget visible to group members'}</span>
          </div>

          <div class="p-col">
            <span class="p-lbl">Food & Pace:</span>
            <div class="p-val">🥗 ${currentPersona.diet} • 🚶 ${currentPersona.pace}</div>
            <div class="p-stay">🏨 Prefers: ${currentPersona.hotelPref}</div>
          </div>

          <div class="p-col">
            <span class="p-lbl">MMT Booking History Consent:</span>
            <div class="p-val">${currentPersona.historyShared ? '✓ Consented to aggregate preference extraction' : '✗ Private mode enabled (no history shared)'}</div>
            <span class="p-mandate">💳 ${currentPersona.authStatus}</span>
          </div>
        </div>
      </div>

      <!-- Section 15: Loopholes and Product Fixes Table -->
      <div class="loopholes-section">
        <div class="loopholes-header">
          <h3>Section 15: Major Loopholes and Product Fixes</h3>
          <p>How Myra 2.0 proactively mitigates coordination, financial, and UX risks in group travel.</p>
        </div>

        <div class="loopholes-table-wrap">
          <table class="loopholes-table">
            <thead>
              <tr>
                <th>Identified Travel Loophole</th>
                <th>Underlying Risk</th>
                <th>Myra 2.0 Product Fix</th>
              </tr>
            </thead>
            <tbody>
              ${loopholes.map(item => `
                <tr>
                  <td class="td-loophole"><strong>${item.risk}</strong></td>
                  <td class="td-risk"><span class="risk-tag">⚠️ ${item.problem}</span></td>
                  <td class="td-fix"><span class="fix-check">✓</span> ${item.fix}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
