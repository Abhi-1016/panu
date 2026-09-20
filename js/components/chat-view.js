// js/components/chat-view.js - Human Group Chat with Passive Ambient AI (Stage 10)

import { appState } from '../state.js';

export function renderChatView(container) {
  const messages = appState.state.chatMessages;
  const currentPersona = appState.getActivePersona();

  container.innerHTML = `
    <div class="chat-workspace-panel">
      <!-- Chat Header -->
      <div class="chat-panel-header">
        <div class="chat-group-info">
          <div class="chat-group-avatar">
            <span class="group-initials">MG</span>
            <span class="ai-status-indicator pulse-green" title="Myra AI: Passive Listener"></span>
          </div>
          <div>
            <h3 class="chat-group-name">Meghalaya Monsoon Squad 🌦️</h3>
            <div class="chat-substatus">
              <span class="status-passive">🤖 Myra AI: Passive Mode (Level 0)</span>
              <span class="divider-dot">•</span>
              <span class="member-count">4 Members active</span>
            </div>
          </div>
        </div>

        <div class="chat-header-actions">
          <span class="rule-hint" title="Design Rule: AI remains passive by default and does not spam the chat">
            🔒 Privacy & Anti-Spam Guard
          </span>
        </div>
      </div>



      <!-- Messages Stream -->
      <div class="chat-messages-container" id="chat-messages-stream">
        ${messages.map(m => `
          <div class="chat-bubble-row ${m.isAI ? 'is-ai' : ''} ${m.sender === currentPersona.name ? 'is-current-user' : ''}">
            <div class="chat-avatar-wrap">
              ${m.isAI ? 
                `<div class="ai-chat-avatar"><span class="ai-sparkle">✨</span></div>` : 
                `<div class="user-chat-avatar">${m.sender.split(' ').map(n=>n[0]).join('')}</div>`
              }
            </div>
            
            <div class="chat-bubble-content">
              <div class="chat-bubble-meta">
                <span class="sender-name ${m.isAI ? 'ai-tag' : ''}">
                  ${m.sender} ${m.senderRole ? `<span class="sender-badge">${m.senderRole}</span>` : ''}
                </span>
                <span class="chat-timestamp">${m.time}</span>
              </div>
              <div class="chat-bubble-text">${m.text}</div>

              ${m.card ? `
                <div class="chat-interactive-card">
                  <div class="card-tag">🤖 Myra Verified Suggestion</div>
                  <h4 class="card-item-title">${m.card.title}</h4>
                  <div class="card-item-details">
                    <span class="card-price">${m.card.price}</span>
                    <span class="card-conflict-badge">✓ ${m.card.conflictResolved}</span>
                  </div>
                  <button class="btn btn-sm btn-primary card-action-btn" data-title="${m.card.title}">
                    ${m.card.actionLabel} (3/4 Approved)
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Chat Input Area -->
      <form class="chat-input-bar" id="chat-form">
        <div class="input-avatar-badge" title="Posting as: ${currentPersona.name}">
          ${currentPersona.name.split(' ').map(n=>n[0]).join('')}
        </div>
        <input 
          type="text" 
          id="chat-text-input" 
          class="chat-text-input" 
          placeholder="Message group or tag @Myra for flight/stay/itinerary help..." 
          autocomplete="off"
        />
        <button type="submit" class="chat-send-btn" id="btn-chat-send" aria-label="Send message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;

  // Scroll to bottom
  const stream = container.querySelector('#chat-messages-stream');
  if (stream) {
    stream.scrollTop = stream.scrollHeight;
  }



  // Action card vote button
  container.querySelectorAll('.card-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.innerHTML = "✓ Approved & Locked by Admin";
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-success');
      e.target.disabled = true;
    });
  });

  // Submit form
  const form = container.querySelector('#chat-form');
  const input = container.querySelector('#chat-text-input');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) {
      appState.sendChatMessage(val);
      input.value = '';
    }
  });
}
