# MakeMyTrip — Group Travel with Myra 2.0 (Conversational Itinerary OS)

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Mobile-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Tests](https://img.shields.io/badge/tests-158%20passing-brightgreen.svg)]()

An agentic, collaborative group travel platform built for **MakeMyTrip**, powered by **Myra 2.0**. Designed to solve multi-stakeholder coordination friction, dynamic schedule optimization, shared budget management via **Pine Labs Grantex Escrow**, multimodal bookings, and real-time disruption monitoring.

---

## 🌟 Key Architecture & Features

### 1. Conversational Itinerary Builder with `@Myra`
- **Natural Language Parsing**: Tag `@Myra` in group chat to swap macro days (e.g. `@Myra swap Day 2 and Day 3`), choose day-specific activities (`@Myra add Nohkalikai trek for Day 2`), or slot authentic regional meals.
- **Micro & Macro Itinerary Reorganizer**: Instant reactive re-indexing of destinations, hotels, distances, and timeline stops without screen reloads.

### 2. Multi-Stage Gated Collaboration Workflow
1. **Seasonal Consensus**: Group voting across best travel windows with real-time consensus tracking.
2. **Interactive Month Calendar**: 31-day dropdown calendar with member availability heatmaps, flight surge indicators, and AI optimal date recommendations.
3. **Macro Overview**: Visual destination cards with zero-backtracking day routing.
4. **Activity Selection**: Curated per-day candidate activities with budget ceiling guardrails.
5. **Local Cuisines & Markets**: Regional food slotting with geographic route coordination and meal timing anchors.
6. **Pine Labs Grantex Accounts**: Individual ₹25,000 vault contributions, agentic AI chat nudges for pending members, and Admin approval pool gates.
7. **Multimodal Transit Booking**: Departure city selection (DEL, BLR, BOM, CCU), multimodal cards (Flights, Trains, Cars) with individual transit mode overrides and group voting.
8. **Multi-Location Stays**: MMT-curated 3-hotel packages across travel hubs (Shillong & Cherrapunji).
9. **Sightseeing Fleet & Passes**: Chauffeur-driven Innova Crysta (Biplab Sangma) and QR entry passes.
10. **Ubiquitous Skip Options**: Every booking stage (Transit, Hotels, Cabs, Activities) features an unambiguous skip option.
11. **Central Group Travel Repository (`trip_locker`)**: Consolidated vault with boarding passes, hotel vouchers, live GPS chauffeur tracker, Grantex escrow ledger, and complete master schedule.

### 3. Visual Preview & Master Itinerary Gating
- **Pre-Cuisine Stage**: Visual showcase highlighting key scenic places and planned activities with high-resolution imagery.
- **Post-Cuisine Stage**: Unlocks the complete chronological Master Itinerary Schedule.
- **1-Click PDF Export**: Clean, print-ready PDF generation formatted for standard paper and offline travel access.

### 4. Post-Booking Resilience & Disruption Radar
- **Smart Cancellation Simulator**: Member-specific penalty breakdowns (airline, hotel, cab, activity) with net refund calculation into Grantex vaults.
- **Sentinel Live Disruption Radar**: Proactive flight delay notifications (e.g., +150 min delay) with 3 downstream replanning strategies (Minimal Disruption, Optimised Replan, Cost-Minimising).

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended, v20+ supported)

### Running Locally
Clone the repository and run the built-in zero-dependency HTTP server:

```bash
# Clone repository
git clone https://github.com/Abhi-1016/panu.git
cd panu

# Start the local development server
node scratch/server.js
```

Then open your browser and navigate to:
```
http://localhost:8080/index.html
```

---

## 🧪 Running Automated Test Suites

The project contains comprehensive unit and integration test suites covering all workflows and edge cases:

```bash
# End-to-End Booking Flow (52 tests)
node scratch/test-end-to-end-booking-flow.js

# DOM Rendering & Zero 'undefined' Verification (20 tests)
node scratch/test-dom-rendering.js

# Conversational Chat Commands & Gating (25 tests)
node scratch/test-chat-activities-cuisines.js

# Interactive Calendar & Macro Itinerary Gating (20 tests)
node scratch/test-calendar-macro-gating.js

# Chat-Based Macro Day Swapping (4 tests)
node scratch/test-macro-chat-swap.js

# Smart Cancellation, Disruptions & Group Locker (37 tests)
node scratch/test-postbooking-suite.js
```

---

## 📁 Repository Structure

```
├── css/
│   ├── mmt-theme.css          # Core MakeMyTrip design tokens & responsive styles
│   └── styles.css             # Base utilities & layout definitions
├── js/
│   ├── app.js                 # Application entry point & router
│   ├── mmt-data.js            # Itineraries, flight schedules, hotels & Grantex catalogs
│   ├── mmt-state.js           # Reactive central state store & Myra AI logic
│   ├── components/            # Reusable UI components (chat, itinerary board, etc.)
│   └── views/                 # Fullscreen views (chat, preview canvas, locker, etc.)
├── scratch/                   # Test suites and lightweight HTTP server
│   ├── server.js              # Zero-dependency Node.js HTTP server
│   └── test-*.js              # Automated test suites
├── index.html                 # Main web application entry point
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

---

## 🔒 Security & Privacy
All mock payments and escrow protocols are simulated through the Pine Labs Grantex architecture. No live banking APIs or credentials are required or stored in this repository.
