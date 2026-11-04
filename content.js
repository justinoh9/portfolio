const siteContent = {
  name: "Justin Oh",

  // Hero "desktop" windows. Positions and sizes live in styles.css (.w-*).
  hero: {
    about: {
      title: "Hey, I’m Justin.",
      paragraphs: [
        "I study computer engineering at NYU Tandon. Lately I’ve been building AI tools, web apps, and the occasional piece of hardware."
      ]
    },
    photos: [
      { key: "portrait", file: "justin.jpg", image: "assets/headshot-career-fair.jpg", alt: "Justin Oh in a suit at a career fair" },
      { key: "solar", file: "solarbrella.jpg", href: "#solarbrella", image: "assets/solarbrella/solarbrella-full.jpg", alt: "Open the Solarbrella project: a prototype with two tilting solar panel arrays" },
      { key: "jelli", file: "jelli.app", href: "#jelli", image: "assets/work/jelli-demo.png", alt: "Open the Jelli project: a head-to-head album comparison beside a ranked list" },
      { key: "air", file: "northline.app", href: "#air-tickets", image: "assets/work/airline-demo.png", alt: "Open the airline reservation project: its flight search with live SQL queries" }
    ],
    // Faint, tinted photos behind the hero windows. Decorative only.
    background: ["assets/personal/canyon.jpg", "assets/personal/garden.jpg", "assets/personal/lake.jpg"],
    terminal: [
      { cmd: "whoami", out: "justin oh, computer engineering @ nyu tandon" },
      { cmd: "ls ~/work", out: "ai-assistant/  jelli/  solarbrella/  air-tickets/  review-analyzer/" },
      { cmd: "cat status", out: "open to software internships, and hardware roles too" }
    ]
  },

  intro: {
    status: "Open to internships. Graduating December 2027."
  },

  experience: {
    items: [
      {
        year: "2026",
        company: "Handshake AI Fellowship",
        role: "AI Model Evaluation Fellow",
        dates: "Feb 2026 – Present · Remote",
        bullets: [
          "Evaluate LLM responses for reasoning, accuracy, following instructions, and safety.",
          "Write up where responses go wrong, like hallucinations or incomplete reasoning, as feedback for improving the models."
        ]
      },
      {
        year: "2025",
        company: "Alltramatic",
        role: "Software Developer / Operations Automation",
        dates: "Sep 2025 – May 2026 · New York, NY",
        bullets: [
          "Built a WhatsApp assistant for a property-management company. It captures leads, answers common questions, schedules viewings, and routes maintenance requests.",
          "The backend is FastAPI and PostgreSQL (SQLAlchemy), with a Node.js bridge to WhatsApp and a React/Vite admin dashboard, all running in Docker Compose behind an HTTPS reverse proxy.",
          "The assistant runs on a Claude tool-use loop and hands off to a person when it’s unsure. I also built scheduled outbound messages and a dashboard for tracking the lead funnel."
        ]
      },
      {
        year: "2023",
        company: "NYU Tandon",
        role: "B.S. Computer Engineering",
        dates: "2023 – Dec 2027 · Brooklyn, NY",
        bullets: [
          "Coursework: Data Structures & Algorithms, Computer Architecture, Databases, Digital Logic, Electronics, Robot Vision, Linear Algebra."
        ]
      }
    ]
  },

  // column: which side of the staggered grid. order: position on phones (one column).
  projects: [
    {
      slug: "ai-assistant",
      demo: { url: "demos/assistant/", label: "Watch the replay", badge: "Interactive replay" },
      title: "WhatsApp assistant for a leasing team",
      label: "Client work (2025–26)",
      column: 1,
      order: 1,
      art: "image",
      image: "assets/work/assistant-demo.png",
      alt: "The assistant replay: a WhatsApp chat, the agent's tool calls, and a team dashboard side by side",
      ratio: "4 / 3",
      description:
        "A WhatsApp assistant running in production for a property-management company. It captures leads, answers common questions, schedules viewings, and routes maintenance requests. The Python backend (FastAPI, PostgreSQL) runs a Claude tool-use loop, with a Node.js bridge to WhatsApp and a React/Vite admin dashboard. Anything it isn’t sure about goes to a person.",
      tags: ["Python", "FastAPI", "PostgreSQL", "React", "Claude API", "Docker"],
      links: [],
      note: "This is private client work, so the code isn’t public."
    },
    {
      slug: "jelli",
      demo: { url: "demos/jelli/", label: "Try the ranking engine", badge: "Interactive demo" },
      title: "Letterboxd for albums",
      label: "Jelli, with Eddie Guan (2026)",
      column: 2,
      order: 2,
      art: "image",
      image: "assets/work/jelli-demo.png",
      alt: "A head-to-head album comparison beside a ranked list, from the Jelli ranking demo",
      ratio: "1200 / 630",
      description:
        "A music-rating app, basically Letterboxd for albums, that builds for iOS, Android, and web from one codebase. Picking a score out of 10 from nothing is hard, so you give a rough score and then compare the album against ones you’ve already ranked until it finds its spot. It’s Expo/React Native and TypeScript on Supabase, with no custom server. Rules the client can’t be trusted with are enforced in Postgres through row-level security and security-definer functions. Music data comes from iTunes, Last.fm, and Deezer behind swappable interfaces, which we moved to after Spotify’s API limits got in the way.",
      tags: ["React Native", "TypeScript", "Expo", "Supabase", "PostgreSQL", "RLS"],
      links: [
        { label: "Case study", url: "https://github.com/justinoh9/heard-app/blob/main/CASE_STUDY.md" },
        { label: "Code", url: "https://github.com/justinoh9/heard-app" }
      ]
    },
    {
      slug: "solarbrella",
      demo: { url: "demos/solarbrella/", label: "Try the simulation", badge: "Interactive demo" },
      title: "Solar umbrella that tracks the light",
      label: "Solarbrella (2023–24)",
      column: 2,
      order: 3,
      art: "image",
      image: "assets/solarbrella/solarbrella-full.jpg",
      alt: "The Solarbrella prototype, with two tilting solar panel arrays above a canopy",
      ratio: "4 / 5",
      position: "48% 12%",
      description:
        "An umbrella with two arrays of solar panels that tilt toward the light. An Arduino running C++ reads the sensors and drives the servos. It produced up to 25% more than a fixed angle, and the hand-wired series array reached 16.9V. The mechanism was designed in Fusion 360, then 3D printed and laser cut, all on a small budget.",
      tags: ["Arduino", "C++", "Embedded", "Hardware"],
      links: [
        { label: "Servo mechanism", url: "assets/solarbrella/solarbrella-mechanism.jpg" },
        { label: "Panel testing", url: "assets/solarbrella/solarbrella-testing.jpg" },
        { label: "Panel arrays", url: "assets/solarbrella/solarbrella-panels.jpg" }
      ]
    },
    {
      slug: "air-tickets",
      demo: { url: "demos/airline/", label: "Try the live demo", badge: "Live demo" },
      title: "Airline reservation system",
      label: "Air tickets (2026)",
      column: 1,
      order: 4,
      art: "image",
      image: "assets/work/airline-demo.png",
      alt: "The airline reservation demo: flight search results beside a panel of live SQL queries",
      ratio: "8 / 5",
      description:
        "An airline booking site in PHP and MySQL, with customer logins, flight search, ticket purchases, and tools for airline staff. The normalized schema covers airlines, airports, airplanes, flights, tickets, customers, and staff, with SQL queries for availability, booking history, and staff reports.",
      tags: ["PHP", "MySQL", "SQL", "Full-Stack"],
      links: [
        { label: "Code", url: "https://github.com/justinoh9/Airplane-Ticket-Reservation-System" }
      ]
    },
    {
      slug: "review-analyzer",
      demo: { url: "demos/reviews/", label: "Try the live model", badge: "Live demo" },
      title: "Sentiment analysis for product reviews",
      label: "Review analyzer (2025)",
      column: 1,
      order: 5,
      art: "image",
      image: "assets/work/reviews-demo.png",
      alt: "The review analyzer: one scored review with the words that drove it, beside a batch report",
      ratio: "2 / 1",
      description:
        "A Python pipeline that trains a TF-IDF and logistic regression classifier on a small labeled set of 136 reviews. It scored 88% on the held-out test split and about 85% in cross-validation. Give it new reviews and it reports the sentiment split, a health score, common themes, places where the stars and the text disagree, and reviews that look suspicious. It comes with two command-line tools and a test suite.",
      tags: ["Python", "scikit-learn", "NLP", "pandas"],
      links: [
        { label: "Code", url: "https://github.com/justinoh9/machine-learning-review-analyzer" }
      ]
    }
  ],

  // A small section near the bottom. The projects stay the focus.
  personal: {
    label: "Off the clock",
    copy: "I like getting outside, cooking, and working on my car.",
    links: [
      { label: "Cooking", href: "cooking.html" },
      { label: "Cars", href: "cars.html" }
    ],
    photos: [
      { image: "assets/personal/canyon.jpg", alt: "Justin sitting on a rock above a river canyon" },
      { image: "assets/personal/garden.jpg", alt: "Justin walking through a garden of sculpted trees" },
      { image: "assets/personal/lake.jpg", alt: "Justin on a boat on a lake, with a dam behind him" }
    ]
  },

  skills: {
    label: "Toolbox",
    groups: [
      { label: "Languages", items: "Python, C, C++, SQL, JavaScript, Verilog, HTML/CSS, x86 Assembly" },
      { label: "Frameworks + tools", items: "FastAPI, React, Node.js, PostgreSQL, MySQL, Git, Linux, Docker, Vivado" },
      { label: "Focus areas", items: "Full-stack, AI / LLM evaluation, automation, databases, computer architecture, robot vision" }
    ]
  },

  contact: {
    title: "Say hi!",
    copy: "I’m mostly looking for software internships, but I’m open to hardware engineering roles too! If you’re hiring or just want to talk about a project, reach out.",
    resumeUrl: "",
    items: [
      { label: "Email", value: "justinoh@nyu.edu", url: "mailto:justinoh@nyu.edu" },
      { label: "LinkedIn", value: "linkedin.com/in/justin-k-oh", url: "https://www.linkedin.com/in/justin-k-oh/" },
      { label: "GitHub", value: "github.com/justinoh9", url: "https://github.com/justinoh9" }
    ]
  },

  cooking: {
    eyebrow: "Personal Page",
    pageTitle: "Cooking",
    intro: "Meals, recipes, and food I’ve made or enjoyed recently.",
    sectionTitle: "Recent Meals",
    sectionNote: "Food I’ve cooked at home, plus a few favorites I go out for.",
    items: [
      { image: "assets/gallery/food/IMG_7602.jpg", caption: "Using a stainless steel pan, I cooked salmon with crispy skin, as well as some blanched broccoli over a pan sauce." },
      { image: "assets/gallery/food/IMG_6765.jpg", caption: "Enoki mushrooms with beef slices, later added a sweet soy sauce glaze." },
      { image: "assets/gallery/food/IMG_7969.jpg", caption: "Fried rice, egg and scallions, finished with an oyster sauce drizzle. Tried to be artistic." },
      { image: "assets/gallery/food/IMG_9363.jpg", caption: "Creamy tomato penne with plenty of parmesan." },
      { image: "assets/gallery/food/IMG_7323.jpg", caption: "Penne with parm and herbs, kept it simple." },
      { image: "assets/gallery/food/IMG_7957.jpg", caption: "Simple butter noodles and shrimp." },
      { image: "assets/gallery/food/IMG_8374.jpg", caption: "My favorite food, Pho. Really time consuming to make so I usually go out and buy it." },
      { image: "assets/gallery/food/IMG_7004.jpg", caption: "Went to a local pizza place with friends and ordered a hot honey pizza." },
      { image: "assets/gallery/food/IMG_7499.jpg", caption: "Really nice looking dragon fruit, but didn't taste sweet :(" },
      { image: "assets/gallery/food/IMG_6082.jpg", caption: "Caffeine for getting work done." },
        ]
  },

  cars: {
    eyebrow: "Personal Page",
    pageTitle: "Cars",
    intro: "Cars I enjoy driving, thinking about, and working on.",
    sectionTitle: "Cars & Mods",
    sectionNote: "My BMW and the mods, repairs, and maintenance I’ve done myself.",
    items: [
      { image: "assets/gallery/cars/IMG_6251.jpg", caption: "Installing new black front grille (Before)" },
      { image: "assets/gallery/cars/IMG_6254.jpg", caption: "Installing black front grille (After)" },
      { image: "assets/gallery/cars/IMG_7914.jpg", caption: "Mirror cap change (Before)" },
      { image: "assets/gallery/cars/IMG_7920.jpg", caption: "Mirror cap change (After)" },
      { image: "assets/gallery/cars/IMG_8142.jpg", caption: "Installing front lip." },
      { image: "assets/gallery/cars/IMG_7450.jpg", caption: "Installing vinyl tint over reflectors." },
      { image: "assets/gallery/cars/IMG_7974.jpg", caption: "eBay \"cold air intake.\"" },
      { image: "assets/gallery/cars/IMG_7981.jpg", caption: "Custom fabricated plexiglass \"cold air intake\" cover." },
      { image: "assets/gallery/cars/IMG_7419.jpg", caption: "Changing exhaust out for an aftermarket exhaust. Job took incredibly long due to tools failing, but the result made it all worth it." },
      { image: "assets/gallery/cars/IMG_6342.jpg", caption: "Installation of center console ambient lighting (Before)" },
      { image: "assets/gallery/cars/IMG_6343.jpg", caption: "Installation of center console ambient lighting (After)" },
      { image: "assets/gallery/cars/IMG_6457.jpg", caption: "Coding custom ambient lighting using BimmerCode and changing hex values." },
      { image: "assets/gallery/cars/IMG_6173.jpg", caption: "Interior trim door handle damage repair (Before)" },
      { image: "assets/gallery/cars/IMG_6201.jpg", caption: "Interior trim door handle damage repair (Middle)" },
      { image: "assets/gallery/cars/IMG_6202.jpg", caption: "Interior trim door handle damage repair (After)" },
      { image: "assets/gallery/cars/IMG_6277.jpg", caption: "Door panel off attempting to fix a dent on the door myself (didn't go so well, learned a lot)." },
      { image: "assets/gallery/cars/IMG_6721.jpg", caption: "Fresh oil filter before it goes in." },
      { image: "assets/gallery/cars/IMG_9192.jpg", caption: "Connecting pressure bleeder to master cylinder for brake fluid change." },
      { image: "assets/gallery/cars/IMG_9202.jpg", caption: "Car on jackstands to change transmission fluid and replace the fluid pan filter." },
      { image: "assets/gallery/cars/IMG_9209.jpg", caption: "View of transmission with fluid pan off." },
      { image: "assets/gallery/cars/IMG_9207.jpg", caption: "Second angle of transmission with fluid pan off." },
      { image: "assets/gallery/cars/IMG_9210.jpg", caption: "Before and after of the transmission fluid filter pan." },
      { image: "assets/gallery/cars/IMG_9216.jpg", caption: "Aftermath of the transmission fluid + pan change." },
      { image: "assets/gallery/cars/IMG_7573.jpg", caption: "Wheel almost bursting and holding on by threads." },
      { image: "assets/gallery/cars/IMG_7714.jpg", caption: "Negotiated a deal for a pressure washer setup from Facebook Marketplace." },
        ]
  }
};
