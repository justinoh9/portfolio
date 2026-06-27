const siteContent = {
  name: "Justin Oh",
  brandMark: "JO",

  hero: {
    eyebrow: "Computer Engineering Student • Builder • Problem Solver",
    title: "Designing systems with ambition and clarity.",
    subtitle:
      "I’m Justin Oh, a computer engineering student at NYU building software, embedded systems, and practical tools that turn ideas into real, usable products. I care about clean engineering, thoughtful design, and projects that feel sharp both technically and visually.",
    primaryCta: {
      label: "View Projects",
      href: "#projects"
    },
    secondaryCta: {
      label: "Get In Touch",
      href: "#contact"
    },
    meta: [
      { label: "Focus", value: "Software • Embedded • Systems" },
      { label: "Based In", value: "New York" },
      { label: "Seeking", value: "Internships & projects" }
    ],
    portrait: {
      label: "Current Direction",
      text: "Building stronger software skills and projects focusing on AI",
      image: "assets/Screenshot 2026-03-27 163232.png"
    },
    sideCards: [
      {
        label: "Recent Work",
        title: "Machine Learning Review Analyzer",
        text: "Python scraper + NLP workflow for e-commerce insight."
      },
      {
        label: "Interests",
        title: "Vision • Hardware • Product",
        text: "I like projects that combine engineering depth with polish."
      }
    ]
  },

  about: {
    //sectionNote:
    //  "More about me!",
    title: "Who I Am",
    paragraphs: [
      "I’m a computer engineering student who enjoys building across software and hardware. My work spans Python, C++, AI/Machine Learning, Robot Vision, SQL, digital systems, and project-driven problem solving.",
      "I’m especially interested in roles where I can grow as an engineer while shipping things that matter. I like websites that feel calm, confident, and intentional rather than crowded."
    ],
    skillsTitle: "Core Stack",
    skills: [
      { name: "Python", detail: "Automation, scraping, AI workflows" },
      { name: "C++", detail: "Systems and OOP projects" },
      { name: "SQL", detail: "Databases and querying" },
      { name: "Verilog", detail: "Digital logic and hardware design" },
      { name: "HTML/CSS/JS", detail: "Portfolio and frontend foundations" },
      { name: "GitHub", detail: "Version control and deployment" }
    ]
  },

  projects: {
    //sectionNote:
    //  "",
    items: [
      {
        title: "Machine Learning Review Analyzer",
        description:
          "A Python pipeline that trains a TF-IDF + Logistic Regression sentiment classifier on labeled review data (~88% accuracy), then scores new e-commerce reviews into a report: sentiment breakdown, a health score, model-derived themes, a stars-vs-sentiment mismatch check, and suspicious-review flags. Ships as two CLIs with tests.",
        image: "",
        tags: ["Python", "scikit-learn", "NLP"],
        links: [
          { label: "Code", url: "https://github.com/justinoh9/machine-learning-review-analyzer" }
        ]
      },
      {
        title: "E20 / E15 Simulator",
        description:
          "A systems-focused C++ project modeling low-level computer architecture concepts through custom classes, instruction behavior, and memory interactions.",
        image: "",
        tags: ["C++", "Architecture", "Simulation"],
        links: [
          { label: "Case Study", url: "#" },
          { label: "Code", url: "https://github.com/justinoh9" }
        ]
      },
      {
        title: "Airplane Ticket Reservation System",
        description:
          "Ticket reservation system. Using this system, customers can search for flights (one way or round trip), purchase flight tickets, view their future flight status, or see their past flights etc. Airline staff can add new airplanes, create new flights, and update flight status..",
        image: "",
        tags: ["Python", "SQL", "Databases"],
        links: [
          { label: "Overview", url: "#" },
          { label: "Code", url: "https://github.com/justinoh9/Airplane-Ticket-Reservation-System" }
        ]
      },
      {
        // Real, verified description — this is the chatbot project Justin built.
        title: "Jason — AI Leasing Assistant",
        description:
          "An AI assistant that runs leasing conversations end to end: it answers prospect messages across WhatsApp and Discord, matches renters to available units, schedules viewings, and handles bounded rent negotiation — escalating to a human when needed. Backed by a FastAPI service and a React operator dashboard for live monitoring and overrides.",
        image: "",
        tags: ["Python", "FastAPI", "React", "AI"],
        links: [
          { label: "Overview", url: "#" },
          { label: "Code", url: "https://github.com/justinoh9" }
        ]
      },
      // REVIEW: The three entries below are real projects of Justin's, but the
      // copy is written conservatively because the exact details weren't verified.
      // Replace each description/links/tags with the accurate specifics when ready.
      {
        title: "Coravii",
        description:
          "An e-commerce venture I co-founded — work spanning the storefront, the customer experience, and the operations behind it.",
        image: "",
        tags: ["E-Commerce", "Full-Stack", "Founder"],
        links: [
          { label: "Overview", url: "#" },
          { label: "Code", url: "https://github.com/justinoh9" }
        ]
      },
      {
        title: "Solar Umbrella",
        description:
          "A solar-powered umbrella concept pairing embedded electronics with practical hardware design to capture energy while providing shade.",
        image: "",
        tags: ["Embedded", "Hardware"],
        links: [
          { label: "Overview", url: "#" },
          { label: "Code", url: "https://github.com/justinoh9" }
        ]
      },
      {
        title: "AeroMod Flight Computer",
        description:
          "Flight-computer work done as Technology Officer at AeroMod Systems, spanning embedded firmware and sensor integration.",
        image: "",
        tags: ["Embedded", "C++", "Firmware"],
        links: [
          { label: "Overview", url: "#" },
          { label: "Code", url: "https://github.com/justinoh9" }
        ]
      }
    ]
  },

  experience: {
    //sectionNote:
    //  "",
    items: [
      {
        date: "2025 — Present",
        title: "NYU Tandon • Computer Engineering",
        text: "Building depth across software, hardware, databases, digital logic, and engineering problem solving."
      },
      {
        date: "2025",
        title: "Independent Project Development",
        text: "Focused on portfolio-quality work in scraping, analysis, systems programming, and personal tools."
      },
      {
        date: "Next",
        title: "Software / Computer Engineering Internship",
        text: "Seeking opportunities to contribute, learn fast, and turn strong academic momentum into real-world engineering value."
      }
    ]
  },
  personal: {
    sectionTitle: "Beyond Engineering",
    sectionNote:
      "A more personal side of the site — things I genuinely enjoy outside of school and projects.",
    pages: [
      {
        title: "Cooking",
        description:
          "Meals, recipes, and food I’ve made or enjoyed recently.",
        image: "",
        href: "cooking.html",
        tags: ["Food", "Recipes", "Personal"]
      },
      {
        title: "Cars",
        description:
          "Cars I enjoy driving, thinking about, and working on.",
        image: "",
        href: "cars.html",
        tags: ["Cars", "Mods", "Personal"]
      }
    ]
  },

  contact: {
    //sectionNote:
    //  "",
    title: "Let’s build something useful.",
    copy:
      "I’m always glad to talk about engineering, internships, or interesting problems — reach out through any of these.",
    items: [
      {
        label: "Email",
        value: "justinoh@nyu.edu",
        action: "Open",
        url: "mailto:justinoh@nyu.edu"
      },
      {
        label: "GitHub",
        value: "github.com/justinoh9",
        action: "Visit",
        url: "https://github.com/justinoh9"
      },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/justin-k-oh",
        action: "Visit",
        url: "https://www.linkedin.com/in/justin-k-oh/"
      }
    ],
    availability: {
      eyebrow: "Available for conversation",
      headline: "Open to internships, projects, and good opportunities.",
      copy:
        "Currently a computer engineering student at NYU looking for software and embedded engineering internships, plus interesting side projects.",
      buttonLabel: "Download Resume",
      buttonUrl: "assets/resume.pdf"
    }
  },
  cooking: {
    eyebrow: "Personal Page",
    pageTitle: "Cooking",
    intro: "Meals, recipes, and food I’ve made or enjoyed recently.",
    sectionTitle: "Recent Meals",
    sectionNote: "A more personal side of the site.",
    items: [
      {
        title: "Steak Rice Bowl",
        image: "",
        description: "Simple, filling, and one of my favorite meals to make.",
        note: "High protein and easy to make consistently.",
        tags: ["Homemade", "High Protein"]
      },
      {
        title: "Pasta Night",
        image: "",
        description: "A meal I liked enough to want to document here.",
        tags: ["Comfort Food"]
      }
    ]
  },

  cars: {
    eyebrow: "Personal Page",
    pageTitle: "Cars",
    intro: "Cars I enjoy driving, thinking about, and working on.",
    sectionTitle: "Cars & Notes",
    sectionNote: "A personal page for cars, mods, and things I find interesting.",
    items: [
      {
        title: "2019 BMW 330i xDrive",
        image: "",
        description: "A car that got me more interested in sound, mods, and how small changes affect the overall driving experience.",
        note: "This page can include ownership notes, mods, impressions, and photos.",
        tags: ["BMW", "Personal Car", "Mods"]
      }
    ]
  }
};

