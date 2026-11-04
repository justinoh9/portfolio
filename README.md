# Justin Oh — Personal Portfolio

**Live site:** https://justinoh9.github.io/portfolio/

Computer engineering student at NYU Tandon (B.S., expected December 2027). This is my personal portfolio: projects, experience, and a bit of personality, built as a fast, dependency-free static site for GitHub Pages.

## Highlights

- **AI WhatsApp assistant** · production agentic AI system for a property-management company (FastAPI, PostgreSQL, React, Claude API, Docker)
- **Jelli** · social music-rating app, with Eddie Guan (Expo/React Native, TypeScript, Supabase)
- **Machine Learning Review Analyzer** · TF-IDF + Logistic Regression sentiment pipeline
- **Air Ticket Reservation System** · full-stack PHP/MySQL web app with a normalized relational schema
- **Solar-Powered Light-Tracking Umbrella** · Arduino/C++ embedded build, +25% output vs. fixed panel

## Tech

Vanilla HTML/CSS/JS, no framework and no build step.

- `content.js`: all site copy and project data
- `site.js`: renders every page from `content.js`, plus window dragging, the project dialog, and the photo lightbox
- `styles.css`: the shared design system

## Demos

Each project has a backend-free demo in `demos/`, linked from its panel on the home page:

- `demos/airline/`: the project's real schema in SQLite (sql.js, WebAssembly), with a live query panel
- `demos/reviews/`: the trained model exported to JSON (`model.json`) and scored in JavaScript
- `demos/jelli/`: a port of Jelli's head-to-head placement engine
- `demos/assistant/`: a scripted replay with fictional data; the production system is private client work
- `demos/solarbrella/`: a simplified tracking simulation plus photos of the real build

## Editing

- Update text, projects, or experience → edit `content.js`
- Move or resize a hero window → edit its `.w-*` rule in `styles.css`
- Resume → set `contact.resumeUrl` in `content.js`; the button stays hidden until then
- After changing a file, bump its `?v=` query in the HTML so returning visitors get the new copy

## Contact

- Email: justinoh@nyu.edu
- LinkedIn: [linkedin.com/in/justin-k-oh](https://www.linkedin.com/in/justin-k-oh/)
- GitHub: [@justinoh9](https://github.com/justinoh9)
