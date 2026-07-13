const siteContent = {
  name: "Justin Oh",
  brandMark: "JO",

  hero: {
    eyebrow: "Computer Engineering @ NYU Tandon · Class of 2027",
    title: "I build software, automation, and systems that ship.",
    subtitle:
      "I’m Justin Oh, a computer engineering student at NYU Tandon. I’ve built an AI-powered operations assistant running in production, co-founded an e-commerce business, and worked across full-stack development, databases, and embedded systems. I’m looking for software, embedded, or firmware engineering internships.",
    primaryCta: {
      label: "View Projects",
      href: "#projects"
    },
    secondaryCta: {
      label: "Download Résumé",
      href: "assets/Justin-Oh-Resume.pdf"
    },
    meta: [
      { label: "Focus", value: "Software · Full-Stack · Embedded" },
      { label: "Education", value: "NYU Tandon ’27" },
      { label: "Seeking", value: "SWE / Embedded internships" }
    ],
    portrait: {
      label: "Justin K. Oh",
      text: "Computer Engineering · NYU Tandon",
      image: "assets/headshot-conference.jpg"
    },
    sideCards: [
      {
        label: "Currently",
        title: "Software Dev @ Alltramatic",
        text: "Built “Jason,” an AI WhatsApp assistant running in production for a NYC property manager."
      },
      {
        label: "Co-Founder",
        title: "Coravii — DTC e-commerce",
        text: "$50K+ in revenue and 3,000+ monthly visitors on a store I built and run."
      }
    ]
  },

  about: {
    title: "Who I Am",
    paragraphs: [
      "I’m a computer engineering student at NYU Tandon (B.S., expected May 2027) who likes turning ideas into real, working systems — from an agentic AI assistant handling live customer conversations to a co-founded e-commerce store with real revenue.",
      "My work spans full-stack development (FastAPI, React, Node.js, PostgreSQL), automation, AI/LLM evaluation, databases, and embedded systems in C/C++. I care about clean engineering and shipping things people actually use."
    ],
    skillsTitle: "Skills",
    skillGroups: [
      {
        label: "Languages",
        items: ["Python", "C", "C++", "SQL", "JavaScript", "Verilog", "HTML/CSS", "x86 Assembly"]
      },
      {
        label: "Frameworks & Tools",
        items: ["FastAPI", "React", "Node.js", "PostgreSQL", "MySQL", "Git", "Linux", "Docker", "Vivado"]
      },
      {
        label: "Focus Areas",
        items: ["Full-Stack", "AI / LLM Evaluation", "Automation", "Databases", "Computer Architecture", "Robot Vision"]
      }
    ]
  },

  projects: {
    sectionNote:
      "A few things I’ve designed, built, and shipped — from production AI to embedded hardware.",
    items: [
      {
        title: "Jason — AI WhatsApp Assistant",
        meta: "Alltramatic · 2025–2026",
        featured: true,
        description:
          "An AI-powered WhatsApp assistant running in production for a NYC property management company, automating prospect lead capture, FAQ handling, viewing scheduling, and maintenance routing across two buildings. Containerized full-stack system — FastAPI/Python backend, PostgreSQL (SQLAlchemy), a Node.js WhatsApp bridge, and a React/Vite admin dashboard — with an agentic Claude tool-use loop (9+ tools) and human-in-the-loop escalation.",
        image: "assets/thumbs/jason.svg",
        tags: ["Python", "FastAPI", "PostgreSQL", "React", "Claude API", "Docker"],
        links: [
          { label: "Private — client work", url: "" }
        ]
      },
      {
        title: "Air Ticket Reservation System",
        meta: "2026",
        description:
          "A full-stack airline reservation web app (PHP, MySQL, WAMP) with customer authentication, session-based login, flight search, and ticket purchasing. Designed a normalized relational schema across airlines, airports, airplanes, flights, tickets, customers, and staff, with SQL queries for availability, booking history, and staff reports.",
        image: "assets/thumbs/tickets.svg",
        tags: ["PHP", "MySQL", "SQL", "Full-Stack"],
        links: [
          { label: "Code", url: "https://github.com/justinoh9/Airplane-Ticket-Reservation-System" }
        ]
      },
      {
        title: "Machine Learning Review Analyzer",
        meta: "2025",
        description:
          "A Python pipeline that trains a TF-IDF + Logistic Regression sentiment classifier on labeled review data (~88% cross-validated accuracy), then scores new e-commerce reviews into a report: sentiment breakdown, a health score, model-derived themes, a stars-vs-sentiment mismatch check, and suspicious-review flags. Ships as two CLIs with a test suite.",
        image: "assets/thumbs/ml-analyzer.svg",
        tags: ["Python", "scikit-learn", "NLP", "pandas"],
        links: [
          { label: "Code", url: "https://github.com/justinoh9/machine-learning-review-analyzer" }
        ]
      },
      {
        title: "Solarbrella — Light-Tracking Solar Umbrella",
        meta: "Sep 2023 – Jan 2024",
        description:
          "An Arduino-based light-tracking system in C++ using sensor input and servo control to orient dual solar panel arrays toward maximum light — measuring up to 25% higher output versus a fixed angle (16.9V from the hand-wired series array). Built the hardware end to end with Fusion 360, 3D printing, laser-cut mounts, sensors, servos, and power circuits under budget constraints.",
        image: "assets/solarbrella/solarbrella-full.jpg",
        tags: ["Arduino", "C++", "Embedded", "Hardware"],
        links: [
          { label: "Servo mechanism", url: "assets/solarbrella/solarbrella-mechanism.jpg" },
          { label: "Panel testing", url: "assets/solarbrella/solarbrella-testing.jpg" },
          { label: "Panel arrays", url: "assets/solarbrella/solarbrella-panels.jpg" }
        ]
      }
    ]
  },

  experience: {
    sectionNote:
      "Where I’ve worked and what I’ve shipped.",
    items: [
      {
        date: "2023 — May 2027",
        role: "B.S. Computer Engineering",
        company: "New York University, Tandon School of Engineering",
        location: "Brooklyn, NY",
        bullets: [
          "Relevant coursework: Data Structures & Algorithms, Computer Architecture, Databases, Digital Logic, Electronics, Robot Vision, Linear Algebra."
        ]
      },
      {
        date: "Sep 2025 — May 2026",
        role: "Software Developer / Operations Automation",
        company: "Alltramatic",
        location: "New York, NY",
        bullets: [
          "Built “Jason,” an AI-powered WhatsApp assistant for a NYC property management company — automating lead capture, FAQ handling, viewing scheduling, and maintenance routing across two residential buildings.",
          "Architected a containerized full-stack system: FastAPI/Python backend, PostgreSQL (SQLAlchemy), a Node.js WhatsApp bridge, and a React/Vite admin dashboard, orchestrated with Docker Compose behind an HTTPS reverse proxy.",
          "Implemented an agentic LLM tool-use loop (Anthropic Claude API) with 9+ tools and human-in-the-loop escalation, plus scheduled outbound automation and a lead-funnel analytics dashboard."
        ]
      },
      {
        date: "Feb 2026 — Present",
        role: "AI Model Evaluation Fellow",
        company: "Handshake AI Fellowship",
        location: "Remote",
        bullets: [
          "Evaluate large language model outputs for reasoning quality, factual accuracy, instruction-following, and safety across structured assessment tasks.",
          "Analyze prompt–response pairs to identify hallucinations, incomplete reasoning, and failure modes, providing detailed written feedback for model improvement."
        ]
      },
      {
        date: "May 2025 — Present",
        role: "Co-Founder / Developer",
        company: "Coravii",
        location: "New York, NY",
        bullets: [
          "Co-founded and built a direct-to-consumer e-commerce store (Shopify, HTML/CSS, JavaScript) supporting 3,000+ monthly visitors and $50,000+ in revenue.",
          "Manage product pages, analytics, checkout optimization, and live customer-facing updates across active traffic."
        ]
      }
    ]
  },

  personal: {
    sectionTitle: "Beyond Engineering",
    sectionNote:
      "A more personal side — things I genuinely enjoy outside of school and work.",
    pages: [
      {
        title: "Cooking",
        description:
          "Meals, recipes, and food I’ve made or enjoyed recently.",
        image: "assets/thumbs/cooking.svg",
        href: "cooking.html",
        tags: ["Food", "Recipes", "Personal"]
      },
      {
        title: "Cars",
        description:
          "Cars I enjoy driving, thinking about, and working on.",
        image: "assets/thumbs/cars.svg",
        href: "cars.html",
        tags: ["Cars", "Mods", "Personal"]
      }
    ]
  },

  contact: {
    title: "Let’s build something.",
    copy:
      "I’m always glad to talk about engineering, internships, or interesting problems — reach out through any of these.",
    items: [
      {
        label: "Email",
        value: "justinoh@nyu.edu",
        action: "Email",
        url: "mailto:justinoh@nyu.edu"
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/justin-k-oh",
        action: "Visit",
        url: "https://www.linkedin.com/in/justin-k-oh/"
      },
      {
        label: "GitHub",
        value: "github.com/justinoh9",
        action: "Visit",
        url: "https://github.com/justinoh9"
      }
    ],
    availability: {
      eyebrow: "Open to internships",
      headline: "Seeking software, embedded & firmware internships.",
      copy:
        "Computer engineering student at NYU Tandon (graduating May 2027), looking for internships in software, embedded systems, firmware, or computer hardware.",
      buttonLabel: "Download Résumé",
      buttonUrl: "assets/Justin-Oh-Resume.pdf"
    }
  },

  cooking: {
    eyebrow: "Personal Page",
    pageTitle: "Cooking",
    intro: "Meals, recipes, and food I’ve made or enjoyed recently.",
    sectionTitle: "Recent Meals",
    sectionNote: "Food I’ve cooked or enjoyed — captions coming soon.",
    items: [
      { image: "assets/gallery/food/IMG_7602.jpg", caption: "Crispy-skin salmon with broccoli — one of my go-to high-protein dinners." },
      { image: "assets/gallery/food/IMG_6765.jpg", caption: "Thin-sliced beef hitting the pan for a rice bowl." },
      { image: "assets/gallery/food/IMG_7969.jpg", caption: "Homemade fried rice, egg and scallions, finished with a sauce drizzle." },
      { image: "assets/gallery/food/IMG_8374.jpg", caption: "Pho night — always worth the effort." },
      { image: "assets/gallery/food/IMG_9363.jpg", caption: "Creamy tomato penne with plenty of parmesan." },
      { image: "assets/gallery/food/IMG_7323.jpg", caption: "Penne with parm and herbs, kept it simple." },
      { image: "assets/gallery/food/IMG_7957.jpg", caption: "Shrimp and green bean pasta." },
      { image: "assets/gallery/food/IMG_7004.jpg", caption: "Big square pepperoni pizza." },
      { image: "assets/gallery/food/IMG_7499.jpg", caption: "Fresh dragon fruit — as good to look at as it is to eat." },
      { image: "assets/gallery/food/IMG_6082.jpg", caption: "Drinks with the crew." },
    ]
  },

  cars: {
    eyebrow: "Personal Page",
    pageTitle: "Cars",
    intro: "Cars I enjoy driving, thinking about, and working on.",
    sectionTitle: "Cars & Mods",
    sectionNote: "My BMW and the mods and maintenance I’ve done — captions coming soon.",
    items: [
      { image: "assets/gallery/cars/IMG_6251.jpg", caption: "My BMW 3-series — the car that started the whole project." },
      { image: "assets/gallery/cars/IMG_9192.jpg", caption: "Hood up, drain pan underneath — oil change day." },
      { image: "assets/gallery/cars/IMG_9202.jpg", caption: "Up on jack stands and ready to get underneath." },
      { image: "assets/gallery/cars/IMG_6457.jpg", caption: "Ambient lighting set to purple." },
      { image: "assets/gallery/cars/IMG_6343.jpg", caption: "Same cabin, teal mood." },
      { image: "assets/gallery/cars/IMG_6342.jpg", caption: "Center console apart — mid interior job." },
      { image: "assets/gallery/cars/IMG_6277.jpg", caption: "Door panel off, working on the interior." },
      { image: "assets/gallery/cars/IMG_7920.jpg", caption: "Gloss-black mirror caps on." },
      { image: "assets/gallery/cars/IMG_7914.jpg", caption: "Before shot — factory mirror." },
      { image: "assets/gallery/cars/IMG_8142.jpg", caption: "Test-fitting the rear trunk lip." },
      { image: "assets/gallery/cars/IMG_7981.jpg", caption: "Cold air intake going in." },
      { image: "assets/gallery/cars/IMG_6254.jpg", caption: "Under the hood." },
      { image: "assets/gallery/cars/IMG_6721.jpg", caption: "Fresh oil filter before it goes in." },
      { image: "assets/gallery/cars/IMG_9210.jpg", caption: "Oil pan pulled and ready to swap." },
      { image: "assets/gallery/cars/IMG_9209.jpg", caption: "View from underneath." },
      { image: "assets/gallery/cars/IMG_9207.jpg", caption: "Poking around the underbody." },
      { image: "assets/gallery/cars/IMG_7419.jpg", caption: "Exhaust work — chasing a better note." },
      { image: "assets/gallery/cars/IMG_7573.jpg", caption: "Wheel and tire up close." },
      { image: "assets/gallery/cars/IMG_7450.jpg", caption: "Front end, tools out on the garage floor." },
      { image: "assets/gallery/cars/IMG_7714.jpg", caption: "Garage setup for the day." },
      { image: "assets/gallery/cars/IMG_7974.jpg", caption: "New parts, freshly unboxed." },
      { image: "assets/gallery/cars/IMG_9216.jpg", caption: "Typical wrenching session in the garage." },
      { image: "assets/gallery/cars/IMG_6173.jpg", caption: "Interior trim and speaker detail." },
      { image: "assets/gallery/cars/IMG_6201.jpg", caption: "Close-up on the door trim." },
      { image: "assets/gallery/cars/IMG_6202.jpg", caption: "Speaker grille and leather up close." },
    ]
  }
};
