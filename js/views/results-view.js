// js/views/results-view.js - MMT Flight & Stay Search Results with Myra Group Scoring (Stages 7-11 & Section 7)

import { mmtState } from '../mmt-state.js';

export function renderResultsView(container) {
  const flights = mmtState.state.flights;
  const hotels = mmtState.state.hotels;
  const weights = mmtState.state.weights;

  container.innerHTML = `
    <div class="mmt-page-main">
      <!-- Breadcrumb and Summary Strip -->
      <div class="results-top-banner">
        <div>
          <span style="font-size: 11px; color: #7e7e7e; text-transform: uppercase; font-weight: 700;">
            MMT Flight & Hotel Search • Meghalaya Group Escape
          </span>
          <h2 class="results-title">Bengaluru (BLR) ➔ Guwahati (GAU) • 16 Oct 2026</h2>
        </div>
        <div class="results-sort-bar">
          <span style="color: #777;">Sort By:</span>
          <strong>Myra Group Fit (Recommended) ▼</strong>
        </div>
      </div>

      <!-- Main Layout: Filters Sidebar + Results Stream -->
      <div class="results-layout-grid" style="margin-top: 20px;">
        <!-- Left Sidebar: Authentic MMT Filters + Myra Scoring Config -->
        <aside class="mmt-filters-sidebar">
          <h3 class="filter-heading">Filters & Constraints</h3>

          <!-- Section 7 Explainable Scoring Sliders -->
          <div style="background: #eef6ff; border: 1px solid #cce2ff; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
            <div style="font-size: 11px; font-weight: 800; color: #005f9e; text-transform: uppercase; margin-bottom: 4px;">
              ⚖️ Section 7: Group Weights
            </div>
            <p style="font-size: 11px; color: #555; margin-bottom: 10px;">Adjust what matters most to your 4 members:</p>
            
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700;">
                <span>Preference Fit</span>
                <span style="color: #eb2026;">${weights.prefFit}%</span>
              </div>
              <input type="range" min="5" max="40" step="5" value="${weights.prefFit}" class="weight-slider" data-factor="prefFit" style="width: 100%; accent-color: #eb2026;" />
            </div>

            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700;">
                <span>Budget Fit</span>
                <span style="color: #eb2026;">${weights.budgetFit}%</span>
              </div>
              <input type="range" min="5" max="40" step="5" value="${weights.budgetFit}" class="weight-slider" data-factor="budgetFit" style="width: 100%; accent-color: #eb2026;" />
            </div>

            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700;">
                <span>Experience Value</span>
                <span style="color: #eb2026;">${weights.expValue}%</span>
              </div>
              <input type="range" min="5" max="40" step="5" value="${weights.expValue}" class="weight-slider" data-factor="expValue" style="width: 100%; accent-color: #eb2026;" />
            </div>
          </div>

          <!-- Hard Constraints Protected -->
          <div class="filter-group">
            <h4 class="filter-group-title">Protected Member Constraints</h4>
            <label class="filter-checkbox-item">
              <input type="checkbox" checked disabled />
              <span>Rohan: Flight departure &gt; 12:00 PM</span>
            </label>
            <label class="filter-checkbox-item">
              <input type="checkbox" checked disabled />
              <span>Priya: 100% Pure Veg Dining</span>
            </label>
          </div>

          <!-- Airline Filter -->
          <div class="filter-group">
            <h4 class="filter-group-title">Airlines</h4>
            <label class="filter-checkbox-item">
              <input type="checkbox" checked />
              <span>IndiGo (1)</span>
            </label>
            <label class="filter-checkbox-item">
              <input type="checkbox" checked />
              <span>Air India (1)</span>
            </label>
            <label class="filter-checkbox-item">
              <input type="checkbox" checked />
              <span>SpiceJet (1)</span>
            </label>
          </div>
        </aside>

        <!-- Flight & Hotel Cards Stream -->
        <section class="results-stream-column">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 16px; font-weight: 800; color: #0a223d;">Recommended Group Flights</h3>
            <span style="font-size: 12px; color: #1ab64f; font-weight: 700;">✓ Prices locked for 4 seats</span>
          </div>

          <!-- Flight Cards -->
          ${flights.map(fl => `
            <div class="mmt-flight-card ${fl.isRecommended ? 'is-recommended' : ''}">
              ${fl.isRecommended ? `
                <div class="card-top-tag">
                  <span>👑 #1 Recommended by Myra AI</span>
                  <span>• 4 Seats Available at ₹${fl.price.toLocaleString()}</span>
                </div>
              ` : ''}

              <div class="flight-card-body">
                <!-- Airline Brand -->
                <div class="airline-brand-block">
                  <img src="${fl.logo}" alt="${fl.airline}" class="airline-logo-img" />
                  <div>
                    <div class="airline-name">${fl.airline}</div>
                    <div class="airline-code">${fl.flightNumber}</div>
                  </div>
                </div>

                <!-- Timing Strip -->
                <div class="flight-timing-strip">
                  <div class="timing-node">
                    <div class="time">${fl.depTime}</div>
                    <div class="city">${fl.depCity} (${fl.depCode})</div>
                  </div>

                  <div class="timing-duration">
                    <span class="duration-val">${fl.duration}</span>
                    <div class="flight-track-line"></div>
                    <span class="stops-val">${fl.stops}</span>
                  </div>

                  <div class="timing-node">
                    <div class="time">${fl.arrTime}</div>
                    <div class="city">${fl.arrCity} (${fl.arrCode})</div>
                  </div>
                </div>

                <!-- Price & Select CTA -->
                <div class="flight-pricing-block">
                  <div class="price-currency">₹${fl.price.toLocaleString()}</div>
                  <div class="price-unit">per adult</div>
                  <button class="btn-book-mmt btn-select-flight" data-flight-id="${fl.id}">
                    ${fl.isRecommended ? 'Select Flight ➔' : 'Choose Flight'}
                  </button>
                </div>
              </div>

              <!-- Myra Group Fit Explainability Footer -->
              <div class="myra-fit-card-footer">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="fit-score-pill ${fl.groupFitScore < 50 ? 'score-alert' : ''}">
                    ${fl.groupFitScore}% Group Fit
                  </span>
                  <span style="font-weight: 700; color: #0a223d;">Why this matches:</span>
                </div>
                <div class="fit-reasons-list">
                  ${fl.fitHighlights.map(h => `<span>• ${h}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}

          <!-- Hotels Section -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
            <h3 style="font-size: 16px; font-weight: 800; color: #0a223d;">Recommended Group Stays (Shillong & Cherrapunji)</h3>
            <span style="font-size: 12px; color: #7e7e7e;">Verified for 4 Travellers (2 Rooms)</span>
          </div>

          ${hotels.map(h => `
            <div class="mmt-hotel-card">
              <img src="${h.image}" alt="${h.name}" class="hotel-thumb-img" />

              <div class="hotel-info-block">
                <span class="hotel-rating-badge">★ ${h.rating}</span>
                <span style="font-size: 11px; color: #777;">(${h.reviewCount})</span>
                <h4 class="hotel-title">${h.name}</h4>
                <div class="hotel-location">📍 ${h.location}</div>
                <div style="font-size: 12px; font-weight: 700; color: #005f9e;">${h.roomType}</div>

                <div class="hotel-amenities-tags">
                  ${h.amenities.map(a => `
                    <span class="amenity-tag ${a.includes('Veg') ? 'veg-tag' : ''}">
                      ${a.includes('Veg') ? '🥗 ' : ''}${a}
                    </span>
                  `).join('')}
                </div>

                <div style="margin-top: 10px; font-size: 11.5px; color: #2d5885; background: #eef6ff; padding: 6px 10px; border-radius: 4px;">
                  <strong>Myra 2.0 Fit (${h.groupFitScore}%):</strong> ${h.fitHighlights.join(' • ')}
                </div>
              </div>

              <div class="hotel-price-block">
                <span style="font-size: 10px; color: #eb2026; font-weight: 800; text-transform: uppercase;">Limited Inventory</span>
                <div class="price-currency">₹${h.pricePerNight.toLocaleString()}</div>
                <div class="price-unit">per room / night</div>
                <button class="btn-book-mmt btn-select-hotel" style="margin-top: 10px;">
                  Add to Itinerary
                </button>
              </div>
            </div>
          `).join('')}

          <!-- Proceed Bar -->
          <div style="background: #ffffff; border: 1px solid #e7e7e7; border-radius: 8px; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--mmt-shadow-sm);">
            <div>
              <div style="font-size: 16px; font-weight: 800; color: #0a223d;">Selections Ready for Group Itinerary</div>
              <div style="font-size: 12px; color: #666;">IndiGo 6E-542 + Ri Kynjai & Polo Orchid Resorts pre-selected</div>
            </div>
            <button class="mmt-giant-search-btn" id="btn-proceed-to-itinerary" style="font-size: 15px; padding: 10px 32px;">
              Review 4-Day Itinerary ➔
            </button>
          </div>
        </section>
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelector('#btn-proceed-to-itinerary')?.addEventListener('click', () => {
    mmtState.setStep('itinerary');
  });

  container.querySelectorAll('.btn-select-flight').forEach(btn => {
    btn.addEventListener('click', () => {
      mmtState.setStep('itinerary');
    });
  });

  container.querySelectorAll('.weight-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const factor = e.target.getAttribute('data-factor');
      mmtState.updateWeight(factor, e.target.value);
    });
  });
}
