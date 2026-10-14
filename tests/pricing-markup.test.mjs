import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage pricing preview is populated by the live pricing API", async () => {
  const html = await read("index.html");

  assert.match(html, /data-pricing-preview/);
  for (const plan of ["starter", "professional", "enterprise"]) {
    assert.match(html, new RegExp(`data-preview-plan=["']${plan}["']`));
  }
  assert.match(html, /data-preview-status/);
  assert.doesNotMatch(html, /<strong>RM(?:199|499|1,199)<\/strong>/);
});

test("pricing page loads current values rather than a captured snapshot", async () => {
  const [html, script] = await Promise.all([
    read("pricing/index.html"),
    read("scripts/pricing.js"),
  ]);

  assert.match(html, /data-live-pricing/);
  assert.match(script, /PRICING_ENDPOINT/);
  assert.doesNotMatch(script, /\/data\/pricing\.json/);
  assert.doesNotMatch(html, /captured snapshot|captured-date/i);
});

test("placeholder testimonials are code-labelled and visibly disclosed", async () => {
  const html = await read("index.html");
  const flags = await read("scripts/content-flags.js");
  const styles = await read("styles.css");

  assert.match(flags, /export const PLACEHOLDER_TESTIMONIALS = true/);
  assert.match(html, /data-placeholder-testimonials/);
  assert.match(html, /class=["']placeholder-warning["']/);
  assert.match(html, /early-access examples/i);
  assert.match(styles, /\.placeholder-warning\s*\{/);
  assert.doesNotMatch(html, /customer-reported/i);
});

test("the deployable public tree contains no stale pricing snapshot", async () => {
  await assert.rejects(read("public/data/pricing.json"), /ENOENT/);
});

test("locale dictionaries do not retain obsolete hardcoded plan or testimonial copy", async () => {
  const preferences = await read("scripts/preferences.js");

  assert.doesNotMatch(preferences, /RM199/);
  assert.doesNotMatch(preferences, /customer-reported/i);
  assert.doesNotMatch(preferences, /first-party plan snapshot/i);
  assert.doesNotMatch(preferences, /captured 2026-10-10/i);
});

test("the build includes the custom 404 document required by nginx", async () => {
  const notFound = await read("404.html");
  const viteConfig = await read("vite.config.js");

  assert.match(notFound, /<main\b[^>]*id="main"/i);
  assert.match(notFound, /Page not found/i);
  assert.match(notFound, /href="\/"/);
  assert.match(viteConfig, /const pages = \[[\s\S]*"404\.html"/);
});
