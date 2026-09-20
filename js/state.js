// js/state.js - Reactive State Manager for Myra 2.0 Customer Journey

import { TRIP_METADATA, MEMBERS, JOURNEY_STAGES, SCORING_FACTORS, ITINERARY_DAYS, CHAT_MESSAGES, BOOKING_PIPELINE, DISRUPTION_SCENARIO } from './data.js';

class StateStore {
  constructor() {
    this.state = {
      trip: { ...TRIP_METADATA },
      members: JSON.parse(JSON.stringify(MEMBERS)),
      stages: JOURNEY_STAGES,
      currentStageIndex: 0, // Stage 1 (0-indexed)
      activeView: "workspace", // "journey" (27-Stage Map) | "workspace" (Live Interactive Prototype)
      activePersonaId: "user-1", // Kabir Roy (Admin)
      activeTab: "itinerary", // "itinerary" | "chat" | "scoring" | "booking" | "live"
      mobileFrameMode: false, // Emulated mobile frame toggle on desktop
      
      // Scoring weights
      weights: {
        prefFit: 25,
        budgetFit: 20,
        expValue: 15,
        convenience: 15,
        qualityTrust: 10,
        flexibility: 10,
        availability: 5
      },

      // Chat state
      chatMessages: [...CHAT_MESSAGES],
      
      // Itinerary state
      itineraryDays: JSON.parse(JSON.stringify(ITINERARY_DAYS)),
      isRouteOptimized: true,

      // Booking & Payment
      bookingPipeline: JSON.parse(JSON.stringify(BOOKING_PIPELINE)),
      isBookingPaused: false,
      pauseExceptionDetails: null,
      permissionLevelAgreed: 3, // Level 3: Execute Approved Action

      // Disruption state
      disruption: { ...DISRUPTION_SCENARIO },
      disruptionActive: false,
      disruptionResolved: false,
      selectedResolutionOption: null,

      // Budget settings
      budgetFilter: "all"
    };

    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event, payload) {
    for (const listener of this.listeners) {
      listener(event, payload, this.state);
    }
  }

  // Getters
  getCurrentStage() {
    return this.state.stages[this.state.currentStageIndex];
  }

  getActivePersona() {
    return this.state.members.find(m => m.id === this.state.activePersonaId) || this.state.members[0];
  }

  // Actions
  setStage(stageNum) {
    const idx = this.state.stages.findIndex(s => s.stage === stageNum);
    if (idx !== -1) {
      this.state.currentStageIndex = idx;
      
      // Auto-switch relevant workspace tabs based on stage context
      if (stageNum <= 6) {
        this.state.activeTab = "members";
      } else if (stageNum >= 7 && stageNum <= 10) {
        this.state.activeTab = "chat";
      } else if (stageNum === 11) {
        this.state.activeTab = "scoring";
      } else if (stageNum >= 12 && stageNum <= 15) {
        this.state.activeTab = "itinerary";
      } else if (stageNum >= 16 && stageNum <= 20) {
        this.state.activeTab = "booking";
      } else if (stageNum >= 21) {
        this.state.activeTab = "live";
      }

      this.notify("STAGE_CHANGED", { stage: this.getCurrentStage() });
    }
  }

  nextStage() {
    if (this.state.currentStageIndex < this.state.stages.length - 1) {
      this.setStage(this.state.stages[this.state.currentStageIndex + 1].stage);
    }
  }

  prevStage() {
    if (this.state.currentStageIndex > 0) {
      this.setStage(this.state.stages[this.state.currentStageIndex - 1].stage);
    }
  }

  setView(viewName) {
    this.state.activeView = viewName;
    this.notify("VIEW_CHANGED", { view: viewName });
  }

  setActiveTab(tabName) {
    this.state.activeTab = tabName;
    this.notify("TAB_CHANGED", { tab: tabName });
  }

  setPersona(personaId) {
    this.state.activePersonaId = personaId;
    this.notify("PERSONA_CHANGED", { persona: this.getActivePersona() });
  }

  toggleMobileFrame() {
    this.state.mobileFrameMode = !this.state.mobileFrameMode;
    this.notify("FRAME_MODE_TOGGLED", { mobileFrameMode: this.state.mobileFrameMode });
  }

  updateWeight(factorId, val) {
    this.state.weights[factorId] = parseInt(val, 10);
    this.notify("WEIGHTS_UPDATED", { weights: this.state.weights });
  }

  resetWeights() {
    this.state.weights = {
      prefFit: 25,
      budgetFit: 20,
      expValue: 15,
      convenience: 15,
      qualityTrust: 10,
      flexibility: 10,
      availability: 5
    };
    this.notify("WEIGHTS_UPDATED", { weights: this.state.weights });
  }

  toggleRouteOptimization() {
    this.state.isRouteOptimized = !this.state.isRouteOptimized;
    this.notify("ROUTE_OPTIMIZED_TOGGLED", { isOptimized: this.state.isRouteOptimized });
  }

  toggleItemLock(dayIdx, itemIdx) {
    const item = this.state.itineraryDays[dayIdx].items[itemIdx];
    item.locked = !item.locked;
    this.notify("ITEM_LOCK_TOGGLED", { dayIdx, itemIdx, locked: item.locked });
  }

  sendChatMessage(text, sender = null) {
    const user = sender || this.getActivePersona();
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: user.name,
      senderRole: user.role,
      isAI: false,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.chatMessages.push(newMsg);
    this.notify("CHAT_UPDATED", { message: newMsg });

    // AI automated intervention logic:
    // If tagged @Myra or mentions budget / conflict / lock
    if (text.toLowerCase().includes("@myra") || text.toLowerCase().includes("budget") || text.toLowerCase().includes("conflict") || text.toLowerCase().includes("recommend")) {
      setTimeout(() => {
        let aiResponseText = "";
        let card = null;

        if (text.toLowerCase().includes("budget")) {
          aiResponseText = "Checking group budget parameters... Average preferred budget is ₹26,000. Rohan's hard limit is safely protected. Current itinerary package sits comfortably at ₹25,925/member.";
        } else if (text.toLowerCase().includes("hotel") || text.toLowerCase().includes("stay")) {
          aiResponseText = "Ri Kynjai Resort scored 94/100 for your group! Verified pure veg kitchen for Priya, lake view for Kabir & Tanya, and within group budget.";
          card = {
            type: "stay-proposal",
            title: "Ri Kynjai Lake Resort",
            price: "₹6,200/night/cottage",
            conflictResolved: "Pure veg dining certified",
            actionLabel: "Admin Lock Property"
          };
        } else {
          aiResponseText = `Understood! I'm monitoring group constraints in the background (Level 0: Observe). I'll alert you if any proposal violates Rohan's 11:30 AM flight constraint or Priya's meal preferences.`;
        }

        const aiMsg = {
          id: `m-${Date.now()}`,
          sender: "Myra AI",
          senderRole: "Assistant",
          isAI: true,
          text: aiResponseText,
          card: card,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        this.state.chatMessages.push(aiMsg);
        this.notify("CHAT_UPDATED", { message: aiMsg });
      }, 700);
    }
  }

  triggerDisruption() {
    this.state.disruptionActive = true;
    this.state.disruptionResolved = false;
    this.state.selectedResolutionOption = null;
    this.notify("DISRUPTION_TRIGGERED", { disruption: this.state.disruption });
  }

  resolveDisruption(optionId) {
    this.state.disruptionResolved = true;
    this.state.disruptionActive = false;
    this.state.selectedResolutionOption = optionId;
    this.notify("DISRUPTION_RESOLVED", { optionId });
  }

  triggerBookingPauseSimulation() {
    this.state.isBookingPaused = true;
    this.state.pauseExceptionDetails = {
      item: "IndiGo 6E-542 Return Flight",
      issue: "Supplier price changed from ₹6,200 to ₹7,850 (+₹1,650/seat)",
      toleranceCap: "₹1,500 Max Allowed",
      reason: "Surpasses Level 3 automatic tolerance. Level 5 Human Escalate checkpoint activated.",
      options: ["Accept price increase (+₹1,650)", "Book alternative flight (Air India at ₹6,400 with 1h layover)", "Abort booking"]
    };
    this.notify("BOOKING_PAUSED", { details: this.state.pauseExceptionDetails });
  }

  resumeBookingWithResolution(choice) {
    this.state.isBookingPaused = false;
    this.state.pauseExceptionDetails = null;
    this.notify("BOOKING_RESUMED", { choice });
  }
}

export const appState = new StateStore();
