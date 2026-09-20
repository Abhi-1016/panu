// js/components/journey-nav.js - 27-Stage Customer Journey Stepper & Navigator

import { appState } from '../state.js';

export function renderJourneyNavigator(container) {
  const stage = appState.getCurrentStage();
  const stages = appState.state.stages;
  const currentIdx = appState.state.currentStageIndex;
  const totalStages = stages.length;
  const progressPercent = Math.round(((currentIdx + 1) / totalStages) * 100);

  // Group stages by phase for visual dots/segments
  const phases = [
    { name: "1. Discovery & Setup", range: [1, 3] },
    { name: "2. Onboarding & Consent", range: [4, 6] },
    { name: "3. Consensus & Group Chat", range: [7, 10] },
    { name: "4. Scoring & Itinerary", range: [11, 15] },
    { name: "5. Feasibility & Booking", range: [16, 20] },
    { name: "6. Live Trip & Recovery", range: [21, 27] }
  ];

  container.innerHTML = `
    <div class="journey-card">
      <div class="journey-header">
        <div class="journey-phase-badge">${stage.phase}</div>
        <div class="journey-counter">Stage ${stage.stage} of ${totalStages} (${progressPercent}%)</div>
      </div>

      <!-- Phase Segments Bar -->
      <div class="phase-segments-bar">
        ${phases.map((p, idx) => {
          const isActive = stage.stage >= p.range[0] && stage.stage <= p.range[1];
          const isPassed = stage.stage > p.range[1];
          return `
            <div class="phase-segment ${isActive ? 'active' : ''} ${isPassed ? 'completed' : ''}" title="${p.name}">
              <span class="segment-dot"></span>
              <span class="segment-label">${p.name.split('.')[1].trim()}</span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Stage Main Card -->
      <div class="stage-content-body">
        <div class="stage-headline-row">
          <div class="stage-title-wrap">
            <span class="stage-num-tag">STAGE ${stage.stage}</span>
            <h2 class="stage-main-title">${stage.name}</h2>
          </div>
          <span class="stage-actor-badge"><i class="icon-user"></i> ${stage.actor}</span>
        </div>

        <p class="stage-summary-text">${stage.shortDesc}</p>
        <div class="stage-details-box">
          <strong>Customer Experience Flow:</strong> ${stage.details}
        </div>

        <!-- Meta Grid: Loophole Fix & Permission -->
        <div class="stage-meta-grid">
          <div class="stage-meta-card meta-fix">
            <div class="meta-label">
              <span class="meta-icon">🛡️</span> Product Loophole & Fix:
            </div>
            <div class="meta-val">${stage.loopholeFix}</div>
          </div>
          <div class="stage-meta-card meta-perm">
            <div class="meta-label">
              <span class="meta-icon">⚙️</span> Human-In-The-Loop Control:
            </div>
            <div class="meta-val">
              <span class="perm-pill">${stage.permissionLevel}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Controls -->
      <div class="journey-footer-controls">
        <button class="btn btn-secondary" id="btn-prev-stage" ${currentIdx === 0 ? 'disabled' : ''}>
          ← Previous Stage
        </button>

        <div class="stage-quick-select-wrap">
          <select id="stage-select-dropdown" class="stage-select-dropdown" aria-label="Jump to Journey Stage">
            ${stages.map((s, i) => `
              <option value="${s.stage}" ${i === currentIdx ? 'selected' : ''}>
                Stage ${s.stage}: ${s.name} (${s.phase})
              </option>
            `).join('')}
          </select>
        </div>

        <button class="btn btn-primary" id="btn-next-stage" ${currentIdx === totalStages - 1 ? 'disabled' : ''}>
          Next Stage →
        </button>
      </div>

      <div class="journey-testdrive-banner">
        <span>💡 Want to experience this in action?</span>
        <button class="btn-link-action" id="btn-jump-to-workspace">
          Open Live Trip Workspace for this stage →
        </button>
      </div>
    </div>
  `;

  // Attach event listeners
  container.querySelector('#btn-prev-stage')?.addEventListener('click', () => {
    appState.prevStage();
  });

  container.querySelector('#btn-next-stage')?.addEventListener('click', () => {
    appState.nextStage();
  });

  container.querySelector('#stage-select-dropdown')?.addEventListener('change', (e) => {
    appState.setStage(parseInt(e.target.value, 10));
  });

  container.querySelector('#btn-jump-to-workspace')?.addEventListener('click', () => {
    appState.setView('workspace');
  });
}
