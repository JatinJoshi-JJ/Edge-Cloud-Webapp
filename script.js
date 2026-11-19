(function () {
  "use strict";

  /**
   * Configuration constants for the browser speed test.
   * Leave HEALTH_ENDPOINT_URL as null to use same-origin document/timing checks,
   * or set a valid same-origin/CORS endpoint URL in production.
   */
  const SPEED_TEST_CONFIG = {
    HEALTH_ENDPOINT_URL: null,
    REQUEST_TIMEOUT_MS: 6000,
    SAMPLE_COUNT: 3,
  };

  const STORAGE_KEY = "cloudnova-theme-preference";
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ----------------------------------------------------------------------
         1. THEME MANAGEMENT (Dark/Light + localStorage + OS Preference)
         ---------------------------------------------------------------------- */
  function getSavedTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      // Gracefully ignore storage restrictions (e.g., private browsing/iframes)
    }
  }

  function resolveInitialTheme() {
    const saved = getSavedTheme();
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    // Respect OS preference when no saved preference exists, defaulting to dark
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return "light";
    }
    return "dark";
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle");
    const sunIcon = document.getElementById("icon-sun");
    const moonIcon = document.getElementById("icon-moon");
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    root.setAttribute("data-theme", theme);

    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        theme === "dark" ? "#070b14" : "#f8fafc",
      );
    }

    if (toggleBtn && sunIcon && moonIcon) {
      if (theme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
        toggleBtn.setAttribute("aria-label", "Switch to light theme");
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        toggleBtn.setAttribute("aria-label", "Switch to dark theme");
      }
    }
  }

  function initTheme() {
    const initialTheme = resolveInitialTheme();
    applyTheme(initialTheme);

    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current =
          document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
      });
    }
  }

  /* ----------------------------------------------------------------------
         2. MOBILE MENU & STICKY HEADER
         ---------------------------------------------------------------------- */
  function initNavigation(lenisInstance) {
    const header = document.getElementById("site-header");
    const menuBtn = document.getElementById("mobile-menu-btn");
    const drawer = document.getElementById("mobile-drawer");
    const iconMenu = document.getElementById("icon-menu");
    const iconClose = document.getElementById("icon-close");

    function setMenuState(isOpen) {
      if (!menuBtn || !drawer) return;
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );

      if (isOpen) {
        drawer.hidden = false;
        // Trigger reflow so CSS transition plays smoothly
        void drawer.offsetWidth;
        drawer.classList.add("is-open");
        if (iconMenu) iconMenu.style.display = "none";
        if (iconClose) iconClose.style.display = "block";
      } else {
        drawer.classList.remove("is-open");
        if (iconMenu) iconMenu.style.display = "block";
        if (iconClose) iconClose.style.display = "none";
        setTimeout(() => {
          if (!drawer.classList.contains("is-open")) {
            drawer.hidden = true;
          }
        }, 200);
      }
    }

    if (menuBtn && drawer) {
      menuBtn.addEventListener("click", () => {
        const isCurrentlyOpen =
          menuBtn.getAttribute("aria-expanded") === "true";
        setMenuState(!isCurrentlyOpen);
      });

      // Close on Escape key
      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Escape" &&
          menuBtn.getAttribute("aria-expanded") === "true"
        ) {
          setMenuState(false);
          menuBtn.focus();
        }
      });
    }

    // Smooth Anchor Scrolling with Sticky Header Offset
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        event.preventDefault();

        // Close mobile menu if open
        if (menuBtn && menuBtn.getAttribute("aria-expanded") === "true") {
          setMenuState(false);
        }

        const headerOffset = header ? header.offsetHeight + 12 : 84;

        if (lenisInstance && !prefersReducedMotion) {
          lenisInstance.scrollTo(targetEl, { offset: -headerOffset });
        } else {
          const targetTop =
            targetEl.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
      });
    });

    // Subtle header shadow on scroll
    window.addEventListener(
      "scroll",
      () => {
        if (!header) return;
        if (window.scrollY > 12) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      },
      { passive: true },
    );
  }

  /* ----------------------------------------------------------------------
         3. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER ANIMATIONS
         ---------------------------------------------------------------------- */
  function initAnimations() {
    let lenis = null;

    if (!prefersReducedMotion && typeof window.Lenis !== "undefined") {
      lenis = new window.Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    if (
      !prefersReducedMotion &&
      typeof window.gsap !== "undefined" &&
      typeof window.ScrollTrigger !== "undefined"
    ) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      if (lenis) {
        lenis.on("scroll", window.ScrollTrigger.update);
      }

      // Reveal section headers and key blocks
      window.gsap.utils.toArray(".gs-reveal").forEach((el) => {
        window.gsap.from(el, {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // Stagger feature, server, and workflow cards cleanly
      const cardGroups = [".features-grid", ".servers-grid", ".steps-grid"];
      cardGroups.forEach((selector) => {
        const container = document.querySelector(selector);
        if (!container) return;
        const cards = container.querySelectorAll(".gs-card");
        if (!cards.length) return;

        window.gsap.from(cards, {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 86%",
            once: true,
          },
        });
      });
    }

    return lenis;
  }

  /* ----------------------------------------------------------------------
         4. HONEST BROWSER SPEED / TIMING TEST
         ---------------------------------------------------------------------- */
  function initSpeedTest() {
    const runBtn = document.getElementById("run-speedtest-btn");
    const btnLabel = document.getElementById("run-speedtest-label");
    const progressEl = document.getElementById("speedtest-progress");
    const statusEl = document.getElementById("st-status");
    const methodEl = document.getElementById("st-method");
    const latencyEl = document.getElementById("st-latency");
    const typeLabelEl = document.getElementById("st-type-label");
    const ratingEl = document.getElementById("st-rating");
    const feedbackEl = document.getElementById("st-feedback");

    if (!runBtn) return;

    let isTesting = false;

    function classifyLatency(ms) {
      if (ms < 100) {
        return {
          label: "Very responsive",
          color: "var(--status-ok-text)",
          summary:
            "Your browser received a very fast response (< 100 ms) from the local/same-origin environment.",
        };
      }
      if (ms < 300) {
        return {
          label: "Moderate response",
          color: "var(--status-warn-text)",
          summary:
            "Response time is moderate (100–299 ms), typical of standard network or local processing conditions.",
        };
      }
      return {
        label: "Slower response",
        color: "var(--status-err-text)",
        summary:
          "Response time exceeded 300 ms, which may reflect network congestion, cache misses, or device load.",
      };
    }

    function getNavigationTimingEstimate() {
      if (
        !window.performance ||
        typeof window.performance.getEntriesByType !== "function"
      ) {
        return null;
      }
      const navEntries = window.performance.getEntriesByType("navigation");
      if (!navEntries || !navEntries.length) return null;

      const nav = navEntries[0];
      // Measure server/document response window (responseEnd - requestStart)
      const duration = nav.responseEnd - nav.requestStart;
      if (Number.isFinite(duration) && duration >= 0) {
        return Math.max(1, Math.round(duration));
      }
      return null;
    }

    async function measureSameOriginRoundTrip() {
      const targetUrl =
        SPEED_TEST_CONFIG.HEALTH_ENDPOINT_URL || window.location.href;
      const samples = [];

      for (let i = 0; i < SPEED_TEST_CONFIG.SAMPLE_COUNT; i++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          SPEED_TEST_CONFIG.REQUEST_TIMEOUT_MS,
        );

        // Append cache-busting query parameter for genuine request timing
        const urlObj = new URL(targetUrl);
        urlObj.searchParams.set("_cn_ping", String(Date.now()) + "-" + i);

        const start = performance.now();
        try {
          const response = await fetch(urlObj.toString(), {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          });
          // Read body minimally to ensure full response transfer
          await response.text();
          const end = performance.now();
          samples.push(end - start);
        } finally {
          clearTimeout(timeoutId);
        }

        if (progressEl) {
          const pct = Math.round(
            ((i + 1) / SPEED_TEST_CONFIG.SAMPLE_COUNT) * 100,
          );
          progressEl.style.width = pct + "%";
        }
      }

      if (!samples.length) return null;
      const average =
        samples.reduce((sum, val) => sum + val, 0) / samples.length;
      return Math.max(1, Math.round(average));
    }

    runBtn.addEventListener("click", async () => {
      if (isTesting) return;

      isTesting = true;
      runBtn.disabled = true;
      btnLabel.textContent = "Testing...";
      statusEl.textContent = "Testing";
      statusEl.style.color = "var(--accent-primary)";
      ratingEl.textContent = "Measuring...";
      ratingEl.style.color = "var(--text-primary)";
      latencyEl.textContent = "...";
      feedbackEl.classList.remove("is-error");
      if (progressEl) progressEl.style.width = "15%";

      const isHttpOrigin =
        window.location.protocol === "http:" ||
        window.location.protocol === "https:";

      try {
        if (isHttpOrigin) {
          methodEl.textContent = "Same-origin HTTP fetch (3 samples)";
          typeLabelEl.textContent = "Same-origin endpoint response time";

          const avgMs = await measureSameOriginRoundTrip();
          if (avgMs === null) {
            throw new Error("Unable to collect valid timing samples.");
          }

          const assessment = classifyLatency(avgMs);
          statusEl.textContent = "Complete";
          statusEl.style.color = "var(--status-ok-text)";
          latencyEl.textContent = avgMs + " ms";
          ratingEl.textContent = assessment.label;
          ratingEl.style.color = assessment.color;
          feedbackEl.innerHTML =
            "<strong>Same-origin endpoint response time: " +
            avgMs +
            " ms.</strong> " +
            assessment.summary +
            " (Measured against the host serving this page, not remote edge regions.)";
        } else {
          // Local file:// or sandboxed context without HTTP server
          if (progressEl) progressEl.style.width = "100%";
          const navEstimate = getNavigationTimingEstimate();

          if (navEstimate !== null) {
            const assessment = classifyLatency(navEstimate);
            statusEl.textContent = "Complete";
            statusEl.style.color = "var(--status-ok-text)";
            methodEl.textContent = "Browser Navigation Timing API";
            typeLabelEl.textContent =
              "Page navigation response / timing estimate";
            latencyEl.textContent = navEstimate + " ms";
            ratingEl.textContent = assessment.label;
            ratingEl.style.color = assessment.color;
            feedbackEl.innerHTML =
              "<strong>Page navigation response / timing estimate: " +
              navEstimate +
              " ms.</strong> Because this page is opened locally (not over HTTP/HTTPS), this figure reflects local browser document load timing rather than a network round-trip.";
          } else {
            statusEl.textContent = "Unavailable";
            statusEl.style.color = "var(--status-warn-text)";
            methodEl.textContent = "Local file context";
            typeLabelEl.textContent = "No HTTP endpoint available";
            latencyEl.textContent = "N/A";
            ratingEl.textContent = "Local preview";
            feedbackEl.textContent =
              "Network round-trip measurement requires serving this page over HTTP/HTTPS (for example via a local development server). No synthetic numbers were generated.";
          }
        }
      } catch (error) {
        if (progressEl) progressEl.style.width = "0%";
        statusEl.textContent = "Error";
        statusEl.style.color = "var(--status-err-text)";
        methodEl.textContent = "Measurement interrupted";
        latencyEl.textContent = "— ms";
        ratingEl.textContent = "Failed";
        ratingEl.style.color = "var(--status-err-text)";
        feedbackEl.classList.add("is-error");
        feedbackEl.textContent =
          "The browser could not complete the timing request (network timeout or sandboxed origin restriction). You can retry using the button above.";
      } finally {
        isTesting = false;
        runBtn.disabled = false;
        btnLabel.textContent = "Test Again";
      }
    });
  }

  /* ----------------------------------------------------------------------
         5. FOOTER DYNAMIC YEAR & INITIALIZATION
         ---------------------------------------------------------------------- */
  function initFooterYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    const lenisInstance = initAnimations();
    initNavigation(lenisInstance);
    initSpeedTest();
    initFooterYear();
  });
})();
