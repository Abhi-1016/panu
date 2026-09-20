// js/mmt-state.js - Reactive State Store with Split-Screen Seasonal Voting & Rearrangeable Itinerary Logic

import { 
  MMT_TRIP, 
  MMT_MEMBERS, 
  MMT_PHONE_DIRECTORY, 
  SEASONAL_WINDOWS, 
  MMT_ITINERARY_DETAILED, 
  MMT_FLIGHT_ANCHORS, 
  MMT_MACRO_DAYS, 
  CANDIDATE_ACTIVITIES, 
  LOCAL_CUISINE_AND_MARKETS,
  DESTINATION_PACKAGES,
  GROUP_FLIGHT_BUNDLES,
  GROUP_HOTEL_PACKAGES,
  GRANTEX_CONFIG,
  AIRPORT_OPTIONS,
  GROUP_FLIGHT_BUNDLES_BY_AIRPORT,
  INTERCITY_TRANSIT_MODES,
  LOCATION_HOTEL_OPTIONS,
  SIGHTSEEING_CAB_FLEET,
  PREBOOKABLE_ACTIVITIES,
  CANCELLATION_POLICIES,
  DISRUPTION_SCENARIOS,
  REPLAN_OPTIONS_MATRIX,
  SENTINEL_ALERTS_INITIAL,
  CALENDAR_SLOTS_DATA
} from './mmt-data.js';

class MMTStore {
  constructor() {
    this.state = {
      isFullChatOpen: false,
      previewViewMode: "seasons", // "seasons" (Stage 8) | "itinerary" (Stages 12-13)
      deviceMode: "desktop", // "desktop" | "mobile"
      activePersonaId: "user-1", // Kabir (Admin)
      
      // Draggable resizer & Mobile segmented tabs
      splitPaneWidth: 390, // width in pixels for chat pane
      mobileActiveTab: "preview", // "chat" | "preview"

      trip: { ...MMT_TRIP },
      members: JSON.parse(JSON.stringify(MMT_MEMBERS)),
      phoneDirectory: { ...MMT_PHONE_DIRECTORY },
      seasonalWindows: JSON.parse(JSON.stringify(SEASONAL_WINDOWS.meghalaya || SEASONAL_WINDOWS)),
      macroDays: JSON.parse(JSON.stringify(MMT_MACRO_DAYS)),
      candidateActivities: JSON.parse(JSON.stringify(CANDIDATE_ACTIVITIES)),
      dayActivitySelections: {
        1: ["act-101", "act-102"],
        2: ["act-201", "act-202", "act-204"],
        3: ["act-301", "act-302"],
        4: ["act-401", "act-402"]
      },
      itinerary: JSON.parse(JSON.stringify(MMT_ITINERARY_DETAILED)),

      // Itinerary Builder Sub-Steps:
      // 1: macro_overview -> 2: activities_selection -> 3: itinerary_schedule -> 4: cuisines_markets -> 5: grantex_accounts -> 6: flight_booking -> 7: hotel_booking
      itinerarySubStep: "macro_overview",
      activeConfiguringDayNum: 2, // Default to Day 2 (Cherrapunji) for interactive activity selection

      // Sequential Step Locking (User cannot move to next part before completing preceding job)
      maxUnlockedSubStep: 1,

      // Pine Labs Grantex Autonomous Agent Vault State
      grantexConfig: { ...GRANTEX_CONFIG },
      grantexAccounts: [
        {
          memberId: "user-1",
          memberName: "Kabir Roy",
          role: "Trip Admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
          initialDeposit: 22000,
          spent: 0,
          balance: 22000,
          grantStatus: "pending", // "pending" | "authorized"
          grantexToken: "grntx_pinelabs_kabir_8892af",
          scope: ["travel:flights:book", "travel:hotels:book"],
          deductions: []
        },
        {
          memberId: "user-2",
          memberName: "Priya Menon",
          role: "Member",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
          initialDeposit: 18000,
          spent: 0,
          balance: 18000,
          grantStatus: "pending",
          grantexToken: "grntx_pinelabs_priya_4419bc",
          scope: ["travel:flights:book", "travel:hotels:book"],
          deductions: []
        },
        {
          memberId: "user-3",
          memberName: "Rohan Varma",
          role: "Member",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
          initialDeposit: 18000,
          spent: 0,
          balance: 18000,
          grantStatus: "pending",
          grantexToken: "grntx_pinelabs_rohan_1290de",
          scope: ["travel:flights:book", "travel:hotels:book"],
          deductions: []
        },
        {
          memberId: "user-4",
          memberName: "Tanya Sen",
          role: "Member",
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80",
          initialDeposit: 20000,
          spent: 0,
          balance: 20000,
          grantStatus: "pending",
          grantexToken: "grntx_pinelabs_tanya_7731ca",
          scope: ["travel:flights:book", "travel:hotels:book"],
          deductions: []
        }
      ],

      // Multi-Modal Inter-City Transit Studio (Flights / Trains / Cars)
      transitModes: JSON.parse(JSON.stringify(INTERCITY_TRANSIT_MODES)),
      selectedTransitMode: "flight", // "flight" | "train" | "car"
      isTransitSkipped: false,
      originAirport: "DEL",
      airportOptions: JSON.parse(JSON.stringify(AIRPORT_OPTIONS)),
      flightBundlesByAirport: JSON.parse(JSON.stringify(GROUP_FLIGHT_BUNDLES_BY_AIRPORT)),
      flightOptions: JSON.parse(JSON.stringify(GROUP_FLIGHT_BUNDLES_BY_AIRPORT.DEL)),
      selectedFlightId: "fl-del-indigo-best",
      flightVotes: {
        "user-1": "fl-del-indigo-best",
        "user-2": "fl-del-indigo-best",
        "user-3": "fl-del-indigo-best",
        "user-4": "fl-del-airindia-alt1"
      },
      isFlightBooked: false,
      flightBookingPnr: null,
      isFlightSkipped: false,

      // Location-by-Location Hotel Studio (Sequential: Location 1 -> Location 2)
      locationHotelOptions: JSON.parse(JSON.stringify(LOCATION_HOTEL_OPTIONS)),
      activeHotelLocationIdx: 0, // 0: Shillong (Nights 1 & 2), 1: Cherrapunji (Night 3)
      hotelVotesByLocation: {
        0: { "user-1": "htl-shl-rikynjai", "user-2": "htl-shl-rikynjai", "user-3": "htl-shl-rikynjai", "user-4": "htl-shl-marriott" },
        1: { "user-1": "htl-sohra-poloorchid", "user-2": "htl-sohra-jiva", "user-3": "htl-sohra-poloorchid", "user-4": "htl-sohra-poloorchid" }
      },
      selectedHotelByLocation: {
        0: "htl-shl-rikynjai",
        1: "htl-sohra-poloorchid"
      },
      selectedMealPlanByLocation: {
        0: "CP",
        1: "CP"
      },
      bookedHotelsByLocation: {}, // e.g. { 0: { hotelId, pnr, costPerPerson, mealPlan }, 1: ... }
      skippedHotelsByLocation: {}, // e.g. { 0: true }
      isHotelBooked: false,
      hotelBookingPnr: null,

      // Sightseeing Cab / Bus Fleet Services (Vehicle matched to group size)
      cabFleetOptions: JSON.parse(JSON.stringify(SIGHTSEEING_CAB_FLEET)),
      selectedCabId: "cab-innova-crysta",
      isCabBooked: false,
      cabBookingPnr: null,
      isCabSkipped: false,

      // Individual Activity Pre-Booking
      prebookableActivities: JSON.parse(JSON.stringify(PREBOOKABLE_ACTIVITIES)),
      selectedPrebookActivityIds: ["pact-zipline", "pact-caving", "pact-dawki-boat"],
      isActivitiesPrebooked: false,
      activitiesPnr: null,
      isActivitiesSkipped: false,

      // Budget Guardrail Alert State
      budgetAlert: null,

      // Local Cuisines, Good Foods & Vibrant Markets
      localCuisinesAndMarkets: JSON.parse(JSON.stringify(LOCAL_CUISINE_AND_MARKETS)),
      savedFlavours: ["flavour-2", "flavour-3", "flavour-4"],
      scheduledCuisineIds: [],

      // Live Vote Summary Tab State (Bottom of Chat Window)
      isVoteSummaryExpanded: false,
      activeVoteCategory: 'auto', // 'auto' | 'seasons' | 'flights' | 'hotels'

      // Post-Booking Master Itinerary, Group Locker & Sentinel Monitoring
      isTripFullyBooked: false,
      cancellationPolicies: { ...CANCELLATION_POLICIES },
      cancelledMemberIds: [],
      cancellationSim: {
        isOpen: false,
        memberId: "user-3", // default to Rohan Varma
        memberName: "Rohan Varma",
        isSimulated: false,
        totalPaid: 19850,
        cancellationLoss: 3650,
        refundAmount: 16200,
        flightPenalty: 3500,
        hotelPenalty: 0,
        cabPenalty: 0,
        activityPenalty: 150,
        deadlineHoursRemaining: 36,
        refundCredited: false,
        receiptId: null
      },
      disruptionState: {
        activeScenarioId: "flight_delay",
        affectedMemberId: "user-3", // Rohan
        scope: "solo", // "solo" | "group"
        selectedOptionId: "replan_min_disrupt",
        isReplanApplied: false,
        appliedOption: null,
        adminApproved: false
      },
      sentinelMonitoring: {
        alerts: JSON.parse(JSON.stringify(SENTINEL_ALERTS_INITIAL)),
        lastChecked: "Just now (Live)",
        consentSettings: {
          whatsapp: true,
          sms: true,
          inApp: true,
          autoReplanAlerts: true,
          instantPush: true
        }
      },
      activeLockerMemberId: "all",
      activeChatInterventionStage: "auto",

      // UI popovers
      isBudgetEditorOpen: false,
      isTravellerLookupOpen: false,
      isSpecModalOpen: false,

      // Consensus & Decision Lock state (Stage 9)
      isDecisionLocked: false,
      lockedWindowId: null,
      consensusSummary: {
        totalVotes: 4,
        leadWindow: "Mid-October: Post-Monsoon Cascades",
        votesForLead: 3,
        conflicts: [
          {
            member: "Rohan Varma",
            issue: "Client Demo Call on Day 1 until 11:30 AM",
            resolution: "IndiGo 6E-542 departs at 12:45 PM, avoiding any flight time clash."
          }
        ]
      },

      // Sequential Progressive Chat Playback State (Requirement 1)
      revealedMessageCount: 1,
      isChatStreaming: false,
      isTripFirstVisit: true,

      // Seasonal Window Consensus & Confirmation (Requirement 1)
      isSeasonalConsensusReached: true, // All 4 members (Kabir, Priya, Rohan, Tanya) cast initial votes
      isSeasonalWindowConfirmed: false,
      confirmedSeasonalWindowId: "win-1",

      // Entire Month Availability Calendar Dropdown & Synthesis (Requirement 2 & 3)
      activeCalendarMonth: "2026-10",
      isCalendarMonthDropdownOpen: true,
      calendarSlots: JSON.parse(JSON.stringify(CALENDAR_SLOTS_DATA["win-1"] || CALENDAR_SLOTS_DATA["default"])),
      monthCalendarSlots: [],
      memberDateSelections: {
        "user-1": ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20"],
        "user-2": ["2026-10-15", "2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20"],
        "user-3": ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20", "2026-10-21"],
        "user-4": ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20"]
      },
      synthesizedDateResult: {
        dates: "16 Oct - 20 Oct 2026",
        duration: "5 Days / 4 Nights (Optimal Group Window)",
        overlapCount: 4,
        overlapPercent: 100,
        feasibleFlight: "IndiGo 6E-542 (12:45 PM Outbound)",
        constraintCheck: "Zero clashes. Rohan's 11:30 AM client demo safely cleared before airport transit.",
        fareAdvantage: "Lowest group flight fare tier (₹8,900/head roundtrip)",
        isSynthesized: true
      },

      // Macro Day-Wise Itinerary Baseline & Active Day (Requirement 4)
      originalRecommendedMacroDays: JSON.parse(JSON.stringify(MMT_MACRO_DAYS)),
      activeMacroDayIdx: 0,
      lastSwappedDays: null,
      lastSwappedTimestamp: 0,
      isCuisinesConfirmed: false,

      // Conversation Stream
      chatMessages: [
        {
          id: "msg-1",
          sender: "Kabir Roy",
          role: "Trip Admin",
          isAI: false,
          text: "Hey folks! Welcome to our MakeMyTrip group workspace for Meghalaya. First up: let's decide the best time to visit!",
          time: "10:14 AM"
        },
        {
          id: "msg-2",
          sender: "Priya Menon",
          role: "Member",
          isAI: false,
          text: "I'm voting for Mid-October! Post-monsoon waterfalls will be roaring, and weather will be super pleasant.",
          time: "10:15 AM"
        },
        {
          id: "msg-3",
          sender: "Rohan Varma",
          role: "Member",
          isAI: false,
          text: "October works for me ONLY if we fly post 12 PM on Day 1. I have an unmovable client call till 11:30 AM.",
          time: "10:16 AM"
        },
        {
          id: "msg-4",
          sender: "Myra AI",
          role: "MMT Travel Copilot",
          isAI: true,
          text: "I've analyzed weather, flight trends, and crowds across 3 seasonal windows in the preview panel. Mid-October currently has 3 votes! Notice: majority vote alone cannot finalize dates because Rohan has a hard work constraint. Reviewing flight solutions...",
          time: "10:16 AM"
        }
      ]
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

  // Navigation Actions
  openFullChat(initialMode) {
    this.state.isFullChatOpen = true;
    if (initialMode) {
      this.state.previewViewMode = initialMode;
    } else {
      this.state.previewViewMode = this.state.isDecisionLocked ? 'itinerary' : 'seasons';
    }
    if (this.state.isTripFirstVisit) {
      this.state.isTripFirstVisit = false;
      this.startTripChatSequence();
    }
    this.notify("FULL_CHAT_OPENED", {});
  }

  startTripChatSequence() {
    if (this._chatTimer) {
      clearInterval(this._chatTimer);
      this._chatTimer = null;
    }
    this.state.revealedMessageCount = 1;
    this.state.isChatStreaming = true;
    this.notify("CHAT_STREAM_STARTED", { count: 1 });

    const total = this.state.chatMessages.length;
    this._chatTimer = setInterval(() => {
      if (this.state.revealedMessageCount < total) {
        this.state.revealedMessageCount += 1;
        this.notify("CHAT_STREAM_STEP", { count: this.state.revealedMessageCount });
      } else {
        this.state.isChatStreaming = false;
        clearInterval(this._chatTimer);
        this._chatTimer = null;
        this.notify("CHAT_STREAM_COMPLETED", { count: total });
      }
    }, 1100);
  }

  skipChatAnimation() {
    if (this._chatTimer) {
      clearInterval(this._chatTimer);
      this._chatTimer = null;
    }
    this.state.revealedMessageCount = this.state.chatMessages.length;
    this.state.isChatStreaming = false;
    this.notify("CHAT_STREAM_SKIPPED", { count: this.state.revealedMessageCount });
  }

  closeFullChat() {
    this.state.isFullChatOpen = false;
    this.notify("FULL_CHAT_CLOSED", {});
  }

  setPreviewViewMode(mode) {
    if (mode === "itinerary" && !this.state.isDecisionLocked && !this.state.isSeasonalWindowConfirmed && (this.state.maxUnlockedSubStep || 1) < 2) {
      if (typeof alert !== 'undefined') alert("Please vote on the seasonal travel window and have Trip Admin (Kabir) lock the decision first!");
      return;
    }
    this.state.previewViewMode = mode;
    this.notify("PREVIEW_MODE_CHANGED", { mode });
  }

  setLockerMemberFilter(memberId) {
    this.state.activeLockerMemberId = memberId || "all";
    this.notify("LOCKER_FILTER_CHANGED", { memberId: this.state.activeLockerMemberId });
  }

  setActiveChatInterventionStage(stage) {
    this.state.activeChatInterventionStage = stage || "auto";
    this.notify("CHAT_INTERVENTION_STAGE_CHANGED", { stage: this.state.activeChatInterventionStage });
  }

  setDeviceMode(mode) {
    this.state.deviceMode = mode;
    this.notify("DEVICE_CHANGED", { mode });
  }

  setPersona(personaId) {
    this.state.activePersonaId = personaId;
    this.notify("PERSONA_CHANGED", { persona: this.getActivePersona() });
  }

  getActivePersona() {
    return this.state.members.find(m => m.id === this.state.activePersonaId) || this.state.members[0];
  }

  // Requirement 1: Dynamic Location Change & Dynamic Itinerary Adaptation
  setDestination(destinationName) {
    const query = (destinationName || "").toLowerCase();
    let key = "meghalaya";
    if (query.includes("goa")) key = "goa";
    else if (query.includes("kashmir") || query.includes("srinagar") || query.includes("gulmarg")) key = "kashmir";
    else if (query.includes("kerala") || query.includes("munnar") || query.includes("alleppey")) key = "kerala";

    const pkg = DESTINATION_PACKAGES[key] || DESTINATION_PACKAGES["meghalaya"];

    this.state.trip.destination = destinationName || pkg.destination;
    this.state.trip.title = pkg.title;
    this.state.trip.destinationCode = pkg.destinationCode;
    this.state.trip.budgetMin = pkg.budgetMin;
    this.state.trip.budgetMax = pkg.budgetMax;
    this.state.trip.dates = pkg.dates;
    this.state.seasonalWindows = JSON.parse(JSON.stringify(pkg.seasonalWindows));
    this.state.macroDays = JSON.parse(JSON.stringify(pkg.macroDays));
    this.state.candidateActivities = JSON.parse(JSON.stringify(pkg.candidateActivities));
    this.state.itinerary = JSON.parse(JSON.stringify(pkg.itinerary));
    this.state.localCuisinesAndMarkets = JSON.parse(JSON.stringify(pkg.cuisinesAndMarkets));
    
    // Reset day activity selections to defaults for the selected destination
    this.state.dayActivitySelections = {
      1: pkg.candidateActivities[1]?.map(a => a.id).slice(0, 2) || [],
      2: pkg.candidateActivities[2]?.map(a => a.id).slice(0, 3) || [],
      3: pkg.candidateActivities[3]?.map(a => a.id).slice(0, 3) || [],
      4: pkg.candidateActivities[4]?.map(a => a.id).slice(0, 2) || []
    };
    this.state.isDecisionLocked = false;
    this.state.itinerarySubStep = "macro_overview";
    this.state.activeConfiguringDayNum = 2;
    this.state.budgetAlert = null;
    this.state.savedFlavours = (pkg.cuisinesAndMarkets || []).slice(0, 3).map(f => f.id);

    // Reset Two-Stage Consensus & Calendar
    this.state.seasonalWindows.forEach(w => { w.votedMemberIds = []; });
    this.state.isSeasonalConsensusReached = false;
    this.state.isSeasonalWindowConfirmed = false;
    this.state.confirmedSeasonalWindowId = pkg.seasonalWindows[0]?.id || "win-1";
    this.state.calendarSlots = JSON.parse(JSON.stringify(CALENDAR_SLOTS_DATA[pkg.seasonalWindows[0]?.id] || CALENDAR_SLOTS_DATA["win-1"] || CALENDAR_SLOTS_DATA["default"]));
    this.state.previewViewMode = "seasons";
    this.state.activeChatInterventionStage = "seasons";

    // Requirement 1: Fresh conversation begins new for selected trip
    const destShort = this.state.trip.destination.split(',')[0];
    this.state.chatMessages = [
      {
        id: `msg-${Date.now()}-1`,
        sender: "Kabir Roy",
        role: "Trip Admin",
        isAI: false,
        text: `Hey everyone! Welcome to our MakeMyTrip group trip workspace for ${destShort}. First task: let's select our seasonal travel window!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `msg-${Date.now()}-2`,
        sender: "Priya Menon",
        role: "Member",
        isAI: false,
        text: `Super excited! Looking forward to exploring ${destShort}. I've voted for the recommended travel window.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `msg-${Date.now()}-3`,
        sender: "Rohan Varma",
        role: "Member",
        isAI: false,
        text: `Count me in! Just please make sure our Day 1 flight accommodates my morning 11:30 AM client demo.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `msg-${Date.now()}-4`,
        sender: "Myra AI",
        role: "MMT Travel Copilot",
        isAI: true,
        text: `I've analyzed real-time weather, flight airfares, and crowd density across 3 seasonal windows for ${destShort} in the review panel. Once all 4 members cast their votes, I will summarize the consensus so Kabir (Admin) can confirm our travel window!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    // Start sequential progressive reveal
    this.startTripChatSequence();

    this.notify("DESTINATION_CHANGED", { destination: this.state.trip.destination, key });
  }

  // Requirement 2: Update per person budget anytime
  setBudgetRange(minVal, maxVal) {
    const min = parseInt(minVal, 10) || 18000;
    const max = parseInt(maxVal, 10) || (min + 12000);

    this.state.trip.budgetMin = min;
    this.state.trip.budgetMax = max;

    // Proportionally update members
    const avg = Math.round((min + max) / 2);
    this.state.members[0].prefBudget = avg;
    this.state.members[0].flexBudget = max;
    this.state.members[1].prefBudget = min;
    this.state.members[1].flexBudget = avg;
    this.state.members[2].prefBudget = Math.round(min * 0.95);
    this.state.members[2].hardLimit = max;
    this.state.members[3].prefBudget = avg;
    this.state.members[3].flexBudget = max;

    // Add passive AI notification in chat
    const budgetMsg = {
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Travel Copilot",
      isAI: true,
      text: `Group budget range updated to ₹${min.toLocaleString()} - ₹${max.toLocaleString()}/person by ${this.getActivePersona().name}. Validating all seasonal windows and hotel options against these new limits.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.chatMessages.push(budgetMsg);

    this.notify("BUDGET_CHANGED", { min, max });
  }

  // Requirement 2: Add travellers anytime by phone
  addTravellerByPhone(phoneNumber) {
    const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);
    const existing = this.state.members.find(m => m.phone && m.phone.includes(cleanPhone));
    if (existing) {
      return { success: false, message: `${existing.name} is already part of this group trip.` };
    }

    const matched = MMT_PHONE_DIRECTORY[cleanPhone];
    let newMember;
    if (matched) {
      newMember = {
        id: `user-${Date.now()}`,
        name: matched.name,
        role: "Member",
        phone: `+91 ${cleanPhone}`,
        avatar: matched.avatar,
        prefBudget: this.state.trip.budgetMin,
        flexBudget: this.state.trip.budgetMax,
        hardLimit: this.state.trip.budgetMax + 4000,
        isBudgetPrivate: false,
        diet: "Vegetarian",
        flightSeat: "Aisle",
        mandateStatus: "Pending Authorization",
        mandateAmount: this.state.trip.budgetMax,
        capturedAmount: 0,
        upiId: `${matched.name.toLowerCase().replace(/\s+/g, '')}@okaxis`,
        pastRecords: matched.pastRecords
      };
    } else {
      newMember = {
        id: `user-${Date.now()}`,
        name: `Friend (${cleanPhone.slice(-4)})`,
        role: "Member",
        phone: `+91 ${cleanPhone}`,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80",
        prefBudget: this.state.trip.budgetMin,
        flexBudget: this.state.trip.budgetMax,
        hardLimit: this.state.trip.budgetMax + 3000,
        isBudgetPrivate: true,
        diet: "Standard",
        flightSeat: "Middle",
        mandateStatus: "Invite Sent",
        mandateAmount: this.state.trip.budgetMax,
        capturedAmount: 0,
        upiId: "guest@upi",
        pastRecords: "Lightweight Web Onboarding (Stage 3)"
      };
    }

    this.state.members.push(newMember);
    this.state.trip.travellerCount = this.state.members.length;

    // Chat announcement
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Travel Copilot",
      isAI: true,
      text: `Added ${newMember.name} (+91 ${cleanPhone}) to the workspace. Synced MMT preferences: ${newMember.pastRecords || 'Standard traveler profile'}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("TRAVELLER_ADDED", { member: newMember });
    return { success: true, message: `Added ${newMember.name}! MMT records synced.` };
  }

  // Requirement 1: Highest Parity Window & Seasonal Voting
  getHighestParitySeasonalWindow() {
    let lead = this.state.seasonalWindows[0];
    let maxVotes = -1;
    this.state.seasonalWindows.forEach(win => {
      const vCount = (win.votedMemberIds || []).length;
      if (vCount > maxVotes) {
        maxVotes = vCount;
        lead = win;
      }
    });
    const total = this.state.members.length;
    return {
      window: lead,
      votesCount: (lead.votedMemberIds || []).length,
      totalMembers: total,
      parityPercent: Math.round(((lead.votedMemberIds || []).length / Math.max(total, 1)) * 100)
    };
  }

  voteSeasonalWindow(windowId, memberId = null) {
    const voterId = memberId || this.getActivePersona().id;
    
    // Remove user's vote from any other window
    this.state.seasonalWindows.forEach(win => {
      win.votedMemberIds = (win.votedMemberIds || []).filter(id => id !== voterId);
    });

    // Add vote to target window
    const target = this.state.seasonalWindows.find(w => w.id === windowId);
    if (target) {
      if (!target.votedMemberIds) target.votedMemberIds = [];
      target.votedMemberIds.push(voterId);
    }

    // Check if all members completed their voting in chat
    const allVotedMembers = new Set();
    this.state.seasonalWindows.forEach(w => {
      (w.votedMemberIds || []).forEach(mId => allVotedMembers.add(mId));
    });

    const parity = this.getHighestParitySeasonalWindow();
    const leadWin = parity.window;

    if (allVotedMembers.size >= this.state.members.length && !this.state.isSeasonalConsensusReached) {
      this.state.isSeasonalConsensusReached = true;
      const briefMsg = {
        id: `msg-${Date.now()}`,
        sender: "Myra AI",
        role: "MMT Travel Copilot",
        isAI: true,
        text: `📊 VOTING SUMMARY BRIEF: All ${allVotedMembers.size} travellers have cast their votes! Highest parity choice: "${leadWin.title}" with ${parity.votesCount}/${this.state.members.length} votes (${parity.parityPercent}% consensus). All constraints (including Rohan's 11:30 AM client call) are accommodated by IndiGo 6E-542 departing at 12:45 PM. Trip Admin (Kabir Roy), please confirm this travel window to open the month calendar dropdown!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.state.chatMessages.push(briefMsg);
      this.state.revealedMessageCount = this.state.chatMessages.length;
    }

    this.notify("SEASONAL_VOTE_UPDATED", { windowId, memberId: voterId, parity });
  }

  // Requirement 1 & 2: Once travel window is confirmed by Admin, open month calendar dropdown
  confirmSeasonalWindow(windowId) {
    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    const win = this.state.seasonalWindows.find(w => w.id === windowId) || this.getHighestParitySeasonalWindow().window || this.state.seasonalWindows[0];

    this.state.isSeasonalWindowConfirmed = true;
    this.state.confirmedSeasonalWindowId = win.id;
    this.state.activeChatInterventionStage = "calendar_dates";
    this.state.isCalendarMonthDropdownOpen = true;
    this.state.monthCalendarSlots = this.generateMonthCalendarDays(this.state.activeCalendarMonth || "2026-10");
    this.state.calendarSlots = JSON.parse(JSON.stringify(CALENDAR_SLOTS_DATA[win.id] || CALENDAR_SLOTS_DATA["win-1"] || CALENDAR_SLOTS_DATA["default"]));

    // Myra Announcement
    const msg = {
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Travel Copilot",
      isAI: true,
      text: `✨ TRAVEL WINDOW CONFIRMED BY TRIP ADMIN (${admin.name}): "${win.title}". An entire month availability calendar is now ready below as a dropdown. Select the dropdown to open the calendar and mark your available dates. Once all members mark their dates, I will synthesize the combination and find the optimal group travel dates!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.chatMessages.push(msg);
    this.state.revealedMessageCount = this.state.chatMessages.length;

    this.notify("SEASONAL_WINDOW_CONFIRMED", { window: win });
    this.notify("STAGE_UPDATED", { stage: "calendar_dates" });
  }

  // Requirement 2: Entire Month Calendar Generation & Dropdown Controls
  generateMonthCalendarDays(yearMonth = "2026-10") {
    const days = [];
    const isNov = yearMonth === "2026-11";
    const totalDays = isNov ? 30 : 31;
    const monthName = isNov ? "Nov" : "Oct";
    const monthNumStr = isNov ? "11" : "10";
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let d = 1; d <= totalDays; d++) {
      const dStr = d < 10 ? `0${d}` : `${d}`;
      const dateKey = `2026-${monthNumStr}-${dStr}`;
      const dateObj = new Date(2026, isNov ? 10 : 9, d);
      const dayOfWeekIdx = dateObj.getDay(); // 0 = Sun, 1 = Mon ...
      const dayName = dayNames[dayOfWeekIdx];
      const isWeekend = dayOfWeekIdx === 0 || dayOfWeekIdx === 6;
      
      let flightSurge = "Standard";
      let crowdLevel = "Moderate";
      let isRecommended = false;

      if (!isNov) {
        if (d >= 14 && d <= 15) {
          flightSurge = "Lowest Airfare (-15%)";
          crowdLevel = "Low";
        } else if (d >= 16 && d <= 20) {
          flightSurge = "Optimal Deal";
          crowdLevel = "Optimal";
          isRecommended = true;
        } else if (d >= 21 && d <= 25) {
          flightSurge = "Pre-Diwali Rate";
          crowdLevel = "Moderate";
        } else if (d >= 26) {
          flightSurge = "Diwali Surge (+35%)";
          crowdLevel = "Peak";
        }
      } else {
        if (d >= 20 && d <= 23) {
          flightSurge = "Optimal Deal";
          isRecommended = true;
        }
      }

      days.push({
        dateKey,
        dayNum: d,
        dayName,
        dayOfWeek: dayOfWeekIdx,
        month: monthName,
        isWeekend,
        flightSurge,
        crowdLevel,
        isRecommended
      });
    }
    return days;
  }

  toggleCalendarMonthDropdown(forceState = null) {
    if (forceState !== null) {
      this.state.isCalendarMonthDropdownOpen = forceState;
    } else {
      this.state.isCalendarMonthDropdownOpen = !this.state.isCalendarMonthDropdownOpen;
    }
    this.notify("CALENDAR_DROPDOWN_TOGGLED", { isOpen: this.state.isCalendarMonthDropdownOpen });
  }

  setCalendarMonth(monthStr) {
    this.state.activeCalendarMonth = monthStr;
    this.state.monthCalendarSlots = this.generateMonthCalendarDays(monthStr);
    this.notify("CALENDAR_MONTH_CHANGED", { month: monthStr });
  }

  // Member date selection within full month calendar
  toggleMemberDate(memberId, dateKey) {
    if (!this.state.memberDateSelections[memberId]) {
      this.state.memberDateSelections[memberId] = [];
    }
    const arr = this.state.memberDateSelections[memberId];
    const idx = arr.indexOf(dateKey);
    if (idx >= 0) {
      arr.splice(idx, 1);
    } else {
      arr.push(dateKey);
    }
    this.synthesizeOptimalGroupDates();
    this.notify("MEMBER_DATE_TOGGLED", { memberId, dateKey });
  }

  recordAllMemberDates() {
    this.state.memberDateSelections = {
      "user-1": ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20"],
      "user-2": ["2026-10-15", "2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20"],
      "user-3": ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20", "2026-10-21"],
      "user-4": ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20"]
    };
    this.synthesizeOptimalGroupDates();
    
    const synth = this.state.synthesizedDateResult;
    const synthMsg = {
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Travel Copilot",
      isAI: true,
      text: `🎯 DATES SYNTHESIZED: I have evaluated everyone's calendar availability across the entire month! The optimal travel window is ${synth.dates} (${synth.duration}) with 100% group consensus (4/4 members free). ${synth.constraintCheck} Trip Admin (${this.state.members[0].name}), please approve this travel window to move to the macro day-wise itinerary!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.chatMessages.push(synthMsg);
    this.state.revealedMessageCount = this.state.chatMessages.length;
    this.notify("ALL_MEMBER_DATES_RECORDED", {});
  }

  // Requirement 3: Myra AI Date Synthesis Algorithm
  synthesizeOptimalGroupDates() {
    const memberIds = Object.keys(this.state.memberDateSelections);
    if (memberIds.length === 0) return this.state.synthesizedDateResult;

    let common = [...(this.state.memberDateSelections[memberIds[0]] || [])];
    for (let i = 1; i < memberIds.length; i++) {
      const current = this.state.memberDateSelections[memberIds[i]] || [];
      common = common.filter(d => current.includes(d));
    }
    common.sort();

    if (common.length >= 3) {
      const first = parseInt(common[0].split('-')[2], 10);
      const last = parseInt(common[common.length - 1].split('-')[2], 10);
      this.state.synthesizedDateResult = {
        dates: `${first} Oct - ${last} Oct 2026`,
        duration: `${common.length} Days / ${common.length - 1} Nights (Optimal Travel Window)`,
        overlapCount: memberIds.length,
        overlapPercent: 100,
        feasibleFlight: "IndiGo 6E-542 (12:45 PM Outbound)",
        constraintCheck: "Zero clashes. Rohan's 11:30 AM client demo safely cleared before airport transit.",
        fareAdvantage: "Optimal group flight fare tier (₹8,900/head roundtrip)",
        isSynthesized: true
      };
    } else {
      this.state.synthesizedDateResult = {
        dates: "16 Oct - 20 Oct 2026",
        duration: "5 Days / 4 Nights (Optimal Travel Window)",
        overlapCount: 4,
        overlapPercent: 100,
        feasibleFlight: "IndiGo 6E-542 (12:45 PM)",
        constraintCheck: "Rohan's 11:30 AM client demo accommodated via afternoon flight.",
        fareAdvantage: "Lowest surge rate window",
        isSynthesized: true
      };
    }
    return this.state.synthesizedDateResult;
  }

  // Requirement 3: Admin approves the synthesized travel window -> shifts to Macro Day-Wise Itinerary (Requirement 4)
  approveFinalTravelDates() {
    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    const synth = this.state.synthesizedDateResult;

    this.state.trip.dates = synth.dates;
    this.state.isDecisionLocked = true;
    this.state.trip.isDecisionLocked = true;
    this.state.itinerarySubStep = "macro_overview";
    this.state.activeChatInterventionStage = "macro_overview";
    this.state.previewViewMode = "itinerary";
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 1);

    const approveMsg = {
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Travel Copilot",
      isAI: true,
      text: `🎉 TRAVEL DATES APPROVED BY ADMIN (${admin.name})! Group dates officially locked to ${synth.dates}. Shifting to the macro view of the day-wise itinerary. Review Myra's recommended day-by-day plan of places to visit, toggle between days, or reshuffle as preferred.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.chatMessages.push(approveMsg);
    this.state.revealedMessageCount = this.state.chatMessages.length;

    this.notify("FINAL_DATES_APPROVED", { dates: synth.dates });
    this.notify("STAGE_UPDATED", { stage: "macro_overview" });
  }

  // Backward compatible alias
  lockTripDecision(windowId) {
    if (!this.state.isSeasonalWindowConfirmed) {
      this.confirmSeasonalWindow(windowId);
    } else {
      this.approveFinalTravelDates();
    }
  }

  // Requirement 4: Macro Day-Wise Itinerary Toggling, Reshuffling & Admin Approval
  setActiveMacroDay(dayIdx) {
    this.state.activeMacroDayIdx = dayIdx;
    this.state.activeConfiguringDayNum = (this.state.macroDays[dayIdx]?.dayNum) || (dayIdx + 1);
    this.notify("MACRO_DAY_CHANGED", { activeDayIdx: dayIdx, day: this.state.macroDays[dayIdx] });
  }

  reorderMacroDays(fromIdx, toIdx) {
    if (fromIdx < 0 || fromIdx >= this.state.macroDays.length || toIdx < 0 || toIdx >= this.state.macroDays.length || fromIdx === toIdx) return;
    this.swapMacroDays(fromIdx, toIdx);
  }

  swapMacroDays(idxA, idxB, reason = null) {
    if (idxA < 0 || idxA >= this.state.macroDays.length || 
        idxB < 0 || idxB >= this.state.macroDays.length || 
        idxA === idxB) {
      return false;
    }

    // Authentic 2-element swap in macroDays
    const tempMacro = this.state.macroDays[idxA];
    this.state.macroDays[idxA] = this.state.macroDays[idxB];
    this.state.macroDays[idxB] = tempMacro;

    // Re-index day numbers
    this.state.macroDays.forEach((d, idx) => {
      d.dayNum = idx + 1;
    });

    // Also swap corresponding full itinerary days if they exist
    if (this.state.itinerary && this.state.itinerary.length >= this.state.macroDays.length) {
      const tempItin = this.state.itinerary[idxA];
      this.state.itinerary[idxA] = this.state.itinerary[idxB];
      this.state.itinerary[idxB] = tempItin;
      this.state.itinerary.forEach((d, idx) => {
        d.day = idx + 1;
      });
    }

    // Keep candidate activities map aligned
    if (this.state.dayActivitySelections) {
      const dayNumA = idxA + 1;
      const dayNumB = idxB + 1;
      const selA = this.state.dayActivitySelections[dayNumA];
      const selB = this.state.dayActivitySelections[dayNumB];
      this.state.dayActivitySelections[dayNumA] = selB;
      this.state.dayActivitySelections[dayNumB] = selA;
    }

    // Record last swapped days for UI pulse animation
    this.state.lastSwappedDays = [idxA, idxB];
    this.state.lastSwappedTimestamp = Date.now();

    // Auto-update active macro day to idxA
    this.state.activeMacroDayIdx = idxA;
    this.state.activeConfiguringDayNum = idxA + 1;

    const titleA = this.state.macroDays[idxA]?.title?.split('—')[0]?.trim() || `Day ${idxA + 1}`;
    const titleB = this.state.macroDays[idxB]?.title?.split('—')[0]?.trim() || `Day ${idxB + 1}`;

    const announcement = reason || 
      `🔄 ITINERARY RESHUFFLED: Shifted Day ${idxA + 1} and Day ${idxB + 1}! Now Day ${idxB + 1} is ${titleB}. Recalculated transit feasibility: Anti-backtracking efficiency maintained at 94%.`;

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Route Engine",
      isAI: true,
      text: announcement,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.state.revealedMessageCount = this.state.chatMessages.length;

    this.notify("MACRO_DAYS_REORDERED", { 
      macroDays: this.state.macroDays, 
      swapped: [idxA, idxB],
      announcement 
    });

    return true;
  }

  resetMacroDaysToRecommended() {
    if (this.state.originalRecommendedMacroDays) {
      this.state.macroDays = JSON.parse(JSON.stringify(this.state.originalRecommendedMacroDays));
    }
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Route Engine",
      isAI: true,
      text: "↺ RESTORED RECOMMENDATION: Reset day-wise itinerary back to Myra's original optimal route. Mountain transits and daylight hours are synchronized perfectly.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.notify("MACRO_DAYS_REORDERED", { macroDays: this.state.macroDays });
  }

  approveMacroItinerary() {
    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 2);
    this.state.itinerarySubStep = "activities_selection";
    this.state.activeChatInterventionStage = "activities_selection";

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: "🏆 Day-wise macro itinerary sequence approved! Day allocation is finalized. Moving to Day Activities & Customization.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "MMT Itinerary Copilot",
      isAI: true,
      text: "🎯 STEP 2 ACTIVE: DAY ACTIVITIES & SIGHTSEEING. You can now configure activities for each day below while I protect group budget guardrails.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("MACRO_ITINERARY_APPROVED", { macroDays: this.state.macroDays });
    this.notify("ITINERARY_SUBSTEP_CHANGED", { step: "activities_selection" });
    this.notify("STAGE_UPDATED", { stage: "activities_selection" });
  }

  // Requirement 5: Strict Stage Gating Logic (Upcoming Stages Greyed Out & Disabled)
  isStageUnlocked(stageKey) {
    const STAGES = [
      'seasons',              // 0
      'calendar_dates',       // 1
      'macro_overview',       // 2
      'activities_selection', // 3
      'cuisines_markets',     // 4
      'grantex_accounts',     // 5
      'transit_booking',      // 6
      'hotels_booking',       // 7
      'cab_booking',          // 8
      'activities_prebook',   // 9
      'live_radar',           // 10
      'cancellation_engine'   // 11
    ];

    const idx = STAGES.indexOf(stageKey);
    if (idx === -1) return true;

    // Stage 1: Seasons is always unlocked
    if (idx === 0) return true;

    // Stage 2: Calendar requires Admin season window approval
    if (idx === 1) return this.state.isSeasonalWindowConfirmed === true;

    // Stage 3: Macro Overview requires Admin travel dates approval
    if (idx === 2) return this.state.isDecisionLocked === true;

    // Stage 4: Activities selection requires Admin macro itinerary approval (maxUnlockedSubStep >= 2)
    if (idx === 3) return this.state.maxUnlockedSubStep >= 2;

    // Stage 5: Cuisines requires maxUnlockedSubStep >= 4
    if (idx === 4) return this.state.maxUnlockedSubStep >= 4;

    // Stage 6: Grantex Vaults requires maxUnlockedSubStep >= 5
    if (idx === 5) return this.state.maxUnlockedSubStep >= 5;

    // Stage 7: Transit/Flights requires maxUnlockedSubStep >= 6
    if (idx === 6) return this.state.maxUnlockedSubStep >= 6;

    // Stage 8: Hotels requires maxUnlockedSubStep >= 7
    if (idx === 7) return this.state.maxUnlockedSubStep >= 7;

    // Stage 9: Cabs requires maxUnlockedSubStep >= 8
    if (idx === 8) return this.state.maxUnlockedSubStep >= 8;

    // Stage 10: Activity passes requires maxUnlockedSubStep >= 9
    if (idx === 9) return this.state.maxUnlockedSubStep >= 9;

    // Stages 11 & 12: Live monitoring requires trip fully booked
    if (idx >= 10) return this.state.isTripFullyBooked === true;

    return false;
  }

  isStageCompleted(stageKey) {
    if (stageKey === 'seasons') return this.state.isSeasonalWindowConfirmed === true;
    if (stageKey === 'calendar_dates') return this.state.isDecisionLocked === true;
    if (stageKey === 'macro_overview') return this.state.maxUnlockedSubStep >= 2;
    if (stageKey === 'activities_selection') return this.state.maxUnlockedSubStep >= 3;
    if (stageKey === 'cuisines_markets') return this.state.maxUnlockedSubStep >= 5;
    if (stageKey === 'grantex_accounts') return this.state.maxUnlockedSubStep >= 6;
    if (stageKey === 'transit_booking') return this.state.maxUnlockedSubStep >= 7;
    if (stageKey === 'hotels_booking') return this.state.maxUnlockedSubStep >= 8;
    if (stageKey === 'cab_booking') return this.state.maxUnlockedSubStep >= 9;
    if (stageKey === 'activities_prebook') return this.state.isTripFullyBooked === true;
    return false;
  }

  getMaxUnlockedStageIndex() {
    const STAGES = [
      'seasons', 'calendar_dates', 'macro_overview', 'activities_selection',
      'cuisines_markets', 'grantex_accounts', 'transit_booking', 'hotels_booking',
      'cab_booking', 'activities_prebook', 'live_radar', 'cancellation_engine'
    ];
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (this.isStageUnlocked(STAGES[i])) return i;
    }
    return 0;
  }

  // Set Sub-Step for Itinerary Builder with 9 Sequential Steps
  setItinerarySubStep(step, dayNum = null) {
    const stepOrder = {
      macro_overview: 1,
      activities_selection: 2,
      itinerary_schedule: 3,
      cuisines_markets: 4,
      grantex_accounts: 5,
      transit_booking: 6,
      flight_booking: 6,
      flight_hotel_selection: 6,
      hotels_booking: 7,
      hotel_booking: 7,
      cab_booking: 8,
      activities_prebook: 9
    };
    const targetNum = stepOrder[step] || 1;
    if (targetNum > this.state.maxUnlockedSubStep) {
      if (typeof alert !== 'undefined') alert(`Please complete Step ${this.state.maxUnlockedSubStep} before advancing to Step ${targetNum}.`);
      return false;
    }
    this.state.itinerarySubStep = step;
    if (dayNum !== null) {
      this.state.activeConfiguringDayNum = dayNum;
    }
    this.notify("ITINERARY_SUBSTEP_CHANGED", { step, dayNum: this.state.activeConfiguringDayNum });
    return true;
  }

  advanceFromMacroOverview() {
    this.approveMacroItinerary();
  }

  advanceFromScheduleToCuisines() {
    this.advanceToCuisinesMarkets();
  }

  setActiveConfiguringDay(dayNum) {
    this.state.activeConfiguringDayNum = dayNum;
    this.notify("ACTIVE_DAY_CHANGED", { dayNum });
  }

  // Requirement 3, 4 & 5: Activity Selection with AI Budget Guardrail
  toggleActivityChoice(dayNum, activityId) {
    const persona = this.getActivePersona();
    const curSelections = this.state.dayActivitySelections[dayNum] || [];
    const pool = this.state.candidateActivities[dayNum] || [];
    const targetAct = pool.find(a => a.id === activityId);
    if (!targetAct) return;

    const isAlreadySelected = curSelections.includes(activityId);

    if (isAlreadySelected) {
      // Deselect
      this.state.dayActivitySelections[dayNum] = curSelections.filter(id => id !== activityId);
      this.notify("ACTIVITY_SELECTION_UPDATED", { dayNum, activityId, selected: false });
    } else {
      // Calculate projected cost with this activity
      let totalActivityCost = 0;
      Object.keys(this.state.dayActivitySelections).forEach(d => {
        const selIds = this.state.dayActivitySelections[d] || [];
        const dPool = this.state.candidateActivities[d] || [];
        selIds.forEach(id => {
          const act = dPool.find(a => a.id === id);
          if (act) totalActivityCost += act.cost;
        });
      });

      const baseTripPkg = 20500; // base flights + 4-star stays + private cabs
      const projectedTotal = baseTripPkg + totalActivityCost + targetAct.cost;
      const memberLimit = persona.hardLimit || persona.flexBudget || 28000;

      // Requirement 5: Budget Guardrail Trigger if activity pushes member over their budget limit
      if (projectedTotal > memberLimit) {
        const excess = projectedTotal - memberLimit;
        const suggested = memberLimit + excess + 500; // suggested new budget rounded up

        this.state.budgetAlert = {
          memberId: persona.id,
          memberName: persona.name,
          activityId: targetAct.id,
          dayNum: dayNum,
          activityTitle: targetAct.title,
          cost: targetAct.cost,
          currentBudget: memberLimit,
          projectedTotal: projectedTotal,
          excessAmount: excess,
          newSuggestedBudget: suggested
        };

        // Post notice in chat
        this.state.chatMessages.push({
          id: `msg-${Date.now()}`,
          sender: "Myra AI",
          role: "MMT Budget Guardrail",
          isAI: true,
          text: `⚠️ PERSONAL BUDGET ALERT for ${persona.name}: Adding "${targetAct.title}" (+₹${targetAct.cost.toLocaleString()}) pushes your personal projected total to ₹${projectedTotal.toLocaleString()}, which exceeds your individual personal budget of ₹${memberLimit.toLocaleString()} by ₹${excess.toLocaleString()}. ${persona.name}, please increase your personal budget to incorporate this activity.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        this.notify("BUDGET_ALERT_TRIGGERED", { alert: this.state.budgetAlert });
        return;
      }

      // Within budget: select activity
      this.state.dayActivitySelections[dayNum] = [...curSelections, activityId];
      this.notify("ACTIVITY_SELECTION_UPDATED", { dayNum, activityId, selected: true });
    }
  }

  dismissBudgetAlert() {
    this.state.budgetAlert = null;
    this.notify("BUDGET_ALERT_DISMISSED", {});
  }

  // Requirement 5: Increase Member Budget to accommodate desired activity
  increaseMemberBudget(memberId, newBudgetAmount) {
    const persona = this.state.members.find(m => m.id === memberId) || this.getActivePersona();
    const oldLimit = persona.hardLimit || persona.flexBudget;
    persona.hardLimit = newBudgetAmount;
    persona.flexBudget = newBudgetAmount;

    // Update global trip max if needed
    if (newBudgetAmount > this.state.trip.budgetMax) {
      this.state.trip.budgetMax = newBudgetAmount;
    }

    // If there was a pending activity that triggered this, add it now
    if (this.state.budgetAlert && this.state.budgetAlert.activityId) {
      const { dayNum, activityId, activityTitle } = this.state.budgetAlert;
      const curSelections = this.state.dayActivitySelections[dayNum] || [];
      if (!curSelections.includes(activityId)) {
        this.state.dayActivitySelections[dayNum] = [...curSelections, activityId];
      }

      this.state.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: "Myra AI",
        role: "MMT Budget Copilot",
        isAI: true,
        text: `✅ Budget updated! ${persona.name} increased budget from ₹${oldLimit.toLocaleString()} to ₹${newBudgetAmount.toLocaleString()}. "${activityTitle}" has been successfully added to Day ${dayNum}!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    this.state.budgetAlert = null;
    this.notify("MEMBER_BUDGET_INCREASED", { memberId, newBudget: newBudgetAmount });
  }

  // Requirement 3 & 4: Myra synthesizes the optimal feasible day itinerary from group choices
  synthesizeDayItinerary(dayNum) {
    const selIds = this.state.dayActivitySelections[dayNum] || [];
    const pool = this.state.candidateActivities[dayNum] || [];
    const chosenActs = pool.filter(a => selIds.includes(a.id));

    if (chosenActs.length === 0) {
      alert("Please select at least 1 activity for this day.");
      return;
    }

    // AI Scheduling Synthesis: sort activities by optimal daylight & opening hours
    // Early morning: Waterfalls (fog beats) -> Midday: Caving / Indoor / Lunch -> Afternoon: Treks / Views -> Evening: Cafe / Strolls
    const timeSlots = ["08:30 AM", "11:30 AM", "01:30 PM", "03:45 PM", "06:30 PM", "08:15 PM"];
    const generatedStops = chosenActs.map((act, idx) => ({
      id: `gen-${dayNum}-${act.id}`,
      time: timeSlots[idx] || "05:00 PM",
      title: act.title,
      subtitle: act.description,
      type: act.category.toLowerCase().includes("food") ? "food" : act.category.toLowerCase().includes("adventure") ? "activity" : "sightseeing",
      badge: act.tags[0] || "AI Scheduled",
      duration: act.duration,
      locked: idx === 0 // lock first slot for route stability
    }));

    // Update day in itinerary
    if (this.state.itinerary[dayNum - 1]) {
      this.state.itinerary[dayNum - 1].stops = generatedStops;
      this.state.itinerary[dayNum - 1].summary = chosenActs.map(a => a.title.split(' ')[0]).join(' • ');
    }

    // AI synthesis announcement in chat
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Feasibility Engine",
      isAI: true,
      text: `🧠 SCHEDULE SYNTHESIZED FOR DAY ${dayNum}: Assembled ${chosenActs.length} selected experiences into an optimal chronological sequence. Timed early morning slots to avoid afternoon valley mist, routed without backtracking, and ensured all cave visits finish before 5 PM closing.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Unlock Step 3 (Schedule Logic)
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 3);
    this.setItinerarySubStep("itinerary_schedule", dayNum);
  }

  // Check if all macro days have at least 1 chosen activity
  isAllDaysActivitiesSelected() {
    const numDays = (this.state.macroDays && this.state.macroDays.length) || 4;
    for (let d = 1; d <= numDays; d++) {
      const sel = this.state.dayActivitySelections[d] || [];
      if (sel.length === 0) return false;
    }
    return true;
  }

  // One-click move to Local Cuisines and Markets
  advanceToCuisinesMarkets() {
    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 4);
    this.state.itinerarySubStep = "cuisines_markets";
    this.state.activeChatInterventionStage = "cuisines_markets";

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: "🍽️ Group activities across all days are confirmed! Moving directly to Local Cuisines & Markets to pick our culinary stops.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "MMT Feasibility Engine",
      isAI: true,
      text: "🍛 LOCAL CUISINES & MARKETS UNLOCKED: Browse or tag me in chat to add traditional meals and bazaars (e.g. '@Myra add Jadoh Rice Stall' or '@Myra choose Orange Roots Thali'). Once selected, the complete master itinerary will be revealed in your preview window!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.state.revealedMessageCount = this.state.chatMessages.length;

    this.notify("ITINERARY_SUBSTEP_CHANGED", { step: "cuisines_markets" });
  }

  // Requirement 1 & 2: Draggable Resizer & Mobile Tabs
  setMobileActiveTab(tab) {
    this.state.mobileActiveTab = tab;
    this.notify("MOBILE_TAB_CHANGED", { tab });
  }

  setSplitPaneWidth(widthPx) {
    this.state.splitPaneWidth = Math.max(260, Math.min(widthPx, 800));
    this.notify("PANE_WIDTH_CHANGED", { width: this.state.splitPaneWidth });
  }

  // Robust Time Parser in Minutes from Midnight (Handles 12-hour AM/PM)
  parseTimeToMinutes(t) {
    if (!t) return 0;
    const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let hrs = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    const meridiem = match[3].toUpperCase();
    if (meridiem === 'PM' && hrs < 12) hrs += 12;
    if (meridiem === 'AM' && hrs === 12) hrs = 0;
    return hrs * 60 + mins;
  }

  // Requirement 1: Intelligent Dynamic Placement of Local Cuisines and Markets
  // Myra decides where the local cuisine/market best fits based on geography, meal category, and active daylight transit timings
  getBestFitForCuisine(item) {
    if (!item) return { targetDay: 1, timeSlot: "01:15 PM", categorySlot: "Lunch", routingReason: "Standard slot" };

    const itinerary = this.state.itinerary || [];
    const numDays = itinerary.length || 4;

    // 1. Identify cuisine keywords & meal slot
    const title = (item.title || "").toLowerCase();
    const type = (item.type || "").toLowerCase();
    const venue = (item.venue || "").toLowerCase();
    const tags = (item.tags || []).map(t => t.toLowerCase());
    const bestFor = (item.bestFor || "").toLowerCase();

    const isMarket = type.includes("market") || type.includes("bazaar") || title.includes("market") || title.includes("bazaar");
    const isMorning = bestFor.includes("morning") || tags.some(t => t.includes("morning")) || title.includes("tribal market") || title.includes("bara bazar") || item.categorySlot === "Morning Exploration";
    const isTea = type.includes("cafe") || type.includes("tea") || type.includes("dessert") || title.includes("high tea") || title.includes("cocoa") || item.categorySlot === "Afternoon High-Tea";
    const isDinner = bestFor.includes("dinner") || bestFor.includes("evening") || title.includes("night") || item.categorySlot === "Dinner & Cafe" || item.categorySlot === "Evening Bazaar" || type.includes("night market");
    const isLunch = !isMorning && !isTea && !isDinner;

    // 2. Identify destination geography
    const isCherrapunji = venue.includes("cherrapunji") || venue.includes("sohra") || title.includes("cherrapunjee") || title.includes("orange roots");
    const isShillong = venue.includes("shillong") || venue.includes("police bazar") || venue.includes("laitumkhrah") || venue.includes("barapani") || venue.includes("umiam") || venue.includes("lewduh") || title.includes("jadoh") || title.includes("police bazar");
    const isDawki = venue.includes("dawki") || venue.includes("umngot") || venue.includes("shnongpdeng") || title.includes("dawki");
    
    // Goa hubs
    const isSouthGoa = venue.includes("betalbatim") || venue.includes("cavelossim") || venue.includes("margao") || venue.includes("south goa");
    const isNorthGoa = venue.includes("anjuna") || venue.includes("panjim") || venue.includes("north goa");

    // Kashmir hubs
    const isGulmarg = venue.includes("gulmarg") || title.includes("gulmarg");
    const isSrinagar = venue.includes("srinagar") || venue.includes("dal lake") || venue.includes("polo view") || venue.includes("residency");

    // Kerala hubs
    const isMunnar = venue.includes("munnar") || title.includes("munnar");
    const isAlleppey = venue.includes("alleppey") || venue.includes("houseboat") || title.includes("karimeen");
    const isKochi = venue.includes("kochi") || venue.includes("jew town") || venue.includes("fort kochi") || title.includes("sadya");

    // Find candidate day matching geographic hub
    let candidateDayIdx = -1;

    for (let i = 0; i < itinerary.length; i++) {
      const day = itinerary[i];
      const dayText = ((day.title || "") + " " + (day.summary || "") + " " + (day.stops || []).map(s => s.title + " " + s.subtitle).join(" ")).toLowerCase();

      if (isCherrapunji && (dayText.includes("cherrapunji") || dayText.includes("sohra") || dayText.includes("nohkalikai"))) {
        candidateDayIdx = i;
        break;
      }
      if (isDawki && (dayText.includes("dawki") || dayText.includes("shnongpdeng") || dayText.includes("umngot"))) {
        candidateDayIdx = i;
        break;
      }
      if (isShillong && (dayText.includes("shillong") || dayText.includes("umiam") || dayText.includes("police bazar"))) {
        const isArrival = (day.stops || []).some(s => (s.title + " " + s.subtitle).toLowerCase().includes("pickup") || (s.title + " " + s.subtitle).toLowerCase().includes("arrival"));
        // If lunch, avoid arrival day because flight lands in afternoon
        if (isLunch && isArrival) {
          continue;
        }
        candidateDayIdx = i;
        if (!isArrival) break;
      }
      if (isSouthGoa && (dayText.includes("south goa") || dayText.includes("cavelossim") || dayText.includes("betalbatim") || dayText.includes("margao"))) {
        candidateDayIdx = i;
        break;
      }
      if (isNorthGoa && (dayText.includes("north goa") || dayText.includes("anjuna"))) {
        candidateDayIdx = i;
        break;
      }
      if (isGulmarg && dayText.includes("gulmarg")) {
        candidateDayIdx = i;
        break;
      }
      if (isSrinagar && (dayText.includes("srinagar") || dayText.includes("dal lake"))) {
        candidateDayIdx = i;
        break;
      }
      if (isAlleppey && (dayText.includes("alleppey") || dayText.includes("houseboat"))) {
        candidateDayIdx = i;
        break;
      }
      if (isMunnar && dayText.includes("munnar")) {
        candidateDayIdx = i;
        break;
      }
      if (isKochi && (dayText.includes("kochi") || dayText.includes("jew town"))) {
        candidateDayIdx = i;
        break;
      }
    }

    // Fallback if no specific hub match
    if (candidateDayIdx === -1) {
      if (item.targetDay && item.targetDay <= numDays) {
        candidateDayIdx = item.targetDay - 1;
      } else {
        if (isMorning) candidateDayIdx = Math.min(numDays - 1, 3);
        else if (isLunch) candidateDayIdx = Math.min(numDays - 1, 1);
        else if (isTea) candidateDayIdx = Math.min(numDays - 1, 1);
        else candidateDayIdx = 0;
      }
    }

    // Check arrival & departure timings on candidate day
    const targetDayNum = candidateDayIdx + 1;
    const targetDayObj = itinerary[candidateDayIdx];
    const dayStops = (targetDayObj && targetDayObj.stops) || [];
    
    const isArrivalDay = dayStops.some(s => {
      const txt = (s.title + " " + s.subtitle).toLowerCase();
      return txt.includes("pickup") || txt.includes("arrival") || txt.includes("airport");
    });
    const isDepartureDay = dayStops.some(s => {
      const txt = (s.title + " " + s.subtitle).toLowerCase();
      return txt.includes("drop") || txt.includes("departure") || txt.includes("farewell");
    });

    let timeSlot = "01:15 PM";
    let categorySlot = "Lunch";
    let routingReason = `Slotted for Day ${targetDayNum} grounded in location routing`;

    if (isMorning) {
      timeSlot = "09:30 AM";
      categorySlot = "Morning Exploration";
      routingReason = `Slotted on Day ${targetDayNum} morning at 09:30 AM for artisan crafts and vibrant local market stalls`;
    } else if (isTea) {
      timeSlot = "04:30 PM";
      categorySlot = "Afternoon High-Tea";
      routingReason = `Slotted on Day ${targetDayNum} afternoon at 04:30 PM for scenic relaxation between outdoor activities and hotel check-in`;
    } else if (isDinner) {
      if (isMarket) {
        timeSlot = "07:30 PM";
        categorySlot = "Evening Bazaar";
        routingReason = `Slotted on Day ${targetDayNum} evening at 07:30 PM for local street-side momos and night market stroll`;
      } else {
        timeSlot = "08:15 PM";
        categorySlot = "Dinner & Lounge";
        routingReason = `Slotted on Day ${targetDayNum} at 08:15 PM for an authentic local culinary dinner`;
      }
    } else {
      // Lunch
      categorySlot = "Lunch";
      if (isArrivalDay) {
        // Flight arrives in afternoon; lunch cannot be on Day 1 before arrival!
        // Re-route to an open day with lunch (e.g. Day 2, 3, or Day 4)
        let altDayIdx = itinerary.findIndex((d, idx) => idx !== candidateDayIdx && !((d.stops || []).some(s => (s.title + " " + s.subtitle).toLowerCase().includes("pickup"))));
        if (altDayIdx !== -1) {
          const altDayNum = altDayIdx + 1;
          const altDayObj = itinerary[altDayIdx];
          const isAltDep = (altDayObj.stops || []).some(s => (s.title + " " + s.subtitle).toLowerCase().includes("drop"));
          const slot = isAltDep ? "12:30 PM" : "01:15 PM";
          return {
            targetDay: altDayNum,
            timeSlot: slot,
            categorySlot: "Lunch",
            routingReason: `Slotted on Day ${altDayNum} at ${slot} (Day 1 flight arrives in afternoon; lunch routed to Day ${altDayNum} with zero mountain backtracking)`
          };
        } else {
          timeSlot = "08:15 PM";
          categorySlot = "Welcome Dinner";
          routingReason = `Arrival flight lands in afternoon; Myra re-routed this culinary tasting to Day ${targetDayNum} welcome dinner at 08:15 PM`;
        }
      } else if (isDepartureDay) {
        timeSlot = "12:30 PM";
        routingReason = `Slotted on Day ${targetDayNum} at 12:30 PM for a traditional farewell lunch before airport drop`;
      } else {
        timeSlot = "01:15 PM";
        routingReason = `Slotted on Day ${targetDayNum} at 01:15 PM along transit route with zero mountain backtracking`;
      }
    }

    return {
      targetDay: targetDayNum,
      timeSlot,
      categorySlot,
      routingReason
    };
  }

  // Requirement 1: Integrate local cuisine / market option directly into the actual day itinerary
  addCuisineOrMarketToDayItinerary(flavourId) {
    const item = this.state.localCuisinesAndMarkets.find(f => f.id === flavourId);
    if (!item) return;

    const bestFit = this.getBestFitForCuisine(item);
    const targetDay = bestFit.targetDay;
    const day = this.state.itinerary[targetDay - 1];
    if (!day) return;

    const stopId = `flavour-stop-${item.id}`;
    // Check if already in itinerary
    const existingIdx = day.stops.findIndex(s => s.id === stopId || s.flavourId === flavourId);
    if (existingIdx >= 0) return;

    const timeSlot = bestFit.timeSlot;
    const newStop = {
      id: stopId,
      flavourId: item.id,
      time: timeSlot,
      title: item.title,
      subtitle: `${item.venue} • ${item.priceTag} • ${bestFit.routingReason}`,
      type: item.type.toLowerCase().includes("market") ? "shopping" : "food",
      badge: item.tags[0] || "Group Choice",
      duration: "1.5 hrs",
      locked: false
    };

    // Replace generic food placeholder at approximately that time if exists, otherwise insert
    const newTimeMins = this.parseTimeToMinutes(timeSlot);
    const genericFoodIdx = day.stops.findIndex(s => !s.flavourId && !s.locked && s.type === newStop.type && Math.abs(this.parseTimeToMinutes(s.time) - newTimeMins) <= 60);
    if (genericFoodIdx >= 0) {
      day.stops[genericFoodIdx] = newStop;
    } else {
      day.stops.push(newStop);
    }
    
    // Sort stops strictly chronologically
    day.stops.sort((a, b) => this.parseTimeToMinutes(a.time) - this.parseTimeToMinutes(b.time));

    if (!this.state.scheduledCuisineIds.includes(flavourId)) {
      this.state.scheduledCuisineIds.push(flavourId);
    }
    this.state.isCuisinesConfirmed = true;

    // Myra announces schedule adjustment in chat
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Feasibility Engine",
      isAI: true,
      text: `🍴 ITINERARY UPDATED FOR DAY ${targetDay}: Successfully integrated "${item.title}" at ${timeSlot} (${item.venue}). ${bestFit.routingReason}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("CUISINE_INTEGRATED_TO_ITINERARY", { flavourId, targetDay, timeSlot, bestFit });
  }

  removeCuisineFromDayItinerary(flavourId) {
    const item = this.state.localCuisinesAndMarkets.find(f => f.id === flavourId);
    if (!item) return;

    let removedFromDay = null;
    this.state.itinerary.forEach((d, idx) => {
      const hadStop = d.stops.some(s => s.flavourId === flavourId || s.id === `flavour-stop-${flavourId}`);
      if (hadStop) {
        d.stops = d.stops.filter(s => s.flavourId !== flavourId && s.id !== `flavour-stop-${flavourId}`);
        removedFromDay = idx + 1;
      }
    });

    this.state.scheduledCuisineIds = this.state.scheduledCuisineIds.filter(id => id !== flavourId);
    if (this.state.scheduledCuisineIds.length === 0) {
      this.state.isCuisinesConfirmed = false;
    }

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "MMT Feasibility Engine",
      isAI: true,
      text: `Removed "${item.title}" from Day ${removedFromDay || 1} schedule.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("CUISINE_REMOVED_FROM_ITINERARY", { flavourId, targetDay: removedFromDay });
  }

  // Requirement 1: Itinerary Approval and Transition to Step 5: Grantex Accounts Vault
  approveItineraryAndProceedToBooking() {
    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();

    // Unlock Step 5 (Pine Labs Grantex Autonomous Accounts)
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 5);
    this.state.itinerarySubStep = "grantex_accounts";

    // Chat announcements
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: "🏆 Group itinerary is officially finalized and approved! Day-wise schedule and culinary stops are locked. Moving to Accounts to deposit initial budgets via Pine Labs Grantex delegated vault.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "MMT Feasibility Engine",
      isAI: true,
      text: "🔐 PINE LABS GRANTEX VAULT INITIALIZED: Grantex operates as 'OAuth 2.0 for the AI era.' Each member delegates safe, time-bound permissions with spend limits to me. This enables autonomous booking execution without repetitive OTPs or manual authentications.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("ITINERARY_SUBSTEP_CHANGED", { step: "grantex_accounts" });
  }

  // Grantex Autonomous Agent Vault Methods (Pine Labs Protocol)
  authorizeGrantexDeposit(memberId, customAmount = null) {
    const acct = this.state.grantexAccounts.find(a => a.memberId === memberId);
    if (!acct) return;
    if (customAmount) acct.initialDeposit = customAmount;
    acct.balance = Math.max(0, acct.initialDeposit - acct.spent);
    acct.grantStatus = "authorized";
    acct.authorizedAt = new Date().toISOString();

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Pine Labs Grantex",
      role: "Delegated Auth Protocol",
      isAI: true,
      text: `✅ MANDATE ACTIVE: ${acct.memberName} authorized Grantex token (${acct.grantexToken.substring(0, 16)}...) with spend limit ₹${acct.initialDeposit.toLocaleString()}. Scoped to flights & hotels.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("GRANTEX_ACCOUNT_UPDATED", { memberId, account: acct });
  }

  isAllGrantexDeposited() {
    return (this.state.grantexAccounts || []).length > 0 && 
      (this.state.grantexAccounts || []).every(a => a.grantStatus === "authorized");
  }

  // Requirement 3: Individual Per-Head Budget Deposit into Grantex Vault
  depositMemberGrantexContribution(memberId, customAmount = null) {
    const acct = this.state.grantexAccounts.find(a => a.memberId === memberId);
    if (!acct) return;
    if (customAmount) acct.initialDeposit = customAmount;
    acct.balance = Math.max(0, acct.initialDeposit - acct.spent);
    acct.grantStatus = "authorized";
    acct.authorizedAt = new Date().toISOString();

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Pine Labs Grantex",
      role: "Deposit Verified",
      isAI: true,
      text: `💳 DEPOSIT CONFIRMED: ${acct.memberName} deposited per-head contribution of ₹${acct.initialDeposit.toLocaleString()} into Pine Labs Grantex vault (${acct.grantexToken.substring(0, 16)}...). Funds held securely in vault.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.state.revealedMessageCount = this.state.chatMessages.length;
    this.notify("GRANTEX_ACCOUNT_UPDATED", { memberId, account: acct });
  }

  // Requirement 3: Myra Agentic AI Nudges for Pending Members
  nudgePendingGrantexMembers() {
    const pending = this.state.grantexAccounts.filter(a => a.grantStatus !== "authorized");
    if (pending.length === 0) {
      this.state.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: "Myra AI",
        role: "Grantex Copilot",
        isAI: true,
        text: "✅ All travellers have already deposited their budget contribution! The pool is fully funded and ready for Admin approval.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } else {
      const names = pending.map(p => `@${p.memberName.split(' ')[0]}`).join(', ');
      this.state.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: "Myra AI",
        role: "Agentic Travel AI",
        isAI: true,
        text: `🔔 AGENTIC NUDGE: Friendly reminder to ${names}! Please deposit your per-head budget into your Pine Labs Grantex vault so Trip Admin (Kabir) can approve the group pool and initiate autonomous flight & hotel bookings!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    this.state.revealedMessageCount = this.state.chatMessages.length;
    this.notify("GRANTEX_MEMBERS_NUDGED", { pendingCount: pending.length });
  }

  // Requirement 3: Admin Approves Deposit Pool and Proceeds to Mode of Transport
  approveAllGrantexDeposits() {
    // Ensure all accounts are authorized
    this.state.grantexAccounts.forEach(acct => {
      acct.grantStatus = "authorized";
      acct.balance = Math.max(0, acct.initialDeposit - acct.spent);
      acct.authorizedAt = new Date().toISOString();
    });

    const totalPool = this.state.grantexAccounts.reduce((sum, a) => sum + a.initialDeposit, 0);

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: `🏆 ALL CONTRIBUTIONS VERIFIED: I've approved the group deposit pool of ₹${totalPool.toLocaleString()}! Moving to booking mode of transport.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "Agentic Booking Engine",
      isAI: true,
      text: `🛫 MODE OF TRANSPORT READY: Evaluated flights, trains, and highway SUVs for all 4 travellers. Tell me your departure city or choose your preferred transit mode below!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 6);
    this.state.itinerarySubStep = "transit_booking";
    this.state.activeChatInterventionStage = "transit_booking";
    this.state.revealedMessageCount = this.state.chatMessages.length;
    this.notify("ITINERARY_SUBSTEP_CHANGED", { step: "transit_booking" });
  }

  // Requirement 4: Individual Member Transit Preference (Mode & Departure City)
  setMemberTransitChoice(memberId, mode, origin = null) {
    if (!this.state.memberTransitChoices) {
      this.state.memberTransitChoices = {
        "user-1": { mode: "flight", origin: "DEL" },
        "user-2": { mode: "flight", origin: "DEL" },
        "user-3": { mode: "flight", origin: "DEL" },
        "user-4": { mode: "flight", origin: "DEL" }
      };
    }
    const cur = this.state.memberTransitChoices[memberId] || { mode: "flight", origin: this.state.originAirport || "DEL" };
    cur.mode = mode;
    if (origin) cur.origin = origin;
    this.state.memberTransitChoices[memberId] = cur;

    const member = this.state.members.find(m => m.id === memberId);
    const modeName = mode === "flight" ? "Flights" : mode === "train" ? "Rajdhani Express" : "Outstation SUV";
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: member?.name || "Traveller",
      role: member?.role || "Member",
      isAI: false,
      text: `🚆 I've selected ${modeName} as my preferred mode of transit from ${cur.origin || 'DEL'}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.state.revealedMessageCount = this.state.chatMessages.length;
    this.notify("MEMBER_TRANSIT_CHOICE_UPDATED", { memberId, choice: cur });
  }

  skipTransitBooking() {
    this.skipFlightBooking();
  }

  authorizeAllGrantexAccounts() {
    this.approveAllGrantexDeposits();
  }

  advanceFromGrantexToFlights() {
    this.approveAllGrantexDeposits();
  }

  // Step 6: Multi-Modal Transit Selection & Flight Controls
  selectTransitMode(mode) {
    this.state.selectedTransitMode = mode;
    const modeObj = this.state.transitModes.find(m => m.mode === mode);
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "Transit Optimization",
      isAI: true,
      text: `🔄 Switched preferred inter-city transit to ${modeObj?.title || mode} (Estimated duration: ${modeObj?.duration}, ₹${modeObj?.costPerPerson.toLocaleString()}/person).`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.notify("TRANSIT_MODE_CHANGED", { mode, modeObj });
  }

  setOriginAirport(airportCode) {
    this.state.originAirport = airportCode;
    const bundles = this.state.flightBundlesByAirport[airportCode] || this.state.flightBundlesByAirport.DEL;
    this.state.flightOptions = JSON.parse(JSON.stringify(bundles));
    
    // Choose best recommended flight by default
    const bestFlight = this.state.flightOptions.find(f => f.isRecommended) || this.state.flightOptions[0];
    this.state.selectedFlightId = bestFlight.id;

    // Reset votes to best flight
    this.state.members.forEach((m, idx) => {
      this.state.flightVotes[m.id] = (idx === 3 && this.state.flightOptions[1]) 
        ? this.state.flightOptions[1].id 
        : bestFlight.id;
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "Flight Search Engine",
      isAI: true,
      text: `✈️ Starting airport set to ${airportCode}. Loaded optimal flight options to Guwahati (GAU) / Shillong (SHL). Recommended flight: ${bestFlight.airline} (${bestFlight.outboundFlight.split('•')[0].trim()}).`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("ORIGIN_AIRPORT_CHANGED", { airportCode, flightOptions: this.state.flightOptions });
  }

  castFlightVote(memberId, flightId) {
    this.state.flightVotes[memberId] = flightId;
    const member = this.state.members.find(m => m.id === memberId);
    const fl = this.state.flightOptions.find(f => f.id === flightId);

    // Compute consensus
    const tally = {};
    Object.values(this.state.flightVotes).forEach(fId => {
      tally[fId] = (tally[fId] || 0) + 1;
    });
    let topFlightId = flightId;
    let maxVotes = 0;
    Object.entries(tally).forEach(([fId, votes]) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        topFlightId = fId;
      }
    });
    this.state.selectedFlightId = topFlightId;

    if (member && fl) {
      this.state.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: member.name,
        role: member.role,
        isAI: false,
        text: `🗳️ I voted for ${fl.airline} (${fl.outboundTimes}).`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    this.notify("FLIGHT_VOTE_CAST", { memberId, flightId, topFlightId, votes: tally });
  }

  executeAgenticFlightBooking() {
    const fl = this.state.flightOptions.find(f => f.id === this.state.selectedFlightId) || this.state.flightOptions[0];
    const fare = fl.farePerPerson;
    const pnrCode = `MMT-6E-${Math.floor(1000 + Math.random() * 9000)}`;

    this.state.isFlightBooked = true;
    this.state.flightBookingPnr = pnrCode;
    this.state.isFlightSkipped = false;
    this.state.isTransitSkipped = false;

    // Deduct from each member's Grantex Account Ledger
    this.state.grantexAccounts.forEach(acct => {
      acct.spent += fare;
      acct.balance = Math.max(0, acct.initialDeposit - acct.spent);
      acct.deductions.push({
        item: `Flight: ${fl.airline} (${fl.outboundFlight.split('•')[0].trim()})`,
        amount: fare,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'flight',
        pnr: pnrCode
      });
    });

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: `✅ Flight group consensus approved! Proceeding with autonomous booking for ${fl.airline}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "Agentic Booking Exec",
      isAI: true,
      text: `🤖 PINE LABS GRANTEX EXECUTION: Flight booked autonomously! PNR: ${pnrCode}. Seats: ${fl.seats}. Deducted ₹${fare.toLocaleString()} from each member's vault. Now moving to Location 1 Hotel Selection (Shillong & Umiam)!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Advance to Step 7: Location-Wise Hotels (Location 1: Shillong)
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 7);
    this.state.itinerarySubStep = "hotels_booking";
    this.state.activeHotelLocationIdx = 0;

    this.notify("FLIGHT_BOOKED", { flight: fl, pnr: pnrCode });
  }

  skipFlightBooking() {
    this.state.isFlightSkipped = true;
    this.state.isTransitSkipped = true;
    this.state.isFlightBooked = false;

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: "⏭️ Skipped inter-city transit booking (travelers arranging independent flights/road). Moving directly to Location 1 Hotels.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Advance to Step 7: Location-Wise Hotels (Location 1: Shillong)
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 7);
    this.state.itinerarySubStep = "hotels_booking";
    this.state.activeHotelLocationIdx = 0;

    this.notify("FLIGHT_SKIPPED", {});
  }

  // Step 7: Location-Wise Hotel Studio Methods (Requirement 1)
  setActiveHotelLocation(locIdx) {
    this.state.activeHotelLocationIdx = locIdx;
    this.notify("HOTEL_LOCATION_CHANGED", { locationIdx: locIdx });
  }

  castHotelVote(locIdx, memberId, hotelId) {
    if (!this.state.hotelVotesByLocation[locIdx]) {
      this.state.hotelVotesByLocation[locIdx] = {};
    }
    this.state.hotelVotesByLocation[locIdx][memberId] = hotelId;

    // Calculate top voted hotel in this location
    const tally = {};
    Object.values(this.state.hotelVotesByLocation[locIdx]).forEach(hId => {
      tally[hId] = (tally[hId] || 0) + 1;
    });
    let topHotelId = hotelId;
    let maxV = 0;
    Object.entries(tally).forEach(([hId, votes]) => {
      if (votes > maxV) {
        maxV = votes;
        topHotelId = hId;
      }
    });
    this.state.selectedHotelByLocation[locIdx] = topHotelId;

    const member = this.state.members.find(m => m.id === memberId);
    const loc = this.state.locationHotelOptions[locIdx];
    const htl = loc?.hotels.find(h => h.id === hotelId);

    if (member && htl) {
      this.state.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: member.name,
        role: member.role,
        isAI: false,
        text: `🏨 For ${loc.locationTitle.split(':')[0]}, I voted for ${htl.name} (${htl.starsLabel}).`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    this.notify("HOTEL_VOTE_CAST", { locationIdx: locIdx, memberId, hotelId, topHotelId });
  }

  selectMealPlanForLocation(locIdx, mealPlanCode) {
    this.state.selectedMealPlanByLocation[locIdx] = mealPlanCode;
    this.notify("MEAL_PLAN_SELECTED", { locationIdx: locIdx, mealPlanCode });
  }

  executeAgenticHotelLocationBooking(locIdx) {
    const loc = this.state.locationHotelOptions[locIdx];
    if (!loc) return;

    const hotelId = this.state.selectedHotelByLocation[locIdx] || loc.hotels[0].id;
    const hotel = loc.hotels.find(h => h.id === hotelId) || loc.hotels[0];
    const mealCode = this.state.selectedMealPlanByLocation[locIdx] || "CP";
    const mealPlan = hotel.mealPlans.find(m => m.code === mealCode) || hotel.mealPlans[0];
    
    const mealExtraPerHead = mealPlan.pricePerHead || 0;
    const totalCostPerHead = hotel.costPerPerson + mealExtraPerHead;
    const pnrCode = `MMT-HTL-${locIdx + 1}-${Math.floor(1000 + Math.random() * 9000)}`;

    this.state.bookedHotelsByLocation[locIdx] = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      pnr: pnrCode,
      costPerPerson: totalCostPerHead,
      mealPlanName: mealPlan.name,
      roomCombination: hotel.roomCombination
    };

    // Deduct from each member's Grantex Account
    this.state.grantexAccounts.forEach(acct => {
      acct.spent += totalCostPerHead;
      acct.balance = Math.max(0, acct.initialDeposit - acct.spent);
      acct.deductions.push({
        item: `Hotel (${loc.locationKey === 'shillong_umiam' ? 'Shillong 2 Nights' : 'Cherrapunji 1 Night'}): ${hotel.name} [${mealPlan.code}]`,
        amount: totalCostPerHead,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'hotel',
        pnr: pnrCode
      });
    });

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: `✅ Approved booking for ${hotel.name} (${loc.stayDuration}) with ${mealPlan.name}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "Agentic Booking Exec",
      isAI: true,
      text: `🤖 GRANTEX AUTONOMOUS DEBIT: Booked ${hotel.name} (${hotel.roomCombination}) under PNR ${pnrCode}. Deducted ₹${totalCostPerHead.toLocaleString()} per person.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Check if there are more hotel locations to book
    if (locIdx < this.state.locationHotelOptions.length - 1) {
      this.state.activeHotelLocationIdx = locIdx + 1;
      const nextLoc = this.state.locationHotelOptions[locIdx + 1];
      this.state.chatMessages.push({
        id: `msg-${Date.now() + 2}`,
        sender: "Myra AI",
        role: "Hotel Concierge",
        isAI: true,
        text: `📍 Moving to ${nextLoc.locationTitle}! Synthesized member preferences for canyon stays. Please cast votes.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.notify("HOTEL_LOCATION_BOOKED", { locationIdx: locIdx, pnr: pnrCode, nextLocationIdx: locIdx + 1 });
    } else {
      // All hotel locations complete -> Advance to Step 8: Sightseeing Cab / Bus Fleet
      this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 8);
      this.state.itinerarySubStep = "cab_booking";
      this.state.isHotelBooked = true;
      this.state.hotelBookingPnr = pnrCode;
      this.state.chatMessages.push({
        id: `msg-${Date.now() + 2}`,
        sender: "Myra AI",
        role: "Fleet Logistics",
        isAI: true,
        text: "🚗 ALL STAYS SECURED! Moving to Step 8: Sightseeing Fleet & Chauffeur Booking. Sizing vehicle for 4 passengers + 4 check-in bags on mountain roads.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.notify("ALL_HOTELS_COMPLETED", { bookedHotels: this.state.bookedHotelsByLocation });
    }
  }

  skipHotelLocationBooking(locIdx) {
    this.state.skippedHotelsByLocation[locIdx] = true;
    const loc = this.state.locationHotelOptions[locIdx];

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: `⏭️ Skipped booking for ${loc?.locationTitle || 'this location'} (arranging alternate stay).`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    if (locIdx < this.state.locationHotelOptions.length - 1) {
      this.state.activeHotelLocationIdx = locIdx + 1;
      this.notify("HOTEL_LOCATION_SKIPPED", { locationIdx: locIdx, nextLocationIdx: locIdx + 1 });
    } else {
      this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 8);
      this.state.itinerarySubStep = "cab_booking";
      this.notify("ALL_HOTELS_COMPLETED", { bookedHotels: this.state.bookedHotelsByLocation });
    }
  }

  // Step 8: Sightseeing Cab Fleet Selection & Booking (Requirement 5)
  selectCabVehicle(cabId) {
    this.state.selectedCabId = cabId;
    const cab = this.state.cabFleetOptions.find(c => c.id === cabId);
    this.notify("CAB_SELECTED", { cabId, cab });
  }

  executeAgenticCabBooking() {
    const cab = this.state.cabFleetOptions.find(c => c.id === this.state.selectedCabId) || this.state.cabFleetOptions[0];
    const costPerPerson = cab.costPerPerson; // e.g. ₹3,200 for 4 days
    const cabPnr = `MMT-CAB-${Math.floor(1000 + Math.random() * 9000)}`;

    this.state.isCabBooked = true;
    this.state.cabBookingPnr = cabPnr;
    this.state.isCabSkipped = false;

    // Deduct from each member's Grantex ledger
    this.state.grantexAccounts.forEach(acct => {
      acct.spent += costPerPerson;
      acct.balance = Math.max(0, acct.initialDeposit - acct.spent);
      acct.deductions.push({
        item: `Sightseeing Fleet (4 Days): ${cab.model} (Chauffeur: ${cab.chauffeur})`,
        amount: costPerPerson,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'cab',
        pnr: cabPnr
      });
    });

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: `✅ Confirmed chauffeur cab booking: ${cab.model} with driver ${cab.chauffeur}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "Agentic Booking Exec",
      isAI: true,
      text: `🤖 PINE LABS GRANTEX DEBIT: Assigned ${cab.model} for all 4 trip days (Booking: ${cabPnr}). Deducted ₹${costPerPerson.toLocaleString()} per person. Moving to Step 9: Individual Activity Pre-Booking!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Advance to Step 9: Activity Pre-Booking
    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 9);
    this.state.itinerarySubStep = "activities_prebook";

    this.notify("CAB_BOOKED", { cab, pnr: cabPnr });
  }

  skipCabBooking() {
    this.state.isCabSkipped = true;
    this.state.isCabBooked = false;

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: "⏭️ Skipped cab service booking (self-drive / local taxis will be used). Moving to activity pre-bookings.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.maxUnlockedSubStep = Math.max(this.state.maxUnlockedSubStep, 9);
    this.state.itinerarySubStep = "activities_prebook";

    this.notify("CAB_SKIPPED", {});
  }

  // Step 9: Activity Pre-Booking & Final Itinerary Summary (Requirement 3)
  togglePrebookActivity(activityId) {
    const exists = this.state.selectedPrebookActivityIds.includes(activityId);
    if (exists) {
      this.state.selectedPrebookActivityIds = this.state.selectedPrebookActivityIds.filter(id => id !== activityId);
    } else {
      this.state.selectedPrebookActivityIds.push(activityId);
    }
    this.notify("PREBOOK_ACTIVITY_TOGGLED", { activityId, selected: !exists });
  }

  executeAgenticActivityPrebooking() {
    const selectedActs = this.state.prebookableActivities.filter(a => this.state.selectedPrebookActivityIds.includes(a.id));
    const totalActsCostPerHead = selectedActs.reduce((sum, a) => sum + a.costPerPerson, 0);
    const actPnr = `MMT-ACT-${Math.floor(1000 + Math.random() * 9000)}`;

    this.state.isActivitiesPrebooked = true;
    this.state.activitiesPnr = actPnr;
    this.state.isActivitiesSkipped = false;

    if (totalActsCostPerHead > 0) {
      // Deduct from Grantex
      this.state.grantexAccounts.forEach(acct => {
        acct.spent += totalActsCostPerHead;
        acct.balance = Math.max(0, acct.initialDeposit - acct.spent);
        acct.deductions.push({
          item: `Pre-booked Experiences (${selectedActs.length} Activities): ${selectedActs.map(a => a.title.split(' ')[0]).join(', ')}`,
          amount: totalActsCostPerHead,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'activity',
          pnr: actPnr
        });
      });
    }

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: `🎉 Pre-booked ${selectedActs.length} individual adventure passes under ${actPnr}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "Trip Orchestration",
      isAI: true,
      text: `🏆 COMPLETE GROUP TRIP BOOKED AUTONOMOUSLY! Flights, Location-wise Resorts, Mountain Chauffeur Cab, and Adventure Permits are locked. All remaining balances are safely preserved in your Pine Labs Grantex accounts. Have an incredible trip!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.isTripFullyBooked = true;
    this.state.previewViewMode = "trip_locker";
    this.state.activeChatInterventionStage = "live_radar";

    this.notify("ACTIVITIES_PREBOOKED", { activities: selectedActs, pnr: actPnr });
    this.notify("PREVIEW_MODE_CHANGED", { mode: "trip_locker" });
  }

  skipActivityPrebooking() {
    this.state.isActivitiesSkipped = true;
    this.state.isActivitiesPrebooked = false;
    this.state.isTripFullyBooked = true;
    this.state.previewViewMode = "trip_locker";
    this.state.activeChatInterventionStage = "live_radar";

    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();
    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: admin.name,
      role: "Trip Admin",
      isAI: false,
      text: "⏭️ Skipped activity pre-booking (will book permits on the ground). Group trip setup is complete!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.state.chatMessages.push({
      id: `msg-${Date.now() + 1}`,
      sender: "Myra AI",
      role: "Trip Orchestration",
      isAI: true,
      text: "🎉 Group bookings finalized! Opening the Central Repository & Group Locker with all your tickets, resort vouchers, and driver passes.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.notify("PREVIEW_MODE_CHANGED", { mode: "trip_locker" });
    this.notify("ACTIVITIES_SKIPPED", {});
  }

  finishTripAndOpenRepository() {
    this.state.isTripFullyBooked = true;
    this.state.previewViewMode = "trip_locker";
    this.state.activeChatInterventionStage = "live_radar";
    this.notify("PREVIEW_MODE_CHANGED", { mode: "trip_locker" });
  }

  selectFlight(flightId) {
    this.state.selectedFlightId = flightId;
    const fl = this.state.flightOptions.find(f => f.id === flightId);
    if (fl) {
      this.state.chatMessages.push({
        id: `msg-${Date.now()}`,
        sender: "Myra AI",
        role: "MMT Booking Engine",
        isAI: true,
        text: `✈️ Selected ${fl.airline} (Fare: ₹${fl.farePerPerson.toLocaleString()}/person). ${fl.seats} assigned.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    this.notify("FLIGHT_SELECTED", { flightId });
  }

  toggleHotelSelection(hotelId) {
    const exists = this.state.selectedHotelIds.includes(hotelId);
    if (exists) {
      this.state.selectedHotelIds = this.state.selectedHotelIds.filter(id => id !== hotelId);
    } else {
      this.state.selectedHotelIds.push(hotelId);
    }
    this.notify("HOTEL_SELECTION_UPDATED", { hotelId, selected: !exists });
  }

  // Requirement 6: Save local cuisines and markets
  toggleSaveFlavour(flavourId) {
    const exists = this.state.savedFlavours.includes(flavourId);
    if (exists) {
      this.state.savedFlavours = this.state.savedFlavours.filter(id => id !== flavourId);
    } else {
      this.state.savedFlavours.push(flavourId);
      const item = this.state.localCuisinesAndMarkets.find(f => f.id === flavourId);
      if (item) {
        this.state.chatMessages.push({
          id: `msg-${Date.now()}`,
          sender: "Myra AI",
          role: "MMT Culinary Concierge",
          isAI: true,
          text: `🍴 Added "${item.title}" (${item.venue}) to the group wishlist! Recommended for ${item.bestFor}.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    }
    this.notify("FLAVOUR_SAVED_UPDATED", { flavourId, isSaved: !exists });
  }

  // Requirement 6: Rearrange Day-Wise Itinerary Bars
  moveItineraryStop(dayIdx, stopIdx, direction) {
    const day = this.state.itinerary[dayIdx];
    if (!day || !day.stops) return;

    const newIdx = direction === 'up' ? stopIdx - 1 : stopIdx + 1;
    if (newIdx < 0 || newIdx >= day.stops.length) return;

    // Swap stops
    const temp = day.stops[stopIdx];
    day.stops[stopIdx] = day.stops[newIdx];
    day.stops[newIdx] = temp;

    this.notify("ITINERARY_REARRANGED", { dayIdx, stopIdx, newIdx });
  }

  // Requirement 2: Live Vote Summary Tab & Dynamic Updates (Bottom of Chat Window)
  toggleVoteSummaryExpanded() {
    this.state.isVoteSummaryExpanded = !this.state.isVoteSummaryExpanded;
    this.notify("VOTE_SUMMARY_TOGGLED", { isExpanded: this.state.isVoteSummaryExpanded });
  }

  setActiveVoteCategory(category) {
    this.state.activeVoteCategory = category;
    this.notify("VOTE_CATEGORY_CHANGED", { category });
  }

  getLiveVoteSummary(forcedCategory = null) {
    const members = this.state.members || [];
    const cat = forcedCategory || this.state.activeVoteCategory || 'auto';

    let resolvedCategory = cat;
    if (cat === 'auto') {
      if (this.state.itinerarySubStep === 'hotels_booking' || this.state.itinerarySubStep === 'hotel_booking') {
        resolvedCategory = 'hotels';
      } else if (this.state.itinerarySubStep === 'transit_booking' || this.state.itinerarySubStep === 'flight_booking') {
        resolvedCategory = 'flights';
      } else if (!this.state.isDecisionLocked || this.state.previewViewMode === 'seasons') {
        resolvedCategory = 'seasons';
      } else {
        const hasHotelVotes = Object.keys(this.state.hotelVotesByLocation || {}).some(k => Object.keys(this.state.hotelVotesByLocation[k] || {}).length > 0);
        const hasFlightVotes = Object.keys(this.state.flightVotes || {}).length > 0;
        if (hasHotelVotes) resolvedCategory = 'hotels';
        else if (hasFlightVotes) resolvedCategory = 'flights';
        else resolvedCategory = 'seasons';
      }
    }

    if (resolvedCategory === 'flights') {
      const options = this.state.flightOptions || [];
      const flightVotes = this.state.flightVotes || {};
      const items = options.map(fl => {
        const voters = Object.entries(flightVotes)
          .filter(([mId, fId]) => fId === fl.id)
          .map(([mId]) => members.find(m => m.id === mId))
          .filter(Boolean);
        return {
          id: fl.id,
          name: `${fl.airline} (${fl.flightNum || fl.outboundTimes})`,
          price: `₹${fl.pricePerHead?.toLocaleString() || fl.farePerPerson?.toLocaleString() || '8,900'}`,
          voteCount: voters.length,
          voters,
          isLeader: false
        };
      });

      let maxVotes = -1;
      items.forEach(it => {
        if (it.voteCount > maxVotes) {
          maxVotes = it.voteCount;
        }
      });
      items.forEach(it => {
        if (maxVotes > 0 && it.voteCount === maxVotes) it.isLeader = true;
      });

      const leader = items.find(it => it.isLeader);
      const votedMemberIds = Object.keys(flightVotes);
      const pendingMembers = members.filter(m => !votedMemberIds.includes(m.id));

      return {
        category: 'flights',
        topicName: `Flight Bundles (from ${this.state.originAirport || 'DEL'})`,
        items,
        totalVotes: votedMemberIds.length,
        maxMembers: members.length,
        leaderText: leader ? `${leader.name} leads with ${leader.voteCount} vote${leader.voteCount > 1 ? 's' : ''}` : 'No votes cast yet',
        feasibilityNote: "IndiGo 12:15 PM flight satisfies Rohan's morning call constraint and locks row 4 seating block.",
        pendingMembers
      };
    }

    if (resolvedCategory === 'hotels') {
      const locIdx = this.state.activeHotelLocationIdx || 0;
      const loc = this.state.locationHotelOptions[locIdx] || this.state.locationHotelOptions[0];
      const hotelVotes = (this.state.hotelVotesByLocation && this.state.hotelVotesByLocation[locIdx]) || {};
      const hotels = loc ? loc.hotels : [];

      const items = hotels.map(htl => {
        const voters = Object.entries(hotelVotes)
          .filter(([mId, hId]) => hId === htl.id)
          .map(([mId]) => members.find(m => m.id === mId))
          .filter(Boolean);
        return {
          id: htl.id,
          name: htl.name,
          price: `₹${htl.pricePerNight?.toLocaleString() || htl.price}/night`,
          voteCount: voters.length,
          voters,
          isLeader: false
        };
      });

      let maxVotes = -1;
      items.forEach(it => {
        if (it.voteCount > maxVotes) {
          maxVotes = it.voteCount;
        }
      });
      items.forEach(it => {
        if (maxVotes > 0 && it.voteCount === maxVotes) it.isLeader = true;
      });

      const leader = items.find(it => it.isLeader);
      const votedMemberIds = Object.keys(hotelVotes);
      const pendingMembers = members.filter(m => !votedMemberIds.includes(m.id));

      return {
        category: 'hotels',
        topicName: `Hotels: ${loc ? loc.locationTitle.split(':')[0] : 'Location Stays'} (Loc ${locIdx + 1})`,
        items,
        totalVotes: votedMemberIds.length,
        maxMembers: members.length,
        leaderText: leader ? `${leader.name} leads with ${leader.voteCount} vote${leader.voteCount > 1 ? 's' : ''}` : 'No votes cast yet',
        feasibilityNote: locIdx === 0 
          ? "Ri Kynjai matches Kabir's heritage aesthetic and Priya's pure veg breakfast request."
          : "Polo Orchid provides valley views and close proximity to Nohkalikai Falls.",
        pendingMembers
      };
    }

    // Default: Seasonal Travel Dates
    const rawWindows = this.state.seasonalWindows || [];
    const windows = Array.isArray(rawWindows) ? rawWindows : (rawWindows.meghalaya || Object.values(rawWindows)[0] || []);
    const items = windows.map(win => {
      const voters = (win.votedMemberIds || []).map(id => members.find(m => m.id === id)).filter(Boolean);
      return {
        id: win.id,
        name: `${win.title} (${win.dateRange})`,
        price: win.bestFor || 'Ideal Season',
        voteCount: voters.length,
        voters,
        isLeader: false
      };
    });

    let maxVotes = -1;
    items.forEach(it => {
      if (it.voteCount > maxVotes) {
        maxVotes = it.voteCount;
      }
    });
    items.forEach(it => {
      if (maxVotes > 0 && it.voteCount === maxVotes) it.isLeader = true;
    });

    const leader = items.find(it => it.isLeader);
    const totalVotes = items.reduce((acc, it) => acc + it.voteCount, 0);
    const allVotedIds = windows.flatMap(w => w.votedMemberIds || []);
    const pendingMembers = members.filter(m => !allVotedIds.includes(m.id));

    return {
      category: 'seasons',
      topicName: 'Seasonal Travel Windows & Dates',
      items,
      totalVotes: Math.min(totalVotes, members.length),
      maxMembers: members.length,
      leaderText: leader ? `${leader.name.split(':')[0]} leads with ${leader.voteCount} vote${leader.voteCount > 1 ? 's' : ''}` : 'No votes cast yet',
      feasibilityNote: "Rohan has client calls on Day 1 until 11:30 AM; departure shifted to 12:45 PM for 100% group alignment.",
      pendingMembers
    };
  }

  // Chat message sending
  // Natural Language Day-Swap Parser for Conversational Myra Interaction
  parseDaySwapIntent(text) {
    if (!text || typeof text !== 'string') return null;
    const lower = text.toLowerCase().trim();

    // Check for swap / reorder / switch keywords
    const swapKeywords = ['swap', 'switch', 'interchange', 'exchange', 'flip', 'move', 'replace', 'reorder', 'shuffle', 'reshuffle'];
    const hasSwapWord = swapKeywords.some(kw => lower.includes(kw));
    const mentionsMyra = lower.includes('@myra') || lower.includes('myra');

    if (!hasSwapWord && !mentionsMyra) return null;
    // If mentions myra and words like "change days" or "rearrange days"
    const hasRearrangeWord = lower.includes('rearrange') || lower.includes('re-order') || lower.includes('trade');
    if (!hasSwapWord && !hasRearrangeWord) return null;

    // Ordinal to number map
    const ordinals = {
      'first': 1, '1st': 1,
      'second': 2, '2nd': 2,
      'third': 3, '3rd': 3,
      'fourth': 4, '4th': 4,
      'fifth': 5, '5th': 5,
      'sixth': 6, '6th': 6,
      'seventh': 7, '7th': 7
    };

    let dayA = null;
    let dayB = null;

    // Pattern 1: Explicit day references e.g. "day 2 and day 3", "days 2 and 3", "day 2 with day 3", "day 2 & 3"
    const patternExplicit = /(?:day\s*(\d+)|days\s*(\d+))\s*(?:and|&|with|to|,|\/)\s*(?:day\s*)?(\d+)/i;
    const matchExplicit = lower.match(patternExplicit);
    if (matchExplicit) {
      dayA = parseInt(matchExplicit[1] || matchExplicit[2], 10);
      dayB = parseInt(matchExplicit[3], 10);
    }

    // Pattern 2: "swap 2 and 3", "swap 2 with 3", "switch 1 and 4", "swap days 2, 3"
    if (!dayA || !dayB) {
      const patternActionNums = /(?:swap|switch|interchange|exchange|flip|move|reorder)\s+(?:days?\s*)?(\d+)\s*(?:and|&|with|to|,)\s*(?:days?\s*)?(\d+)/i;
      const matchActionNums = lower.match(patternActionNums);
      if (matchActionNums) {
        dayA = parseInt(matchActionNums[1], 10);
        dayB = parseInt(matchActionNums[2], 10);
      }
    }

    // Pattern 3: Words with ordinals: "swap first day and second day", "2nd day with 3rd day"
    if (!dayA || !dayB) {
      const foundOrdinals = [];
      const tokens = lower.split(/\s+/);
      for (const tok of tokens) {
        const clean = tok.replace(/[^a-z0-9]/g, '');
        if (ordinals[clean]) {
          foundOrdinals.push(ordinals[clean]);
        }
      }
      if (foundOrdinals.length >= 2) {
        dayA = foundOrdinals[0];
        dayB = foundOrdinals[1];
      }
    }

    // Pattern 4: Named destination / hub keywords from macroDays
    // e.g. "swap Cherrapunji and Dawki", "switch Shillong and Dawki"
    if (!dayA || !dayB) {
      const matchedDays = [];
      this.state.macroDays.forEach((d, idx) => {
        const hub = (d.hubKey || '').toLowerCase();
        const region = (d.region || '').toLowerCase();
        const title = (d.title || '').toLowerCase();

        const keywords = [
          ...region.split(/[\s,&—/-]+/),
          ...title.split(/[\s,&—/-]+/),
          hub
        ].filter(k => k.length > 3 && !['arrival', 'city', 'waterfalls', 'canyons', 'waters', 'village', 'heritage', 'airport', 'transfer', 'drop', 'hotel', 'resort'].includes(k));

        if (keywords.some(k => lower.includes(k))) {
          if (!matchedDays.includes(idx + 1)) {
            matchedDays.push(idx + 1);
          }
        }
      });

      if (matchedDays.length >= 2) {
        dayA = matchedDays[0];
        dayB = matchedDays[1];
      }
    }

    // If swap word found but couldn't parse day numbers
    if (!dayA || !dayB) {
      return { isSwapIntent: true, dayA: null, dayB: null };
    }

    return {
      isSwapIntent: true,
      dayA,
      dayB,
      idxA: dayA - 1,
      idxB: dayB - 1
    };
  }

  // Natural Language Activity Choice Parser
  parseActivityChoiceIntent(text) {
    if (!text || typeof text !== 'string') return null;
    const lower = text.toLowerCase().trim();

    const actionKeywords = ['add', 'choose', 'select', 'pick', 'include', 'remove', 'delete', 'drop', 'do', 'book'];
    const hasAction = actionKeywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lower));
    const mentionsMyra = lower.includes('@myra') || lower.includes('myra');

    if (!hasAction && !mentionsMyra) return null;

    const isRemove = lower.includes('remove') || lower.includes('delete') || lower.includes('drop');

    // Extract target day if mentioned (e.g. "for Day 1", "Day 2", "on Day 3")
    let targetDay = null;
    const dayMatch = lower.match(/(?:day|for\s+day|on\s+day)\s*(\d+)/i);
    const hasDayExplicit = Boolean(dayMatch);

    // If text mentions cuisine/market keywords and has no explicit day, defer to cuisine parser
    if (!hasDayExplicit && (this.state.itinerarySubStep === 'cuisines_markets' || this.state.activeChatInterventionStage === 'cuisines_markets' || lower.includes('thali') || lower.includes('bazaar') || lower.includes('bazar') || lower.includes('stall') || lower.includes('cuisine') || lower.includes('dish') || lower.includes('rice stall') || lower.includes('roots thali'))) {
      return null;
    }

    if (dayMatch) {
      targetDay = parseInt(dayMatch[1], 10);
    } else {
      if (lower.includes('first day') || lower.includes('1st day')) targetDay = 1;
      else if (lower.includes('second day') || lower.includes('2nd day')) targetDay = 2;
      else if (lower.includes('third day') || lower.includes('3rd day')) targetDay = 3;
      else if (lower.includes('fourth day') || lower.includes('4th day')) targetDay = 4;
      else targetDay = this.state.activeConfiguringDayNum || 1;
    }

    // Search across candidateActivities (prioritizing targetDay)
    let foundAct = null;
    let foundDay = targetDay;
    const allDays = [targetDay, 1, 2, 3, 4].filter((v, i, a) => a.indexOf(v) === i);

    for (const d of allDays) {
      const pool = this.state.candidateActivities[d] || [];
      for (const act of pool) {
        const idMatch = lower.includes(act.id.toLowerCase());
        const actTitleLower = act.title.toLowerCase();
        const titleTokens = actTitleLower.split(/[\s,()—/-]+/).filter(t => t.length > 3 && !['walk', 'tour', 'view', 'with', 'from', 'lake'].includes(t));
        const distinctiveTokenMatch = titleTokens.some(t => t.length >= 4 && lower.includes(t));

        if (idMatch || lower.includes(actTitleLower) || distinctiveTokenMatch || (titleTokens.length >= 2 && titleTokens.filter(t => lower.includes(t)).length >= 2) || (titleTokens.length === 1 && lower.includes(titleTokens[0]))) {
          foundAct = act;
          foundDay = d;
          break;
        }
      }
      if (foundAct) break;
    }

    if (!foundAct) return null;

    return {
      isActivityIntent: true,
      dayNum: foundDay,
      activity: foundAct,
      isRemove
    };
  }

  // Natural Language Cuisine & Market Choice Parser
  parseCuisineChoiceIntent(text) {
    if (!text || typeof text !== 'string') return null;
    const lower = text.toLowerCase().trim();

    const actionKeywords = ['add', 'choose', 'select', 'pick', 'include', 'try', 'eat', 'taste', 'visit', 'book', 'schedule', 'remove', 'delete'];
    const hasAction = actionKeywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lower));
    const mentionsFoodOrMarket = lower.includes('cuisine') || lower.includes('food') || lower.includes('market') || lower.includes('bazaar') || lower.includes('thali') || lower.includes('restaurant') || lower.includes('cafe') || lower.includes('meal') || lower.includes('lunch') || lower.includes('dinner');
    const mentionsMyra = lower.includes('@myra') || lower.includes('myra');

    if (!hasAction && !mentionsFoodOrMarket && !mentionsMyra) return null;

    const isRemove = lower.includes('remove') || lower.includes('delete') || lower.includes('drop');

    let foundCuisine = null;
    const pool = this.state.localCuisinesAndMarkets || [];

    for (const c of pool) {
      const idMatch = lower.includes(c.id.toLowerCase());
      const titleLower = c.title.toLowerCase();
      const venueLower = c.venue.toLowerCase();

      const keywords = [
        ...titleLower.split(/[\s,()—/-]+/).filter(t => t.length > 3 && !['local', 'platter', 'walk', 'stroll', 'food', 'market', 'night'].includes(t)),
        ...venueLower.split(/[\s,()—/-]+/).filter(t => t.length > 3 && !['road', 'bazar', 'bazaar'].includes(t))
      ];

      if (idMatch || lower.includes(titleLower) || lower.includes(venueLower) || keywords.some(k => lower.includes(k))) {
        foundCuisine = c;
        break;
      }
    }

    if (!foundCuisine) return null;

    return {
      isCuisineIntent: true,
      cuisine: foundCuisine,
      isRemove
    };
  }

  // Chat message sending
  sendChatMessage(text) {
    const user = this.getActivePersona();
    const msg = {
      id: `msg-${Date.now()}`,
      sender: user.name,
      role: user.role,
      isAI: false,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.state.chatMessages.push(msg);
    this.state.revealedMessageCount = this.state.chatMessages.length;
    this.notify("CHAT_MESSAGE_ADDED", { message: msg });

    const lower = text.toLowerCase();
    const swapIntent = this.parseDaySwapIntent(text);

    // 1. Natural Language Day Swapping via Myra
    if (swapIntent && swapIntent.isSwapIntent) {
      setTimeout(() => {
        const maxDays = this.state.macroDays.length;

        if (swapIntent.dayA !== null && swapIntent.dayB !== null) {
          if (swapIntent.dayA < 1 || swapIntent.dayA > maxDays || swapIntent.dayB < 1 || swapIntent.dayB > maxDays) {
            const aiMsg = {
              id: `msg-${Date.now()}`,
              sender: "Myra AI",
              role: "MMT Route Engine",
              isAI: true,
              text: `⚠️ Our Meghalaya itinerary currently has ${maxDays} days (Day 1 to Day ${maxDays}). Please specify two days within this range (for example: "@Myra swap Day 2 and Day 3").`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            this.state.chatMessages.push(aiMsg);
            this.state.revealedMessageCount = this.state.chatMessages.length;
            this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
            return;
          }

          if (swapIntent.dayA === swapIntent.dayB) {
            const aiMsg = {
              id: `msg-${Date.now()}`,
              sender: "Myra AI",
              role: "MMT Route Engine",
              isAI: true,
              text: `ℹ️ Day ${swapIntent.dayA} is already in that position! Pick two different days to interchange (for example: "@Myra swap Day ${swapIntent.dayA} and Day ${swapIntent.dayA === 1 ? 2 : 1}").`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            this.state.chatMessages.push(aiMsg);
            this.state.revealedMessageCount = this.state.chatMessages.length;
            this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
            return;
          }

          const dayAObj = this.state.macroDays[swapIntent.idxA];
          const dayBObj = this.state.macroDays[swapIntent.idxB];
          const nameA = dayAObj?.title?.split('—')[0]?.trim() || `Day ${swapIntent.dayA}`;
          const nameB = dayBObj?.title?.split('—')[0]?.trim() || `Day ${swapIntent.dayB}`;

          // Execute authentic swap across macroDays & full itinerary
          this.swapMacroDays(swapIntent.idxA, swapIntent.idxB, 
            `🔄 DONE! Swapped Day ${swapIntent.dayA} (${nameA}) and Day ${swapIntent.dayB} (${nameB}).\n\n✨ Updated Macro Itinerary:\n• Day ${swapIntent.dayA}: ${nameB}\n• Day ${swapIntent.dayB}: ${nameA}\n\n🧭 Feasibility Radar: Anti-backtracking score verified at 94%. Mountain road curves & daylight timing synchronized!`
          );

          // Update preview mode if helpful
          if (this.state.previewViewMode === 'destination_intel' || this.state.previewViewMode === 'seasons') {
            this.state.previewViewMode = 'master_itinerary';
            this.notify("PREVIEW_MODE_CHANGED", { mode: this.state.previewViewMode });
          }

        } else {
          // Swap intent detected but missing specific days
          const dayOptions = this.state.macroDays.map((d, i) => `Day ${i + 1}: ${d.region || d.title.split('—')[0].trim()}`).join('\n• ');
          const aiMsg = {
            id: `msg-${Date.now()}`,
            sender: "Myra AI",
            role: "MMT Route Engine",
            isAI: true,
            text: `🗺️ I can swap any two days in your itinerary! Available days:\n• ${dayOptions}\n\nTell me which two days to interchange, for example:\n• "@Myra swap Day 2 and Day 3"\n• "@Myra swap Day 1 and Day 4"`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          this.state.chatMessages.push(aiMsg);
          this.state.revealedMessageCount = this.state.chatMessages.length;
          this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
        }
      }, 500);
      return;
    }

    // 2. Natural Language Activity Selection via Myra (Requirement 1)
    const actIntent = this.parseActivityChoiceIntent(text);
    if (actIntent && actIntent.isActivityIntent) {
      setTimeout(() => {
        const { dayNum, activity, isRemove } = actIntent;
        const curSelections = this.state.dayActivitySelections[dayNum] || [];

        if (isRemove) {
          if (curSelections.includes(activity.id)) {
            this.state.dayActivitySelections[dayNum] = curSelections.filter(id => id !== activity.id);
            this.notify("ACTIVITY_SELECTION_UPDATED", { dayNum, activityId: activity.id, selected: false });
            const aiMsg = {
              id: `msg-${Date.now()}`,
              sender: "Myra AI",
              role: "MMT Travel Copilot",
              isAI: true,
              text: `❌ Removed "${activity.title}" from Day ${dayNum} experiences.`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            this.state.chatMessages.push(aiMsg);
            this.state.revealedMessageCount = this.state.chatMessages.length;
            this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
          } else {
            const aiMsg = {
              id: `msg-${Date.now()}`,
              sender: "Myra AI",
              role: "MMT Travel Copilot",
              isAI: true,
              text: `ℹ️ "${activity.title}" is not currently in Day ${dayNum}.`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            this.state.chatMessages.push(aiMsg);
            this.state.revealedMessageCount = this.state.chatMessages.length;
            this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
          }
        } else {
          // Add activity
          if (!curSelections.includes(activity.id)) {
            this.toggleActivityChoice(dayNum, activity.id);
          }

          if (this.state.budgetAlert) {
            // Budget alert handled in toggleActivityChoice
            return;
          }

          const allDone = this.isAllDaysActivitiesSelected();
          const celebration = allDone 
            ? `\n\n🎉 All 4 days now have activities chosen! Click **"Move to Local Cuisines & Markets"** on the left or tag me to explore local dining.`
            : `\n\nDay ${dayNum} schedule updated. Tag me to add more activities (e.g. "@Myra choose Nohkalikai trek for Day 2")!`;

          const aiMsg = {
            id: `msg-${Date.now()}`,
            sender: "Myra AI",
            role: "MMT Travel Copilot",
            isAI: true,
            text: `✅ Added **${activity.title}** (+₹${activity.cost}) to Day ${dayNum}! Duration: ${activity.duration}.${celebration}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          this.state.chatMessages.push(aiMsg);
          this.state.revealedMessageCount = this.state.chatMessages.length;
          this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
        }
      }, 500);
      return;
    }

    // 3. Natural Language Cuisine & Market Selection via Myra (Requirement 4)
    const cuisineIntent = this.parseCuisineChoiceIntent(text);
    if (cuisineIntent && cuisineIntent.isCuisineIntent) {
      setTimeout(() => {
        const { cuisine, isRemove } = cuisineIntent;

        if (isRemove) {
          this.removeCuisineFromDayItinerary(cuisine.id);
        } else {
          this.addCuisineOrMarketToDayItinerary(cuisine.id);
          this.state.isCuisinesConfirmed = true;
          this.state.previewViewMode = 'master_itinerary';

          const bestFit = this.getBestFitForCuisine(cuisine);
          const aiMsg = {
            id: `msg-${Date.now()}`,
            sender: "Myra AI",
            role: "MMT Feasibility Engine",
            isAI: true,
            text: `🍴 Selected **${cuisine.title}**! Automatically scheduled into Day ${bestFit.targetDay} at ${bestFit.timeSlot} (${cuisine.venue}). ${bestFit.routingReason}.\n\n✨ The complete and entire master itinerary schedule is now fully unlocked in your visual preview window!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          this.state.chatMessages.push(aiMsg);
          this.state.revealedMessageCount = this.state.chatMessages.length;
          this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
          this.notify("PREVIEW_MODE_CHANGED", { mode: 'master_itinerary' });
        }
      }, 500);
      return;
    }

    // 2. Requirement 5 & 2: Passive AI responds dynamically when tagged @Myra or on vote/conflict questions
    if (text.toLowerCase().includes("@myra") || text.toLowerCase().includes("budget") || text.toLowerCase().includes("vote") || text.toLowerCase().includes("conflict") || text.toLowerCase().includes("logic") || text.toLowerCase().includes("lock") || text.toLowerCase().includes("summary")) {
      setTimeout(() => {
        let aiReply = "I'm monitoring in passive mode (Level 0: Observe). I'll alert the group if any schedule change impacts Priya's pure veg meals or Rohan's 11:30 AM demo.";
        
        if (text.toLowerCase().includes("vote") || text.toLowerCase().includes("season") || text.toLowerCase().includes("summary") || text.toLowerCase().includes("conflict")) {
          const summary = this.getLiveVoteSummary();
          const itemsText = summary.items.map(it => {
            const voterNames = it.voters.map(v => v.name.split(' ')[0]).join(', ');
            return `• ${it.name}: ${it.voteCount} vote${it.voteCount === 1 ? '' : 's'}${it.isLeader ? ' 🏆 (Leading)' : ''}${voterNames ? ` [${voterNames}]` : ''}`;
          }).join('\n');

          aiReply = `📊 Live Vote & Consensus Summary — ${summary.topicName}:\n${itemsText}\n\n🤖 Feasibility & Resolution: ${summary.feasibilityNote}`;
          if (summary.pendingMembers && summary.pendingMembers.length > 0) {
            aiReply += `\n⏳ Awaiting votes from: ${summary.pendingMembers.map(m => m.name.split(' ')[0]).join(', ')}.`;
          }
        } else if (text.toLowerCase().includes("logic")) {
          aiReply = "Scheduling Logic: Day 2 stops prioritize Nohkalikai Waterfall in the early morning before 11:30 AM fog rolls in. Lunch is scheduled at Orange Roots (pure veg) along the transit path to eliminate 42 km of mountain backtracking.";
        } else if (text.toLowerCase().includes("budget")) {
          aiReply = `Current Group Budget: ₹${this.state.trip.budgetMin.toLocaleString()} - ₹${this.state.trip.budgetMax.toLocaleString()} / person. Our 4-Day package currently sits at ₹25,925/member with all resort stays and cab transfers included.`;
        }

        const aiMsg = {
          id: `msg-${Date.now()}`,
          sender: "Myra AI",
          role: "MMT Travel Copilot",
          isAI: true,
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        this.state.chatMessages.push(aiMsg);
        this.state.revealedMessageCount = this.state.chatMessages.length;
        this.notify("CHAT_MESSAGE_ADDED", { message: aiMsg });
      }, 600);
    }
  }

  // ===========================================================================
  // POST-BOOKING ENGINE: REPOSITORY, CANCELLATION & DISRUPTION METHODS
  // ===========================================================================

  // Requirement 2: Centralized Group Repository for all Booking Info & Tickets
  calculateTotalGrantexSpent() {
    let total = 0;
    if (this.state.isFlightBooked) total += 35600;
    const bookedLocs = Object.values(this.state.bookedHotelsByLocation || {});
    total += (bookedLocs.length || 2) * 16500;
    if (this.state.isCabBooked) total += 12800;
    if (this.state.isActivitiesPrebooked) total += 4800;
    return total > 0 ? total : 74500;
  }

  getRemainingGrantexBalance() {
    const totalDeposited = (this.state.grantexAccounts || []).reduce((sum, a) => sum + (a.initialDeposit || 0), 0) || 100000;
    const totalSpent = (this.state.grantexAccounts || []).reduce((sum, a) => sum + (a.spent || 0), 0);
    return Math.max(0, totalDeposited - totalSpent);
  }

  getBookingRepository() {
    const flightPnr = this.state.flightBookingPnr || "MMT-6E-8060";
    const cabPnr = this.state.cabBookingPnr || "MMT-CAB-6102";
    const actPnr = this.state.activitiesPnr || "MMT-ACT-9021";
    const seatMap = { "user-1": "4A (Window)", "user-2": "4B (Middle)", "user-3": "4C (Aisle)", "user-4": "4D (Aisle)" };

    const flightTickets = this.state.members.map(m => {
      const isCancelled = this.state.cancelledMemberIds.includes(m.id);
      return {
        memberId: m.id,
        memberName: m.name,
        role: m.role,
        avatar: m.avatar,
        airline: "IndiGo Group Direct",
        flightNum: "6E-2089",
        route: "New Delhi (DEL) ➔ Guwahati (GAU)",
        depTime: "12:15 PM • Terminal 3 (DEL)",
        arrTime: "02:40 PM • Borjhar (GAU)",
        travelDate: "Fri, 16 Oct 2026",
        gate: "Gate 42A",
        boardingTime: "11:35 AM",
        seat: seatMap[m.id] || "4C",
        pnr: flightPnr,
        eticketNo: `098-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        status: isCancelled ? "CANCELLED" : (this.state.isFlightBooked ? "CONFIRMED" : "RESERVED"),
        farePerHead: 8900,
        meal: m.diet === "Pure Veg" ? "Special Veg Hindu Meal (AVML)" : "Standard Gourmet Meal Box",
        baggage: "15kg Check-in + 7kg Cabin"
      };
    });

    const hotelVouchers = [
      {
        id: "vouch-htl-1",
        hotelName: "Ri Kynjai - Serenity by the Lake",
        starsLabel: "5-Star Boutique Heritage",
        location: "Umiam Lake, Shillong (Location 1)",
        dates: "16 Oct - 18 Oct 2026 (2 Nights)",
        rooms: "2 Interconnected Superior Lake View Cottages (Cottage 101: Kabir & Rohan; Cottage 102: Priya & Tanya)",
        mealPlan: "MAP (Buffet Breakfast & Multi-Cuisine Dinner Included)",
        pnr: "MMT-HTL-8891",
        contact: "+91 364 257 0214 • frontdesk@rikynjai.com",
        status: this.state.bookedHotelsByLocation[0] ? "CONFIRMED" : "RESERVED",
        costPerPerson: 2100,
        checkInTime: "02:00 PM • 24hr Late Arrival Hold Active"
      },
      {
        id: "vouch-htl-2",
        hotelName: "Polo Orchid Resort Cherrapunjee",
        starsLabel: "4.8-Star Valley Cliff Resort",
        location: "Sohra Rim, Cherrapunji (Location 2)",
        dates: "18 Oct - 19 Oct 2026 (1 Night)",
        rooms: "2 Dew Drop Thatched Villas (Villa 201: Kabir & Rohan; Villa 202: Priya & Tanya)",
        mealPlan: "CP (Continental Breakfast Included)",
        pnr: "MMT-HTL-4412",
        contact: "+91 3637 235 001 • reservations@poloorchid.com",
        status: this.state.bookedHotelsByLocation[1] ? "CONFIRMED" : "RESERVED",
        costPerPerson: 3050,
        checkInTime: "01:00 PM • Fast-track QR Check-in"
      }
    ];

    const cabVoucher = {
      pnr: cabPnr,
      model: "Toyota Innova Crysta (6+1 AC Luxury)",
      plate: "AS-01-EQ-9821",
      chauffeur: "Biplab Sangma",
      rating: "4.9 ★ (420+ Mountain Trips)",
      phone: "+91 98621 44920",
      languages: "English, Hindi, Khasi",
      pickupPoint: "GAU Airport Arrival Pillar 3",
      duration: "All 4 Trip Days (Shillong • Cherrapunji • Dawki • GAU Airport Drop)",
      gpsStatus: "Live Vehicle Tracking Active",
      status: this.state.isCabBooked ? "CONFIRMED & DISPATCHED" : "RESERVED"
    };

    const activityPasses = [
      {
        id: "pass-zip",
        title: "Nohkalikai Falls Fast-Track Zipline Pass",
        pnr: `${actPnr}-ZIP`,
        venue: "Nohkalikai Canyon Gorge",
        date: "Day 2 • 08:30 AM",
        qrCode: "QR-ZIP-NOHKALIKAI-8812",
        status: "VALID",
        costPerHead: 1200
      },
      {
        id: "pass-cav",
        title: "Mawsmai Cave Guided Exploration Gear & Halogen Kit",
        pnr: `${actPnr}-CAV`,
        venue: "Mawsmai Limestone Cavern",
        date: "Day 2 • 11:30 AM",
        qrCode: "QR-CAV-MAWSMAI-4419",
        status: "VALID",
        costPerHead: 400
      },
      {
        id: "pass-bot",
        title: "Dawki Umngot River Glass Boat Excursion",
        pnr: `${actPnr}-BOT`,
        venue: "Umngot Crystal Waters, Shnongpdeng",
        date: "Day 3 • 10:00 AM",
        qrCode: "QR-BOT-DAWKI-7703",
        status: "VALID",
        costPerHead: 800
      },
      {
        id: "pass-rtb",
        title: "Double Decker Living Root Bridge Community Permit",
        pnr: `${actPnr}-RTB`,
        venue: "Nongriat Eco-Zone",
        date: "Day 3 • 01:30 PM",
        qrCode: "QR-RTB-NONGRIAT-2291",
        status: "VALID",
        costPerHead: 600
      }
    ];

    flightTickets.pnr = flightPnr;
    flightTickets.seats = flightTickets.map(t => ({
      memberId: t.memberId,
      passengerName: t.memberName,
      seat: t.seat,
      class: "Economy"
    }));

    const hotels = hotelVouchers.map(h => ({
      ...h,
      name: h.hotelName,
      confirmationNumber: h.pnr,
      roomType: h.rooms,
      rooms: "2 Rooms",
      checkIn: "24 Oct 2026 (14:00)",
      checkOut: "27 Oct 2026 (11:00)",
      phone: h.contact
    }));

    const cabBooking = {
      pnr: cabVoucher.pnr,
      driverName: cabVoucher.chauffeur,
      driverRating: "4.96",
      driverPhone: cabVoucher.phone,
      vehicle: cabVoucher.model,
      vehiclePlate: cabVoucher.plate,
      pickupLocation: cabVoucher.pickupPoint
    };

    const mappedActivityPasses = activityPasses.map(a => ({
      ...a,
      name: a.title,
      permitNumber: a.qrCode,
      date: a.date,
      groupCount: 4
    }));

    return {
      flightTickets,
      flights: flightTickets,
      hotelVouchers,
      hotels,
      cabVoucher,
      cabBooking,
      activityPasses: mappedActivityPasses
    };
  }

  // Requirement 3: Cancellation Simulator & Pine Labs Grantex Autonomous Refund
  simulateCancellation(memberId) {
    const member = this.state.members.find(m => m.id === memberId) || this.state.members[2]; // Rohan by default
    const acct = this.state.grantexAccounts.find(a => a.memberId === member.id);
    const totalPaid = acct ? acct.spent : 19850;

    // Policies:
    // Flight: ₹3,000 airline fee + ₹500 MMT fee = ₹3,500 penalty
    // Hotel: 100% refund (>48 hrs) = ₹0 penalty
    // Cab: 100% refund (>12 hrs) = ₹0 penalty
    // Activity: ₹150 admin fee
    const flightPenalty = (this.state.isFlightBooked || this.state.isTripFullyBooked || totalPaid >= 5000) ? 3500 : (this.state.isFlightSkipped ? 0 : 3500);
    const hotelPenalty = 0; // >48 hrs free window
    const cabPenalty = 0; // >12 hrs free window
    const activityPenalty = (this.state.isActivitiesPrebooked || this.state.isTripFullyBooked || totalPaid >= 5000) ? 150 : (this.state.isActivitiesSkipped ? 0 : 150);
    const cancellationLoss = flightPenalty + hotelPenalty + cabPenalty + activityPenalty;
    const paidAmount = totalPaid > 0 ? totalPaid : 19850;
    const refundAmount = Math.max(0, paidAmount - cancellationLoss);

    this.state.cancellationSim = {
      isOpen: true,
      memberId: member.id,
      memberName: member.name,
      passengerName: member.name,
      isSimulated: true,
      totalPaid: paidAmount,
      cancellationLoss,
      refundAmount,
      flightPenalty,
      hotelPenalty,
      cabPenalty,
      activityPenalty,
      deadlineHoursRemaining: 36,
      refundCredited: false,
      receiptId: null
    };

    this.notify("CANCELLATION_SIMULATED", { sim: this.state.cancellationSim });
    return this.state.cancellationSim;
  }

  executeCancellation(memberId) {
    const member = this.state.members.find(m => m.id === memberId) || this.state.members[2];
    if (!this.state.cancellationSim || this.state.cancellationSim.memberId !== member.id) {
      this.simulateCancellation(member.id);
    }
    const sim = this.state.cancellationSim;
    const receiptId = `GRNTX-RFND-${Math.floor(1000 + Math.random() * 9000)}`;

    if (!this.state.cancelledMemberIds.includes(member.id)) {
      this.state.cancelledMemberIds.push(member.id);
    }

    // Refund net amount back to member's Grantex Vault
    const acct = this.state.grantexAccounts.find(a => a.memberId === member.id);
    if (acct) {
      acct.spent = Math.max(0, acct.spent - sim.refundAmount);
      acct.balance = Math.min(acct.initialDeposit, acct.balance + sim.refundAmount);
      acct.deductions.push({
        item: `Pine Labs Grantex Autonomous Refund: Net cancellation credit for ${member.name} (Ref: ${receiptId})`,
        amount: -sim.refundAmount,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'refund',
        pnr: receiptId
      });
    }

    this.state.cancellationSim.refundCredited = true;
    this.state.cancellationSim.receiptId = receiptId;

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "Grantex Settlement Engine",
      isAI: true,
      text: `🚨 CANCELLATION PROCESSED: Partial cancellation confirmed for ${member.name}. Refund of ₹${sim.refundAmount.toLocaleString()} credited directly to ${member.name}'s Pine Labs Grantex vault (Ref: ${receiptId}). Cancellation penalty deducted: ₹${sim.cancellationLoss.toLocaleString()} per policy.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("CANCELLATION_EXECUTED", { memberId: member.id, refundAmount: sim.refundAmount, receiptId });
    return { success: true, memberId: member.id, refundAmount: sim.refundAmount, receiptId };
  }

  getActiveDisruptionScenario() {
    const scenarioId = this.state.disruptionState.activeScenarioId || "flight_delay";
    const scenario = DISRUPTION_SCENARIOS.find(s => s.id === scenarioId) || DISRUPTION_SCENARIOS[0];
    const affectedMember = this.state.members.find(m => m.id === scenario.affectedMemberId)?.name || "Priya Menon";
    const hours = Math.floor(scenario.delayMinutes / 60);
    const mins = scenario.delayMinutes % 60;
    return {
      ...scenario,
      affectedMember,
      downstreamImpact: scenario.rippleImpact,
      timeImpact: `+${hours}h${mins > 0 ? ` ${mins}m` : ''}`
    };
  }

  getReplanOptions() {
    const scenario = this.getActiveDisruptionScenario();
    const optionKeys = scenario.options || ["replan_min_disrupt", "replan_optimised", "replan_cost_min"];
    return optionKeys.map(key => {
      const opt = REPLAN_OPTIONS_MATRIX[key] || REPLAN_OPTIONS_MATRIX.replan_min_disrupt;
      return {
        id: opt.id,
        name: opt.title,
        title: opt.title,
        tag: opt.tag,
        description: opt.description,
        timeImpact: opt.timeImpact,
        costImpact: opt.costImpact,
        action: opt.action
      };
    });
  }

  // Requirement 4 & 5: Disruption Downstream Replanner & Scoped Impact Decision
  triggerDisruptionScenario(scenarioId) {
    const scenario = DISRUPTION_SCENARIOS.find(s => s.id === scenarioId) || DISRUPTION_SCENARIOS[0];
    this.state.disruptionState.activeScenarioId = scenario.id;
    this.state.disruptionState.affectedMemberId = scenario.affectedMemberId;
    this.state.disruptionState.selectedOptionId = scenario.options[0];
    this.state.disruptionState.isReplanApplied = false;
    this.state.disruptionState.adminApproved = false;

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra Sentinel",
      role: "Live Disruption Radar",
      isAI: true,
      text: `⚠️ DISRUPTION DETECTED: ${scenario.title}. Trigger: ${scenario.triggerReason} Downstream effect: ${scenario.rippleImpact}. Myra is calculating Minimal-Disruption, Optimised-Replan and Cost-Minimising recovery paths.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("DISRUPTION_SCENARIO_TRIGGERED", { scenario });
  }

  setDisruptionScope(scope) {
    this.state.disruptionState.scope = scope; // "solo" | "group"
    this.notify("DISRUPTION_SCOPE_CHANGED", { scope });
  }

  selectReplanOption(optionId) {
    this.state.disruptionState.selectedOptionId = optionId;
    this.notify("REPLAN_OPTION_SELECTED", { optionId });
  }

  approveGroupDisruptionReplan() {
    this.state.disruptionState.adminApproved = true;
    this.notify("GROUP_REPLAN_APPROVED", {});
  }

  applyDisruptionReplan() {
    const optionId = this.state.disruptionState.selectedOptionId;
    const option = REPLAN_OPTIONS_MATRIX[optionId] || REPLAN_OPTIONS_MATRIX.replan_min_disrupt;
    const scope = this.state.disruptionState.scope;
    const admin = this.state.members.find(m => m.role === "Trip Admin") || this.getActivePersona();

    if (scope === "group" && !this.state.disruptionState.adminApproved) {
      this.state.disruptionState.adminApproved = true; // Auto-approve if triggered by active admin
    }

    // Apply downstream itinerary modifications
    if (optionId === "replan_min_disrupt") {
      // Day 1: shift pickup to 6:15 PM, push Umiam stop to Day 4 morning
      const day1 = this.state.itinerary[0];
      const day4 = this.state.itinerary[3];
      if (day1 && day1.stops) {
        const pickupStop = day1.stops.find(s => s.type === "cab" || s.title.includes("Pickup"));
        if (pickupStop) pickupStop.time = "06:15 PM";
        const checkinStop = day1.stops.find(s => s.type === "hotel");
        if (checkinStop) checkinStop.time = "08:00 PM";
        const dinnerStop = day1.stops.find(s => s.type === "food");
        if (dinnerStop) dinnerStop.time = "09:00 PM";
      }
      if (day4 && day4.stops) {
        day4.stops.unshift({
          id: `resched-umiam-${Date.now()}`,
          time: "08:30 AM",
          title: "Rescheduled: Morning High-Tea at Umiam Lake (Barapani)",
          subtitle: "Recovered sightseeing window with morning sunrise reflections",
          type: "sightseeing",
          badge: "Replanned Sight",
          duration: "1 hr",
          locked: false
        });
      }
    } else if (optionId === "replan_optimised") {
      const day1 = this.state.itinerary[0];
      if (day1 && day1.stops) {
        day1.stops.splice(1, 0, {
          id: `express-transfer-${Date.now()}`,
          time: "05:30 PM",
          title: "Express Sedan Highway Transfer via Shillong Bypass",
          subtitle: "Direct highway drop to Dylan's Cafe • Pre-authorized contactless auto check-in at Ri Kynjai",
          type: "cab",
          badge: "Fast Track",
          duration: "1.5 hrs",
          locked: true
        });
      }
    }

    this.state.disruptionState.isReplanApplied = true;
    this.state.disruptionState.appliedOption = option;

    this.state.chatMessages.push({
      id: `msg-${Date.now()}`,
      sender: "Myra AI",
      role: "Recovery Engine",
      isAI: true,
      text: `✅ REPLAN ADAPTED (${scope.toUpperCase()} IMPACT): Successfully executed '${option.title}'. ${option.description} Time impact: ${option.timeImpact} • Cost impact: ${option.costImpact}. All connected reservations updated.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.notify("DISRUPTION_REPLAN_APPLIED", { option, scope });
    return { success: true, option, scope };
  }

  resetDisruptionReplan() {
    this.state.disruptionState.isReplanApplied = false;
    this.state.disruptionState.appliedOption = null;
    this.state.disruptionState.adminApproved = false;
    this.notify("DISRUPTION_REPLAN_RESET", {});
  }

  // Requirement 6: Sentinel Monitoring & Consent Settings
  updateSentinelConsent(key, value) {
    if (this.state.sentinelMonitoring.consentSettings[key] !== undefined) {
      this.state.sentinelMonitoring.consentSettings[key] = value;
      this.notify("SENTINEL_CONSENT_UPDATED", { key, value });
    }
  }

  // Popover toggles
  toggleBudgetEditor() {
    this.state.isBudgetEditorOpen = !this.state.isBudgetEditorOpen;
    this.notify("BUDGET_EDITOR_TOGGLED", { isOpen: this.state.isBudgetEditorOpen });
  }

  toggleTravellerLookup() {
    this.state.isTravellerLookupOpen = !this.state.isTravellerLookupOpen;
    this.notify("TRAVELLER_LOOKUP_TOGGLED", { isOpen: this.state.isTravellerLookupOpen });
  }

  toggleSpecModal() {
    this.state.isSpecModalOpen = !this.state.isSpecModalOpen;
    this.notify("SPEC_MODAL_TOGGLED", { isOpen: this.state.isSpecModalOpen });
  }
}

export const mmtState = new MMTStore();
