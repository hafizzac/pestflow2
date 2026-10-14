export const PLACEHOLDER_TESTIMONIALS = true;

const placeholderSection = document.querySelector(
  "[data-placeholder-testimonials]",
);

if (placeholderSection instanceof HTMLElement) {
  placeholderSection.dataset.contentStatus = PLACEHOLDER_TESTIMONIALS
    ? "placeholder"
    : "verified";
}
