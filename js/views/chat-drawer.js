// js/views/chat-drawer.js - Docked WhatsApp-style MakeMyTrip Group Chat & Ambient AI (Stage 10)

import { mmtState } from '../mmt-state.js';

export function renderChatDrawer(container) {
  const isOpen = mmtState.state.isChatDrawerOpen;
  const messages = mmtState.state.chatMessages;
  const persona = mmtState.getActivePersona();

  container.innerHTML = `
    <!-- Floating WhatsApp Trigger Pill -->
    <button class="floating-chat-trigger-btn" id="btn-toggle-floating-chat">
      <span>💬</span> Group Chat & AI
      <span class="chat-unread-badge">${messages.length}</span>
    </button>

    <!-- Slide-in Drawer -->
    <div class="mmt-chat-drawer-overlay ${isOpen ? 'is-open' : ''}" id="chat-drawer-root">
      <div class="chat-drawer-header">
        <div class="drawer-title-wrap">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: #25d366; display: flex; align-items: center; justify-content: center; font-size: 14px;">
            💬
          </div>
          <div>
            <div class="drawer-title">Meghalaya Squad (4)</div>
            <div class="drawer-sub">🤖 Myra AI: Passive Listener (Level 0)</div>
          </div>
        </div>
        <button class="btn-close-drawer" id="btn-close-chat-drawer">&times;</button>
      </div>



      <!-- Chat Messages Scroll Area -->
      <div class="chat-messages-scroll-area" id="chat-scroll-stream">
        ${messages.map(m => `
          <div class="chat-msg-row ${m.isAI ? 'is-ai' : ''} ${m.sender === persona.name ? 'is-me' : ''}">
            <div class="msg-bubble">
              <div class="msg-author" style="${m.isAI ? 'color: #eb2026;' : ''}">
                ${m.sender} ${m.role ? `<span style="font-size: 9px; color: #888; font-weight: 400;">(${m.role})</span>` : ''}
              </div>
              <div style="font-size: 12.5px; line-height: 1.4;">${m.text}</div>

              ${m.card ? `
                <div style="margin-top: 6px; background: #ffffff; border: 1px solid #c2e0ff; border-radius: 6px; padding: 8px; font-size: 12px;">
                  <div style="font-weight: 800; color: #005f9e;">${m.card.airline || m.card.title}</div>
                  <div style="color: #1ab64f; font-weight: 700; font-size: 11px;">✓ ${m.card.conflict}</div>
                  <div style="font-weight: 800; font-size: 13px; margin: 4px 0;">${m.card.price}</div>
                  <button style="background: #0084ff; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 800; cursor: pointer;">
                    ${m.card.action} (3/4 Approved)
                  </button>
                </div>
              ` : ''}

              <div class="msg-time">${m.time}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Input Form -->
      <form class="chat-drawer-input-form" id="drawer-chat-form">
        <input 
          type="text" 
          id="drawer-chat-input" 
          placeholder="Message or tag @Myra for flight/food..." 
          autocomplete="off" 
        />
        <button type="submit" aria-label="Send">➔</button>
      </form>
    </div>
  `;

  // Scroll to bottom
  const stream = container.querySelector('#chat-scroll-stream');
  if (stream) {
    stream.scrollTop = stream.scrollHeight;
  }

  // Attach handlers
  container.querySelector('#btn-toggle-floating-chat')?.addEventListener('click', () => {
    mmtState.toggleChatDrawer();
  });

  container.querySelector('#btn-close-chat-drawer')?.addEventListener('click', () => {
    mmtState.toggleChatDrawer();
  });



  container.querySelector('#drawer-chat-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = container.querySelector('#drawer-chat-input');
    const val = inp?.value?.trim();
    if (val) {
      mmtState.sendChatMessage(val);
      inp.value = '';
    }
  });
}
