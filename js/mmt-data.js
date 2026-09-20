// js/mmt-data.js - MakeMyTrip authentic data models & Myra 2.0 parameters

export const SEASONAL_WINDOWS = {
  "meghalaya": [
    {
      id: "win-1",
      title: "Mid-October: Post-Monsoon Cascades (Recommended)",
      dateRange: "16 Oct - 19 Oct 2026 (Long Weekend)",
      photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
      weather: "21°C • Light Mist & Pleasant",
      crowd: "Moderate (40% less than Diwali week)",
      estCost: "₹24,000 - ₹30,000 / person",
      pros: [
        "Waterfalls (Nohkalikai, Seven Sisters) at full thunderous volume",
        "Lowest flight airfares from BLR (₹6,200/seat)",
        "Living root bridges surround by lush green canopy"
      ],
      cons: [
        "Occasional passing 20-minute drizzle"
      ],
      votedMemberIds: ["user-1", "user-2", "user-4"], // Kabir, Priya, Tanya
      isRecommended: true
    },
    {
      id: "win-2",
      title: "Nov - Dec: Crystal Waters & Blue Skies",
      dateRange: "20 Nov - 23 Nov 2026",
      photo: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
      weather: "16°C • Crisp, Sunny & Cool",
      crowd: "High (Peak Winter Travel)",
      estCost: "₹28,000 - ₹36,000 / person",
      pros: [
        "Dawki Umngot river reaches crystal glass transparency",
        "Zero rainfall risk, guaranteed dry road transit",
        "Crisp mountain bonfire weather at Polo Orchid"
      ],
      cons: [
        "Peak winter hotel tariffs (+25%)",
        "Longer queues at Mawsmai cave entrance"
      ],
      votedMemberIds: ["user-3"], // Rohan
      isRecommended: false
    },
    {
      id: "win-3",
      title: "July - August: The Monsoon High Drama",
      dateRange: "17 Jul - 20 Jul 2026",
      photo: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80",
      weather: "23°C • Heavy Torrential Rain",
      crowd: "Very Low (Off-season)",
      estCost: "₹18,000 - ₹24,000 / person",
      pros: [
        "Raw majesty of world's wettest place",
        "Lowest off-season package prices"
      ],
      cons: [
        "High mountain landslide road risk",
        "Heavy cloud cover blocks canyon viewpoints"
      ],
      votedMemberIds: [],
      isRecommended: false
    }
  ],
  "goa": [
    {
      id: "win-g1",
      title: "November: Warm Breezes & Water Sports (Recommended)",
      dateRange: "20 Nov - 23 Nov 2026",
      photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
      weather: "28°C • Sunny & Balmy",
      crowd: "Moderate",
      estCost: "₹20,000 - ₹28,000 / person",
      pros: ["Dudhsagar waterfalls roaring", "All beach shacks & kayaking open"],
      cons: ["Afternoon heat 12 PM - 3 PM"],
      votedMemberIds: ["user-1", "user-2", "user-3", "user-4"],
      isRecommended: true
    },
    {
      id: "win-g2",
      title: "New Year Week: Festivities & Nightlife",
      dateRange: "29 Dec - 02 Jan 2027",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      weather: "26°C • Pleasant",
      crowd: "Extreme Peak",
      estCost: "₹45,000 - ₹65,000 / person",
      pros: ["Electric holiday atmosphere", "Parties & fireworks"],
      cons: ["Severe price surge on hotels & flights", "Traffic gridlocks"],
      votedMemberIds: [],
      isRecommended: false
    }
  ]
};

export const MMT_TRIP = {
  id: "MMT-GRP-8942",
  title: "Meghalaya Clouds, Waterfalls & Living Root Bridges",
  destination: "Shillong & Cherrapunji, Meghalaya",
  destinationCode: "SHL",
  budgetMin: 22000,
  budgetMax: 34000,
  dates: "16 Oct - 19 Oct 2026",
  duration: "4 Days / 3 Nights",
  travellerCount: 4,
  adminId: "user-1",
  isDecisionLocked: false,
  lockedDate: null
};

export const MMT_MEMBERS = [
  {
    id: "user-1",
    name: "Kabir Roy",
    role: "Trip Admin",
    phone: "+91 98112 44321",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 28000,
    flexBudget: 34000,
    hardLimit: 38000,
    isBudgetPrivate: false,
    diet: "Non-Veg",
    flightSeat: "Window (12A)",
    mandateStatus: "Authorized ₹35,000",
    mandateAmount: 35000,
    capturedAmount: 26400,
    upiId: "kabir@okhdfcbank",
    pastRecords: "MMT Black Member • 14 Trips (Prefers window seat, boutique lake stays)"
  },
  {
    id: "user-2",
    name: "Priya Menon",
    role: "Member",
    phone: "+91 98450 11223",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 24000,
    flexBudget: 28000,
    hardLimit: 30000,
    isBudgetPrivate: false,
    diet: "Strict Vegetarian",
    flightSeat: "Aisle (12B)",
    mandateStatus: "Authorized ₹30,000",
    mandateAmount: 30000,
    capturedAmount: 24500,
    upiId: "priya@okaxis",
    hardConstraints: ["100% pure veg meal options at all stops", "Cannot hike > 6km continuously"],
    pastRecords: "MMT Gold Member • 8 Trips (Pure vegetarian meal tag, prefers relaxed pace)"
  },
  {
    id: "user-3",
    name: "Rohan Varma",
    role: "Member",
    phone: "+91 99001 88776",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 22000,
    flexBudget: 26000,
    hardLimit: 29000,
    isBudgetPrivate: true,
    diet: "No Restrictions",
    flightSeat: "Aisle (12C)",
    mandateStatus: "Authorized ₹29,000",
    mandateAmount: 29000,
    capturedAmount: 22800,
    upiId: "rohan@icici",
    hardConstraints: ["Office demo call until 11:30 AM on Day 1 (No flight before 12:00 PM)"],
    pastRecords: "MMT Member • 5 Trips (High adventure rating, private budget enabled)"
  },
  {
    id: "user-4",
    name: "Tanya Sen",
    role: "Member",
    phone: "+91 97412 55667",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80",
    prefBudget: 30000,
    flexBudget: 35000,
    hardLimit: 40000,
    isBudgetPrivate: false,
    diet: "Flexitarian",
    flightSeat: "Window (12D)",
    mandateStatus: "Authorized ₹36,000",
    mandateAmount: 36000,
    capturedAmount: 26400,
    upiId: "tanya@paytm",
    pastRecords: "MMT Platinum Member • 19 Trips (Photography traveler, cliff view stays)"
  }
];

export const MMT_PHONE_DIRECTORY = {
  "9876543210": {
    name: "Aditi Rao",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    pastRecords: "MMT Gold • 7 Trips (Strict Vegan • Prefers Morning Flights • Budget ₹25k)"
  },
  "9123456780": {
    name: "Arjun Mehta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    pastRecords: "MMT Black • 12 Trips (Window Seat • 4-star stays • Budget ₹35k)"
  }
};

// Non-negotiable Fixed Flight Logistics Anchors (Requirement 1: Not flexible activities)
export const MMT_FLIGHT_ANCHORS = {
  outbound: {
    flightNo: "IndiGo 6E-542",
    route: "Bengaluru (BLR) ➔ Guwahati (GAU)",
    depTime: "12:45 PM",
    arrTime: "03:15 PM",
    date: "Fri, 16 Oct",
    status: "Confirmed Group PNR",
    note: "Accommodates Rohan's 11:30 AM client demo. Fixed arrival logistics anchor."
  },
  inbound: {
    flightNo: "IndiGo 6E-689",
    route: "Guwahati (GAU) ➔ Bengaluru (BLR)",
    depTime: "01:30 PM",
    arrTime: "04:15 PM",
    date: "Mon, 19 Oct",
    status: "Confirmed Group PNR",
    note: "Requires GAU airport check-in by 11:30 AM. Fixed departure logistics anchor."
  }
};

// Requirement 2: Broad Overview of Days (Destination Hubs) that guests can rearrange
export const MMT_MACRO_DAYS = [
  {
    dayNum: 1,
    hubKey: "shillong_arrival",
    title: "Arrival & The Pine City of Shillong",
    region: "Shillong & Umiam",
    photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    summary: "Guwahati Airport Transfer • Umiam Lake Sunset • Dylan's Cafe Crawl",
    distanceKm: 100,
    baseHotel: "Ri Kynjai Lake Resort",
    tag: "Highlands & Lakeside"
  },
  {
    dayNum: 2,
    hubKey: "cherrapunji",
    title: "Cherrapunji (Sohra) — Canyons & Waterfalls",
    region: "Cherrapunji (Sohra)",
    photo: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80",
    summary: "Nohkalikai Waterfall • Mawsmai Limestone Caves • Seven Sisters Viewpoint",
    distanceKm: 54,
    baseHotel: "Polo Orchid Resort",
    tag: "Mist & Waterfalls"
  },
  {
    dayNum: 3,
    hubKey: "dawki",
    title: "Dawki & Mawlynnong — Crystal Waters & Village",
    region: "Dawki & Mawlynnong",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    summary: "Umngot Crystal Clear Boating • Riwai Living Root Bridge • Cleanest Village Walk",
    distanceKm: 85,
    baseHotel: "Polo Orchid Resort or Mawlynnong Cottages",
    tag: "Bio-Wonders & Border"
  },
  {
    dayNum: 4,
    hubKey: "shillong_heritage",
    title: "Shillong Heritage, Souvenirs & Airport Transfer",
    region: "Shillong Heritage & Guwahati Drop",
    photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
    summary: "Police Bazar Souvenirs • Organic Tea Walk • Scenic Highway Transfer to GAU",
    distanceKm: 120,
    baseHotel: "Departure Day",
    tag: "Shopping & Return"
  }
];

// Requirement 3, 4 & 5: Candidate Activities Pool per Day Hub with Cost for Budget Guardrails
export const CANDIDATE_ACTIVITIES = {
  1: [ // Day 1: Shillong Arrival
    {
      id: "act-101",
      title: "Sunset High-Tea at Umiam Lake (Barapani)",
      cost: 400,
      duration: "1 hr",
      category: "Scenic",
      photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
      description: "Picturesque waterfront photography stop with hot Meghalaya milk tea and pakoras.",
      tags: ["Scenic View", "Sunset Spot", "Easy"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-102",
      title: "Dinner & Acoustic Folk Music at Dylan's Cafe",
      cost: 750,
      duration: "1.5 hrs",
      category: "Food & Nightlife",
      photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80",
      description: "Iconic cafe celebrating Bob Dylan. 100% certified pure veg pasta & hot chocolate for Priya.",
      tags: ["Cafe Culture", "Live Music", "Veg Safe"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-103",
      title: "Ward's Lake Evening Stroll & Wooden Bridge",
      cost: 150,
      duration: "45 mins",
      category: "Nature",
      photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80",
      description: "Horseshoe-shaped colonial lake adorned with cobblestone walkways and colorful lotus beds.",
      tags: ["Relaxing", "Heritage"],
      vegSafe: true,
      defaultSelected: false
    }
  ],
  2: [ // Day 2: Cherrapunji (Sohra)
    {
      id: "act-201",
      title: "Nohkalikai Waterfall Canyon Viewpoint",
      cost: 200,
      duration: "1.5 hrs",
      category: "Sightseeing",
      photo: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=300&q=80",
      description: "India's tallest plunge waterfall (340m). Scheduled early morning to beat the 11:30 AM valley fog.",
      tags: ["AI Priority Slot", "Must Visit", "Photography"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-202",
      title: "Mawsmai Limestone Caves Exploration",
      cost: 250,
      duration: "1 hr",
      category: "Adventure",
      photo: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300&q=80",
      description: "Illuminated pre-historic limestone caves with stalactites and natural formations. Closes 05:00 PM.",
      tags: ["Fast-Track QR", "Geological Wonder"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-203",
      title: "Mawkdok Dympep Valley Mega Ziplining",
      cost: 2500, // Premium Activity for Budget Guardrail testing!
      duration: "1 hr",
      category: "Extreme Adventure",
      photo: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=300&q=80",
      description: "Fly 2,600 feet across the misty valley canyon on double cables with certified safety harnesses.",
      tags: ["Adrenaline Rush", "Premium Experience"],
      vegSafe: true,
      defaultSelected: false
    },
    {
      id: "act-204",
      title: "Orange Roots 100% Pure Vegetarian Lunch",
      cost: 450,
      duration: "1 hr",
      category: "Dining",
      photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
      description: "Famous highway stop serving authentic pure veg North & South Indian and Meghalayan thalis.",
      tags: ["Priya Approved", "Pure Veg", "Clean Restrooms"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-205",
      title: "Arwah Cave Prehistoric Fossil Walk",
      cost: 300,
      duration: "1.5 hrs",
      category: "Adventure",
      photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80",
      description: "Deeper cave with marine fossils millions of years old embedded in the rock walls.",
      tags: ["Hidden Gem", "Fossils"],
      vegSafe: true,
      defaultSelected: false
    },
    {
      id: "act-206",
      title: "Seven Sisters (Nohsngithiang) Sunset Falls View",
      cost: 100,
      duration: "45 mins",
      category: "Sightseeing",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
      description: "Seven segmented cascades plummeting over limestone cliffs facing the Bangladesh plains.",
      tags: ["Panoramic Sunset", "Relaxing"],
      vegSafe: true,
      defaultSelected: false
    }
  ],
  3: [ // Day 3: Dawki & Mawlynnong
    {
      id: "act-301",
      title: "Dawki Umngot River Clear Boat Safari",
      cost: 800,
      duration: "1.5 hrs",
      category: "Water Sports",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
      description: "Glide on glass-like transparent waters where boats appear floating in mid-air. Life jackets provided.",
      tags: ["Must Experience", "Photographers Dream"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-302",
      title: "Riwai Single Decker Living Root Bridge",
      cost: 200,
      duration: "1.5 hrs",
      category: "Bio-Engineering",
      photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80",
      description: "Century-old natural bridge grown from Ficus elastica tree roots across a boulder-strewn stream.",
      tags: ["Natural Wonder", "Moderate Walk"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-303",
      title: "Mawlynnong Village Cultural Walk",
      cost: 150,
      duration: "1 hr",
      category: "Cultural",
      photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&q=80",
      description: "Acclaimed as Asia's Cleanest Village. Discover bamboo dustbins, thatched homes, and flower gardens.",
      tags: ["Cleanest Village", "Heritage Stroll"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-304",
      title: "Shnongpdeng River Kayaking & Snorkeling",
      cost: 1800, // Premium activity for budget guardrail testing
      duration: "2 hrs",
      category: "Adventure",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
      description: "White water kayaking and clear-water snorkeling with licensed river guides.",
      tags: ["Water Adventure", "Kayaking"],
      vegSafe: true,
      defaultSelected: false
    }
  ],
  4: [ // Day 4: Shillong Heritage & Return
    {
      id: "act-401",
      title: "Police Bazar Souvenir & Tea Walk",
      cost: 200,
      duration: "1 hr",
      category: "Shopping",
      photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=80",
      description: "Pick up hand-woven bamboo baskets, pure Khasi forest honey, and organic Meghalayan black tea.",
      tags: ["Handicrafts", "Souvenirs"],
      vegSafe: true,
      defaultSelected: true
    },
    {
      id: "act-402",
      title: "Don Bosco Museum of Indigenous Cultures",
      cost: 300,
      duration: "1.5 hrs",
      category: "Heritage",
      photo: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=300&q=80",
      description: "Seven-storey museum showcasing the vibrant tribal diversity and costumes of the Northeast.",
      tags: ["Cultural Museum", "Indoor"],
      vegSafe: true,
      defaultSelected: false
    },
    {
      id: "act-403",
      title: "Scenic NH6 Highway Drive with Pine Forest Views",
      cost: 0,
      duration: "3 hrs transit",
      category: "Transfer",
      photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80",
      description: "Smooth Innova transfer towards Guwahati Airport with buffer for morning mist.",
      tags: ["Chauffeur Driven", "Fixed Arrival"],
      vegSafe: true,
      defaultSelected: true
    }
  ]
};

// Requirement 6: Local Cuisines, Food Spots & Vibrant Markets with Smart Day Integration (Requirement 3)
export const LOCAL_CUISINE_AND_MARKETS = [
  {
    id: "flavour-1",
    title: "Traditional Khasi Jadoh & Black Sesame Curry",
    type: "Local Cuisine",
    targetDay: 1,
    preferredTimeSlot: "01:30 PM",
    categorySlot: "Lunch",
    photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    venue: "Trattoria, Police Bazar",
    description: "The crown jewel of Meghalayan cuisine — short-grain red rice cooked with ginger, garlic, and wild aromatic herbs, paired with black sesame gravy.",
    priceTag: "₹250 - ₹400 per person",
    tags: ["Authentic Khasi", "Must Try", "Non-Veg & Veg Option"],
    bestFor: "Day 1 Lunch (01:30 PM)"
  },
  {
    id: "flavour-2",
    title: "Orange Roots 100% Pure Veg Meghalayan Thali",
    type: "Pure Veg Haven",
    targetDay: 2,
    preferredTimeSlot: "01:15 PM",
    categorySlot: "Lunch",
    photo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80",
    venue: "Orange Roots, Sohra Bypass",
    description: "Prepared in a strictly separate 100% pure vegetarian kitchen. Serves fresh bamboo-shoot dal, local seasonal leafy greens, and crispy puri.",
    priceTag: "₹350 - ₹500 per person",
    tags: ["Priya Verified", "Pure Veg Certified", "Clean Highway Restroom"],
    bestFor: "Day 2 Cherrapunji Lunch (01:15 PM)"
  },
  {
    id: "flavour-3",
    title: "Dylan's Cafe Apple Pie & Hot Belgian Cocoa",
    type: "Iconic Cafe",
    targetDay: 1,
    preferredTimeSlot: "08:15 PM",
    categorySlot: "Dinner & Cafe",
    photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80",
    venue: "Dylan's Cafe, Risa Colony, Shillong",
    description: "A cozy bohemian haven filled with vinyl records, custom Bob Dylan artwork, board games, and the best cinnamon warm apple pie in Shillong.",
    priceTag: "₹300 - ₹600 per person",
    tags: ["Vibrant Vibes", "Desserts & Coffee", "Cozy Ambience"],
    bestFor: "Day 1 Evening Hangout (08:15 PM)"
  },
  {
    id: "flavour-4",
    title: "Police Bazar (PB) Night Market & Steamed Momos",
    type: "Vibrant Night Market",
    targetDay: 3,
    preferredTimeSlot: "07:30 PM",
    categorySlot: "Evening Bazaar",
    photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80",
    venue: "Police Bazar Circle, Shillong",
    description: "The throbbing heart of Shillong! Bustling street stalls serving piping hot Tibetan momos with spicy chili-garlic chutney, fresh pineapples, and roasted corn.",
    priceTag: "₹100 - ₹250 per person",
    tags: ["Street Food", "Lively Vibe", "Evening Walk"],
    bestFor: "Day 3 Evening Bazaar (07:30 PM)"
  },
  {
    id: "flavour-5",
    title: "Lewduh (Bara Bazar) — One of Asia's Oldest Tribal Markets",
    type: "Traditional Market",
    targetDay: 4,
    preferredTimeSlot: "09:30 AM",
    categorySlot: "Morning Exploration",
    photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80",
    venue: "Lewduh Market, West Khasi Hills Border",
    description: "An ancient Khasi open-air marketplace managed predominantly by women traders. Famous for wild forest honey, organic Lakadong turmeric, and handmade cane baskets.",
    priceTag: "Budget Shopping",
    tags: ["Authentic Heritage", "Handicrafts", "Photography"],
    bestFor: "Day 4 Morning Exploration (09:30 AM)"
  },
  {
    id: "flavour-6",
    title: "Cafe Cherrapunjee — Colonial Fireplace High Tea",
    type: "Heritage Dining",
    targetDay: 2,
    preferredTimeSlot: "04:30 PM",
    categorySlot: "Afternoon High-Tea",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
    venue: "Near Mawkdok Bridge, Sohra",
    description: "Restored 120-year-old British colonial bungalow with a crackling stone fireplace, serving fresh garden mint tea and hot buttered scones.",
    priceTag: "₹400 - ₹700 per person",
    tags: ["British Colonial", "Fireplace", "Scenic Valley"],
    bestFor: "Day 2 Afternoon Tea (04:30 PM)"
  }
];

// Pine Labs Grantex Autonomous Agent Vault Data Models
export const GRANTEX_CONFIG = {
  protocol: "Pine Labs Grantex Autonomous Authorization v1.2",
  provider: "Pine Labs",
  providerUrl: "https://www.pinelabs.com/",
  tagline: "OAuth 2.0 for the AI Era",
  description: "Delegated authorization protocol allowing humans to grant safe, time-bound, and scoped permissions to AI software agents for autonomous digital actions and financial deductions without repeated manual authentications.",
  defaultScope: ["travel:flights:book", "travel:hotels:book", "travel:activities:reserve"],
  validityHours: 72
};

export const AIRPORT_OPTIONS = [
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi International Airport (DEL)", state: "Delhi", default: true },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International Airport (BLR)", state: "Karnataka" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International (BOM)", state: "Maharashtra" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhash Chandra Bose International (CCU)", state: "West Bengal" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International Airport (HYD)", state: "Telangana" }
];

export const GROUP_FLIGHT_BUNDLES_BY_AIRPORT = {
  DEL: [
    {
      id: "fl-del-indigo-best",
      airline: "IndiGo Group Connect (Direct)",
      flightNo: "6E-2089 / 6E-2144",
      badge: "⭐ Myra AI Top Pick & Constraint Safe",
      outboundFlight: "6E-2089 • Delhi (DEL) ➔ Guwahati (GAU)",
      outboundTimes: "12:15 PM ➔ 02:40 PM (2h 25m)",
      returnFlight: "6E-2144 • Guwahati (GAU) ➔ Delhi (DEL)",
      returnTimes: "03:30 PM ➔ 06:10 PM (2h 40m)",
      farePerPerson: 8900,
      baggage: "15 kg Check-in + 7 kg Cabin / person",
      seats: "Group Row Block (4A, 4B, 4C, 4D)",
      feasibilityNote: "Departs at 12:15 PM — perfectly satisfies Rohan's 11:30 AM client demo. Non-stop, 0 risk of transit miss.",
      votedMemberIds: ["user-1", "user-2", "user-3"],
      isRecommended: true
    },
    {
      id: "fl-del-airindia-alt1",
      airline: "Air India Express Prime (Hot Meals)",
      flightNo: "AI-889 / AI-890",
      badge: "Extra Baggage & Warm Meals",
      outboundFlight: "AI-889 • Delhi (DEL) ➔ Guwahati (GAU)",
      outboundTimes: "01:30 PM ➔ 04:10 PM (2h 40m)",
      returnFlight: "AI-890 • Guwahati (GAU) ➔ Delhi (DEL)",
      returnTimes: "04:50 PM ➔ 07:45 PM (2h 55m)",
      farePerPerson: 10400,
      baggage: "25 kg Check-in + 7 kg Cabin + Complimentary Meals",
      seats: "Front Cabin Rows (6D, 6E, 6F, 7A)",
      feasibilityNote: "Includes hot meal selection (pure veg meal for Priya pre-selected). Departs post 1 PM.",
      votedMemberIds: ["user-4"],
      isRecommended: false
    },
    {
      id: "fl-del-spicejet-alt2",
      airline: "SpiceJet Red-Eye Express",
      flightNo: "SG-491 / SG-492",
      badge: "Budget Early Arrival",
      outboundFlight: "SG-491 • Delhi (DEL) ➔ Guwahati (GAU)",
      outboundTimes: "06:15 AM ➔ 08:45 AM (2h 30m)",
      returnFlight: "SG-492 • Guwahati (GAU) ➔ Delhi (DEL)",
      returnTimes: "06:00 PM ➔ 08:45 PM (2h 45m)",
      farePerPerson: 7200,
      baggage: "15 kg Check-in + 7 kg Cabin",
      seats: "Middle Cabin Rows (14A, 14B, 14C, 14D)",
      feasibilityNote: "⚠️ Violates Rohan's 11:30 AM call requirement unless he attends from transit/airport.",
      votedMemberIds: [],
      isRecommended: false
    }
  ],
  BLR: [
    {
      id: "fl-blr-indigo-best",
      airline: "IndiGo Group Connect (Direct)",
      flightNo: "6E-542 / 6E-689",
      badge: "⭐ Myra AI Top Pick & Constraint Safe",
      outboundFlight: "6E-542 • Bengaluru (BLR) ➔ Guwahati (GAU)",
      outboundTimes: "12:45 PM ➔ 03:15 PM (2h 30m)",
      returnFlight: "6E-689 • Guwahati (GAU) ➔ Bengaluru (BLR)",
      returnTimes: "01:30 PM ➔ 04:15 PM (2h 45m)",
      farePerPerson: 12400,
      baggage: "15 kg Check-in + 7 kg Cabin / person",
      seats: "Group Row Block (12A, 12B, 12C, 12D)",
      feasibilityNote: "Accommodates Rohan's 11:30 AM client demo with zero stress. 4 seats locked under group hold.",
      votedMemberIds: ["user-1", "user-2", "user-3", "user-4"],
      isRecommended: true
    },
    {
      id: "fl-blr-airindia-alt1",
      airline: "Air India Express Prime (Hot Meals)",
      flightNo: "AI-782 / AI-789",
      badge: "Extra Baggage & Comfort",
      outboundFlight: "AI-782 • Bengaluru (BLR) ➔ Guwahati (GAU)",
      outboundTimes: "01:15 PM ➔ 05:40 PM (1-Stop CCU)",
      returnFlight: "AI-789 • Guwahati (GAU) ➔ Bengaluru (BLR)",
      returnTimes: "02:45 PM ➔ 07:15 PM (1-Stop CCU)",
      farePerPerson: 13800,
      baggage: "20 kg Check-in + 7 kg Cabin + Free Hot Meals",
      seats: "Front Cabin Rows (4D, 4E, 4F, 5A)",
      feasibilityNote: "Includes pure veg hot meals for Priya. 1-stop layover in Kolkata.",
      votedMemberIds: [],
      isRecommended: false
    },
    {
      id: "fl-blr-akasa-alt2",
      airline: "Akasa Air Saver",
      flightNo: "QP-1382 / QP-1385",
      badge: "Brand New Aircraft Fleet",
      outboundFlight: "QP-1382 • Bengaluru (BLR) ➔ Guwahati (GAU)",
      outboundTimes: "06:00 AM ➔ 09:15 AM (3h 15m)",
      returnFlight: "QP-1385 • Guwahati (GAU) ➔ Bengaluru (BLR)",
      returnTimes: "05:15 PM ➔ 08:35 PM (3h 20m)",
      farePerPerson: 10600,
      baggage: "15 kg Check-in + 7 kg Cabin",
      seats: "Standard Group Seats (16A, 16B, 16C, 16D)",
      feasibilityNote: "⚠️ Early morning departure conflicts with Rohan's prep schedule.",
      votedMemberIds: [],
      isRecommended: false
    }
  ],
  BOM: [
    {
      id: "fl-bom-indigo-best",
      airline: "IndiGo Group Connect (Direct)",
      flightNo: "6E-5312 / 6E-5315",
      badge: "⭐ Myra AI Top Pick & Constraint Safe",
      outboundFlight: "6E-5312 • Mumbai (BOM) ➔ Guwahati (GAU)",
      outboundTimes: "12:05 PM ➔ 02:55 PM (2h 50m)",
      returnFlight: "6E-5315 • Guwahati (GAU) ➔ Mumbai (BOM)",
      returnTimes: "03:40 PM ➔ 07:05 PM (3h 25m)",
      farePerPerson: 11200,
      baggage: "15 kg Check-in + 7 kg Cabin / person",
      seats: "Group Row Block (8A, 8B, 8C, 8D)",
      feasibilityNote: "Direct non-stop flight, perfectly fits after 11:30 AM call. Lowest transit time.",
      votedMemberIds: ["user-1", "user-2", "user-3"],
      isRecommended: true
    },
    {
      id: "fl-bom-airindia-alt1",
      airline: "Air India Heritage (Non-stop)",
      flightNo: "AI-671 / AI-672",
      badge: "Generous Baggage (25 kg)",
      outboundFlight: "AI-671 • Mumbai (BOM) ➔ Guwahati (GAU)",
      outboundTimes: "02:20 PM ➔ 05:25 PM (3h 05m)",
      returnFlight: "AI-672 • Guwahati (GAU) ➔ Mumbai (BOM)",
      returnTimes: "06:10 PM ➔ 09:30 PM (3h 20m)",
      farePerPerson: 12900,
      baggage: "25 kg Check-in + 7 kg Cabin + Warm Meals",
      seats: "Preferred Seating (5C, 5D, 5E, 5F)",
      feasibilityNote: "Relaxed afternoon departure. Leaves ample buffer for Mumbai airport traffic.",
      votedMemberIds: ["user-4"],
      isRecommended: false
    },
    {
      id: "fl-bom-spicejet-alt2",
      airline: "SpiceJet Budget Saver",
      flightNo: "SG-8162 / SG-8163",
      badge: "Lowest Group Fare",
      outboundFlight: "SG-8162 • Mumbai (BOM) ➔ Guwahati (GAU)",
      outboundTimes: "07:15 AM ➔ 10:15 AM (3h 00m)",
      returnFlight: "SG-8163 • Guwahati (GAU) ➔ Mumbai (BOM)",
      returnTimes: "11:00 AM ➔ 02:20 PM (3h 20m)",
      farePerPerson: 9400,
      baggage: "15 kg Check-in + 7 kg Cabin",
      seats: "Standard Block (18A, 18B, 18C, 18D)",
      feasibilityNote: "⚠️ Conflicts with Rohan's Friday morning demo call.",
      votedMemberIds: [],
      isRecommended: false
    }
  ],
  CCU: [
    {
      id: "fl-ccu-indigo-best",
      airline: "IndiGo Short-Haul Express (Direct)",
      flightNo: "6E-294 / 6E-297",
      badge: "⭐ Myra AI Top Pick & Constraint Safe",
      outboundFlight: "6E-294 • Kolkata (CCU) ➔ Guwahati (GAU)",
      outboundTimes: "01:00 PM ➔ 02:15 PM (1h 15m)",
      returnFlight: "6E-297 • Guwahati (GAU) ➔ Kolkata (CCU)",
      returnTimes: "03:15 PM ➔ 04:30 PM (1h 15m)",
      farePerPerson: 5800,
      baggage: "15 kg Check-in + 7 kg Cabin / person",
      seats: "Front Row Block (3A, 3B, 3C, 3D)",
      feasibilityNote: "Ultra quick 1h 15m hopping flight. Optimal 1:00 PM departure.",
      votedMemberIds: ["user-1", "user-2", "user-3", "user-4"],
      isRecommended: true
    },
    {
      id: "fl-ccu-airindia-alt1",
      airline: "Air India Express Hop",
      flightNo: "AI-721 / AI-722",
      badge: "Free Hot Meal & Extra Baggage",
      outboundFlight: "AI-721 • Kolkata (CCU) ➔ Guwahati (GAU)",
      outboundTimes: "02:30 PM ➔ 03:50 PM (1h 20m)",
      returnFlight: "AI-722 • Guwahati (GAU) ➔ Kolkata (CCU)",
      returnTimes: "05:00 PM ➔ 06:20 PM (1h 20m)",
      farePerPerson: 6900,
      baggage: "20 kg Check-in + 7 kg Cabin",
      seats: "Economy Prime (7A, 7B, 7C, 7D)",
      feasibilityNote: "Relaxed schedule with snacks onboard.",
      votedMemberIds: [],
      isRecommended: false
    },
    {
      id: "fl-ccu-alliance-alt2",
      airline: "Alliance Air Regional (Direct to Shillong SHL)",
      flightNo: "9I-753 / 9I-754",
      badge: "Lands Directly in Shillong",
      outboundFlight: "9I-753 • Kolkata (CCU) ➔ Shillong (SHL)",
      outboundTimes: "11:45 AM ➔ 01:25 PM (1h 40m)",
      returnFlight: "9I-754 • Shillong (SHL) ➔ Kolkata (CCU)",
      returnTimes: "02:00 PM ➔ 03:40 PM (1h 40m)",
      farePerPerson: 7800,
      baggage: "15 kg Check-in + 5 kg Cabin",
      seats: "Turboprop (ATR-72) Rows 5 & 6",
      feasibilityNote: "Lands right at Umroi Airport (Shillong), saving 2.5 hrs mountain drive!",
      votedMemberIds: [],
      isRecommended: false
    }
  ],
  HYD: [
    {
      id: "fl-hyd-indigo-best",
      airline: "IndiGo Group Connect (Direct)",
      flightNo: "6E-481 / 6E-484",
      badge: "⭐ Myra AI Top Pick & Constraint Safe",
      outboundFlight: "6E-481 • Hyderabad (HYD) ➔ Guwahati (GAU)",
      outboundTimes: "12:30 PM ➔ 03:00 PM (2h 30m)",
      returnFlight: "6E-484 • Guwahati (GAU) ➔ Hyderabad (HYD)",
      returnTimes: "03:45 PM ➔ 06:25 PM (2h 40m)",
      farePerPerson: 10800,
      baggage: "15 kg Check-in + 7 kg Cabin / person",
      seats: "Group Block (10A, 10B, 10C, 10D)",
      feasibilityNote: "Direct non-stop flight. Leaves post 12 PM, fitting group work schedules.",
      votedMemberIds: ["user-1", "user-2", "user-3", "user-4"],
      isRecommended: true
    },
    {
      id: "fl-hyd-airindia-alt1",
      airline: "Air India Express Connection",
      flightNo: "AI-542 / AI-543",
      badge: "Full Service with Meals",
      outboundFlight: "AI-542 • Hyderabad (HYD) ➔ Guwahati (GAU)",
      outboundTimes: "01:45 PM ➔ 05:30 PM (1-Stop CCU)",
      returnFlight: "AI-543 • Guwahati (GAU) ➔ Hyderabad (HYD)",
      returnTimes: "06:15 PM ➔ 10:10 PM (1-Stop CCU)",
      farePerPerson: 12200,
      baggage: "20 kg Check-in + 7 kg Cabin",
      seats: "Prime (6A, 6B, 6C, 6D)",
      feasibilityNote: "Includes warm meal and veg options for Priya.",
      votedMemberIds: [],
      isRecommended: false
    },
    {
      id: "fl-hyd-spicejet-alt2",
      airline: "SpiceJet Red-Eye Saver",
      flightNo: "SG-281 / SG-282",
      badge: "Budget Saver",
      outboundFlight: "SG-281 • Hyderabad (HYD) ➔ Guwahati (GAU)",
      outboundTimes: "06:30 AM ➔ 09:20 AM (2h 50m)",
      returnFlight: "SG-282 • Guwahati (GAU) ➔ Hyderabad (HYD)",
      returnTimes: "05:30 PM ➔ 08:30 PM (3h 00m)",
      farePerPerson: 9100,
      baggage: "15 kg Check-in + 7 kg Cabin",
      seats: "Rows 15A-15D",
      feasibilityNote: "⚠️ Early morning departure.",
      votedMemberIds: [],
      isRecommended: false
    }
  ]
};

// Default flight bundles fallback (points to DEL bundles)
export const GROUP_FLIGHT_BUNDLES = GROUP_FLIGHT_BUNDLES_BY_AIRPORT.DEL;

// Multi-Modal Inter-City Transit Options (Flights vs Trains vs Road Cars)
export const INTERCITY_TRANSIT_MODES = [
  {
    id: "transit-flight",
    mode: "flight",
    title: "Commercial Flights (Fastest & Non-Stop)",
    icon: "✈️",
    duration: "2h 25m (Direct)",
    costPerPerson: 8900,
    badge: "⭐ Recommended by Myra AI",
    summary: "Lowest travel fatigue. Leaves after 12 PM, fitting Rohan's 11:30 AM client demo.",
    pros: ["Fastest transit (2h 25m)", "Zero mountain road exhaustion", "Contiguous seating blocks pre-reserved"],
    cons: ["Higher cost per person (₹8,900 vs ₹3,200 train)"],
    isRecommended: true
  },
  {
    id: "transit-train",
    mode: "train",
    title: "Rajdhani Express (Overnight AC 2-Tier)",
    icon: "🚆",
    duration: "28h 15m (Overnight Rail)",
    costPerPerson: 3200,
    badge: "Budget Scenic Option",
    summary: "Scenic route through North Bengal tea gardens. All meals included on board.",
    pros: ["64% budget savings", "Overnight berths with dinner & breakfast included", "Zero luggage weight limits"],
    cons: ["Takes 28 hours", "Reaches Guwahati late afternoon on Saturday"],
    isRecommended: false
  },
  {
    id: "transit-car",
    mode: "car",
    title: "Outstation Chauffeured SUV (NH27 Highway)",
    icon: "🚗",
    duration: "32h 00m (Road Trip)",
    costPerPerson: 4600,
    badge: "Road Adventure",
    summary: "Road trip along NH27 with highway dhaba stopovers.",
    pros: ["Ultimate luggage freedom", "Flexible halts along scenic valleys", "Spacious 6-seater private SUV"],
    cons: ["Very long driving duration (32 hrs)", "Requires overnight motel halt"],
    isRecommended: false
  }
];

// Location-Wise Hotel Selection Options (Nights 1 & 2 Shillong/Umiam, Night 3 Cherrapunji)
export const LOCATION_HOTEL_OPTIONS = [
  {
    locationIdx: 0,
    locationKey: "shillong_umiam",
    locationTitle: "Location 1: Shillong & Umiam Lake (Nights 1 & 2)",
    stayDuration: "2 Nights",
    stayDates: "Fri, 16 Oct – Sun, 18 Oct",
    subtitle: "Base for Umiam sunset, Shillong cafes, and living culture. Myra synthesized all 4 member preferences.",
    hotels: [
      {
        id: "htl-shl-rikynjai",
        name: "Ri Kynjai — Serenity by the Lake",
        rating: "4.8★",
        starsLabel: "MMT Luxury Boutique Resort",
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        pricePerNight: 8500,
        nights: 2,
        totalCost: 17000,
        costPerPerson: 4250,
        roomCombination: "2 Superior Lakeview Thatched Cottages",
        roomAllocations: [
          { room: "Cottage 1", members: ["Kabir Roy", "Rohan Varma"], bedType: "King Bed • Lakefront Balcony + Dedicated Work Desk" },
          { room: "Cottage 2", members: ["Priya Menon", "Tanya Sen"], bedType: "Twin Beds • Garden View near Pure Veg Kitchen" }
        ],
        mealPlans: [
          { code: "CP", name: "Continental Plan (Lakeview Breakfast Included)", pricePerHead: 0, default: true },
          { code: "MAP", name: "Modified American Plan (Breakfast + Pure Veg Buffet Dinner)", pricePerHead: 900 }
        ],
        preferenceMatches: [
          "Kabir: Lakeview Boutique Architecture (MMT Black Match)",
          "Priya: 100% Certified Pure Veg Kitchen Facility",
          "Rohan: 100 Mbps Dedicated Lakefront Wi-Fi",
          "Tanya: Golden Hour Sunset Photography"
        ],
        amenities: ["Free Lakeview Breakfast", "Khasi Herbal Spa", "Pure Veg Certified Kitchen", "Wi-Fi 100 Mbps"],
        isRecommended: true
      },
      {
        id: "htl-shl-heritage",
        name: "Heritage Club — Tripura Castle",
        rating: "4.7★",
        starsLabel: "Heritage Royal Palace",
        photo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        pricePerNight: 7200,
        nights: 2,
        totalCost: 14400,
        costPerPerson: 3600,
        roomCombination: "2 Heritage Deluxe Wing Suites",
        roomAllocations: [
          { room: "Suite Royal-A", members: ["Kabir Roy", "Rohan Varma"], bedType: "Colonial Teakwood Double Bed" },
          { room: "Suite Royal-B", members: ["Priya Menon", "Tanya Sen"], bedType: "Pine Forest Facing Twin Beds" }
        ],
        mealPlans: [
          { code: "CP", name: "Royal Palace Breakfast Buffet", pricePerHead: 0, default: true },
          { code: "MAP", name: "Breakfast + Royal Khasi & North-Indian Dinner", pricePerHead: 750 }
        ],
        preferenceMatches: [
          "Colonial royal heritage ambience",
          "Quiet pine forest setting",
          "Authentic tea tasting salon"
        ],
        amenities: ["Colonial Fireplace", "Pine Valley Views", "Artisan Bakery", "Free Parking"],
        isRecommended: false
      },
      {
        id: "htl-shl-marriott",
        name: "Courtyard by Marriott Shillong",
        rating: "4.8★",
        starsLabel: "5-Star Contemporary Luxury",
        photo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
        pricePerNight: 9800,
        nights: 2,
        totalCost: 19600,
        costPerPerson: 4900,
        roomCombination: "2 Executive Deluxe Rooms",
        roomAllocations: [
          { room: "Room 402", members: ["Kabir Roy", "Rohan Varma"], bedType: "King Bed + Ergonomic Remote Workstation" },
          { room: "Room 403", members: ["Priya Menon", "Tanya Sen"], bedType: "Twin Queen Beds + High Floor City View" }
        ],
        mealPlans: [
          { code: "CP", name: "International Breakfast at Shillong Kitchen", pricePerHead: 0, default: true },
          { code: "MAP", name: "Breakfast + 4-Course Dinner with Live Veg Counters", pricePerHead: 1100 }
        ],
        preferenceMatches: [
          "Marriott Bonvoy global service standards",
          "Heated indoor swimming pool & fitness center",
          "Ultra-reliable 200 Mbps fiber internet for Rohan"
        ],
        amenities: ["Heated Pool", "24/7 Dining", "Spa & Wellness", "Corporate Lounge"],
        isRecommended: false
      }
    ]
  },
  {
    locationIdx: 1,
    locationKey: "cherrapunji_sohra",
    locationTitle: "Location 2: Cherrapunji / Sohra (Night 3)",
    stayDuration: "1 Night",
    stayDates: "Sun, 18 Oct – Mon, 19 Oct",
    subtitle: "Canyon rim base for Nohkalikai falls, living root bridge, and starlit bonfires.",
    hotels: [
      {
        id: "htl-sohra-poloorchid",
        name: "Polo Orchid Resort Sohra",
        rating: "4.7★",
        starsLabel: "MMT Black Canyon Resort",
        photo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        pricePerNight: 7400,
        nights: 1,
        totalCost: 7400,
        costPerPerson: 1850,
        roomCombination: "2 Misty Mountain View Executive Suites",
        roomAllocations: [
          { room: "Suite 101", members: ["Kabir Roy", "Rohan Varma"], bedType: "King Bed overlooking Seven Sisters Falls" },
          { room: "Suite 102", members: ["Priya Menon", "Tanya Sen"], bedType: "Valley View Twin Beds near Bonfire" }
        ],
        mealPlans: [
          { code: "CP", name: "Mountain Mist Buffet Breakfast", pricePerHead: 0, default: true },
          { code: "MAP", name: "Breakfast + Fireside Barbecue & Veg Buffet", pricePerHead: 650 }
        ],
        preferenceMatches: [
          "Seven Sisters Waterfall view from private balconies",
          "Evening bonfire & acoustic folk guitar session",
          "Zero transit time to canyon trails"
        ],
        amenities: ["Waterfall View", "Evening Bonfire", "Infinity Swimming Pool", "Private Balcony"],
        isRecommended: true
      },
      {
        id: "htl-sohra-jiva",
        name: "Jiva Resort Sohra",
        rating: "4.8★",
        starsLabel: "Eco-Luxury Organic Haven",
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        pricePerNight: 8200,
        nights: 1,
        totalCost: 8200,
        costPerPerson: 2050,
        roomCombination: "2 Luxury Glass Chalets",
        roomAllocations: [
          { room: "Chalet Alpha", members: ["Kabir Roy", "Rohan Varma"], bedType: "King Bed with glass skylight" },
          { room: "Chalet Beta", members: ["Priya Menon", "Tanya Sen"], bedType: "Twin Chalet Beds with hydrotherapy tub" }
        ],
        mealPlans: [
          { code: "CP", name: "Organic Farm-to-Table Breakfast", pricePerHead: 0, default: true },
          { code: "MAP", name: "Breakfast + Pure Organic Vegetarian Thali", pricePerHead: 800 }
        ],
        preferenceMatches: [
          "Priya: Strictly 100% Pure Veg kitchen with organic home-grown vegetables",
          "Quiet luxury with acoustic soundproof glass",
          "Heated floors for cool canyon nights"
        ],
        amenities: ["100% Pure Veg", "Organic Farm", "Floor Heating", "Spa Suites"],
        isRecommended: false
      },
      {
        id: "htl-sohra-holiday",
        name: "Cherrapunjee Holiday Resort",
        rating: "4.5★",
        starsLabel: "Pioneer Trekker Lodge",
        photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
        pricePerNight: 5100,
        nights: 1,
        totalCost: 5100,
        costPerPerson: 1275,
        roomCombination: "2 Mountain Heritage Deluxe Rooms",
        roomAllocations: [
          { room: "Room 1", members: ["Kabir Roy", "Rohan Varma"], bedType: "Khasi Oak Wood Double Bed" },
          { room: "Room 2", members: ["Priya Menon", "Tanya Sen"], bedType: "Twin Beds with Valley View" }
        ],
        mealPlans: [
          { code: "CP", name: "Homestyle Hill Breakfast", pricePerHead: 0, default: true },
          { code: "MAP", name: "Breakfast + Traditional Home Cooked Dinner", pricePerHead: 500 }
        ],
        preferenceMatches: [
          "Direct trailhead access to Double Decker Living Root Bridge",
          "Authentic Khasi family hospitality",
          "Eco-sustainable tourism rating"
        ],
        amenities: ["Trailhead Access", "Khasi Storytelling", "Organic Garden", "Trekking Guide"],
        isRecommended: false
      }
    ]
  }
];

// Sightseeing Cab / Bus Fleet Models (Post-Hotel Sizing based on group size)
export const SIGHTSEEING_CAB_FLEET = [
  {
    id: "cab-innova-crysta",
    model: "Toyota Innova Crysta (6+1 Seater AC)",
    category: "Premium Mountain MPV",
    badge: "⭐ Optimal for Group of 4 + Luggage",
    photo: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    ratePerDay: 3200,
    totalTripCost: 12800, // 4 days
    costPerPerson: 3200, // ₹800/head/day
    capacity: "4 Passengers + 4 Large Suitcases + 4 Daypacks",
    chauffeur: "Biplab Sangma (AS-01-EQ-9821)",
    chauffeurRating: "4.9★ (420+ Hill Trips)",
    specs: ["Hill-Terrain Certified Chauffeur", "Dedicated Rear AC Vents", "Captain Reclining Seats", "Boot Luggage Carrier"],
    groupFitAnalysis: "Perfect match: Gives each of the 4 travelers dedicated window/aisle captain seats with ample legroom for mountain hairpin roads, and comfortably swallows 4 full-sized bags in the rear boot.",
    isRecommended: true
  },
  {
    id: "cab-urbania-van",
    model: "Force Urbania Luxury Van (10+1 Seater)",
    category: "Luxury Mini-Coach",
    badge: "Maximum Space & Standing Height",
    photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    ratePerDay: 5600,
    totalTripCost: 22400,
    costPerPerson: 5600,
    capacity: "Up to 10 Passengers + Massive Luggage Bay",
    chauffeur: "Dhruba Jyoti (AS-01-BX-4412)",
    chauffeurRating: "4.8★ (280 Trips)",
    specs: ["Stand-up Cabin Height", "Individual USB Charging", "Panoramic Giant Windows", "Air Suspension"],
    groupFitAnalysis: "Ultra spacious with lounge seating, but slightly wider for narrow village bypass roads.",
    isRecommended: false
  },
  {
    id: "cab-ertiga-mpv",
    model: "Maruti Ertiga / XL6 (5+1 Seater AC)",
    category: "Budget Compact MPV",
    badge: "Budget Saver",
    photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    ratePerDay: 2400,
    totalTripCost: 9600,
    costPerPerson: 2400,
    capacity: "4 Passengers + 2 Medium Bags max",
    chauffeur: "Ratan Das (AS-01-KL-3319)",
    chauffeurRating: "4.7★ (180 Trips)",
    specs: ["Fuel Efficient", "AC", "Compact Maneuverability"],
    groupFitAnalysis: "⚠️ Tight luggage fit if group carries 4 full check-in suitcases.",
    isRecommended: false
  }
];

// Pre-bookable Individual Activities Models
export const PREBOOKABLE_ACTIVITIES = [
  {
    id: "pact-zipline",
    title: "Nohkalikai Canyon Zip-line & Safety Harness Pass",
    location: "Cherrapunji Canyon",
    timing: "Day 2, 02:30 PM Slot",
    costPerPerson: 1200,
    badge: "Must Pre-Book (Limited 25 slots/day)",
    photo: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80",
    description: "Soar 1,200 feet above the mist-covered canyon gorge facing Nohkalikai Falls with certified French Petzl harness gear.",
    included: ["Certified Jump Master", "Petzl Safety Harness & Helmet", "GoPro 4K Video Clip", "Express Lane Access"],
    defaultSelected: true
  },
  {
    id: "pact-caving",
    title: "Mawsmai & Arwah Cave Exploration Gear & Guide",
    location: "Sohra Limestone Caves",
    timing: "Day 2, 11:30 AM Slot",
    costPerPerson: 400,
    badge: "Safety Equipment Included",
    photo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
    description: "Pre-reserved entry with headlamps and safety helmets to navigate subterranean fossil chambers without waiting in public queues.",
    included: ["Headlamp with spare batteries", "Safety Helmet", "Local Speleology Guide", "Fossil Trail Entry Permit"],
    defaultSelected: true
  },
  {
    id: "pact-dawki-boat",
    title: "Dawki Umngot River Transparent Glass-Bottom Boat",
    location: "Dawki Border River",
    timing: "Day 3, 09:30 AM Prime Daylight Slot",
    costPerPerson: 800,
    badge: "Prime Morning Transparency",
    photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80",
    description: "Private wooden boat on the crystal-clear glass waters of Umngot river, with life jackets and cliff-jumping safety escort.",
    included: ["Private 4-Person Boat", "Life Jackets (All Sizes)", "Snorkel Mask Rental", "Cliff Island Stopover"],
    defaultSelected: true
  },
  {
    id: "pact-root-bridge",
    title: "Double Decker Root Bridge Community Permit & Guide",
    location: "Nongriat Village",
    timing: "Day 3, 07:00 AM Dawn Trek",
    costPerPerson: 600,
    badge: "Community Khasi Guide",
    photo: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=400&q=80",
    description: "Official village council conservation passes and an indigenous Khasi elder guide to lead the 3,500-step stone forest trail.",
    included: ["Village Council Forest Permit", "Bamboo Trekking Poles", "Local Khasi Guide (English/Hindi)", "Natural Pool Swim Permit"],
    defaultSelected: false
  }
];

// Fallback compatibility alias
export const GROUP_HOTEL_PACKAGES = LOCATION_HOTEL_OPTIONS[0].hotels;

// Day-wise Curated Itinerary (Ground Activities only; Flights separated into MMT_FLIGHT_ANCHORS)
export const MMT_ITINERARY_DETAILED = [
  {
    day: 1,
    title: "Arrival & The Pine City of Shillong",
    date: "Fri, 16 Oct",
    hotel: "Ri Kynjai Lake Resort",
    summary: "Airport Pickup • Umiam Lake Sunset • Dylan's Cafe Crawl",
    logicDetails: [
      { factor: "Arrival Timing", explanation: "IndiGo 6E-542 touches down at 03:15 PM at Guwahati, respecting Rohan's 11:30 AM client demo." },
      { factor: "Distance & Geography", explanation: "Guwahati to Shillong is 100 km via NH6 (2.5 hrs). Departing at 03:45 PM reaches Umiam lake before dark." },
      { factor: "Weather & Daylight", explanation: "Sunset at Umiam Lake occurs at 05:15 PM. Scheduled tea stop catches prime golden photography hour." },
      { factor: "Hotel Base", explanation: "Ri Kynjai Lake Resort selected as Day 1 base; avoids Shillong town traffic and provides serene cottages." },
      { factor: "Dietary Safety", explanation: "Dylan's Cafe has certified 100% vegetarian dinner items for Priya, with live acoustic folk music." }
    ],
    stops: [
      { id: "s-102", time: "03:45 PM", title: "Dedicated Innova Crysta Pickup at GAU Airport", subtitle: "Chauffeur Biplab Sangma (AS-01-EQ-9821) • Fixed Airport Meeting", type: "cab", badge: "Reserved", duration: "2.5 hrs transit", locked: true },
      { id: "s-103", time: "05:00 PM", title: "Sunset High-Tea at Umiam Lake (Barapani)", subtitle: "Waterfront photography stop, hot Meghalayan milk tea & snacks", type: "sightseeing", badge: "Scenic View", duration: "45 mins", locked: false },
      { id: "s-104", time: "07:30 PM", title: "Check-in: Ri Kynjai Lake Resort", subtitle: "Lake view cottages with traditional Khasi thatched architecture", type: "hotel", badge: "Confirmed", duration: "Overnight Base", locked: true },
      { id: "s-105", time: "08:30 PM", title: "Dinner at Dylan's Cafe & Acoustic Session", subtitle: "Live music, wide vegetarian menu certified for Priya", type: "food", badge: "Table Reserved", duration: "1.5 hrs", locked: false }
    ]
  },
  {
    day: 2,
    title: "Cherrapunji (Sohra) — Canyons & Waterfalls",
    date: "Sat, 17 Oct",
    hotel: "Polo Orchid Resort",
    summary: "Nohkalikai Falls • Mawsmai Caves • Orange Roots Pure Veg",
    logicDetails: [
      { factor: "Weather & Fog Logic", explanation: "Nohkalikai Falls scheduled at 08:30 AM because heavy valley mist rolls in after 11:30 AM blocking canyon views." },
      { factor: "Anti-Backtracking", explanation: "Placing Nohkalikai before Mawsmai saves 42 km of mountain driving and eliminates 3.5 hrs transit time." },
      { factor: "Opening Hours", explanation: "Mawsmai Cave closes entry at 05:00 PM. Scheduled at 03:30 PM with pre-purchased QR fast passes." },
      { factor: "Dietary Safety", explanation: "Orange Roots is located directly along the Cherrapunji bypass, offering a pure vegetarian Meghalaya Thali." },
      { factor: "Hotel Base", explanation: "Polo Orchid Resort serves as Cherrapunji base, positioned overlooking the Seven Sisters canyon." }
    ],
    stops: [
      { id: "s-201", time: "08:30 AM", title: "Nohkalikai Waterfall Trek & Viewpoint", subtitle: "Tallest plunge waterfall (340m) • Early slot to beat morning fog", type: "sightseeing", badge: "AI Route Priority", duration: "1.5 hrs", locked: true },
      { id: "s-204", time: "11:30 AM", title: "Mawsmai Limestone Caves Exploration", subtitle: "Pre-purchased fast-track entry QR codes generated via Myra", type: "sightseeing", badge: "Fast Track", duration: "1 hr", locked: false },
      { id: "s-203", time: "01:30 PM", title: "Pure Veg Lunch at Orange Roots", subtitle: "100% Vegetarian Meghalaya-style Thali certified for Priya", type: "food", badge: "Priya Approved", duration: "1 hr", locked: true },
      { id: "s-205", time: "06:00 PM", title: "Check-in: Polo Orchid Resort", subtitle: "Canyon view over Seven Sisters falls • Bonfire arranged", type: "hotel", badge: "Confirmed", duration: "Overnight Base", locked: true }
    ]
  },
  {
    day: 3,
    title: "Dawki & Mawlynnong — Crystal Waters & Village",
    date: "Sun, 18 Oct",
    hotel: "Ri Kynjai Lake Resort",
    summary: "Riwai Living Root Bridge • Dawki Umngot Boat Ride • Village Stroll",
    logicDetails: [
      { factor: "Activity Duration", explanation: "Riwai Living Root Bridge requires 45-min descent & ascent; scheduled early morning for cool shade." },
      { factor: "Geography & Distance", explanation: "Dawki border river is 35 km from Riwai. Reaching by 11:45 AM captures midday overhead sunlight for transparent water photos." },
      { factor: "Pacing & Comfort", explanation: "Mawlynnong village walk is flat and paved, designed to let Priya and Kabir relax after the morning trek." }
    ],
    stops: [
      { id: "s-301", time: "07:30 AM", title: "Riwai Single Living Root Bridge", subtitle: "Moderate 45-min stroll suitable for all group paces", type: "sightseeing", badge: "Bio-Wonder", duration: "2 hrs", locked: true },
      { id: "s-302", time: "11:45 AM", title: "Dawki Umngot River Boat Ride", subtitle: "Crystal-clear waters with safety life jackets", type: "activity", badge: "Boats Booked", duration: "1.5 hrs", locked: true },
      { id: "s-303", time: "04:30 PM", title: "Mawlynnong Village Cultural Stroll", subtitle: "Cleanest Village in Asia • Bamboo handicraft shopping", type: "sightseeing", badge: "Cultural", duration: "1.5 hrs", locked: false }
    ]
  },
  {
    day: 4,
    title: "Shillong Heritage, Souvenirs & Return",
    date: "Mon, 19 Oct",
    hotel: "Airport Drop / Guwahati",
    summary: "Police Bazar Souvenirs • Scenic Highway Transfer to GAU Airport",
    logicDetails: [
      { factor: "Departure Flight Sync", explanation: "IndiGo return flight departs Guwahati at 01:30 PM. Must arrive at GAU airport by 11:30 AM (2 hr check-in buffer)." },
      { factor: "Distance Buffer", explanation: "Shillong to Guwahati airport is 120 km (3 hrs drive). Cab departs Shillong sharp at 08:30 AM." }
    ],
    stops: [
      { id: "s-401", time: "07:30 AM", title: "Police Bazar Souvenir & Tea Walk", subtitle: "Organic Black Tea & local Meghalaya honey", type: "shopping", badge: "Shopping", duration: "45 mins", locked: false },
      { id: "s-402", time: "08:30 AM", title: "Scenic Highway Drop to Guwahati Airport", subtitle: "Buffer time included for highway mountain fog", type: "transfer", badge: "Airport Transfer", duration: "3 hrs", locked: true }
    ]
  }
];

// Complete Destination Packages Map for Dynamic Switching (Requirement 1)
export const DESTINATION_PACKAGES = {
  "meghalaya": {
    destination: "Shillong & Cherrapunji, Meghalaya",
    title: "Meghalaya Clouds, Waterfalls & Living Root Bridges",
    destinationCode: "SHL",
    budgetMin: 22000,
    budgetMax: 34000,
    dates: "16 Oct - 19 Oct 2026",
    destinationIntelligence: {
      tagline: "The Abode of Clouds & Living Root Bridges",
      altitude: "1,496m (Shillong) to 1,430m (Cherrapunji)",
      climateIntelligence: {
        season: "Post-Monsoon Cascades (Peak Clarity)",
        temp: "15°C – 22°C (Pleasant & Cool)",
        rainProb: "12% (Passing 20-min drizzle max)",
        daylight: "05:45 AM – 05:15 PM (Early sunrise)",
        mistAdvice: "Canyon mist at Nohkalikai burns off completely by 10:30 AM"
      },
      terrainAndRoads: {
        highway: "NH-6 Scenic Mountain Highway",
        driveNote: "Smooth 2-lane mountain tarmac; requires experienced hill chauffeur with low-gear engine braking around Barapani & Mawkdok gorges",
        vehicleRecommended: "Toyota Innova Crysta (High Ground Clearance, Hill Certified)"
      },
      connectivityRadar: {
        jio: "5G in Shillong & Umiam, 4G in Sohra town",
        airtel: "Strong 4G along NH-6 highway & Cherrapunji",
        bsnl: "Fallback 3G inside deep limestone canyon trails",
        wifiResort: "100 Mbps dedicated fiber at Ri Kynjai & Polo Orchid"
      },
      culturalAndDining: {
        etiquette: "Matrilineal Khasi tribal culture; maintain respectful silence at Mawphlang sacred groves",
        dietNote: "100% Pure Vegetarian dining available at Orange Roots Sohra & Dylan's Cafe Pure Veg section",
        permits: "Zero ILP required for Indian nationals; eco-passes auto-synced by Myra"
      },
      packingChecklist: [
        "Light fleece jacket or windcheater for cool canyon evenings",
        "Water-resistant trekking shoes with rubber grip for living root bridge stones",
        "Compact umbrella & poncho for passing mountain spray",
        "High-capacity power bank (mountain cold drains battery faster)",
        "₹2,500 emergency cash buffer (UPI active in 85% of tribal villages)"
      ]
    },
    seasonalWindows: SEASONAL_WINDOWS["meghalaya"],
    macroDays: MMT_MACRO_DAYS,
    candidateActivities: CANDIDATE_ACTIVITIES,
    itinerary: MMT_ITINERARY_DETAILED,
    cuisinesAndMarkets: LOCAL_CUISINE_AND_MARKETS
  },
  "goa": {
    destination: "South Goa & Coastal Escapes",
    title: "South Goa Coastal Escapes: Sun, Sand, Catamarans & Heritage",
    destinationCode: "GOI",
    budgetMin: 18000,
    budgetMax: 30000,
    dates: "20 Nov - 23 Nov 2026",
    destinationIntelligence: {
      tagline: "Sun, Sand, Catamarans & Portuguese Heritage",
      altitude: "Sea Level (0m - 15m)",
      climateIntelligence: {
        season: "Warm Breezes & Water Sports",
        temp: "24°C – 31°C (Sunny & Balmy)",
        rainProb: "2% (Dry coastal weather)",
        daylight: "06:15 AM – 06:10 PM",
        mistAdvice: "Zero fog; golden hour sunsets at 05:45 PM"
      },
      terrainAndRoads: {
        highway: "NH-66 Coastal Highway & Zuari Bridge",
        driveNote: "Wide expressways connecting Mopa/Dabolim to South Goa beach belts (Palolem/Agonda)",
        vehicleRecommended: "AC Sedan / Ertiga MPV"
      },
      connectivityRadar: {
        jio: "5G across coastal belts & Panaji",
        airtel: "5G in North & South Goa",
        bsnl: "Full 4G coverage",
        wifiResort: "High-speed beach resort Wi-Fi"
      },
      culturalAndDining: {
        etiquette: "Casual coastal beachwear on shores; modest clothing required when visiting Basilica of Bom Jesus",
        dietNote: "Abundant pure veg restaurants in Panaji & South Goa beach lanes",
        permits: "Water sports safety permits verified on-site"
      },
      packingChecklist: [
        "UV-protection polarized sunglasses & reef-safe sunscreen (SPF 50+)",
        "Breathable linen shirts & quick-dry swim shorts",
        "Water shoes for rocky tidal pools and catamaran boarding",
        "Waterproof phone pouch for kayak & boat trips"
      ]
    },
    seasonalWindows: [
      {
        id: "win-g1",
        title: "November: Warm Breezes & Water Sports (Recommended)",
        dateRange: "20 Nov - 23 Nov 2026",
        photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
        weather: "28°C • Sunny & Balmy",
        crowd: "Moderate",
        estCost: "₹20,000 - ₹28,000 / person",
        pros: ["All beach shacks, catamarans & kayaking open", "Dudhsagar waterfalls roaring", "Great flight frequency"],
        cons: ["Midday afternoon sun between 12 PM - 2:30 PM"],
        votedMemberIds: ["user-1", "user-2", "user-4"],
        isRecommended: true
      },
      {
        id: "win-g2",
        title: "Late December: Sunsets & Festive Parties",
        dateRange: "24 Dec - 28 Dec 2026",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        weather: "26°C • Festive Evening Breeze",
        crowd: "Extreme Peak",
        estCost: "₹38,000 - ₹55,000 / person",
        pros: ["Electric holiday atmosphere & live beach festivals", "Fireworks and midnight shacks"],
        cons: ["Surge pricing on beach villas & flights", "Heavy traffic on coastal bridges"],
        votedMemberIds: ["user-3"],
        isRecommended: false
      },
      {
        id: "win-g3",
        title: "February: Carnivals & Quiet Shores",
        dateRange: "12 Feb - 15 Feb 2027",
        photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
        weather: "29°C • Warm & Dry",
        crowd: "Low-Moderate",
        estCost: "₹22,000 - ₹29,000 / person",
        pros: ["Goa Carnival parades in Panaji", "Calm and peaceful waters for paddle boarding"],
        cons: ["Occasional humid afternoons"],
        votedMemberIds: [],
        isRecommended: false
      }
    ],
    macroDays: [
      {
        dayNum: 1,
        hubKey: "panaji_fontainhas",
        title: "Panaji & Fontainhas Latin Quarter",
        region: "North & Central Goa",
        photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
        summary: "Dabolim/Mopa Airport Transfer • Latin Quarter Pastel Walk • Mandovi River Cruise",
        distanceKm: 35,
        baseHotel: "Heritage House Panaji",
        tag: "Portuguese Heritage"
      },
      {
        dayNum: 2,
        hubKey: "south_goa_beaches",
        title: "Palolem & Agonda — Pristine South Beaches",
        region: "South Goa Coastal",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        summary: "Crescent Beach Walk • Sea Kayaking & Dolphin Spotting • Sunset Shack Dining",
        distanceKm: 65,
        baseHotel: "The Leela or Palolem Beach Cottages",
        tag: "Turquoise Shores"
      },
      {
        dayNum: 3,
        hubKey: "dudhsagar_spice",
        title: "Dudhsagar Waterfalls & Spice Plantation",
        region: "Western Ghats Foothills",
        photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
        summary: "4x4 Jungle Jeep Safari • Natural Waterfall Plunge • Organic Goan Spice Farm Buffet",
        distanceKm: 70,
        baseHotel: "The Leela South Goa",
        tag: "Jungle & Waterfalls"
      },
      {
        dayNum: 4,
        hubKey: "old_goa_departure",
        title: "Old Goa Heritage Churches & Return",
        region: "Old Goa & Airport",
        photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
        summary: "Basilica of Bom Jesus • Feni & Cashew Shopping • Airport Departure",
        distanceKm: 40,
        baseHotel: "Departure Day",
        tag: "Heritage & Shopping"
      }
    ],
    candidateActivities: {
      1: [
        { id: "act-g101", title: "Fontainhas Latin Quarter Walking Tour", cost: 500, duration: "1.5 hrs", category: "Heritage", photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&q=80", description: "Wander through colourful 18th-century Portuguese villas and vintage bakeries.", tags: ["Colonial Heritage", "Photography", "Easy Walk"], defaultSelected: true },
        { id: "act-g102", title: "Mandovi Luxury Sunset Catamaran Cruise", cost: 1200, duration: "2 hrs", category: "Cruise", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", description: "Golden hour sailing on the Mandovi river with live acoustic Goan Konkani music.", tags: ["Sunset Cruise", "Music", "Relaxing"], defaultSelected: true }
      ],
      2: [
        { id: "act-g201", title: "Palolem Crescent Bay Sea Kayaking", cost: 800, duration: "1.5 hrs", category: "Water Sports", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", description: "Paddle along the calm calm crescent bay waters of Palolem toward Monkey Island.", tags: ["Kayaking", "Water Adventure"], defaultSelected: true },
        { id: "act-g202", title: "Grand Island Scuba Diving & Snorkeling", cost: 3500, duration: "3.5 hrs", category: "Extreme Adventure", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&q=80", description: "Certified PADI instructor guided reef dive with underwater HD video footage.", tags: ["Scuba Reef", "Premium Adventure"], defaultSelected: false },
        { id: "act-g203", title: "Agonda Turtle Nesting Beach Sunset Stroll", cost: 0, duration: "1 hr", category: "Nature", photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&q=80", description: "Peaceful white-sand stretch renowned as an Olive Ridley turtle sanctuary.", tags: ["Pristine Shore", "Sunset", "Free"], defaultSelected: true }
      ],
      3: [
        { id: "act-g301", title: "Dudhsagar 4x4 Jungle Jeep Safari", cost: 1800, duration: "3 hrs", category: "Adventure", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&q=80", description: "Thumping off-road ride through the Bhagwan Mahavir Wildlife Sanctuary river crossings.", tags: ["Jeep Safari", "Waterfalls", "Iconic"], defaultSelected: true },
        { id: "act-g302", title: "Sahakari Spice Farm Organic Lunch Tour", cost: 650, duration: "2 hrs", category: "Dining & Farm", photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80", description: "Guided plantation walk with vanilla, cardamom, and a traditional banana leaf buffet.", tags: ["Veg & Non-Veg", "Organic Farm"], defaultSelected: true }
      ],
      4: [
        { id: "act-g401", title: "Old Goa UNESCO Churches Walk (Bom Jesus)", cost: 200, duration: "1.5 hrs", category: "Heritage", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=80", description: "Marvel at 400-year-old Baroque architecture and sacred relics of St. Francis Xavier.", tags: ["UNESCO World Heritage"], defaultSelected: true },
        { id: "act-g402", title: "Margao Covered Market Cashew & Feni Shopping", cost: 200, duration: "1 hr", category: "Shopping", photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&q=80", description: "Buy authentic roasted whole cashews, coconut vinegar, and local Goan spices.", tags: ["Souvenirs", "Local Flavours"], defaultSelected: true }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Panaji & Fontainhas Latin Quarter",
        date: "Fri, 20 Nov",
        summary: "Airport Pickup • Fontainhas Pastel Walk • Mandovi Sunset Cruise",
        logicDetails: [
          { factor: "Airport Logistics", explanation: "Pickup arranged from Goa Mopa (GOX) Airport via NH66 highway expressway." },
          { factor: "Daylight Lighting", explanation: "Fontainhas pastel yellow and indigo walls look most vibrant in afternoon 4 PM light." }
        ],
        stops: [
          { id: "sg-101", time: "02:30 PM", title: "Airport Pickup & Check-in at Panaji", subtitle: "AC Innova transfer to heritage hotel", type: "cab", badge: "Reserved", duration: "1.5 hrs", locked: true },
          { id: "sg-102", time: "04:30 PM", title: "Fontainhas Latin Quarter Walking Tour", subtitle: "Wander through 18th-century Portuguese villas", type: "sightseeing", badge: "Heritage", duration: "1.5 hrs", locked: false },
          { id: "sg-103", time: "06:30 PM", title: "Mandovi Luxury Sunset Catamaran Cruise", subtitle: "Live Goan folk music and refreshing kokum welcome drink", type: "activity", badge: "Cruise Booked", duration: "1.5 hrs", locked: false }
        ]
      },
      {
        day: 2,
        title: "Palolem & Agonda — Turquoise South Beaches",
        date: "Sat, 21 Nov",
        summary: "Palolem Kayaking • Beach Shacks • Agonda Turtle Bay Sunset",
        logicDetails: [
          { factor: "Tide Timings", explanation: "Morning 08:30 AM calm tides provide mirror-like waters for sea kayaking without swells." }
        ],
        stops: [
          { id: "sg-201", time: "08:30 AM", title: "Palolem Crescent Bay Sea Kayaking", subtitle: "Paddle to Butterfly beach and Monkey island", type: "activity", badge: "Water Sports", duration: "2 hrs", locked: true },
          { id: "sg-202", time: "01:30 PM", title: "Fresh Catch & Pure Veg Lunch at Dropadi", subtitle: "Shack dining overlooking turquoise waters with veg section", type: "food", badge: "Table Reserved", duration: "1.5 hrs", locked: false },
          { id: "sg-203", time: "05:00 PM", title: "Agonda Turtle Beach Golden Hour Stroll", subtitle: "White sand beach stroll with fresh coconut water", type: "sightseeing", badge: "Scenic View", duration: "1.5 hrs", locked: false }
        ]
      },
      {
        day: 3,
        title: "Dudhsagar Waterfalls & Spice Plantation",
        date: "Sun, 22 Nov",
        summary: "4x4 Jungle Jeep Safari • Waterfall Plunge • Sahakari Spice Farm",
        logicDetails: [
          { factor: "National Park Entry", explanation: "Bhagwan Mahavir Sanctuary queue opens 08:00 AM; early slot saves 1.5 hrs wait time." }
        ],
        stops: [
          { id: "sg-301", time: "08:00 AM", title: "Dudhsagar 4x4 Jungle Jeep Safari", subtitle: "Off-road forest drive across scenic river streams", type: "activity", badge: "Safari Booked", duration: "3 hrs", locked: true },
          { id: "sg-302", time: "01:30 PM", title: "Sahakari Spice Farm Organic Lunch Tour", subtitle: "Authentic spice tour followed by banana leaf lunch", type: "food", badge: "Buffet Included", duration: "2 hrs", locked: false }
        ]
      },
      {
        day: 4,
        title: "Old Goa Heritage & Departure",
        date: "Mon, 23 Nov",
        summary: "Basilica of Bom Jesus • Margao Cashew Market • Airport Drop",
        logicDetails: [
          { factor: "Flight Buffer", explanation: "Cab departs Margao 3 hours before flight departure to bypass bridge traffic." }
        ],
        stops: [
          { id: "sg-401", time: "09:00 AM", title: "Old Goa UNESCO Basilica of Bom Jesus", subtitle: "400-year-old Baroque architecture walk", type: "sightseeing", badge: "UNESCO Site", duration: "1.5 hrs", locked: false },
          { id: "sg-402", time: "11:30 AM", title: "Margao Covered Market Souvenir Shopping", subtitle: "Cashew nuts, local spices and Goan sweets", type: "shopping", badge: "Shopping", duration: "1 hr", locked: false },
          { id: "sg-403", time: "01:30 PM", title: "Airport Drop to Goa Mopa (GOX)", subtitle: "Smooth AC Innova highway drop", type: "transfer", badge: "Airport Transfer", duration: "1.5 hrs", locked: true }
        ]
      }
    ],
    cuisinesAndMarkets: [
      { id: "gf-1", title: "Traditional Goan Fish & Prawn Curry (or Veg Xacuti)", type: "Iconic Cuisine", photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", venue: "Martin's Corner, Betalbatim", description: "Clay pot coconut curry with kokum and ground spices, served with steaming red rice.", priceTag: "₹350 - ₹600 per person", tags: ["Legendary Restaurant", "Seafood & Pure Veg"], bestFor: "Day 2 Dinner" },
      { id: "gf-2", title: "Warm Bebinca & Serradura Portuguese Pudding", type: "Goan Dessert", photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80", venue: "Infantaria Pasteleria", description: "Multi-layered coconut milk cake caramelized to perfection paired with Portuguese sawdust pudding.", priceTag: "₹200 - ₹350 per person", tags: ["Sweet Treat", "Must Try"], bestFor: "Day 1 Evening" },
      { id: "gf-3", title: "Anjuna Beach Wednesday Flea Market", type: "Vibrant Flea Market", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80", venue: "Anjuna Beach Coastline", description: "Eclectic open bazaar with macrame dreamcatchers, handmade leather sandals, boho apparel, and live music.", priceTag: "Budget Shopping", tags: ["Hippie Vibe", "Souvenirs"], bestFor: "Evening Shopping" },
      { id: "gf-4", title: "Fisherman's Wharf Riverside Dining", type: "Scenic Waterfront", photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80", venue: "Cavelossim Riverfront, South Goa", description: "Charming wooden river deck serving Goan rava-fried bites and vegetarian caldin stew.", priceTag: "₹600 - ₹1,000 per person", tags: ["Waterfront", "Live Band"], bestFor: "Day 3 Dinner" }
    ]
  },
  "kashmir": {
    destination: "Srinagar & Gulmarg, Kashmir",
    title: "Kashmir Valley of Dreams: Dal Lake, Gulmarg Gondola & Alpine Meadows",
    destinationCode: "SXR",
    budgetMin: 26000,
    budgetMax: 42000,
    dates: "08 Oct - 11 Oct 2026",
    destinationIntelligence: {
      tagline: "Paradise on Earth: Alpine Meadows & Floating Shikaras",
      altitude: "1,585m (Srinagar) to 2,650m (Gulmarg) / 4,200m (Apharwat)",
      climateIntelligence: {
        season: "Autumn Foliage & Crisp Chinar Glades",
        temp: "8°C – 19°C (Chilly Mornings & Golden Sun)",
        rainProb: "5% (Dry autumn air)",
        daylight: "06:20 AM – 05:40 PM",
        mistAdvice: "Light mist over Dal Lake at sunrise, clear alpine views by 9 AM"
      },
      terrainAndRoads: {
        highway: "NH-1 Srinagar-Baramulla Highway & Tangmarg Mountain Pass",
        driveNote: "Gradual mountain ascent; snow chains optional in October, 4x4 vehicles available at Tangmarg",
        vehicleRecommended: "Toyota Innova Crysta / 4x4 Scorpio"
      },
      connectivityRadar: {
        jio: "5G in Srinagar city & Gulmarg base",
        airtel: "Strong 4G postpaid active (Note: Prepaid Indian SIMs from outside J&K do not roam)",
        bsnl: "Full government postpaid connectivity",
        wifiResort: "50 Mbps fiber on luxury houseboats & resorts"
      },
      culturalAndDining: {
        etiquette: "Warm Kashmiri hospitality; modest attire at Jamia Masjid & Hazratbal; customary tip for shikara rowers",
        dietNote: "Kashmiri Dum Aloo, Nadru Yakhni, and Rajma Chawal pure veg options available across all restaurants",
        permits: "Valid Government ID required for Gondola Phase 2; airport requires 3-hour buffer"
      },
      packingChecklist: [
        "Medium-weight insulated jacket & thermal innerwear for Gulmarg Phase 2",
        "Woolen beanie cap & gloves for high-altitude wind chill",
        "Moisturizing lip balm & dry-weather cold cream",
        "Physical Postpaid SIM card or arrange local tourist SIM on arrival",
        "Comfortable walking shoes for Mughal Gardens terraced stairs"
      ]
    },
    seasonalWindows: [
      {
        id: "win-k1",
        title: "October: Golden Chinar Leaves (Recommended)",
        dateRange: "08 Oct - 11 Oct 2026",
        photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
        weather: "17°C • Crisp & Golden Autumn",
        crowd: "Moderate",
        estCost: "₹26,000 - ₹36,000 / person",
        pros: ["Chinar trees turn radiant copper red", "Clear panoramic views from Gulmarg Gondola Phase 2"],
        cons: ["Evenings get chilly (8°C)"],
        votedMemberIds: ["user-1", "user-2", "user-3", "user-4"],
        isRecommended: true
      }
    ],
    macroDays: [
      { dayNum: 1, hubKey: "srinagar_dal", title: "Srinagar Dal Lake & Floating Char Chinar", region: "Srinagar Valley", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", summary: "Houseboat Check-in • Shikara Sunset Ride • Mughal Gardens Walk", distanceKm: 18, baseHotel: "Luxury Pine Houseboat", tag: "Lakes & Chinar" },
      { dayNum: 2, hubKey: "gulmarg_peaks", title: "Gulmarg Alpine Meadows & Gondola", region: "Gulmarg Snow Peaks", photo: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80", summary: "Scenic Tangmarg Drive • Phase 1 & 2 Cable Car Ride • Apharwat Peak Stroll", distanceKm: 52, baseHotel: "Khyber Himalayan Resort", tag: "Snow & Cable Car" },
      { dayNum: 3, hubKey: "pahalgam_lidder", title: "Pahalgam Valley & Lidder River", region: "Pahalgam & Betaab", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", summary: "Saffron Fields of Pampore • Betaab Valley Meadow Walk • Lidder River Walk", distanceKm: 88, baseHotel: "Pahalgam Pine Cottages", tag: "Rivers & Valleys" },
      { dayNum: 4, hubKey: "srinagar_old_city", title: "Old Srinagar Heritage & Saffron Shopping", region: "Srinagar & Airport Drop", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80", summary: "Polo View Street Walk • Pashmina & Kashmiri Walnut Shopping • Airport Drop", distanceKm: 15, baseHotel: "Departure Day", tag: "Heritage & Shopping" }
    ],
    candidateActivities: {
      1: [
        { id: "act-k101", title: "Sunset Shikara Ride on Dal Lake & Char Chinar", cost: 600, duration: "1.5 hrs", category: "Scenic", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80", description: "Glide across tranquil waters with floating flower vendors and majestic Zabarwan mountain backdrops.", tags: ["Iconic Dal Lake", "Sunset"], defaultSelected: true },
        { id: "act-k102", title: "Nishat & Shalimar Mughal Gardens Stroll", cost: 200, duration: "1.5 hrs", category: "Heritage", photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=80", description: "Terraced lawns, fountains, and towering Chinar trees created by Emperor Jahangir.", tags: ["Mughal Heritage", "Peaceful"], defaultSelected: true }
      ],
      2: [
        { id: "act-k201", title: "Gulmarg Gondola Cable Car Ride (Phase 1 + 2)", cost: 2200, duration: "3 hrs", category: "Mountain Cable Car", photo: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=300&q=80", description: "Ascend to 13,780 feet on the world's second-highest operating cable car right up to Apharwat Peak.", tags: ["Pre-booked QR Pass", "Snow Peaks"], defaultSelected: true },
        { id: "act-k202", title: "Himalayan Heli-Sightseeing Tour (Optional)", cost: 4200, duration: "30 mins", category: "Extreme Adventure", photo: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=300&q=80", description: "Fly over Pir Panjal snow ranges in a turbine helicopter.", tags: ["Premium Adrenaline"], defaultSelected: false }
      ],
      3: [
        { id: "act-k301", title: "Betaab Valley Pine Meadow Walk", cost: 300, duration: "2 hrs", category: "Nature", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", description: "Pristine sub-alpine meadows surrounded by dense deodar and pine forests.", tags: ["Bollywood Famous", "Lush"], defaultSelected: true },
        { id: "act-k302", title: "Aru Valley Horse Trek & River Bank", cost: 850, duration: "2 hrs", category: "Adventure", photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80", description: "Guided pony ride through the whispering pine trees along the Lidder stream.", tags: ["Pony Trek", "Mountain Stream"], defaultSelected: true }
      ],
      4: [
        { id: "act-k401", title: "Polo View Pedestrian High Street Souvenirs", cost: 200, duration: "1.5 hrs", category: "Shopping", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=80", description: "Shop for certified GI-tagged Kashmir saffron, pure wool shawls, and walnut wood carvings.", tags: ["GI Saffron", "Shawls"], defaultSelected: true }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Srinagar Dal Lake & Houseboat Welcome",
        date: "Thu, 08 Oct",
        summary: "Airport Pickup • Luxury Houseboat Check-in • Sunset Shikara",
        logicDetails: [{ factor: "Houseboat Check-in", explanation: "Luggage transferred directly via private shikara to Nigeen Lake dock." }],
        stops: [
          { id: "sk-101", time: "02:00 PM", title: "Srinagar Airport Pickup to Dal Lake", subtitle: "Comfortable Innova pickup at SXR airport", type: "cab", badge: "Confirmed", duration: "1 hr", locked: true },
          { id: "sk-102", time: "04:30 PM", title: "Sunset Shikara Ride on Dal Lake & Char Chinar", subtitle: "Watch golden light reflect over the Zabarwan peaks", type: "activity", badge: "Shikara Booked", duration: "1.5 hrs", locked: false }
        ]
      },
      {
        day: 2,
        title: "Gulmarg Gondola & Snow Peaks",
        date: "Fri, 09 Oct",
        summary: "Tangmarg Pine Drive • Gondola Phase 1 & 2 • Apharwat Peak",
        logicDetails: [{ factor: "Gondola Slot", explanation: "Phase 2 pre-booked for 10:30 AM to beat midday high-altitude cloud cover." }],
        stops: [
          { id: "sk-201", time: "08:30 AM", title: "Scenic Mountain Drive to Gulmarg", subtitle: "Ascent through pine forest hairpin bends", type: "cab", badge: "En Route", duration: "1.5 hrs", locked: true },
          { id: "sk-202", time: "10:30 AM", title: "Gulmarg Gondola Cable Car Ride (Phase 1 + 2)", subtitle: "Pre-booked fast-track boarding passes", type: "activity", badge: "Tickets Confirmed", duration: "3 hrs", locked: true }
        ]
      },
      {
        day: 3,
        title: "Pahalgam & Betaab Valley",
        date: "Sat, 10 Oct",
        summary: "Pampore Saffron Fields • Betaab Valley • Lidder River Tea",
        logicDetails: [{ factor: "Scenic Route", explanation: "Stop at Pampore saffron farms during morning bloom." }],
        stops: [
          { id: "sk-301", time: "09:00 AM", title: "Betaab Valley Pine Meadow Walk", subtitle: "Lush meadows with crystal stream water", type: "sightseeing", badge: "Scenic View", duration: "2 hrs", locked: true }
        ]
      },
      {
        day: 4,
        title: "Polo View & Airport Departure",
        date: "Sun, 11 Oct",
        summary: "Polo View Pedestrian Market • Airport Transfer to SXR",
        logicDetails: [{ factor: "Airport Security Buffer", explanation: "SXR airport has 3-tier security checkpoints; 3-hour advance arrival scheduled." }],
        stops: [
          { id: "sk-401", time: "09:30 AM", title: "Polo View Pedestrian High Street Souvenirs", subtitle: "Authentic dry fruits, saffron and carved walnut gifts", type: "shopping", badge: "Shopping", duration: "1.5 hrs", locked: false },
          { id: "sk-402", time: "11:30 AM", title: "Airport Drop to Srinagar (SXR)", subtitle: "Smooth transfer with 3-tier security buffer", type: "transfer", badge: "Airport Transfer", duration: "1 hr", locked: true }
        ]
      }
    ],
    cuisinesAndMarkets: [
      { id: "kf-1", title: "Traditional Kashmiri Dum Aloo & Gushtaba", type: "Royal Wazwan", photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", venue: "Ahdoos, Residency Road, Srinagar", description: "Slow-cooked baby potatoes in rich fennel and Kashmiri chili gravy paired with saffron rice.", priceTag: "₹400 - ₹750 per person", tags: ["Legendary Ahdoos", "Vegetarian Special"], bestFor: "Day 1 Dinner" },
      { id: "kf-2", title: "Authentic Kashmiri Kahwa & Hot Bakarkhani", type: "Traditional Tea", photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80", venue: "Chai Jaai Tea House, Srinagar", description: "Fragrant green tea brewed with saffron strands, whole cardamom, cinnamon, and slivered almonds.", priceTag: "₹180 - ₹300 per person", tags: ["Warm Ambience", "Saffron Brew"], bestFor: "Day 2 Afternoon" },
      { id: "kf-3", title: "Polo View High Street Crafts & Pashmina Bazaar", type: "Vibrant Market", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80", venue: "Polo View, Srinagar", description: "Pedestrianized cobblestone promenade lined with vintage Chinar trees and artisan emporiums.", priceTag: "Souvenir Shopping", tags: ["Artisan Crafts", "Certified GI"], bestFor: "Day 4 Morning" }
    ]
  },
  "kerala": {
    destination: "Munnar & Alleppey Backwaters, Kerala",
    title: "Kerala God's Own Country: Munnar Tea Hills & Alleppey Houseboat",
    destinationCode: "COK",
    budgetMin: 21000,
    budgetMax: 33000,
    dates: "14 Nov - 17 Nov 2026",
    destinationIntelligence: {
      tagline: "God's Own Country: Emerald Plantations & Backwaters",
      altitude: "1,600m (Munnar Hills) to 0m (Alleppey Lagoons)",
      climateIntelligence: {
        season: "Post-Monsoon Refresh (Lush & Calm)",
        temp: "18°C – 28°C (Pleasant hill breeze & sunny canals)",
        rainProb: "8% (Scattered short afternoon drizzle)",
        daylight: "06:05 AM – 06:15 PM",
        mistAdvice: "Misty tea slopes in early mornings until 8:30 AM"
      },
      terrainAndRoads: {
        highway: "NH-85 Kochi-Dhanushkodi Scenic Hill Highway",
        driveNote: "Picturesque waterfalls (Cheeyappara & Valara) en route; gentle hairpin curves through tea gardens",
        vehicleRecommended: "Air-Conditioned Tempo Traveller / Innova Crysta"
      },
      connectivityRadar: {
        jio: "5G in Kochi, 4G across Munnar town & Alleppey",
        airtel: "Strong 4G along tea estates & backwater routes",
        bsnl: "Wide rural backwater coverage",
        wifiResort: "Broadband Wi-Fi at luxury plantation resorts and premium AC houseboats"
      },
      culturalAndDining: {
        etiquette: "Traditional Kerala greetings; footwear removal before entering traditional tharavadu homes",
        dietNote: "Traditional Kerala Sadhya served on banana leaf is 100% pure vegetarian with 24 distinct delicacies",
        permits: "Eravikulam National Park passes pre-scheduled with zero queue times"
      },
      packingChecklist: [
        "Light cotton casuals for backwaters & light cardigan for Munnar evenings",
        "Herbal mosquito repellent lotion for backwater evening cruises",
        "Comfortable walking sandals and slip-on shoes for houseboat docks",
        "Camera with polarizing filter for brilliant emerald tea contrasts"
      ]
    },
    seasonalWindows: [
      {
        id: "win-kl1",
        title: "November: Post-Monsoon Emerald Hills (Recommended)",
        dateRange: "14 Nov - 17 Nov 2026",
        photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        weather: "22°C • Cool Mist & Clear Canals",
        crowd: "Moderate",
        estCost: "₹21,000 - ₹30,000 / person",
        pros: ["Munnar rolling tea plantations at peak emerald green", "Alleppey backwaters calm with zero rain"],
        cons: ["Mornings in Munnar can dip to 12°C"],
        votedMemberIds: ["user-1", "user-2", "user-3", "user-4"],
        isRecommended: true
      }
    ],
    macroDays: [
      { dayNum: 1, hubKey: "munnar_hills", title: "Munnar Rolling Tea Gardens & Waterfalls", region: "Munnar Hill Station", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", summary: "Kochi Airport Pickup • Cheeyappara Falls • Kolukkumalai Tea Tasting", distanceKm: 110, baseHotel: "Panoramic Sea Tea Resort", tag: "Tea Plantations" },
      { dayNum: 2, hubKey: "eravikulam_peak", title: "Eravikulam National Park & Anamudi", region: "High Mountain Sanctuary", photo: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80", summary: "Nilgiri Tahr Spotting • Tea Factory Museum • Mattupetty Lake Boating", distanceKm: 32, baseHotel: "Munnar Hill Cottages", tag: "Wildlife & Peaks" },
      { dayNum: 3, hubKey: "alleppey_houseboat", title: "Alleppey Backwaters & Private Houseboat", region: "Vembanad Backwaters", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", summary: "Houseboat Boarding • Canal Palm Cruise • Fresh Coconut Village Walk", distanceKm: 145, baseHotel: "Luxury AC Houseboat", tag: "Houseboats & Lagoons" },
      { dayNum: 4, hubKey: "fort_kochi_return", title: "Fort Kochi Heritage & Return", region: "Fort Kochi & Airport Drop", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80", summary: "Chinese Fishing Nets • Mattancherry Spice Market • Kochi Airport Drop", distanceKm: 42, baseHotel: "Departure Day", tag: "Colonial & Spices" }
    ],
    candidateActivities: {
      1: [
        { id: "act-kl101", title: "Kolukkumalai Tea Estate High-Altitude Tasting", cost: 600, duration: "2 hrs", category: "Scenic", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80", description: "Visit the world's highest organic tea factory with hot orthodox leaf tea tasting.", tags: ["High Altitude Tea", "Panoramic"], defaultSelected: true }
      ],
      2: [
        { id: "act-kl201", title: "Eravikulam National Park Nilgiri Tahr Safari", cost: 500, duration: "2.5 hrs", category: "Wildlife", photo: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=300&q=80", description: "Spot the endangered mountain goat species amidst rolling shola grasslands.", tags: ["Wildlife Safari", "Endangered Species"], defaultSelected: true }
      ],
      3: [
        { id: "act-kl301", title: "Alleppey Narrow Canal Shikara Boat Cruise", cost: 900, duration: "2 hrs", category: "Waterway", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", description: "Quiet electric boat ride through tranquil village canals under canopy palms.", tags: ["Backwaters", "Peaceful"], defaultSelected: true },
        { id: "act-kl302", title: "Ayurvedic Herbal Rejuvenation Massage", cost: 2600, duration: "1.5 hrs", category: "Wellness", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&q=80", description: "Authentic Kerala abhyanga massage with warm medicinal herbal oils.", tags: ["Ayurveda", "Premium Wellness"], defaultSelected: false }
      ],
      4: [
        { id: "act-kl401", title: "Fort Kochi Chinese Fishing Nets & Spice Walk", cost: 200, duration: "1.5 hrs", category: "Heritage", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=80", description: "See the cantilevered Chinese fishing nets and browse aromatic pepper and cardamom stalls.", tags: ["Colonial Heritage", "Spice Stalls"], defaultSelected: true }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Munnar Emerald Hills Welcome",
        date: "Sat, 14 Nov",
        summary: "Kochi Airport Pickup • Cheeyappara Falls • Tea Resort Check-in",
        logicDetails: [{ factor: "Altitude Acclimatization", explanation: "Smooth ascent through rubber and tea plantations." }],
        stops: [
          { id: "skl-101", time: "01:30 PM", title: "Pickup at Kochi (COK) Airport", subtitle: "Comfortable AC Innova transfer to Munnar hills", type: "cab", badge: "Confirmed", duration: "3 hrs", locked: true }
        ]
      },
      {
        day: 2,
        title: "Eravikulam Wildlife & Mattupetty Lake",
        date: "Sun, 15 Nov",
        summary: "Eravikulam Park • Tea Factory Museum • Speedboating",
        logicDetails: [{ factor: "National Park Slot", explanation: "08:30 AM morning safari slot." }],
        stops: [
          { id: "skl-201", time: "08:30 AM", title: "Eravikulam National Park Safari", subtitle: "Watch Nilgiri Tahr mountain goats graze", type: "activity", badge: "Passes Confirmed", duration: "2.5 hrs", locked: true }
        ]
      },
      {
        day: 3,
        title: "Alleppey Backwaters & Houseboat",
        date: "Mon, 16 Nov",
        summary: "Houseboat Boarding • Palm-fringed Canals • Sunset Cruise",
        logicDetails: [{ factor: "Houseboat Check-in", explanation: "Private houseboat boarding at 12:30 PM." }],
        stops: [
          { id: "skl-301", time: "12:30 PM", title: "Private Houseboat Check-in & Welcome Drink", subtitle: "Fresh tender coconut and spice lunch served onboard", type: "hotel", badge: "Confirmed", duration: "Overnight Cruise", locked: true }
        ]
      },
      {
        day: 4,
        title: "Fort Kochi Heritage & Departure",
        date: "Tue, 17 Nov",
        summary: "Chinese Fishing Nets • Jewish Town Spices • Airport Drop",
        logicDetails: [{ factor: "Flight Sync", explanation: "Airport transfer via container road." }],
        stops: [
          { id: "skl-401", time: "10:00 AM", title: "Fort Kochi Chinese Fishing Nets Walk", subtitle: "Historic seaside harbor promenade", type: "sightseeing", badge: "Heritage", duration: "1.5 hrs", locked: false },
          { id: "skl-402", time: "02:00 PM", title: "Airport Drop to Kochi (COK)", subtitle: "Smooth AC highway drop", type: "transfer", badge: "Airport Transfer", duration: "1 hr", locked: true }
        ]
      }
    ],
    cuisinesAndMarkets: [
      { id: "klf-1", title: "Authentic Kerala Sadya on Banana Leaf", type: "Traditional Feast", photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", venue: "Sarovaram Vegetarian, Kochi Bypass", description: "24-item ceremonial feast featuring Avial, Olan, Thoran, red rice, and warm Palada Payasam.", priceTag: "₹300 - ₹450 per person", tags: ["100% Pure Veg", "Banana Leaf Feast"], bestFor: "Day 4 Lunch" },
      { id: "klf-2", title: "Houseboat Fresh Karimeen Pollichathu", type: "Backwater Specialty", photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80", venue: "Alleppey Houseboat Onboard Kitchen", description: "Pearl spot fish marinated in shallots and crushed pepper, wrapped in banana leaf and slow roasted.", priceTag: "Included in Cruise", tags: ["Houseboat Special", "Local Catch"], bestFor: "Day 3 Dinner" },
      { id: "klf-3", title: "Mattancherry Jew Town Spice Market", type: "Historic Bazaar", photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80", venue: "Jew Town, Fort Kochi", description: "Centuries-old spice trading godowns overflowing with whole Malabar black pepper, star anise, and cloves.", priceTag: "Spice Shopping", tags: ["Aromatic Spices", "Heritage"], bestFor: "Day 4 Souvenirs" }
    ]
  }
};

// =============================================================================
// POST-BOOKING ENGINE: CANCELLATION POLICIES, DISRUPTIONS & REPOSITORY DATA
// =============================================================================

export const CANCELLATION_POLICIES = {
  flight: {
    airlineFee: 3000,
    mmtFee: 500,
    ruleText: "Airline fee of ₹3,000 + ₹500 MMT fee per passenger. Remainder credited instantly to Pine Labs Grantex vault.",
    freeCancelDeadline: "Up to 4 hrs prior to scheduled departure"
  },
  train: {
    railwayFee: 240,
    mmtFee: 100,
    ruleText: "Clerkage fee of ₹240 + ₹100 MMT fee per berth. Instant Grantex vault refund.",
    freeCancelDeadline: "Up to 48 hrs before chart preparation"
  },
  hotels: {
    freeWindowHours: 48,
    tier1Text: "100% refund if cancelled > 48 hrs before check-in.",
    tier2Text: "50% refund if cancelled 24 - 48 hrs before check-in.",
    tier3Text: "Non-refundable within 24 hrs of check-in."
  },
  cab: {
    freeWindowHours: 12,
    ruleText: "100% full refund if cancelled > 12 hrs before airport pickup."
  },
  activities: {
    adminFee: 150,
    ruleText: "Refundable with ₹150 administrative fee up to 24 hrs before scheduled entry."
  }
};

export const DISRUPTION_SCENARIOS = [
  {
    id: "flight_delay",
    title: "Flight IndiGo 6E-2089 Delayed by 2.5 Hours",
    delayMinutes: 150,
    severity: "high",
    severityLabel: "High Impact",
    affectedMemberId: "user-3",
    affectedMemberName: "Rohan Varma",
    triggerReason: "Air traffic congestion at DEL departure gate; landing rescheduled to 02:45 PM.",
    scheduledTime: "12:15 PM ➔ 02:45 PM Landing at GAU",
    rippleImpact: "Misses dedicated 03:45 PM GAU airport pickup. Arrives at 06:15 PM in Shillong. Misses Sunset High-Tea at Umiam Lake. Ri Kynjai check-in pushed to 08:00 PM.",
    options: ["replan_min_disrupt", "replan_optimised", "replan_cost_min"]
  },
  {
    id: "train_missed",
    title: "Guwahati Rajdhani Missed Connection",
    delayMinutes: 180,
    severity: "medium",
    severityLabel: "Medium Impact",
    affectedMemberId: "user-4",
    affectedMemberName: "Tanya Sen",
    triggerReason: "Connecting suburban transit delay resulted in missing 09:15 AM station transfer.",
    scheduledTime: "Missed 09:15 AM departure",
    rippleImpact: "Arrival delayed by 3 hours. Will miss lunch at ML05 Cafe and Living Root Bridge afternoon hike.",
    options: ["replan_min_disrupt", "replan_optimised", "replan_cost_min"]
  },
  {
    id: "weather_fog",
    title: "Dense Valley Fog & Torrential Rain in Cherrapunji",
    delayMinutes: 120,
    severity: "medium",
    severityLabel: "Weather Advisory",
    affectedMemberId: "all",
    affectedMemberName: "Entire Group (4 Members)",
    triggerReason: "Meghalaya Meteorological Dept alert: Heavy mountain downpour and visibility < 20m.",
    scheduledTime: "Day 2 Morning Window (08:30 AM - 12:30 PM)",
    rippleImpact: "Nohkalikai Falls visibility reduced to 10%. Mawsmai Cave temporarily shut for 3 hours due to high water levels.",
    options: ["replan_weather_swap", "replan_indoor_cultural"]
  }
];

export const REPLAN_OPTIONS_MATRIX = {
  replan_min_disrupt: {
    id: "replan_min_disrupt",
    title: "Option A: Minimal-Disruption Adjustment",
    tag: "Zero Itinerary Loss",
    timeImpact: "+2.0 hrs shift",
    costImpact: "₹0 (No extra cost)",
    costNum: 0,
    description: "Re-schedule chauffeur pickup to 06:15 PM. Shift Umiam Lake sunset stop to Day 4 morning before farewell lunch. Ri Kynjai check-in at 08:00 PM. Dylan's Cafe dinner shifted to 09:00 PM.",
    pros: "Preserves all sights with zero cancellation or rebooking penalties.",
    cons: "Day 1 evening ends 1 hour later."
  },
  replan_optimised: {
    id: "replan_optimised",
    title: "Option B: Optimised-Replan Fast Track",
    tag: "Recommended by Myra",
    timeImpact: "Saves 45 mins transit",
    costImpact: "+₹400 express highway cab",
    costNum: 400,
    description: "Dispatch dedicated fast-track express sedan via Shillong bypass directly to Dylan's Cafe to join the group. Mobile contactless auto check-in pre-authorized via MakeMyTrip API at Ri Kynjai.",
    pros: "Affected member joins the group for dinner seamlessly without missing evening social time.",
    cons: "₹400 additional highway toll & express driver surcharge."
  },
  replan_cost_min: {
    id: "replan_cost_min",
    title: "Option C: Cost-Minimising Consolidation",
    tag: "Budget Saver",
    timeImpact: "+3.5 hrs arrival",
    costImpact: "-₹300 savings on shared transfer",
    costNum: -300,
    description: "Consolidate airport transfer with scheduled MMT shuttle; self-directed walk around Ri Kynjai lake upon late arrival. Light in-room Khasi supper served.",
    pros: "Saves cost while keeping core night stay intact.",
    cons: "Misses group dinner at Dylan's Cafe."
  },
  replan_weather_swap: {
    id: "replan_weather_swap",
    title: "Option W1: Chronological Weather Swap",
    tag: "Optimal Sunshine Route",
    timeImpact: "0 hr delay",
    costImpact: "₹0 cost impact",
    costNum: 0,
    description: "Invert Day 2 sequence: Visit indoor Arwah Caves & Eco-Park crafts center in the morning; visit Nohkalikai Falls at 02:30 PM when afternoon sun clears the valley mist.",
    pros: "100% clear waterfall view with zero fog obstruction.",
    cons: "None. All 4 members agree."
  },
  replan_indoor_cultural: {
    id: "replan_indoor_cultural",
    title: "Option W2: Cultural Heritage Day Route",
    tag: "Rain-Safe Alternative",
    timeImpact: "0 hr delay",
    costImpact: "₹0 cost impact",
    costNum: 0,
    description: "Swap wet trails for Don Bosco Indigenous Culture Museum & Ever Living Heritage Village in Shillong.",
    pros: "Completely dry, warm, and rich indoor learning.",
    cons: "Postpones root bridge trek to Day 3."
  }
};

export const SENTINEL_ALERTS_INITIAL = [
  {
    id: "al-1",
    category: "transit",
    title: "IndiGo 6E-2089 Route Status",
    badge: "Monitoring",
    severity: "normal",
    statusText: "On Schedule (Departs 12:15 PM DEL • Gate 42A)",
    time: "Live Feed • 5m ago"
  },
  {
    id: "al-2",
    category: "weather",
    title: "Cherrapunji & Sohra Cloud Radar",
    badge: "Valley Mist",
    severity: "warning",
    statusText: "Mild valley mist expected between 10:30 AM - 12:00 PM on Day 2. Myra morning waterfall slot remains optimal.",
    time: "Live Feed • 12m ago"
  },
  {
    id: "al-3",
    category: "hotel",
    title: "Ri Kynjai Lake Resort Check-in Hold",
    badge: "Guaranteed",
    severity: "normal",
    statusText: "2 Interconnected Lake Cottages (101 & 102) held with 24-hr late arrival guarantee under MMT-HTL-8891.",
    time: "Confirmed via API"
  },
  {
    id: "al-4",
    category: "activity",
    title: "Nohkalikai Zipline & Living Root Bridges",
    badge: "Open & Certified",
    severity: "normal",
    statusText: "All trails dry, forest guards active, zip harness safety certified as of 06:00 AM today.",
    time: "Safety Verified"
  }
];

// Granular Day-Level Calendar Slots for Interactive Member Availability Picking
export const CALENDAR_SLOTS_DATA = {
  "win-1": [ // Mid-October (Meghalaya)
    { dateKey: "2026-10-14", dayNum: 14, dayName: "Wed", month: "Oct", isWeekend: false, status: "available", flightSurge: "Standard", crowdLevel: "Low" },
    { dateKey: "2026-10-15", dayNum: 15, dayName: "Thu", month: "Oct", isWeekend: false, status: "available", flightSurge: "Low (-10%)", crowdLevel: "Low" },
    { dateKey: "2026-10-16", dayNum: 16, dayName: "Fri", month: "Oct", isWeekend: true, status: "recommended", flightSurge: "Optimal Deal", crowdLevel: "Moderate", note: "IndiGo 12:45 PM fits Rohan's client demo", recommendedStart: true },
    { dateKey: "2026-10-17", dayNum: 17, dayName: "Sat", month: "Oct", isWeekend: true, status: "recommended", flightSurge: "Weekend Rate", crowdLevel: "Moderate", note: "Prime waterfall clarity" },
    { dateKey: "2026-10-18", dayNum: 18, dayName: "Sun", month: "Oct", isWeekend: true, status: "recommended", flightSurge: "Weekend Rate", crowdLevel: "Moderate", note: "Dawki river glass transparency" },
    { dateKey: "2026-10-19", dayNum: 19, dayName: "Mon", month: "Oct", isWeekend: false, status: "recommended", flightSurge: "Lowest Return", crowdLevel: "Low", note: "IndiGo 6E-689 at 01:30 PM", recommendedEnd: true },
    { dateKey: "2026-10-20", dayNum: 20, dayName: "Tue", month: "Oct", isWeekend: false, status: "available", flightSurge: "Standard", crowdLevel: "Low" },
    { dateKey: "2026-10-21", dayNum: 21, dayName: "Wed", month: "Oct", isWeekend: false, status: "available", flightSurge: "Standard", crowdLevel: "Low" },
    { dateKey: "2026-10-22", dayNum: 22, dayName: "Thu", month: "Oct", isWeekend: false, status: "available", flightSurge: "Standard", crowdLevel: "Low" },
    { dateKey: "2026-10-23", dayNum: 23, dayName: "Fri", month: "Oct", isWeekend: true, status: "surge", flightSurge: "Diwali Surge (+40%)", crowdLevel: "High" }
  ],
  "default": [
    { dateKey: "2026-11-20", dayNum: 20, dayName: "Fri", month: "Nov", isWeekend: true, status: "recommended", flightSurge: "Optimal", crowdLevel: "Moderate" },
    { dateKey: "2026-11-21", dayNum: 21, dayName: "Sat", month: "Nov", isWeekend: true, status: "recommended", flightSurge: "Optimal", crowdLevel: "Moderate" },
    { dateKey: "2026-11-22", dayNum: 22, dayName: "Sun", month: "Nov", isWeekend: true, status: "recommended", flightSurge: "Optimal", crowdLevel: "Moderate" },
    { dateKey: "2026-11-23", dayNum: 23, dayName: "Mon", month: "Nov", isWeekend: false, status: "recommended", flightSurge: "Optimal", crowdLevel: "Moderate" }
  ]
};
