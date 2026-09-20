// js/components/itinerary-board.js - Day-wise Itinerary, Route Optimisation & Experience Selection (Stages 12-15)

import { appState } from '../state.js';

export function renderItineraryBoard(container) {
  const days = appState.state.itineraryDays;
  const isOptimized = appState.state.isRouteOptimized;

  container.innerHTML = `
    <div class="itinerary-workspace-panel">
      <!-- Toolbar -->
      <div class="itinerary-toolbar">
        <div class="toolbar-left">
          <div class="section-kicker">Stage 12–15 • Dynamic Itinerary & Route Optimisation</div>
          <h2 class="panel-heading">Day-Wise Group Plan</h2>
          <div class="itinerary-summary-tags">
            <span class="tag-badge">📅 Oct 16 - Oct 19</span>
            <span class="tag-badge">📍 4 Days • 14 Curated Stops</span>
            <span class="tag-badge tag-green">✓ Rohan's 11:30 AM Call Respected</span>
            <span class="tag-badge tag-purple">✓ Pure Veg Stops for Priya</span>
          </div>
        </div>

        <div class="toolbar-right">
          <div class="optimisation-toggle-card">
            <div class="toggle-info">
              <span class="toggle-title">AI Route Optimisation</span>
              <span class="toggle-sub">${isOptimized ? 'Active: Avoids 42 km backtracking (Saves 3.5 hrs)' : 'Standard User Order (High road fatigue)'}</span>
            </div>
            <button class="btn btn-sm ${isOptimized ? 'btn-success' : 'btn-secondary'}" id="btn-toggle-route-opt">
              ${isOptimized ? '✓ Route Optimized' : 'Apply AI Route'}
            </button>
          </div>
        </div>
      </div>

      <!-- Backtracking Callout Banner -->
      ${isOptimized ? `
        <div class="backtracking-callout">
          <div class="callout-icon">✨</div>
          <div class="callout-text">
            <strong>Myra Itinerary Agent Optimization:</strong> Reordered Nohkalikai Waterfalls before Mawsmai Caves on Day 2. Eliminates hill backtracking, syncs with daylight photography windows, and places lunch at Orange Roots (pure veg) along the transit path.
          </div>
        </div>
      ` : ''}

      <!-- Day Columns / Stack -->
      <div class="days-container">
        ${days.map((dayObj, dayIdx) => `
          <div class="day-card" data-day-index="${dayIdx}">
            <div class="day-card-header">
              <div class="day-number-badge">Day ${dayObj.day}</div>
              <div class="day-header-meta">
                <h3 class="day-title">${dayObj.title}</h3>
                <span class="day-date">${dayObj.date} • ${dayObj.summary}</span>
              </div>
            </div>

            <div class="day-items-timeline">
              ${dayObj.items.map((item, itemIdx) => `
                <div class="timeline-item-card ${item.locked ? 'is-locked' : ''} ${item.type.toLowerCase()}">
                  <div class="item-time-pill">${item.time}</div>
                  
                  <div class="item-main-content">
                    <div class="item-type-row">
                      <span class="type-tag tag-${item.type.toLowerCase()}">${item.type}</span>
                      <span class="badge-feature">${item.badge}</span>
                      ${item.locked ? '<span class="lock-indicator" title="Admin Locked">🔒 Locked</span>' : ''}
                    </div>

                    <h4 class="item-title">${item.title}</h4>
                    <p class="item-details">${item.details}</p>

                    ${item.type === 'Food' ? `
                      <div class="partner-meta-box">
                        <span class="verified-tag">🍽️ Verified Kitchen Rating: 4.8/5</span>
                        <span class="diet-tag">🥗 Pure Vegetarian Options Certified</span>
                      </div>
                    ` : ''}
                  </div>

                  <div class="item-actions">
                    <button 
                      class="btn-icon-lock ${item.locked ? 'locked' : 'unlocked'}" 
                      title="${item.locked ? 'Unlock item' : 'Lock item against AI auto-reordering'}"
                      data-day="${dayIdx}" 
                      data-item="${itemIdx}"
                    >
                      ${item.locked ? '🔒' : '🔓'}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Event handlers
  container.querySelector('#btn-toggle-route-opt')?.addEventListener('click', () => {
    appState.toggleRouteOptimization();
  });

  container.querySelectorAll('.btn-icon-lock').forEach(btn => {
    btn.addEventListener('click', () => {
      const dayIdx = parseInt(btn.getAttribute('data-day'), 10);
      const itemIdx = parseInt(btn.getAttribute('data-item'), 10);
      appState.toggleItemLock(dayIdx, itemIdx);
    });
  });
}
