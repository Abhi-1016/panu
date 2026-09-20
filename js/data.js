// js/data.js - Mock data & configuration for Myra 2.0 Customer Journey

export const TRIP_METADATA = {
  id: "TRIP-MMT-8942",
  title: "Meghalaya Clouds & Waterfalls Escape",
  origin: "Bengaluru (BLR)",
  destination: "Shillong & Cherrapunji, Meghalaya",
  destinationOptions: [
    { id: "dest-1", name: "Meghalaya (Shillong & Cherrapunji)", score: 94, crowd: "Moderate", weather: "21°C • Light Drizzle", estCost: "₹28,500/person", matchReasons: ["Fits nature & trekking preferences", "Within 4-day long weekend", "High adventure value"] },
    { id: "dest-2", name: "Coorg & Wayanad", score: 82, crowd: "High", weather: "25°C • Clear", estCost: "₹21,000/person", matchReasons: ["Short travel time", "Lower budget fit", "Higher crowd density"] },
    { id: "dest-3", name: "Spiti Valley Roadtrip", score: 68, crowd: "Low", weather: "12°C • High Altitude", estCost: "₹38,000/person", matchReasons: ["Exceeds Rohan's hard budget limit", "Requires 7 days (group only has 4)"] }
  ],
  dates: "Oct 16 - Oct 20, 2026",
  duration: "4 Days / 3 Nights",
  adminId: "user-1",
  status: "In Planning & Consensus",
  currency: "₹"
};

export const MEMBERS = [
  {
    id: "user-1",
    name: "Kabir Roy",
    role: "Trip Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 28000,
    flexBudget: 34000,
    hardLimit: 38000,
    isBudgetPrivate: false,
    diet: "Non-Vegetarian",
    pace: "Moderate Explorer",
    hotelPref: "Boutique / Heritage Stays with view",
    authStatus: "Authorized (₹35,000 mandate)",
    authAmount: 35000,
    paidAmount: 26400,
    historyShared: true
  },
  {
    id: "user-2",
    name: "Priya Menon",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 24000,
    flexBudget: 28000,
    hardLimit: 30000,
    isBudgetPrivate: false,
    diet: "Strict Vegetarian",
    pace: "Relaxed / Scenic",
    hotelPref: "Eco-resorts with clean sanitisation",
    authStatus: "Authorized (₹30,000 mandate)",
    authAmount: 30000,
    paidAmount: 24500,
    historyShared: true,
    hardConstraints: ["Must have veg meal options at all stops", "Cannot hike more than 6km continuously"]
  },
  {
    id: "user-3",
    name: "Rohan Varma",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 22000,
    flexBudget: 26000,
    hardLimit: 29000,
    isBudgetPrivate: true, // Private budget
    diet: "No Restrictions",
    pace: "High Adrenaline",
    hotelPref: "Value 3-star / Homestays",
    authStatus: "Authorized (₹29,000 mandate)",
    authAmount: 29000,
    paidAmount: 22800,
    historyShared: false,
    hardConstraints: ["Office call until 11:30 AM on Day 1 (No early flight)"]
  },
  {
    id: "user-4",
    name: "Tanya Sen",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 30000,
    flexBudget: 35000,
    hardLimit: 40000,
    isBudgetPrivate: false,
    diet: "Flexitarian / Seafood lover",
    pace: "Culture & Photography",
    hotelPref: "Balcony view or cliffside cottages",
    authStatus: "Authorized (₹36,000 mandate)",
    authAmount: 36000,
    paidAmount: 26400,
    historyShared: true
  }
];

export const JOURNEY_STAGES = [
  // Phase 1
  {
    stage: 1,
    phase: "Discovery & Setup",
    name: "Discover Myra",
    shortDesc: "User opens MMT and selects 'Plan a Trip with Myra' (Solo vs Group).",
    actor: "Trip Admin",
    loopholeFix: "Lightweight trip workspace rather than forcing upfront booking.",
    permissionLevel: "L0: Observe",
    details: "Trip creator discovers Myra within MakeMyTrip home feed. Choosing 'Group Trip' opens a dedicated collaborative workspace rather than rushing to solo checkout."
  },
  {
    stage: 2,
    phase: "Discovery & Setup",
    name: "Create Trip Workspace",
    shortDesc: "Set origin, tentative destination, dates and member count.",
    actor: "Trip Admin",
    loopholeFix: "Dates and destination can remain completely flexible.",
    permissionLevel: "L2: Prepare",
    details: "Admin initializes 'Meghalaya Monsoon Trek'. Dates set as flexible weekend window. Unique Trip ID #MMT-8942 generated."
  },
  {
    stage: 3,
    phase: "Discovery & Setup",
    name: "Invite Members",
    shortDesc: "Shareable WhatsApp link, contacts deep link, or guest web link.",
    actor: "Trip Admin & Invitees",
    loopholeFix: "No mandatory app download for friends; guest web onboarding.",
    permissionLevel: "L1: Recommend",
    details: "Kabir shares WhatsApp link to Priya, Rohan, and Tanya. They can join on any browser without prior MMT account."
  },

  // Phase 2
  {
    stage: 4,
    phase: "Onboarding & Consent",
    name: "Join, Consent & Identity",
    shortDesc: "Accept invite & choose privacy consent for past MMT history.",
    actor: "Group Members",
    loopholeFix: "Raw past bookings never exposed to group; privacy-first aggregate extraction.",
    permissionLevel: "L0: Observe",
    details: "Priya & Tanya consent to AI preference sync; Rohan opts to start clean without exposing past personal history."
  },
  {
    stage: 5,
    phase: "Onboarding & Consent",
    name: "Personal Preference Setup",
    shortDesc: "Pace, room type, hotel comfort, dietary restrictions, and cancellation rules.",
    actor: "Group Members",
    loopholeFix: "Tailored multi-dimension preferences captured in under 60 seconds.",
    permissionLevel: "L1: Recommend",
    details: "Priya specifies Strict Vegetarian & relaxed pace; Rohan flags a 11:30 AM client call on Day 1."
  },
  {
    stage: 6,
    phase: "Onboarding & Consent",
    name: "Individual Budget & Constraints",
    shortDesc: "Preferred budget, flexible range, hard limit, and group visibility toggle.",
    actor: "Group Members",
    loopholeFix: "Three-tier budget replaces rigid single number; private budget setting preserves dignity.",
    permissionLevel: "L1: Recommend",
    details: "Rohan hides his ₹29,000 hard limit from friends; Myra privately validates all options against it."
  },

  // Phase 3
  {
    stage: 7,
    phase: "Consensus & Group Chat",
    name: "Destination Shortlisting / Confirmation",
    shortDesc: "Myra ranks destinations based on accessibility, weather, activities & budget.",
    actor: "Myra AI & Group",
    loopholeFix: "Explainable multi-factor scoring instead of black-box recommendation.",
    permissionLevel: "L1: Recommend",
    details: "Meghalaya scores 94/100, outperforming Spiti (disqualified by Rohan's budget & 4-day time constraint)."
  },
  {
    stage: 8,
    phase: "Consensus & Group Chat",
    name: "Travel Window Recommendation",
    shortDesc: "Compare seasonal windows: flight fare dips, monsoon intensity, crowd levels.",
    actor: "Myra AI & Members",
    loopholeFix: "Visual trade-offs (price vs weather risk) with live member polling.",
    permissionLevel: "L1: Recommend",
    details: "Oct 16–20 selected: 40% lower crowd than Diwali week, post-monsoon waterfalls at full volume."
  },
  {
    stage: 9,
    phase: "Consensus & Group Chat",
    name: "Consensus and Decision Lock",
    shortDesc: "Hard constraints override simple majority. Admin confirms lock.",
    actor: "Consensus Agent & Admin",
    loopholeFix: "Prevent majority from steamrolling a member's schedule or budget limitation.",
    permissionLevel: "L2: Prepare -> Admin Lock",
    details: "Although 3 wanted a 7 AM flight, Rohan's work call constraint is protected. Flight shifted to 12:45 PM."
  },
  {
    stage: 10,
    phase: "Consensus & Group Chat",
    name: "Human Group Chat with Ambient AI",
    shortDesc: "Natural WhatsApp-like chat. Myra remains passive until tagged or conflict arises.",
    actor: "Group & Passive AI",
    loopholeFix: "AI doesn't spam conversational flow; steps in as expert assistant on demand.",
    permissionLevel: "L0/L1: Passive Listener",
    details: "Group jokes and shares photos; tagging '@Myra compare stays near living root bridges' brings instant cards."
  },

  // Phase 4
  {
    stage: 11,
    phase: "Scoring & Itinerary",
    name: "Agentic Destination & Experience Scoring",
    shortDesc: "Transparent mathematical scoring with user-adjustable weights.",
    actor: "Myra Scoring Engine",
    loopholeFix: "Shows 'Why this scored higher' with factor breakdowns; fully customizable.",
    permissionLevel: "L1: Recommend",
    details: "Scores Cherrapunji Cliffside Resort 91/100 (high experience value, verified veg kitchen for Priya)."
  },
  {
    stage: 12,
    phase: "Scoring & Itinerary",
    name: "Initial Itinerary Generation",
    shortDesc: "Day-wise plan built from travel times, daylight hours, opening times & hotel base.",
    actor: "Itinerary Optimisation Agent",
    loopholeFix: "Dynamic buffer times prevent unrealistic travel schedules.",
    permissionLevel: "L2: Prepare",
    details: "Generated 4-day loop: Guwahati -> Shillong Cafe Crawl -> Cherrapunji Waterfalls -> Dawki Crystal River."
  },
  {
    stage: 13,
    phase: "Scoring & Itinerary",
    name: "Route Optimisation & Anti-Backtracking",
    shortDesc: "AI calculates efficient route graph; users can lock must-visit spots.",
    actor: "Itinerary Agent & Users",
    loopholeFix: "Side-by-side comparison of user route vs AI route saves 3.5 hours mountain transit.",
    permissionLevel: "L2: Prepare",
    details: "Rearranging Nohkalikai Falls before Mawsmai Caves eliminates 42 km of mountain backtracking."
  },
  {
    stage: 14,
    phase: "Scoring & Itinerary",
    name: "Activity & Experience Selection",
    shortDesc: "Common group activities vs optional individual excursions.",
    actor: "Group Members",
    loopholeFix: "No one forced into activities they dislike; budget split adapts automatically.",
    permissionLevel: "L1: Recommend",
    details: "Rohan & Tanya pick zip-lining over Mawkdok Dympep Valley; Kabir & Priya opt for cafe viewpoint."
  },
  {
    stage: 15,
    phase: "Scoring & Itinerary",
    name: "Food, Restaurants & Local Experiences",
    shortDesc: "Curated local Khasi cuisine + guaranteed pure veg dining for Priya.",
    actor: "Local Experience Layer",
    loopholeFix: "Clear labeling of sponsored spots vs authentic high-rated local gems.",
    permissionLevel: "L1: Recommend",
    details: "Myra books table at Dylan's Cafe (Shillong) and recommends Orange Roots (100% pure veg in Cherrapunji)."
  },

  // Phase 5
  {
    stage: 16,
    phase: "Feasibility & Agentic Booking",
    name: "Trip Summary & Feasibility Check",
    shortDesc: "Consolidated preview of route, flights, stays, activities and per-member share.",
    actor: "Trip Admin & Myra",
    loopholeFix: "Flags zero unresolved conflicts, green feasibility index (98%).",
    permissionLevel: "L2: Prepare",
    details: "Total trip estimated at ₹1,03,700 for 4 people (~₹25,925/member), comfortably below everyone's hard limit."
  },
  {
    stage: 17,
    phase: "Feasibility & Agentic Booking",
    name: "Context-Aware Personalised Offers",
    shortDesc: "MMT issues contextual group discount and boutique stay bundling.",
    actor: "Offer Agent",
    loopholeFix: "Transparent coupon badge without altering underlying relevance ranking.",
    permissionLevel: "L1: Recommend",
    details: "Applied 'MEGHALAYAGROUP4' coupon saving ₹6,800 + complimentary breakfast upgrade at Ri Kynjai resort."
  },
  {
    stage: 18,
    phase: "Feasibility & Agentic Booking",
    name: "Booking Permission & Start Booking",
    shortDesc: "Admin initiates booking; members review scoped permission contracts.",
    actor: "Trip Admin & Members",
    loopholeFix: "Level 3 permission boundary: max price deviation cap (₹1,500) and cancellation rules.",
    permissionLevel: "L3: Execute Approved Action",
    details: "Screen explicitly details: what Myra is authorized to execute, max spending cap, and pause conditions."
  },
  {
    stage: 19,
    phase: "Feasibility & Agentic Booking",
    name: "Agentic Booking Execution (Scarcity Order)",
    shortDesc: "Autonomous sequential booking: Scarce flights -> Hotels -> Cabs -> Activities.",
    actor: "Booking Agent",
    loopholeFix: "Dependency-aware sequencing prevents being stranded with a hotel and no flight seats.",
    permissionLevel: "L3: Scoped Execution",
    details: "IndiGo 6E-542 locked first (only 6 seats left at ₹6,200), followed by 2 Deluxe Cottages at Polo Orchid."
  },
  {
    stage: 20,
    phase: "Feasibility & Agentic Booking",
    name: "Progressive Payment Capture",
    shortDesc: "Regulated individual payment mandates. Money captured ONLY as bookings succeed.",
    actor: "Payment / Authorisation Layer",
    loopholeFix: "No risky informal pooled escrow; each member's UPI/Card mandate captured progressively.",
    permissionLevel: "L3: Progressive Capture",
    details: "Flight confirmed -> ₹6,200 captured from each member. Hotel confirmed -> ₹11,200 captured. Audit receipt generated."
  },

  // Phase 6
  {
    stage: 21,
    phase: "Live Trip & Disruption Recovery",
    name: "Live Trip Dashboard",
    shortDesc: "Single shared command center for boarding passes, hotel QR codes, and day schedule.",
    actor: "All Members & Myra",
    loopholeFix: "Offline cached passes, driver contact cards, real-time weather & sunrise radar.",
    permissionLevel: "L0: Observe",
    details: "Live countdown: 3 hours to boarding. Guwahati airport pickup cab confirmed with driver details."
  },
  {
    stage: 22,
    phase: "Live Trip & Disruption Recovery",
    name: "Real-Time Monitoring",
    shortDesc: "Myra monitors airline schedule, road landslides, and weather radar in background.",
    actor: "Price & Disruption Watcher",
    loopholeFix: "Silent sentinel alerting group only when actionable intervention is required.",
    permissionLevel: "L0/L1: Observe & Alert",
    details: "Myra detects 2-hour delay on return flight 6E-689 due to fog at Kolkata transit."
  },
  {
    stage: 23,
    phase: "Live Trip & Disruption Recovery",
    name: "Disruption Recovery Engine",
    shortDesc: "Calculates downstream impact on cabs and reservations; generates 3 recovery strategies.",
    actor: "Disruption Recovery Agent",
    loopholeFix: "Presents clear trade-offs: 'Minimal Disruption' vs 'Lowest Cost' vs 'Relaxed Replan'.",
    permissionLevel: "L1: Recommend Options",
    details: "Downstream impact: Airport cab transfer will miss Cherrapunji sunset viewpoint. Myra creates instant fixes."
  },
  {
    stage: 24,
    phase: "Live Trip & Disruption Recovery",
    name: "Individual vs Group Replanning",
    shortDesc: "Choose scope: alter plan for single affected member vs full group itinerary.",
    actor: "Affected Member & Admin",
    loopholeFix: "Isolated changes don't derail entire 4-person vacation unnecessarily.",
    permissionLevel: "L3/L5: Human Scoped Approval",
    details: "When Rohan's flight is rescheduled by 45 mins, group cab waits at airport cafe rather than rebooking 2 cars."
  },
  {
    stage: 25,
    phase: "Live Trip & Disruption Recovery",
    name: "Cancellation & Modification Simulator",
    shortDesc: "Shows transparent breakdown: supplier fee, platform fee, refund timeline & room split.",
    actor: "Myra Finance Engine",
    loopholeFix: "Simulate exact financial outcome before pressing cancel.",
    permissionLevel: "L2/L5: Prepare & Escalate",
    details: "Simulating Priya's zip-lining refund: 100% full refund available since cancellation is >24 hours ahead."
  },
  {
    stage: 26,
    phase: "Live Trip & Disruption Recovery",
    name: "Post-Trip Expense Settlement & Learning",
    shortDesc: "One-tap UPI settlement between Kabir, Priya, Rohan & Tanya with privacy-safe learning.",
    actor: "Expense & Learning Agent",
    loopholeFix: "Zero personal data leakage; feedback updates member preferences only with explicit opt-in.",
    permissionLevel: "L0/L1: Opt-in Consent",
    details: "Rohan settles ₹1,800 to Kabir. Myra prompts: 'Save your preference for quiet eco-stays for next trip?'"
  },
  {
    stage: 27,
    phase: "Live Trip & Disruption Recovery",
    name: "Architecture & Human-in-the-Loop Framework",
    shortDesc: "Comprehensive summary of the 6 Permission Levels (L0 to L5) and System Safeguards.",
    actor: "System Architecture",
    loopholeFix: "Audit trails, rollback safety, and AI boundaries clearly explained.",
    permissionLevel: "System Overview",
    details: "Overview of Level 0 (Observe) to Level 5 (Always Escalate) ensuring human agency over finances and experiences."
  }
];

export const PERMISSION_LEVELS = [
  {
    level: "Level 0",
    name: "Observe",
    example: "Read trip context, group preferences, flight status, live weather",
    controlRule: "No active bookings; zero confirmation needed after initial consent.",
    risk: "Zero Risk",
    badgeClass: "badge-green"
  },
  {
    level: "Level 1",
    name: "Recommend",
    example: "Suggest destination shortlist, boutique hotels, route options, local cafes",
    controlRule: "Human chooses; Myra ranks and explains trade-offs transparently.",
    risk: "Low (Advisory)",
    badgeClass: "badge-blue"
  },
  {
    level: "Level 2",
    name: "Prepare",
    example: "Assemble day-by-day itinerary draft, fill passenger forms, prepare booking carts",
    controlRule: "Human reviews and edits before any submission or commitment.",
    risk: "Low (Drafting)",
    badgeClass: "badge-indigo"
  },
  {
    level: "Level 3",
    name: "Execute Approved Action",
    example: "Book pre-approved flights and hotels within pre-agreed budget and policy cap",
    controlRule: "User grants scoped permission; system logs audit trail for every booking.",
    risk: "Controlled Financial",
    badgeClass: "badge-purple"
  },
  {
    level: "Level 4",
    name: "Auto-Handle Low-Risk Changes",
    example: "Reschedule complimentary cab pickup by 30 mins, shift optional cafe visit",
    controlRule: "Allowed only within strict pre-authorized thresholds; notifies group.",
    risk: "Low Risk Operational",
    badgeClass: "badge-amber"
  },
  {
    level: "Level 5",
    name: "Always Escalate",
    example: "Non-refundable booking, price spike > ₹1,500, full trip cancel, extra payment",
    controlRule: "Strict pause! Explicit confirmation required from affected member or admin.",
    risk: "High Impact / Irreversible",
    badgeClass: "badge-red"
  }
];

export const SCORING_FACTORS = [
  { id: "prefFit", name: "Preference Fit", weight: 25, meaning: "Match against stated & consented past preferences" },
  { id: "budgetFit", name: "Budget Fit", weight: 20, meaning: "Fits within preferred budgets and respects hard caps" },
  { id: "expValue", name: "Experience Value", weight: 15, meaning: "Scenic beauty, unique local culture, trip purpose" },
  { id: "convenience", name: "Convenience & Routes", weight: 15, meaning: "Short travel distance, minimum road fatigue" },
  { id: "qualityTrust", name: "Quality & Trust", weight: 10, meaning: "MMT verified properties, 4.5+ star reviews" },
  { id: "flexibility", name: "Flexibility & Refund", weight: 10, meaning: "Free cancellation policies, low change fees" },
  { id: "availability", name: "Availability & Timing", weight: 5, meaning: "Real-time seat availability for selected dates" }
];

export const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival & The Pine City of Shillong",
    date: "Fri, Oct 16",
    summary: "Guwahati Scenic Transfer • Umiam Lake • Shillong Cafe Crawl",
    items: [
      { id: "it-1", time: "12:45 PM", type: "Flight", title: "IndiGo 6E-542 Arrival at Guwahati (GAU)", details: "Arrives 12:45 PM. Rohan joins smoothly post his 11:30 AM client call.", status: "Confirmed", locked: true, badge: "Scarcity Booking #1" },
      { id: "it-2", time: "02:00 PM", type: "Transfer", title: "Private Innova Crysta Pickup to Shillong", details: "Pre-booked 7-seater cab via MMT Ground Partners. Duration: 2.5 hrs.", status: "Confirmed", locked: true, badge: "Shared Cab" },
      { id: "it-3", time: "03:45 PM", type: "Experience", title: "Sunset View & Tea at Umiam Lake (Barapani)", details: "Water sports & scenic photography stop. Verified clean washrooms.", status: "Suggested", locked: false, badge: "Scenic Stop" },
      { id: "it-4", time: "06:30 PM", type: "Stay", title: "Check-in: Ri Kynjai Serene Resort", details: "Lake view cottages with Khasi architecture. Includes free breakfast.", status: "Confirmed", locked: true, badge: "Boutique Stay" },
      { id: "it-5", time: "08:15 PM", type: "Food", title: "Dinner at Dylan's Cafe & Cloud 9", details: "Local live acoustic music, wide vegetarian menu for Priya.", status: "Reserved", locked: false, badge: "Dietary Verified" }
    ]
  },
  {
    day: 2,
    title: "Misty Valleys of Cherrapunji",
    date: "Sat, Oct 17",
    summary: "Nohkalikai Falls • Mawsmai Cave • Eco Park Trek",
    items: [
      { id: "it-6", time: "08:30 AM", type: "Activity", title: "Nohkalikai Waterfall & Viewpoint Trek", details: "India's tallest plunge waterfall (340m). Route optimized to avoid morning fog.", status: "Confirmed", locked: true, badge: "AI Route Priority" },
      { id: "it-7", time: "11:30 AM", type: "Activity", title: "Mawkdok Dympep Valley Canyoning / Viewpoint", details: "Group split option: Rohan & Tanya ziplining; Kabir & Priya at viewing lounge.", status: "Optional Split", locked: false, badge: "Flexible Choice" },
      { id: "it-8", time: "01:30 PM", type: "Food", title: "Pure Veg Lunch at Orange Roots", details: "Special recommendation for Priya: 100% vegetarian Meghalaya-style thali.", status: "Confirmed", locked: true, badge: "Priya Approved" },
      { id: "it-9", time: "03:30 PM", type: "Activity", title: "Mawsmai Limestone Caves Exploration", details: "Pre-purchased fast-track entry QR codes generated via Myra.", status: "Confirmed", locked: false, badge: "Fast Track" },
      { id: "it-10", time: "06:00 PM", type: "Stay", title: "Check-in: Polo Orchid Resort Cherrapunji", details: "Overlooking Seven Sisters waterfall canyon. Bonfire arranged.", status: "Confirmed", locked: true, badge: "Heritage Stay" }
    ]
  },
  {
    day: 3,
    title: "Living Root Bridges & Dawki River",
    date: "Sun, Oct 18",
    summary: "Single Decker Living Root Bridge • Dawki Umngot River Boat Ride",
    items: [
      { id: "it-11", time: "07:30 AM", type: "Activity", title: "Riwai Village Single Living Root Bridge", details: "Moderate 45-min stroll suitable for all group paces.", status: "Confirmed", locked: true, badge: "Bio-Engineering Wonder" },
      { id: "it-12", time: "12:00 PM", type: "Activity", title: "Dawki Crystal Umngot River Boating", details: "Crystal clear waters. Private boats booked with safety jackets.", status: "Confirmed", locked: true, badge: "Highlight" },
      { id: "it-13", time: "04:30 PM", type: "Transfer", title: "Scenic Return Drive to Shillong via Mawlynnong", details: "Cleanest village in Asia. Sunset snacks stop.", status: "Confirmed", locked: false, badge: "Optimized Route" }
    ]
  },
  {
    day: 4,
    title: "Police Bazar & Return Departure",
    date: "Mon, Oct 19",
    summary: "Local Handicrafts • Laitlum Canyons • Guwahati Flight",
    items: [
      { id: "it-14", time: "09:00 AM", type: "Shopping", title: "Police Bazar Souvenir & Bamboo Craft Walk", details: "Organic Meghalaya black tea and local honey shopping.", status: "Suggested", locked: false, badge: "Local Crafts" },
      { id: "it-15", time: "01:30 PM", type: "Flight", title: "Return Flight IndiGo 6E-689 to Bangalore", details: "Guwahati to Bengaluru direct flight.", status: "Confirmed", locked: true, badge: "Flight Return" }
    ]
  }
];

export const CHAT_MESSAGES = [
  { id: "m-1", sender: "Kabir Roy", senderRole: "Admin", isAI: false, text: "Hey folks! Created our Meghalaya trip workspace on MMT Myra. Let's lock our dates and budget!", time: "10:14 AM" },
  { id: "m-2", sender: "Priya Menon", senderRole: "Member", isAI: false, text: "Super excited! Just linked my food preference: need strict vegetarian spots, and I prefer relaxed walks over intense climbs.", time: "10:15 AM" },
  { id: "m-3", sender: "Rohan Varma", senderRole: "Member", isAI: false, text: "I'm in! But heads up: I have an indispensable client demo till 11:30 AM on Day 1. Can't take an early morning flight.", time: "10:17 AM" },
  { id: "m-4", sender: "Tanya Sen", senderRole: "Member", isAI: false, text: "@Myra Can you check flights from Bangalore that leave after 12:00 PM and calculate our total package?", time: "10:18 AM" },
  { 
    id: "m-5", 
    sender: "Myra AI", 
    senderRole: "Assistant", 
    isAI: true, 
    text: "Found 2 flight options satisfying Rohan's 11:30 AM hard constraint! IndiGo 6E-542 departs at 12:45 PM (₹6,200/seat). It matches Priya's budget and keeps our arrival in Shillong before sunset.",
    card: {
      type: "flight-proposal",
      title: "IndiGo 6E-542 (BLR -> GAU)",
      price: "₹6,200/seat",
      conflictResolved: "Accommodates Rohan's 11:30 AM call",
      actionLabel: "Vote to Approve Flight"
    },
    time: "10:18 AM"
  },
  { id: "m-6", sender: "Kabir Roy", senderRole: "Admin", isAI: false, text: "That flight looks perfect! Let's all tap approve so Myra can prepare the booking cart.", time: "10:20 AM" }
];

export const BOOKING_PIPELINE = [
  { id: "b-1", component: "Flights (BLR ⇄ GAU)", provider: "IndiGo Airlines (4 Pax)", amount: 49600, scarcity: "Very High (4 seats left at this fare)", status: "Confirmed", progress: 100, canUndo: false, captureStatus: "Captured ₹12,400/pax" },
  { id: "b-2", component: "Stay: Ri Kynjai Lake Resort", provider: "MMT Verified Boutique (2 Cottages)", amount: 24800, scarcity: "High (Only 2 lake view units remaining)", status: "Confirmed", progress: 100, canUndo: true, captureStatus: "Captured ₹6,200/pax" },
  { id: "b-3", component: "Stay: Polo Orchid Cherrapunji", provider: "Canyon View Deluxe (2 Rooms)", amount: 19400, scarcity: "Moderate", status: "Confirmed", progress: 100, canUndo: true, captureStatus: "Captured ₹4,850/pax" },
  { id: "b-4", component: "Ground Transport (4 Days)", provider: "Innova Crysta AC + Verified Chauffeur", amount: 9900, scarcity: "Reserved", status: "Confirmed", progress: 100, canUndo: true, captureStatus: "Captured ₹2,475/pax" },
  { id: "b-5", component: "Activities & Fast-Track Passes", provider: "Dawki Boating + Living Root Bridges", amount: 3200, scarcity: "Open", status: "Pending Final Confirmation", progress: 65, canUndo: true, captureStatus: "Pre-Authorized" }
];

export const DISRUPTION_SCENARIO = {
  trigger: "Flight Delay Alert: IndiGo 6E-542 delayed by 90 minutes due to air-traffic congestion at BLR.",
  originalArrival: "03:15 PM GAU",
  newArrival: "04:45 PM GAU",
  impactMapping: [
    { item: "Umiam Lake Sunset Stop", impact: "Will be dark upon arrival; viewpoint closed", severity: "Warning" },
    { item: "Airport Pickup Cab", impact: "Chauffeur needs rescheduled pickup window", severity: "Manageable" },
    { item: "Ri Kynjai Resort Check-in", impact: "Late check-in notification required", severity: "Safe" }
  ],
  options: [
    {
      id: "opt-1",
      title: "Option A: Minimal Disruption (Recommended)",
      desc: "Shift Umiam Lake photo-stop to Day 4 morning on return journey. Head directly to Shillong for evening Dylan's Cafe dinner.",
      timeImpact: "0 min wasted",
      costImpact: "₹0 extra",
      feasibility: "100% Guaranteed",
      recommended: true
    },
    {
      id: "opt-2",
      title: "Option B: Fast Express Transfer",
      desc: "Skip dinner cafe crawl, proceed immediately to Barapani night lights viewpoint, late dinner at resort.",
      timeImpact: "+45 mins road drive",
      costImpact: "₹0 extra",
      feasibility: "Tiring after flight"
    },
    {
      id: "opt-3",
      title: "Option C: Individual vs Group Scope",
      desc: "If 1 member wants to rest while others visit Police Bazar night street, split local cab drops.",
      timeImpact: "+20 mins",
      costImpact: "+₹450 cab surcharge",
      feasibility: "Customizable"
    }
  ]
};
