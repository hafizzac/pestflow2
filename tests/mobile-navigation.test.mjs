import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("mobile navigation defines Product, Solutions, and Company submenu panels", async () => {
  const controls = await read("scripts/controls.js");

  for (const panel of ["product", "solutions", "company"]) {
    assert.match(
      controls,
      new RegExp(`id=["']mobile-panel-${panel}["']`),
      `${panel} panel must have a stable accessible id`,
    );
    assert.match(
      controls,
      new RegExp(`data-mobile-submenu=["']${panel}["']`),
      `${panel} panel must expose its submenu key`,
    );
  }
  assert.match(controls, /data-mobile-menu-track/);
  assert.match(controls, /data-mobile-menu-main/);
  assert.match(controls, /data-mobile-menu-open/);
  assert.match(controls, /data-mobile-menu-back/);
});

test("mobile submenu controller slides panels and preserves keyboard navigation", async () => {
  const script = await read("scripts/local.js");

  assert.match(script, /mobileMenu\.dataset\.activePanel/);
  assert.match(script, /setMobilePanel/);
  assert.match(script, /data-mobile-menu-open/);
  assert.match(script, /data-mobile-menu-back/);
  assert.match(script, /mobileMenuMain.*inert/s);
  assert.match(script, /mobileSubmenu.*inert/s);
  assert.match(script, /event\.key\s*!==\s*"Escape"/);
  assert.match(script, /submenuBack.*focus/s);
  assert.match(
    script,
    /focus\(\{\s*preventScroll:\s*true\s*\}\)/,
    "focus transfer must not horizontally scroll to an off-canvas panel",
  );
  assert.match(
    script,
    /addEventListener\("transitionend"/,
    "outgoing submenu must remain rendered until the reverse slide completes",
  );
  assert.match(script, /propertyName !== "transform"/);
});

test("mobile navigation uses horizontal panel motion with reduced-motion support", async () => {
  const styles = await read("styles.css");

  assert.match(styles, /\.mobile-menu-track\s*\{/);
  assert.match(styles, /translate3d\(-50%,\s*0,\s*0\)/);
  assert.match(styles, /\.mobile-menu-panel\s*\{/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /\.mobile-menu-track\s*\{[^}]*transition:\s*none/s);
});

test("submenu rows expose expanded state and labelled panel relationships", async () => {
  const controls = await read("scripts/controls.js");

  assert.match(controls, /aria-expanded=["']false["']/);
  assert.match(controls, /aria-controls=["']mobile-panel-/);
  assert.match(controls, /aria-labelledby=["']mobile-trigger-/);
  assert.match(controls, /aria-label=["']Back to main menu["']/);
});

test("all Vite marketing pages load the shared mobile navigation controller", async () => {
  const viteConfig = await read("vite.config.js");
  const pagesMatch = viteConfig.match(/const pages = \[([\s\S]*?)\];/);
  assert.ok(pagesMatch, "Vite pages list must be readable");

  const pages = [...pagesMatch[1].matchAll(/["']([^"']+\.html)["']/g)].map(
    ([, page]) => page,
  );
  assert.ok(pages.length >= 15);

  for (const page of pages) {
    const html = await read(page);
    assert.match(
      html,
      /data-mobile-menu/,
      `${page} must expose the mobile nav root`,
    );
    assert.match(
      html,
      /<script[^>]+src=["']\/scripts\/local\.js["']/,
      `${page} must load the shared controller`,
    );
  }
});

test("mobile navigation styles keep panels clipped inside the menu surface", async () => {
  const styles = await read("styles.css");

  assert.match(styles, /\.mobile-menu\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(styles, /\.mobile-menu-viewport\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(styles, /\.mobile-menu-panel\s*\{[^}]*overflow-y:\s*auto/s);
});

test("direct mobile destinations remain one tap away", async () => {
  const controls = await read("scripts/controls.js");

  for (const href of ["/pricing/", "/blog/", "https://app.pestflow.my/"]) {
    assert.match(
      controls,
      new RegExp(`href=["']${href.replaceAll("/", "\\/")}["']`),
    );
  }
});
