// js/views/prefs-drawer.js - Member Preferences & 3-Tier Budget Setup (Stages 4-6)

import { mmtState } from '../mmt-state.js';

export function renderPrefsDrawer(container) {
  const isOpen = mmtState.state.isPrefsDrawerOpen;
  const persona = mmtState.getActivePersona();

  container.innerHTML = `
    <!-- Preferences Slide-in Drawer -->
    <div class="mmt-chat-drawer-overlay ${isOpen ? 'is-open' : ''}" id="prefs-drawer-root" style="width: 440px;">
      <div class="chat-drawer-header" style="background: var(--mmt-navy);">
        <div class="drawer-title-wrap">
          <span style="font-size: 20px;">⚙️</span>
          <div>
            <div class="drawer-title">Member Preferences & Budget</div>
            <div class="drawer-sub">Stages 4, 5 & 6 • Privacy-First Travel Profile</div>
          </div>
        </div>
        <button class="btn-close-drawer" id="btn-close-prefs-drawer">&times;</button>
      </div>

      <div style="padding: 20px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 18px; background: #ffffff;">
        <!-- Persona Info -->
        <div style="display: flex; align-items: center; gap: 12px; background: #f0f7ff; border: 1px solid #c2e0ff; padding: 12px; border-radius: 8px;">
          <img src="${persona.avatar}" alt="${persona.name}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;" />
          <div>
            <div style="font-weight: 800; font-size: 15px; color: #0a223d;">${persona.name}</div>
            <div style="font-size: 12px; color: #555;">Role: <strong>${persona.role}</strong> • Active Session</div>
          </div>
        </div>

        <!-- Stage 4: Consent & Identity -->
        <div style="border: 1px solid #e7e7e7; border-radius: 8px; padding: 14px;">
          <div style="font-size: 13px; font-weight: 800; margin-bottom: 6px; color: #0a223d;">
            Stage 4 — MMT Booking History Consent
          </div>
          <p style="font-size: 11.5px; color: #666; margin-bottom: 10px;">
            Raw past bookings are <strong>never</strong> shared with friends. Myra only extracts aggregate preferences (e.g. non-smoking rooms, window seats).
          </p>
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">
            <input type="checkbox" checked />
            <span>Consent to aggregate preference sync</span>
          </label>
        </div>

        <!-- Stage 5: Personal Preferences -->
        <div style="border: 1px solid #e7e7e7; border-radius: 8px; padding: 14px;">
          <div style="font-size: 13px; font-weight: 800; margin-bottom: 8px; color: #0a223d;">
            Stage 5 — Food, Travel Pace & Stay Style
          </div>
          
          <div style="margin-bottom: 10px;">
            <label style="font-size: 11px; color: #777; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 4px;">Dietary Requirements</label>
            <input type="text" value="${persona.diet}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label style="font-size: 11px; color: #777; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 4px;">Flight Seat Preference</label>
            <input type="text" value="${persona.flightSeat}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px;" />
          </div>

          ${persona.hardConstraints ? `
            <div style="background: #fff8f8; border: 1px solid #ffd6d6; padding: 8px 10px; border-radius: 4px;">
              <span style="font-size: 11px; font-weight: 800; color: #eb2026; display: block;">🔒 Hard Constraints:</span>
              <ul style="font-size: 11px; color: #555; padding-left: 14px;">
                ${persona.hardConstraints.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- Stage 6: 3-Tier Budget & Constraints -->
        <div style="border: 1px solid #e7e7e7; border-radius: 8px; padding: 14px;">
          <div style="font-size: 13px; font-weight: 800; margin-bottom: 8px; color: #0a223d;">
            Stage 6 — Three-Tier Budget (No Rigid Single Number)
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between;">
              <span>Preferred Budget:</span>
              <strong>₹${persona.prefBudget.toLocaleString()}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Flexible Range:</span>
              <strong style="color: #f5a623;">₹${persona.flexBudget.toLocaleString()}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Hard Spending Limit:</span>
              <strong style="color: #eb2026;">₹${persona.hardLimit.toLocaleString()}</strong>
            </div>
          </div>

          <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #eee; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 12px; font-weight: 700;">Hide Budget from Group:</span>
            <span style="font-size: 11px; font-weight: 800; color: ${persona.isBudgetPrivate ? '#008542' : '#777'};">
              ${persona.isBudgetPrivate ? '🔒 Private to Myra' : '👥 Visible to Friends'}
            </span>
          </div>
        </div>

        <button class="btn-proceed-cta" id="btn-save-prefs" style="margin-top: auto;">
          Save & Sync Profile
        </button>
      </div>
    </div>
  `;

  // Handlers
  container.querySelector('#btn-close-prefs-drawer')?.addEventListener('click', () => {
    mmtState.togglePrefsDrawer();
  });

  container.querySelector('#btn-save-prefs')?.addEventListener('click', () => {
    mmtState.togglePrefsDrawer();
  });
}
