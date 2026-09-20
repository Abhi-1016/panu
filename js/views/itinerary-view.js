// js/views/itinerary-view.js - MMT Holiday Package Day-Wise Itinerary & Route Optimization (Stages 12-15)

import { mmtState } from '../mmt-state.js';

export function renderItineraryView(container) {
  const itinerary = mmtState.state.itinerary;
  const isOptimized = mmtState.state.isRouteOptimized;

  container.innerHTML = `
    <div class="mmt-page-main">
      <!-- Breadcrumb & Top Controls -->
      <div style="background: #ffffff; border: 1px solid #e7e7e7; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div>
          <span style="font-size: 11px; font-weight: 700; color: #7e7e7e; text-transform: uppercase;">
            MakeMyTrip Holiday Packages • Myra 2.0 Collaborative Planner
          </span>
          <h2 style="font-size: 20px; font-weight: 800; color: #0a223d;">
            Meghalaya 4-Day Group Route & Experiences
          </h2>
          <div style="font-size: 12px; color: #555; margin-top: 4px;">
            16 Oct - 19 Oct 2026 • 4 Travellers • 14 Curated Stops
          </div>
        </div>

        <!-- AI Route Optimisation Toggle (Stage 13) -->
        <div style="display: flex; align-items: center; gap: 12px; background: #f0f8ff; border: 1px solid #b8daff; padding: 8px 16px; border-radius: 8px;">
          <div>
            <div style="font-size: 12px; font-weight: 800; color: #005f9e;">
              ${isOptimized ? '✨ AI Route Optimisation: Active' : 'Standard Linear Route'}
            </div>
            <div style="font-size: 11px; color: #555;">
              ${isOptimized ? 'Saves 42 km & 3.5 hrs mountain driving' : 'High transit road fatigue'}
            </div>
          </div>
          <button class="btn-book-mmt" id="btn-toggle-route" style="font-size: 11px; padding: 6px 14px;">
            ${isOptimized ? '✓ Optimized' : 'Apply AI Route'}
          </button>
        </div>
      </div>

      <!-- Anti-Backtracking Callout Banner -->
      ${isOptimized ? `
        <div style="background: #e6f7ec; border-left: 4px solid #1ab64f; border-radius: 4px; padding: 12px 18px; margin-bottom: 20px; font-size: 13px; color: #008542;">
          <strong>Stage 13 — Avoided Backtracking:</strong> Myra re-sequenced Day 2's stops so the group visits Nohkalikai Falls during peak daylight visibility before descending to Mawsmai Caves, placing pure-veg lunch at Orange Roots directly en route.
        </div>
      ` : ''}

      <!-- Day-by-Day Cards -->
      <div class="itinerary-view-card">
        ${itinerary.map(day => `
          <div class="itinerary-day-block">
            <div class="day-header-title">
              <span style="background: #eb2026; color: #ffffff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px; margin-right: 8px;">
                Day ${day.day}
              </span>
              ${day.title} <span style="font-size: 12px; font-weight: 400; color: #777;">(${day.date})</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
              ${day.stops.map(stop => `
                <div class="day-stop-item">
                  <span class="stop-time-badge">${stop.time}</span>
                  <div class="stop-main" style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <h5>${stop.title}</h5>
                      <span style="font-size: 10px; font-weight: 700; color: #005f9e; background: #e8f3ff; padding: 1px 6px; border-radius: 3px;">
                        ${stop.badge}
                      </span>
                    </div>
                    <p>${stop.subtitle}</p>
                  </div>
                  <button style="background: transparent; border: 1px solid #ddd; border-radius: 4px; padding: 4px 8px; font-size: 11px; cursor: pointer; color: #666;" title="Lock activity against AI reordering">
                    🔒 Locked
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Action Footer -->
      <div style="background: #ffffff; border: 1px solid #e7e7e7; border-radius: 8px; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--mmt-shadow-sm);">
        <div>
          <span style="font-size: 12px; color: #7e7e7e;">Stage 16: Feasibility Check Complete</span>
          <div style="font-size: 16px; font-weight: 800; color: #0a223d;">Group Consensus Reached & Plan Locked</div>
        </div>
        <button class="mmt-giant-search-btn" id="btn-proceed-to-review" style="font-size: 15px; padding: 10px 32px;">
          Proceed to Review Booking ➔
        </button>
      </div>
    </div>
  `;

  // Attach handlers
  container.querySelector('#btn-toggle-route')?.addEventListener('click', () => {
    mmtState.toggleRouteOptimization();
  });

  container.querySelector('#btn-proceed-to-review')?.addEventListener('click', () => {
    mmtState.setStep('review');
  });
}
