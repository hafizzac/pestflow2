import "./preferences.js";
import "./controls.js";

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
/** @type {HTMLElement | null} */
const mobileMenu = document.querySelector("[data-mobile-menu]");

const closeMenu = () => {
  if (!mobileMenu || mobileMenu.hidden) return;
  mobileMenu.hidden = true;
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation menu");
};

let lastScrollY = Math.max(0, scrollY);
let headerFrameRequested = false;

const syncHeader = () => {
  headerFrameRequested = false;
  const currentScrollY = Math.max(0, scrollY);
  const scrollingDown = currentScrollY > lastScrollY + 2;
  const scrollingUp = currentScrollY < lastScrollY - 2;

  if (currentScrollY <= 20 || scrollingUp) {
    header?.classList.remove("scrolled");
  } else if (scrollingDown) {
    header?.classList.add("scrolled");
  }

  lastScrollY = currentScrollY;
};

const requestHeaderSync = () => {
  if (headerFrameRequested) return;
  headerFrameRequested = true;
  requestAnimationFrame(syncHeader);
};

syncHeader();
addEventListener("scroll", requestHeaderSync, { passive: true });

menuButton?.addEventListener("click", () => {
  if (!(mobileMenu instanceof HTMLElement)) return;
  const opening = mobileMenu.hidden;
  mobileMenu.hidden = !opening;
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute(
    "aria-label",
    opening ? "Close navigation menu" : "Open navigation menu",
  );
});
mobileMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeMenu();
});
addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu();
  if (menuButton instanceof HTMLElement) menuButton.focus();
});

if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.documentElement.classList.add("motion");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((node) => observer.observe(node));
}

const story = document.querySelector("[data-story]");
const storyTabs = [...document.querySelectorAll("[data-story-tab]")].filter(
  (node) => node instanceof HTMLElement,
);
const storyPanels = [...document.querySelectorAll("[data-story-panel]")].filter(
  (node) => node instanceof HTMLElement,
);
let storyStep = 0;

const setStory = (index) => {
  storyStep = Math.max(0, Math.min(storyTabs.length - 1, index));
  storyTabs.forEach((tab, tabIndex) => {
    const active = tabIndex === storyStep;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  storyPanels.forEach((panel, panelIndex) =>
    panel.classList.toggle("active", panelIndex === storyStep),
  );
};

storyTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setStory(index));
  tab.addEventListener("keydown", (event) => {
    if (!(event instanceof KeyboardEvent)) return;
    if (
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(event.key)
    )
      return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? storyTabs.length - 1
          : (index +
              (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) +
              storyTabs.length) %
            storyTabs.length;
    setStory(next);
    storyTabs[next].focus();
  });
});
setStory(0);

if (
  story &&
  matchMedia("(min-width: 790px) and (prefers-reduced-motion: no-preference)")
    .matches
) {
  let frame = false;
  const syncStory = () => {
    frame = false;
    const rect = story.getBoundingClientRect();
    const progress = Math.min(
      0.999,
      Math.max(0, -rect.top / Math.max(1, rect.height - innerHeight)),
    );
    setStory(Math.floor(progress * storyTabs.length));
  };
  addEventListener(
    "scroll",
    () => {
      if (frame) return;
      frame = true;
      requestAnimationFrame(syncStory);
    },
    { passive: true },
  );
  syncStory();
}

const workflowScroller = document.querySelector("[data-workflow-scroller]");
const scrollPhone = document.querySelector("[data-scroll-phone]");
const featureRows = [...document.querySelectorAll("[data-feature-row]")].filter(
  (node) => node instanceof HTMLElement,
);
const scrollScreens = [
  ...document.querySelectorAll("[data-scroll-screen]"),
].filter((node) => node instanceof HTMLElement);

const setWorkflowFeature = (index) => {
  featureRows.forEach((row, rowIndex) =>
    row.classList.toggle("active", rowIndex === index),
  );
  scrollScreens.forEach((screen, screenIndex) =>
    screen.classList.toggle("active", screenIndex === index),
  );
};

if (
  workflowScroller instanceof HTMLElement &&
  scrollPhone instanceof HTMLElement &&
  featureRows.length &&
  matchMedia("(min-width: 790px) and (prefers-reduced-motion: no-preference)")
    .matches
) {
  const featureObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = Number(entry.target.getAttribute("data-index"));
        setWorkflowFeature(index);
      }
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
  );
  featureRows.forEach((row) => featureObserver.observe(row));

  let workflowFrame = false;
  const syncWorkflowPhone = () => {
    workflowFrame = false;
    const regionRect = workflowScroller.getBoundingClientRect();
    const phoneHeight = scrollPhone.offsetHeight;
    const idealOffset = (innerHeight - phoneHeight) / 2 - regionRect.top;
    const maxOffset = Math.max(0, regionRect.height - phoneHeight);
    const offset = Math.max(0, Math.min(idealOffset, maxOffset));
    scrollPhone.style.transform = `translate3d(-50%, ${offset}px, 0)`;
  };
  const requestWorkflowPhone = () => {
    if (workflowFrame) return;
    workflowFrame = true;
    requestAnimationFrame(syncWorkflowPhone);
  };
  syncWorkflowPhone();
  addEventListener("scroll", requestWorkflowPhone, { passive: true });
  addEventListener("resize", requestWorkflowPhone, { passive: true });
}

const calculator = document.querySelector("[data-calculator]");
const money = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  maximumFractionDigits: 0,
});
const updateCalculator = () => {
  if (!(calculator instanceof HTMLFormElement)) return;
  const technicians = calculator.querySelector("#technicians");
  const jobs = calculator.querySelector("#jobs");
  if (
    !(technicians instanceof HTMLInputElement) ||
    !(jobs instanceof HTMLInputElement)
  )
    return;
  const jobCount = Number(technicians.value) * Number(jobs.value) * 22;
  const hours = (jobCount * 20) / 60;
  const monthly = Math.round(hours * 18);
  calculator.querySelector("[data-tech]").textContent = technicians.value;
  calculator.querySelector("[data-jobs]").textContent = jobs.value;
  calculator.querySelector("[data-value]").textContent = money.format(monthly);
  calculator.querySelector("[data-hours]").textContent =
    `${Math.round(hours)} hours of admin capacity / month`;
};
calculator?.addEventListener("input", updateCalculator);
updateCalculator();

const contactForm = document.querySelector("[data-contact-form]");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;
  const data = new FormData(form);
  const phone = data.get("phone");
  const technicians = data.get("technicians");
  const details = [
    `PestFlow enquiry from ${data.get("name")} at ${data.get("company")}.`,
    `Email: ${data.get("email")}.`,
    phone ? `Phone: ${phone}.` : "",
    technicians ? `Technicians: ${technicians}.` : "",
    data.get("message") ? `Notes: ${data.get("message")}` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const message = encodeURIComponent(details);
  location.href = `https://wa.me/601114406030?text=${message}`;
});
