// js/components/scoring-engine.js - Group Reference-Based Scoring Engine (Stage 11 & Section 7)

import { appState } from '../state.js';
import { SCORING_FACTORS } from '../data.js';

export function renderScoringEngine(container) {
  const weights = appState.state.weights;
  const destinations = appState.state.trip.destinationOptions;

  // Compute dynamic scores based on weight adjustments
  // Raw scores per factor for each destination (0-100 scale)
  const rawFactors = {
    "dest-1": { prefFit: 96, budgetFit: 90, expValue: 98, convenience: 88, qualityTrust: 95, flexibility: 90, availability: 95 },
    "dest-2": { prefFit: 78, budgetFit: 96, expValue: 80, convenience: 92, qualityTrust: 86, flexibility: 88, availability: 80 },
    "dest-3": { prefFit: 84, budgetFit: 35, expValue: 96, convenience: 52, qualityTrust: 88, flexibility: 60, availability: 70 }
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const calculatedDestinations = destinations.map(d => {
    const raw = rawFactors[d.id] || { prefFit: 80, budgetFit: 80, expValue: 80, convenience: 80, qualityTrust: 80, flexibility: 80, availability: 80 };
    let weightedSum = 0;
    for (const factor of SCORING_FACTORS) {
      const w = weights[factor.id] || 0;
      weightedSum += (raw[factor.id] * w);
    }
    const computedScore = Math.round(weightedSum / (totalWeight || 1));
    return {
      ...d,
      currentScore: computedScore,
      rawScores: raw
    };
  }).sort((a, b) => b.currentScore - a.currentScore);

  container.innerHTML = `
    <div class="scoring-engine-panel">
      <!-- Header -->
      <div class="scoring-header">
        <div>
          <div class="section-kicker">Section 7 • Explainable AI Engine</div>
          <h2 class="panel-heading">Group Reference-Based Scoring</h2>
          <p class="panel-subtext">
            Transparent algorithmic scoring tailored to your group's collective preferences, individual budgets, and constraints.
          </p>
        </div>
        <div class="scoring-pill-badge">
          <span class="lock-icon">🔍</span> Explainable & Adjustable
        </div>
      </div>

      <div class="scoring-grid-layout">
        <!-- Sliders & Weights Customizer -->
        <div class="scoring-weights-card">
          <div class="weights-header">
            <h3>Customise Group Weights</h3>
            <button class="btn btn-sm btn-ghost" id="btn-reset-weights">Reset to Defaults</button>
          </div>
          <p class="weights-helper">Drag sliders to adjust what matters most to your group. Notice how scores recalibrate in real time.</p>

          <div class="sliders-list">
            ${SCORING_FACTORS.map(factor => `
              <div class="weight-slider-row">
                <div class="slider-label-wrap">
                  <span class="factor-name">${factor.name}</span>
                  <span class="factor-value" id="val-${factor.id}">${weights[factor.id]}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="5" 
                  value="${weights[factor.id]}" 
                  class="weight-range-input" 
                  data-factor="${factor.id}"
                  aria-label="${factor.name} weight"
                />
                <div class="factor-meaning">${factor.meaning}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Destination Score Cards & Explainability -->
        <div class="scoring-results-column">
          <h3 class="column-title">Algorithmic Rank & Alternatives</h3>

          <div class="dest-cards-stack">
            ${calculatedDestinations.map((dest, rankIdx) => `
              <div class="dest-score-card ${rankIdx === 0 ? 'is-top-match' : ''}">
                <div class="dest-card-top">
                  <div class="dest-info">
                    <div class="rank-badge">${rankIdx === 0 ? '👑 #1 Match' : `#${rankIdx + 1} Alternative`}</div>
                    <h4 class="dest-name">${dest.name}</h4>
                    <div class="dest-quick-stats">
                      <span>🌤️ ${dest.weather}</span>
                      <span>👥 ${dest.crowd} Crowd</span>
                      <span>💰 ${dest.estCost}</span>
                    </div>
                  </div>

                  <div class="score-radial-wrap">
                    <div class="score-number">${dest.currentScore}</div>
                    <div class="score-unit">/100</div>
                  </div>
                </div>

                <!-- Factor Contribution Bars -->
                <div class="factor-mini-bars">
                  <div class="mini-bar-item">
                    <span class="mini-bar-name">Pref Fit</span>
                    <div class="bar-track"><div class="bar-fill" style="width: ${dest.rawScores.prefFit}%;"></div></div>
                    <span class="mini-bar-val">${dest.rawScores.prefFit}</span>
                  </div>
                  <div class="mini-bar-item">
                    <span class="mini-bar-name">Budget Fit</span>
                    <div class="bar-track"><div class="bar-fill ${dest.rawScores.budgetFit < 50 ? 'bar-alert' : ''}" style="width: ${dest.rawScores.budgetFit}%;"></div></div>
                    <span class="mini-bar-val">${dest.rawScores.budgetFit}</span>
                  </div>
                  <div class="mini-bar-item">
                    <span class="mini-bar-name">Experience</span>
                    <div class="bar-track"><div class="bar-fill" style="width: ${dest.rawScores.expValue}%;"></div></div>
                    <span class="mini-bar-val">${dest.rawScores.expValue}</span>
                  </div>
                </div>

                <!-- Explainability Details -->
                <div class="explainability-box">
                  <div class="explain-title">💡 Why this scored ${rankIdx === 0 ? 'highest' : 'here'}:</div>
                  <ul class="explain-list">
                    ${dest.matchReasons.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                </div>

                ${rankIdx === 0 ? `
                  <div class="top-match-footer">
                    <span class="consensus-tag">✓ Consensus Locked by Admin</span>
                    <button class="btn btn-sm btn-primary" id="btn-view-itinerary-shortcut">
                      View Generated 4-Day Itinerary →
                    </button>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Slider events
  container.querySelectorAll('.weight-range-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const factorId = e.target.getAttribute('data-factor');
      appState.updateWeight(factorId, e.target.value);
    });
  });

  // Reset button
  container.querySelector('#btn-reset-weights')?.addEventListener('click', () => {
    appState.resetWeights();
  });

  // View itinerary shortcut
  container.querySelector('#btn-view-itinerary-shortcut')?.addEventListener('click', () => {
    appState.setActiveTab('itinerary');
  });
}
