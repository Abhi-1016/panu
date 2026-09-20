// js/app.js - Main Orchestrator for MakeMyTrip Group Travel (Myra 2.0)

import { mmtState } from './mmt-state.js';
import { renderHomeView } from './views/home-view.js';
import { renderFullscreenChat } from './views/fullscreen-chat.js';
import { renderSpecModal } from './views/spec-modal.js';

class MMTApp {
  constructor() {
    this.viewRoot = document.getElementById('mmt-view-root');
    this.chatRoot = document.getElementById('mmt-fullscreen-chat-root');
    this.specRoot = document.getElementById('mmt-spec-modal-container');
    
    this.deviceWrapper = document.getElementById('device-wrapper');
    this.deviceToggleBtn = document.getElementById('btn-device-toggle');
    this.deviceModeIcon = document.getElementById('device-mode-icon');
    this.deviceModeText = document.getElementById('device-mode-text');
    
    this.personaSelect = document.getElementById('header-persona-select');
    this.personaAvatar = document.getElementById('header-persona-avatar');
    this.brandLogo = document.getElementById('btn-brand-logo');
    this.groupTripsNav = document.getElementById('nav-item-grouptrips');
    this.specModalBtn = document.getElementById('btn-open-spec-modal');

    this.init();
  }

  init() {
    this.setupGlobalEvents();
    this.subscribeToStore();
    this.render();
  }

  setupGlobalEvents() {
    // Brand logo returns to Home
    this.brandLogo?.addEventListener('click', () => {
      mmtState.closeFullChat();
    });

    // Requirement 1: Only Group Trips is clickable in service bar
    this.groupTripsNav?.addEventListener('click', () => {
      mmtState.closeFullChat();
    });

    // Persona switch
    this.personaSelect?.addEventListener('change', (e) => {
      mmtState.setPersona(e.target.value);
    });

    // Device mode toggle (Desktop Web vs Native Mobile App)
    this.deviceToggleBtn?.addEventListener('click', () => {
      const currentMode = mmtState.state.deviceMode;
      const nextMode = currentMode === 'desktop' ? 'mobile' : 'desktop';
      mmtState.setDeviceMode(nextMode);
    });

    // Spec modal trigger
    this.specModalBtn?.addEventListener('click', () => {
      mmtState.toggleSpecModal();
    });
  }

  subscribeToStore() {
    mmtState.subscribe(() => {
      this.render();
    });
  }

  render() {
    const { isFullChatOpen, deviceMode } = mmtState.state;
    const persona = mmtState.getActivePersona();

    // 1. Sync Persona Header UI
    if (this.personaAvatar) this.personaAvatar.src = persona.avatar;
    if (this.personaSelect && this.personaSelect.value !== persona.id) {
      this.personaSelect.value = persona.id;
    }

    // 2. Sync Device Shell (Desktop vs Mobile App)
    if (deviceMode === 'mobile') {
      this.deviceWrapper.classList.add('is-mobile-app');
      this.deviceModeIcon.textContent = '🖥️';
      this.deviceModeText.textContent = 'Desktop View';
    } else {
      this.deviceWrapper.classList.remove('is-mobile-app');
      this.deviceModeIcon.textContent = '📱';
      this.deviceModeText.textContent = 'Mobile App View';
    }

    // 3. Render Main View (Search & Home)
    this.viewRoot.innerHTML = '';
    renderHomeView(this.viewRoot);

    // 4. Render Full-Screen Myra Chat Workspace (Requirement 7)
    this.chatRoot.innerHTML = '';
    if (isFullChatOpen) {
      renderFullscreenChat(this.chatRoot);
    }

    // 5. Render Spec Modal
    this.specRoot.innerHTML = '';
    renderSpecModal(this.specRoot);
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new MMTApp();
});
