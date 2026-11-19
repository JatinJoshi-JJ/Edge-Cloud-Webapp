# CloudNova — Global Edge Hosting

> **Your apps. Everywhere. At the speed of now.**

CloudNova is a polished, single-page cloud hosting and edge CDN product experience built with semantic HTML5, modern CSS3 custom properties, vanilla JavaScript (ES6+), **Lenis** smooth scrolling, and **GSAP + ScrollTrigger** animations.

It is designed to communicate how modern edge hosting platforms deliver static assets globally, automate Git-based deployments, enforce HTTPS/TLS encryption, and measure real browser connection timing—while maintaining strict transparency between conceptual product visuals and real browser diagnostics.

---

## ✨ Key Features

- **Responsive Sticky Navigation**: Desktop navigation links, active CTA button, and an accessible mobile drawer supporting `aria-expanded`, click-outside/link-selection auto-close, and `Escape` key dismissal.
- **Dark & Light Theme System**:
  - Defaults to a deep navy/slate cloud-infrastructure dark mode with a crisp light mode alternative.
  - Persists user selection in `localStorage` and respects system `prefers-color-scheme` on first visit.
- **Smooth Scrolling & Scroll Choreography**:
  - Powered by **Lenis** for smooth wheel/touch scrolling and offset anchor jumps.
  - Enhanced with **GSAP & ScrollTrigger** staggered card and section reveals (automatically disabled when `prefers-reduced-motion` is active).
- **Interactive Edge Topology Schematic**: Inline SVG visualization illustrating Anycast routing from an origin core to regional edge nodes (`US-EAST`, `EU-CENT`, `AP-SOUTH`, `AP-NEAST`).
- **Educational Infrastructure Sections**:
  - **Core Capabilities**: Edge CDN Delivery, Automatic Git Deployment, Free SSL/TLS Security, and DDoS Protection.
  - **Global Edge Network**: Regional Points of Presence (Mumbai, Virginia, Frankfurt, Tokyo) clearly labeled as illustrative demo data.
  - **Deployment Workflow**: Three-step Git-to-Edge pipeline with an illustrative deployment activity preview.
  - **HTTPS / SSL-TLS Explainer**: Visual breakdown of browser-to-server TLS encryption, certificate verification, and security scope boundaries.
- **Honest Browser Speed & Timing Test**:
  - Uses real browser APIs (**Fetch API** round-trip sampling when served over `http://` or `https://`, and **Navigation Timing API** fallback when opened via `file://`).
  - Zero fabricated random numbers or fake regional ping claims.
  - Accessible `aria-live` status updates, timeout handling, and duplicate-click protection.

---

## 📁 Project Structure

```text
cloudnova-edge-hosting/
├── index.html      # Complete single-file application (HTML5, CSS3 design tokens, SVG assets, JS logic)
└── README.md       # Project documentation, setup guide, and technical notes
```

*(Note: The application is engineered as a zero-build, single-file `index.html` bundle with inline SVG graphics and CDN-hosted GSAP/Lenis scripts for effortless portability.)*

---

## 🚀 Getting Started (Run Locally)

No build tools, package managers, or compilation steps are required.

### Option 1: Local Development Server (Recommended)
Serving the project over HTTP enables the **Live Speed Test** to perform genuine same-origin HTTP fetch round-trip measurements:

```bash
# Using Python 3
python -m http.server 8080

# OR using Node.js (npx)
npx serve .
```
Then open `http://localhost:8080` in your browser.

### Option 2: Direct File Open
Double-click `index.html` or open it directly in any modern browser (`file://`). All animations, theme switching, and navigation work out of the box, and the speed test automatically switches to the **Browser Navigation Timing API** fallback.

---

## ⚙️ Configuration

Inside `index.html` (`<script>` block), you can customize the speed test behavior via the `SPEED_TEST_CONFIG` object:

```javascript
const SPEED_TEST_CONFIG = {
  HEALTH_ENDPOINT_URL: null, // Set to a custom same-origin or CORS-enabled health URL if desired
  REQUEST_TIMEOUT_MS: 6000,  // Abort timeout per sample request
  SAMPLE_COUNT: 3            // Number of HTTP samples averaged per test run
};
```

---

## 🔍 Scope & Transparency Notice

CloudNova is a **frontend product concept** built for demonstration and educational clarity:
- **Regional Server Metrics**: Latency values shown in the *Global Servers* section (`18 ms`, `24 ms`, `21 ms`, `29 ms`) are explicitly labeled as **Illustrative demo data**.
- **Browser Diagnostics**: The *Live Speed Test* measures only your current browser's same-origin HTTP response or local Navigation Timing—it does not claim to ping remote data centers.
- **No External Image Dependencies**: All logos, icons, and network diagrams are crafted with lightweight inline SVGs.

---

## ♿ Accessibility & Performance

- Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and skip-to-content link.
- Full keyboard navigation with high-contrast `:focus-visible` outlines.
- WCAG-conscious contrast ratios across both dark and light themes.
- Full support for `prefers-reduced-motion` and defensive `localStorage` error handling.

---

## 📄 License

This project is provided as a frontend concept and educational reference.# Edge-Cloud-Webapp
