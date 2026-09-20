// js/views/home-view.js - MakeMyTrip Group Search with Editable Destination & Budget Range

import { mmtState } from '../mmt-state.js';

export function renderHomeView(container) {
  const trip = mmtState.state.trip;
  const members = mmtState.state.members;
  const isTravellerOpen = mmtState.state.isTravellerLookupOpen;
  const isDateFilterOpen = mmtState.state.isDateFilterOpen;
  const isBudgetEditorOpen = mmtState.state.isBudgetEditorOpen;

  container.innerHTML = `
    <!-- Hero Navy Section Behind Search Widget -->
    <div class="mmt-hero-banner">
      <h2 class="hero-headline">Plan Group Travel with MakeMyTrip Myra 2.0</h2>
      <p class="hero-subheadline">
        Destination-led group planning, editable multi-tier budgets, and MMT-binded phone intelligence for instant consensus.
      </p>
    </div>

    <!-- Redesigned MakeMyTrip Group Search Widget -->
    <div class="mmt-search-floating-card">
      
      <!-- 3-Column Search Grid: Editable Destination | Editable Budget Range | Travellers by Phone -->
      <div class="search-inputs-grid" style="grid-template-columns: 1.5fr 1.2fr 1.3fr;">
        
        <!-- 1. Editable Destination Input (Requirement 1) -->
        <div class="search-input-cell" style="position: relative;">
          <span class="input-top-label">Destination (Editable)</span>
          <input 
            type="text" 
            id="input-trip-destination" 
            class="search-text-input" 
            value="${trip.destination}" 
            placeholder="Type destination (e.g. Goa, Kashmir, Kerala...)"
            style="font-size: 16px; font-weight: 900; border: none; outline: none; background: transparent; color: #000; width: 100%;"
          />
          <div style="display: flex; gap: 4px; margin-top: 4px; flex-wrap: wrap;">
            <span class="dest-chip" data-dest="Shillong & Cherrapunji, Meghalaya">Meghalaya</span>
            <span class="dest-chip" data-dest="South Goa & Coastal Escapes">Goa</span>
            <span class="dest-chip" data-dest="Srinagar & Gulmarg, Kashmir">Kashmir</span>
            <span class="dest-chip" data-dest="Munnar & Alleppey Backwaters, Kerala">Kerala</span>
          </div>
        </div>

        <!-- 2. Editable Budget Range Input (Requirement 2) -->
        <div class="search-input-cell" id="btn-toggle-budget-cell" style="position: relative;">
          <span class="input-top-label">Budget Range / Person (Editable)</span>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="input-main-val" id="display-budget-val">
              ₹${trip.budgetMin.toLocaleString()} - ₹${trip.budgetMax.toLocaleString()}
            </span>
            <span style="font-size: 11px; color: #0084ff; font-weight: 700;">Edit ✎</span>
          </div>
          <span class="input-sub-val">Preferred to Hard Limit Range</span>

          <!-- Editable Budget Range Dropdown / Editor Popover -->
          ${isBudgetEditorOpen ? `
            <div class="budget-editor-popover" id="budget-popover-box" style="position: absolute; top: 100%; left: 0; width: 320px; background: #ffffff; border: 1.5px solid #0084ff; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-radius: 8px; padding: 16px; z-index: 60; margin-top: 6px;">
              <div style="font-size: 13px; font-weight: 800; color: #0a223d; margin-bottom: 8px;">
                Edit Group Budget Range (Per Person)
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                <div>
                  <label style="font-size: 11px; color: #666; font-weight: 700; display: block; margin-bottom: 3px;">Min / Preferred (₹)</label>
                  <input 
                    type="number" 
                    id="input-budget-min" 
                    value="${trip.budgetMin}" 
                    step="1000" 
                    min="10000" 
                    max="100000"
                    style="width: 100%; padding: 6px 8px; border: 1px solid #ccc; border-radius: 4px; font-weight: 800; font-size: 13px;"
                  />
                </div>
                <div>
                  <label style="font-size: 11px; color: #666; font-weight: 700; display: block; margin-bottom: 3px;">Max / Hard Limit (₹)</label>
                  <input 
                    type="number" 
                    id="input-budget-max" 
                    value="${trip.budgetMax}" 
                    step="1000" 
                    min="15000" 
                    max="150000"
                    style="width: 100%; padding: 6px 8px; border: 1px solid #ccc; border-radius: 4px; font-weight: 800; font-size: 13px;"
                  />
                </div>
              </div>

              <!-- Quick Presets -->
              <div style="font-size: 11px; color: #7e7e7e; font-weight: 700; margin-bottom: 4px;">Quick Presets:</div>
              <div style="display: flex; gap: 4px; margin-bottom: 12px; flex-wrap: wrap;">
                <button class="budget-preset-btn" data-min="18000" data-max="28000" style="font-size: 10.5px; background: #f0f7ff; border: 1px solid #c2e0ff; padding: 3px 6px; border-radius: 4px; cursor: pointer;">
                  ₹18k-₹28k
                </button>
                <button class="budget-preset-btn" data-min="22000" data-max="34000" style="font-size: 10.5px; background: #f0f7ff; border: 1px solid #c2e0ff; padding: 3px 6px; border-radius: 4px; cursor: pointer;">
                  ₹22k-₹34k
                </button>
                <button class="budget-preset-btn" data-min="30000" data-max="45000" style="font-size: 10.5px; background: #f0f7ff; border: 1px solid #c2e0ff; padding: 3px 6px; border-radius: 4px; cursor: pointer;">
                  ₹30k-₹45k
                </button>
              </div>

              <div style="display: flex; justify-content: flex-end; gap: 8px;">
                <button class="btn-book-mmt" id="btn-save-budget-range" style="font-size: 11px; padding: 6px 14px;">
                  Apply Budget Range
                </button>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- 3. Travellers Dropdown with MMT Phone Lookup -->
        <div class="search-input-cell" id="btn-open-traveller-dropdown" style="position: relative;">
          <span class="input-top-label">Travellers (${members.length} Members)</span>
          <div class="input-main-val" style="display: flex; align-items: center; justify-content: space-between;">
            <span>${members.length} Travellers</span>
            <span style="font-size: 12px; color: #0084ff; font-weight: 700;">+ Add by Phone ▼</span>
          </div>
          <span class="input-sub-val">MMT travel history & preferences fetched</span>

          <!-- Interactive Travellers by Phone Dropdown Menu -->
          ${isTravellerOpen ? `
            <div class="traveller-phone-dropdown-menu" id="traveller-menu-box" style="position: absolute; top: 100%; right: 0; width: 360px; background: #ffffff; border: 1px solid #cce2ff; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border-radius: 8px; padding: 14px; z-index: 50; margin-top: 6px;">
              <div style="font-size: 13px; font-weight: 800; color: #0a223d; margin-bottom: 6px;">
                Add Friends by MMT-Binded Phone Number
              </div>
              <p style="font-size: 11px; color: #666; margin-bottom: 10px;">
                Enter 10-digit mobile number to automatically fetch past booking records, meal preferences, and verified status.
              </p>

              <!-- Phone Input Field -->
              <div style="display: flex; gap: 6px; margin-bottom: 12px;">
                <input 
                  type="tel" 
                  id="input-traveller-phone" 
                  placeholder="e.g. 9876543210 (Try 9876543210)" 
                  style="flex: 1; padding: 7px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px;"
                  maxlength="10"
                />
                <button class="btn-book-mmt" id="btn-fetch-phone-user" style="font-size: 11px; padding: 7px 12px;">
                  Fetch & Add
                </button>
              </div>

              <!-- Notification Toast -->
              <div id="phone-fetch-toast" style="display: none; font-size: 11px; padding: 6px 8px; border-radius: 4px; margin-bottom: 10px;"></div>

              <!-- Current Members List -->
              <div style="font-size: 11px; font-weight: 800; color: #7e7e7e; text-transform: uppercase; margin-bottom: 6px;">
                Current Travellers (${members.length})
              </div>
              <div style="max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
                ${members.map(m => `
                  <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fbff; border: 1px solid #e0eeff; padding: 6px 10px; border-radius: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <img src="${m.avatar}" alt="${m.name}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;" />
                      <div>
                        <div style="font-size: 12px; font-weight: 800;">${m.name} <span style="font-size: 10px; color: #888;">(${m.role})</span></div>
                        <div style="font-size: 10px; color: #005f9e;">${m.pastRecords || 'MMT records synced'}</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Optional Filters Dropdown -->
      <div style="margin-top: 14px; display: flex; align-items: center; justify-content: space-between; border-top: 1px dashed #e0e0e0; padding-top: 12px; flex-wrap: wrap; gap: 10px;">
        <div style="position: relative;">
          <button class="btn-open-prefs" id="btn-toggle-dates-filter" style="font-size: 12px; display: flex; align-items: center; gap: 6px;">
            <span>📅</span> Travel Window: <strong>${trip.dates}</strong> ▼
          </button>

          <!-- Dropdown Popover for Dates -->
          ${isDateFilterOpen ? `
            <div style="position: absolute; top: 100%; left: 0; width: 300px; background: #ffffff; border: 1px solid #ddd; box-shadow: 0 8px 24px rgba(0,0,0,0.15); border-radius: 8px; padding: 14px; z-index: 50; margin-top: 6px;">
              <div style="font-size: 13px; font-weight: 800; color: #0a223d; margin-bottom: 6px;">
                Optional Travel Dates Filter
              </div>
              <p style="font-size: 11px; color: #666; margin-bottom: 10px;">
                Dates can remain completely flexible. Myra identifies optimal flight windows with lowest surge fares.
              </p>
              <div style="font-size: 12px; font-weight: 700; background: #f0f7ff; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                Selected: ${trip.dates}
              </div>
              <div style="font-size: 11px; color: #008542; font-weight: 700;">
                ✓ Seasonal weather check: Ideal time for ${trip.destination.split(',')[0]}
              </div>
            </div>
          ` : ''}
        </div>

        <div style="font-size: 12px; color: #555;">
          <span>Selected: <strong>${trip.title}</strong></span> • 
          <span>Target Budget: <strong>₹${trip.budgetMin.toLocaleString()} - ₹${trip.budgetMax.toLocaleString()}</strong></span>
        </div>
      </div>

      <!-- Giant CTA Button: "Build Group Itinerary" -->
      <div class="search-btn-wrapper">
        <button class="mmt-giant-search-btn" id="btn-build-group-itinerary">
          Build Group Itinerary ➔
        </button>
      </div>
    </div>

    <!-- Authentic MMT Promotional Banner -->
    <div class="mmt-page-main">
      <div style="background: #ffffff; border: 1px solid #e7e7e7; border-radius: 8px; padding: 18px 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 32px;">✨</span>
          <div>
            <h4 style="font-size: 15px; font-weight: 800; color: #0a223d;">
              Dynamic Group Itinerary Builder for ${trip.destination}
            </h4>
            <p style="font-size: 12px; color: #666;">
              Destination & Budget changes automatically adapt the day-wise itinerary, anti-backtracking route, flights and member mandate splits.
            </p>
          </div>
        </div>
        <button class="btn-book-mmt" id="btn-banner-build-itinerary">
          Launch Workspace ➔
        </button>
      </div>
    </div>
  `;

  // Attach handlers
  container.querySelector('#btn-build-group-itinerary')?.addEventListener('click', () => {
    mmtState.openFullChat();
  });

  container.querySelector('#btn-banner-build-itinerary')?.addEventListener('click', () => {
    mmtState.openFullChat();
  });

  // Destination Input Text Edit
  const destInput = container.querySelector('#input-trip-destination');
  destInput?.addEventListener('change', (e) => {
    const val = e.target.value.trim();
    if (val) {
      mmtState.setDestination(val);
    }
  });

  destInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = e.target.value.trim();
      if (val) {
        mmtState.setDestination(val);
      }
    }
  });

  // Quick Destination Chips
  container.querySelectorAll('.dest-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const dest = chip.getAttribute('data-dest');
      mmtState.setDestination(dest);
    });
  });

  // Toggle Budget Editor Popover
  container.querySelector('#btn-toggle-budget-cell')?.addEventListener('click', (e) => {
    if (e.target.closest('#budget-popover-box')) return;
    mmtState.toggleBudgetEditor();
  });

  // Budget Presets inside Popover
  container.querySelectorAll('.budget-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const min = btn.getAttribute('data-min');
      const max = btn.getAttribute('data-max');
      const minInput = container.querySelector('#input-budget-min');
      const maxInput = container.querySelector('#input-budget-max');
      if (minInput) minInput.value = min;
      if (maxInput) maxInput.value = max;
    });
  });

  // Save Budget Range Button
  container.querySelector('#btn-save-budget-range')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const minInput = container.querySelector('#input-budget-min');
    const maxInput = container.querySelector('#input-budget-max');
    const min = minInput?.value;
    const max = maxInput?.value;
    mmtState.setBudgetRange(min, max);
    mmtState.toggleBudgetEditor();
  });

  // Toggle Travellers by Phone Dropdown
  container.querySelector('#btn-open-traveller-dropdown')?.addEventListener('click', (e) => {
    if (e.target.closest('#traveller-menu-box')) return;
    mmtState.toggleTravellerLookup();
  });

  // Toggle Dates Filter Dropdown
  container.querySelector('#btn-toggle-dates-filter')?.addEventListener('click', () => {
    mmtState.toggleDateFilter();
  });

  // Phone Lookup Add Button
  const phoneBtn = container.querySelector('#btn-fetch-phone-user');
  const phoneInput = container.querySelector('#input-traveller-phone');
  const toast = container.querySelector('#phone-fetch-toast');

  phoneBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const phone = phoneInput?.value?.trim();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    const res = mmtState.addTravellerByPhone(phone);
    if (toast) {
      toast.style.display = 'block';
      toast.style.background = res.success ? '#e6f7ec' : '#fff0f0';
      toast.style.color = res.success ? '#008542' : '#eb2026';
      toast.textContent = res.message;
    }
    if (res.success && phoneInput) {
      phoneInput.value = '';
    }
  });
}
