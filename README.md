# CloudNova --- Global Edge Hosting

> **Your apps. Everywhere. At the speed of now.**

CloudNova is a polished, single-page cloud hosting and edge CDN product
experience. It demonstrates how modern hosting platforms can deliver
static assets through a global edge network, automate Git-based
deployments, secure traffic with HTTPS/TLS, and measure real browser
connection timing.

Built with semantic **HTML5**, modern **CSS3**, **Vanilla JavaScript
(ES6+)**, **Lenis** smooth scrolling, and **GSAP + ScrollTrigger**
animations, CloudNova combines an infrastructure-inspired interface with
interactive educational visualizations and transparent browser
diagnostics.

Live Website URL :- https://edge-cloud-webapp.netlify.app/

GitHub Repo URL :- https://github.com/JatinJoshi-JJ/Edge-Cloud-Webapp.git

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Live Browser Speed Test](#live-browser-speed-test)
- [Configuration](#configuration)
- [Infrastructure Data and
  Transparency](#infrastructure-data-and-transparency)
- [Accessibility and Performance](#accessibility-and-performance)
- [Browser Compatibility](#browser-compatibility)
- [Limitations and Scope](#limitations-and-scope)
- [License](#license)

---

## Overview

CloudNova presents the core ideas behind a modern cloud hosting and edge
CDN platform through a responsive, single-page experience.

The interface explains how a request can travel from a visitor's browser
to an origin and then be served through a geographically distributed
edge network. It also introduces common hosting capabilities such as
automated deployments, SSL/TLS, and DDoS protection.

The project is a **frontend product concept and educational
demonstration**. It does not provision real cloud infrastructure, deploy
user repositories, issue certificates, or provide managed DDoS
protection.

### Project Goals

- Present cloud hosting and edge delivery concepts in a clear,
  approachable way.
- Demonstrate a polished product-style interface inspired by modern
  cloud platforms.
- Explain Git-based deployment and HTTPS/TLS workflows visually.
- Provide a browser-based timing diagnostic without inventing
  performance metrics.
- Maintain responsive behavior, accessibility, and reduced-motion
  support.

---

## Features

### 1. Responsive Sticky Navigation

- Sticky navigation for convenient access to page sections.
- Desktop navigation links and a prominent call-to-action.
- Accessible mobile navigation drawer.
- Mobile drawer supports `aria-expanded`, click-outside dismissal,
  automatic close after link selection, and `Escape` key dismissal.

### 2. Dark and Light Theme System

- Deep navy and slate-based dark theme.
- Clean, high-contrast light theme.
- Theme preference is saved in `localStorage`.
- On a first visit, the interface respects the operating system's
  `prefers-color-scheme` preference.
- Defensive storage handling helps prevent unavailable or restricted
  storage from breaking the interface.

### 3. Smooth Scrolling and Scroll Animations

- **Lenis** provides smooth scrolling for supported wheel and touch
  interactions.
- Anchor navigation accounts for page offsets.
- **GSAP** and **ScrollTrigger** power staggered card and section
  reveal animations.
- Motion-sensitive users are respected: animations are disabled or
  reduced when `prefers-reduced-motion` is enabled.

### 4. Interactive Edge Topology Visualization

An inline SVG schematic illustrates a conceptual Anycast-style
request-routing flow between an origin core and regional edge nodes.

The visualization includes the following illustrative node identifiers:

- `US-EAST`
- `EU-CENT`
- `AP-SOUTH`
- `AP-NEAST`

It is an educational diagram, not a live network map or real-time
routing monitor.

### 5. Core Hosting Capabilities

The capabilities section introduces four common features associated with
modern hosting platforms:

- **Edge CDN Delivery:** Explains how cached static assets can be
  served from locations closer to visitors.
- **Automatic Git Deployment:** Demonstrates the concept of connecting
  a repository and deploying changes through a Git-based workflow.
- **Free SSL/TLS Security:** Introduces encrypted browser-to-server
  communication and certificate verification.
- **DDoS Protection:** Explains the role of traffic filtering and
  infrastructure-level mitigation.

These are explanatory product capabilities; they are not active cloud
services provided by this frontend demo.

### 6. Global Edge Network

- Presents example Points of Presence (PoPs), including Mumbai,
  Virginia, Frankfurt, and Tokyo.
- Regional labels and latency figures are clearly treated as
  illustrative demo content.
- The section helps explain why geographically distributed delivery
  can improve the experience for visitors.

### 7. Git-to-Edge Deployment Workflow

A three-step visual workflow explains the deployment concept:

1.  **Connect a repository:** Link a project repository to a hosting
    workflow.
2.  **Build and deploy:** A change triggers a deployment process.
3.  **Deliver globally:** Published assets can be distributed through
    edge locations.

An illustrative deployment activity preview reinforces the workflow. It
does not execute a real build or deploy a repository.

### 8. HTTPS and SSL/TLS Explainer

A visual walkthrough explains:

- The browser initiating a secure connection.
- The server presenting its TLS certificate.
- The browser validating the certificate.
- Encrypted communication between the browser and server.

The section also clarifies the scope of transport encryption: HTTPS
protects data in transit, but it does not by itself guarantee that an
application, server, or stored data is secure.

### 9. Honest Browser Speed and Timing Test

The diagnostic uses browser APIs rather than fabricated random values or
simulated regional ping results.

- When served over `http://` or `https://`, it can use the Fetch API
  to measure same-origin HTTP round-trip samples.
- When opened directly through `file://`, it falls back to the
  Navigation Timing API where supported.
- The interface communicates what is being measured and does not
  present the result as a remote data-center ping.
- Includes accessible `aria-live` status updates.
- Includes request timeout handling.
- Prevents duplicate test execution while a test is already running.

---

## Technology Stack

---

Technology Purpose

---

HTML5 Semantic page structure and
accessible content

CSS3 Responsive layouts, custom
properties, themes, and visual
styling

Vanilla JavaScript (ES6+) Navigation, theme management,
interactions, and browser
diagnostics

SVG Lightweight inline icons and
network visualizations

Lenis Smooth scrolling

GSAP Animation orchestration

ScrollTrigger Scroll-based animation triggers

Fetch API Same-origin HTTP timing samples

Navigation Timing API Browser navigation performance
measurements and fallback
diagnostics

`localStorage` Persisting the selected theme

---

**Architecture:** Zero-build, single-file frontend application. No
package manager, bundler, or compilation step is required for the
supplied project structure.

---

## Project Structure

```text
Edge-Cloud-Webapp/
├── index.html      # Complete application: HTML, CSS, inline SVG, and JavaScript
└── README.md       # Project documentation
```

The application is intentionally delivered as a portable `index.html`
file. Styles, scripts, and SVG assets are included inline, while GSAP
and Lenis are loaded through CDN-hosted scripts.

---

## Getting Started

### Prerequisites

- A modern web browser.
- Python 3 or Node.js (recommended for running a local HTTP server and
  using the Fetch-based speed test).

No build tools or dependency installation are required.

### 1. Clone the Repository

```bash
git clone https://github.com/JatinJoshi-JJ/Edge-Cloud-Webapp.git
```

### 2. Open the Project Directory

```bash
cd Edge-Cloud-Webapp
```

### 3. Run the Application

#### Option A: Python 3 (Recommended)

```bash
python -m http.server 8080
```

Open <http://localhost:8080> in your browser.

#### Option B: Node.js

```bash
npx serve .
```

Open the local URL printed by the server.

#### Option C: Open the HTML File Directly

You can also open `index.html` directly in a browser. The interface,
theme switching, navigation, and animations are designed to work without
a local server. The speed diagnostic uses its Navigation Timing fallback
when the page is opened using `file://`.

---

## Live Browser Speed Test

CloudNova's speed test is designed to demonstrate browser-side timing
honestly.

### HTTP/HTTPS mode

When the application is served over HTTP or HTTPS, the test can send
requests to a configured health endpoint or same-origin endpoint and
measure the request round-trip duration. Multiple samples are collected
and averaged according to the configuration.

This is a measurement of the current browser's request to that endpoint.
It is **not** a measurement of latency to every CloudNova region or a
global CDN benchmark.

### Direct-file mode

When the page is opened with the `file://` protocol, Fetch-based
same-origin testing is not available in the same way. The diagnostic
therefore uses Navigation Timing information where the browser exposes
it.

Navigation Timing describes the page's navigation lifecycle; it is not
equivalent to a fresh network ping.

### Interpreting results

Actual measurements can vary with network conditions, browser state,
caching, endpoint response time, and device performance. Results should
be interpreted as local browser diagnostics rather than guaranteed
hosting performance.

---

## Configuration

The speed test can be customized from the `SPEED_TEST_CONFIG` object
inside the `<script>` section of `index.html`.

```javascript
const SPEED_TEST_CONFIG = {
  HEALTH_ENDPOINT_URL: null, // Optional same-origin or CORS-enabled health endpoint
  REQUEST_TIMEOUT_MS: 6000, // Abort timeout for each sample request
  SAMPLE_COUNT: 3, // Number of HTTP samples collected per test
};
```

### Configuration Options

---

Option Default Description

---

`HEALTH_ENDPOINT_URL` `null` Optional URL used for
the health-check
request. If configured
cross-origin, the
endpoint must permit
the request through
CORS.

`REQUEST_TIMEOUT_MS` `6000` Maximum time allowed
for an individual
request sample before
it is aborted.

`SAMPLE_COUNT` `3` Number of request
samples used for the
test run.

---

**Important:** If you configure a custom endpoint, use an endpoint
intended for lightweight health checks. For cross-origin URLs, configure
the server's CORS policy correctly. Do not place secrets or private
credentials in frontend JavaScript.

---

## Infrastructure Data and Transparency

CloudNova deliberately distinguishes illustrative product visuals from
real browser measurements.

---

Project element Data type Explanation

---

Global server locations Illustrative demo data Mumbai, Virginia,
Frankfurt, and Tokyo
are presented as
example locations.

Regional latency values Illustrative demo data Values such as `18 ms`,
`24 ms`, `21 ms`, and
`29 ms` are visual
examples, not live
measurements.

Edge topology diagram Conceptual Shows an example
visualization origin-to-edge routing
concept, not live
network telemetry.

Deployment activity Illustrative UI Demonstrates a possible
preview Git deployment
experience; it does not
deploy code.

Browser speed test Browser measurement Measures the configured
HTTP request round trip
or uses Navigation
Timing fallback where
applicable.

---

The project does not claim to operate physical Points of Presence,
provide live regional monitoring, or deliver actual CDN traffic.

---

## Accessibility and Performance

Accessibility and performance considerations are incorporated throughout
the interface.

- Semantic HTML5 landmarks, including `<header>`, `<nav>`, `<main>`,
  `<section>`, and `<footer>`.
- Skip-to-content navigation.
- Keyboard-accessible navigation and interactive controls.
- Visible `:focus-visible` outlines.
- Accessible mobile navigation state through `aria-expanded`.
- Screen-reader status announcements using `aria-live` for the speed
  test.
- Contrast-conscious dark and light themes.
- Support for `prefers-reduced-motion`.
- Defensive `localStorage` handling.
- Inline SVG assets to keep the visual system lightweight and avoid
  external image dependencies.

---

## Browser Compatibility

CloudNova is intended for modern browsers with support for standard
HTML, CSS, and ES6+ JavaScript features.

Some behavior depends on browser API support:

- Fetch-based diagnostics require the page to be served over
  HTTP/HTTPS and the endpoint to be reachable.
- Cross-origin health endpoints require appropriate CORS headers.
- Navigation Timing details can vary by browser.
- Lenis and GSAP are loaded from CDNs, so those libraries require
  network access unless separately self-hosted.

---

## Limitations and Scope

CloudNova is a frontend-only product concept and educational reference.
It does not currently include:

- Real user authentication or account management.
- Cloud resource provisioning or server management.
- Repository authorization or actual Git-based build pipelines.
- Production CDN caching or cache invalidation.
- Real-time global server health or regional latency monitoring.
- Certificate issuance, renewal, or managed TLS configuration.
- Operational DDoS mitigation.
- A backend API, database, or persistent user account service.

The interface is designed to communicate these concepts without implying
that demo interactions are connected to production infrastructure.

---

## License

This project is provided as a frontend concept and educational
reference. No separate open-source license is specified in the project
information. If you intend to distribute or reuse the code publicly, add
a `LICENSE` file describing the permissions and conditions.

---

## Project Links

- **Live Demo:** [CloudNova --- Global Edge
  Hosting](https://edge-cloud-webapp.netlify.app/)
- **Source Code:** [Edge-Cloud-Webapp on
  GitHub](https://github.com/JatinJoshi-JJ/Edge-Cloud-Webapp)

---

```{=html}
<p align="center">
```

`<strong>`{=html}CloudNova --- Your apps. Everywhere. At the speed of
now.`</strong>`{=html}

```{=html}
</p>
```
