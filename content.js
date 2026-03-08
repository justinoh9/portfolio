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
      text: "Building stronger software, sharper projects, and a portfolio that feels deliberate.",
      image: ""
    },
    sideCards: [
      {
        label: "Recent Work",
        title: "Amazon Review Analyzer",
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
    sectionNote:
      "This section should feel selective and confident. Keep it focused on who you are, what you build, and where you’re headed.",
    title: "Who I Am",
    paragraphs: [
      "I’m a computer engineering student who enjoys building across software and hardware. My work spans Python, C++, SQL, digital systems, and project-driven problem solving.",
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
    sectionNote:
      "Keep this tight. Three to six strong projects is much better than trying to show everything.",
    items: [
      {
        title: "Amazon Review Analyzer",
        description:
          "A Python-based pipeline that collects large review datasets and analyzes sentiment for e-commerce insights. Built to show data handling, automation, and practical ML-adjacent thinking.",
        image: "",
        tags: ["Python", "NLP", "Scraping"],
        links: [
          { label: "Live", url: "#" },
          { label: "Code", url: "https://github.com/justinoh9" }
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
        title: "Embedded & Digital Design Work",
        description:
          "Lab and project work involving timing, PWM, logic design, and hardware reasoning. This section can become a single featured case study with visuals from your boards, code, and diagrams.",
        image: "",
        tags: ["Embedded", "PWM", "Verilog"],
        links: [
          { label: "Overview", url: "#" },
          { label: "Details", url: "#" }
        ]
      }
    ]
  },

  experience: {
    sectionNote:
      "You do not need a huge resume here. A concise timeline of coursework, projects, and growth already works well.",
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

  contact: {
    sectionNote:
      "Make it very easy for recruiters, collaborators, and classmates to reach you in one step.",
    title: "Let’s build something useful.",
    copy:
      "Replace the links below with your real email, GitHub, LinkedIn, and resume. You can also add a Calendly link later if you want.",
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
        url: "https://linkedin.com/in/justin-k-oh"
      }
    ],
    availability: {
      eyebrow: "Available for conversation",
      headline: "Open to internships, projects, and good opportunities.",
      copy:
        "This panel is a good place for a clean statement of intent, a resume button, or a short line that gives the page personality without clutter.",
      buttonLabel: "Download Resume",
      buttonUrl: "assets/resume.pdf"
    }
  }
};

