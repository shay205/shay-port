/* ==========================================================
   Sheila Chepkorir | Portfolio behaviour
   ========================================================== */

/* ---------- Repository links ----------
   Paste each repository's real URL below. A "View on GitHub" button
   stays disabled until its URL is provided, so no links are invented. */
const REPOS = {
  careline: "https://hospital-website-dem.netlify.app",
  glowBeauty: "https://shaylovine.pythonanywhere.com/",
  bloomCoffee: "https://bloom-coffe.netlify.app"
};

(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- Hero terminal typing ---------- */
  const typingName = document.querySelector(".typing-name");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typingName) {
    const fullName = "Sheila Chepkorir";
    if (reducedMotion) {
      typingName.textContent = fullName;
    } else {
      let position = 0;
      let deleting = false;

      const animateName = () => {
        typingName.textContent = fullName.slice(0, position);
        let delay = deleting ? 75 : 125;

        if (!deleting && position === fullName.length) {
          deleting = true;
          delay = 1900;
        } else if (deleting && position === 0) {
          deleting = false;
          delay = 550;
        } else {
          position += deleting ? -1 : 1;
        }

        window.setTimeout(animateName, delay);
      };

      window.setTimeout(animateName, 700);
    }
  }

  /* ---------- Mobile navigation ---------- */
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", e => { if (!header.contains(e.target)) setMenu(false); });

  /* ---------- Header border after scrolling ---------- */
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Highlight current section in nav ---------- */
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));

    /* ---------- Reveal content as it enters the viewport ---------- */
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  }

  /* ---------- Photo placeholders ----------
     If an image file is missing from /image, show the labelled placeholder. */
  document.querySelectorAll("[data-photo]").forEach(figure => {
    const img = figure.querySelector("img");
    const markMissing = () => figure.classList.add("is-missing");
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  /* ---------- Enable GitHub buttons once a repo URL is set ---------- */
  document.querySelectorAll("[data-repo]").forEach(btn => {
    const url = REPOS[btn.dataset.repo];
    if (url && /^https:\/\/github\.com\/.+/.test(url)) {
      btn.href = url;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      btn.classList.remove("is-disabled");
      btn.removeAttribute("aria-disabled");
    } else {
      btn.title = "Repository link not added yet";
    }
  });

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();