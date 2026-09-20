// js/views/spec-modal.js - 27-Stage Journey Spec, HITL Framework & Loopholes Modal

import { mmtState } from '../mmt-state.js';
import { JOURNEY_STAGES, PERMISSION_LEVELS } from '../data.js';

export function renderSpecModal(container) {
  const isOpen = mmtState.state.isSpecModalOpen;

  if (!isOpen) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="spec-modal-backdrop" id="spec-modal-backdrop">
      <div class="spec-modal-window">
        <div class="spec-modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 22px;">📋</span>
            <div>
              <h3 style="font-size: 16px; font-weight: 800; color: #fff;">
                MakeMyTrip Myra 2.0 Customer Journey Specification
              </h3>
              <span style="font-size: 11px; color: #a4c2e6;">
                Architecture, 27 Journey Stages, Loopholes & HITL Principles
              </span>
            </div>
          </div>
          <button class="btn-close-drawer" id="btn-close-spec-modal" style="font-size: 26px;">&times;</button>
        </div>

        <div class="spec-modal-body">
          <!-- 6-Level HITL Permission Framework (Section 6) -->
          <div style="background: #f0f7ff; border: 1px solid #c2e0ff; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
            <h4 style="font-size: 14px; font-weight: 800; color: #003e6b; margin-bottom: 8px;">
              Section 6: Human-in-the-Loop Permission Framework
            </h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 11px;">
              ${PERMISSION_LEVELS.map(lvl => `
                <div style="background: #ffffff; border: 1px solid #d0e4ff; border-radius: 6px; padding: 8px;">
                  <div style="font-weight: 800; color: #005f9e;">${lvl.level}: ${lvl.name}</div>
                  <div style="color: #666; margin-top: 2px;">${lvl.controlRule}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 27 Stages Table -->
          <h4 style="font-size: 14px; font-weight: 800; color: #0a223d; margin-bottom: 8px;">
            Complete 27-Stage Customer Journey Flow
          </h4>
          <div style="max-height: 380px; overflow-y: auto; border: 1px solid #e7e7e7; border-radius: 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead style="background: #fafafa; position: sticky; top: 0;">
                <tr style="border-bottom: 1px solid #ddd; text-align: left;">
                  <th style="padding: 8px 12px;">Stage #</th>
                  <th style="padding: 8px 12px;">Name</th>
                  <th style="padding: 8px 12px;">Actor</th>
                  <th style="padding: 8px 12px;">Loophole & Fix</th>
                  <th style="padding: 8px 12px;">Permission Level</th>
                </tr>
              </thead>
              <tbody>
                ${JOURNEY_STAGES.map(s => `
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px 12px; font-weight: 800; color: #eb2026;">${s.stage}</td>
                    <td style="padding: 8px 12px; font-weight: 700;">${s.name}</td>
                    <td style="padding: 8px 12px; color: #555;">${s.actor}</td>
                    <td style="padding: 8px 12px; color: #222;">${s.loopholeFix}</td>
                    <td style="padding: 8px 12px; font-weight: 700; color: #005f9e;">${s.permissionLevel}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // Handlers
  container.querySelector('#btn-close-spec-modal')?.addEventListener('click', () => {
    mmtState.toggleSpecModal();
  });

  container.querySelector('#spec-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'spec-modal-backdrop') {
      mmtState.toggleSpecModal();
    }
  });
}
