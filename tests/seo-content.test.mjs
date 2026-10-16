import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const routes = new Map([
  ["index.html", "/"],
  ["about/index.html", "/about/"],
  ["blog/index.html", "/blog/"],
  ["brand/index.html", "/brand/"],
  ["commercial-pest-control-software/index.html", "/commercial-pest-control-software/"],
  ["compliance/index.html", "/compliance/"],
  ["contact/index.html", "/contact/"],
  ["pest-control-scheduling-software/index.html", "/pest-control-scheduling-software/"],
  ["pest-control-software-malaysia/index.html", "/pest-control-software-malaysia/"],
  ["pest-control-software-small-business/index.html", "/pest-control-software-small-business/"],
  ["pest-control-technician-app/index.html", "/pest-control-technician-app/"],
  ["pricing/index.html", "/pricing/"],
  ["product/index.html", "/product/"],
  ["workflow/index.html", "/workflow/"],
]);

const absolute = (route) => `https://pestflow.my${route}`;
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const head = (html) => html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
const main = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
const decodeHtmlAttribute = (value) => value
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
  .replace(/&apos;/gi, "'")
  .replace(/&quot;/gi, '"')
  .replace(/&amp;/gi, "&")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">");
const tagAttribute = (tag, name) => tag
  .match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2] ?? null;
const metaContent = (html, attribute, value) => {
  const tag = [...head(html).matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((candidate) => tagAttribute(candidate, attribute) === value);
  const content = tag == null ? null : tagAttribute(tag, "content");
  return content == null ? null : decodeHtmlAttribute(content);
};

test("every indexable marketing route has complete self-referencing metadata", async () => {
  for (const [path, route] of routes) {
    const html = await read(path);
    const pageHead = head(html);
    const title = pageHead.match(/<title>([^<]+)<\/title>/i)?.[1];
    const description = metaContent(html, "name", "description");
    const canonical = absolute(route);

    assert.ok(title, `${path}: title is required`);
    assert.ok(description, `${path}: description is required`);
    assert.match(
      pageHead,
      new RegExp(`<link\\b[^>]*rel=["']canonical["'][^>]*href=["']${escapeRegExp(canonical)}["']`),
      `${path}: self-canonical is required`,
    );
    assert.equal(metaContent(html, "property", "og:type"), "website", `${path}: og:type`);
    assert.equal(metaContent(html, "property", "og:title"), title, `${path}: og:title`);
    assert.equal(metaContent(html, "property", "og:description"), description, `${path}: og:description`);
    assert.equal(metaContent(html, "property", "og:url"), canonical, `${path}: og:url`);
    assert.equal(metaContent(html, "property", "og:image"), "https://pestflow.my/og.webp", `${path}: og:image`);
    assert.equal(metaContent(html, "name", "twitter:card"), "summary_large_image", `${path}: twitter card`);
  }
});

test("structured data is valid JSON and does not invent proof or prices", async () => {
  for (const [path] of routes) {
    const html = await read(path);
    const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    assert.ok(blocks.length > 0, `${path}: JSON-LD is required`);

    for (const [, source] of blocks) {
      const data = JSON.parse(source);
      const serialized = JSON.stringify(data);
      assert.doesNotMatch(serialized, /aggregateRating|reviewCount|ratingValue|customerCount/i, `${path}: unsupported proof`);
      assert.doesNotMatch(serialized, /"offers"|priceCurrency|lowPrice|highPrice/i, `${path}: pricing stays API-driven`);
    }
  }
});

test("homepage owns the global pest control software category intent", async () => {
  const html = await read("index.html");
  const pageHead = head(html);
  const title = pageHead.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
  const description = metaContent(html, "name", "description") ?? "";
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]+>/g, " ") ?? "";

  assert.match(title, /^Pest Control Software\b/i);
  assert.match(description, /pest control software/i);
  assert.match(h1, /pest control software/i);
  assert.doesNotMatch(title, /Malaysia/i, "geo intent belongs to the Malaysia page");
});

test("robots and sitemap publish only preferred indexable URLs", async () => {
  const [robots, sitemap] = await Promise.all([read("public/robots.txt"), read("public/sitemap.xml")]);
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/pestflow\.my\/sitemap\.xml$/m);

  const expectedRoutes = [
    ...routes.values(),
    "/blog/cara-pilih-perisian-kawalan-makhluk-perosak/",
    "/blog/panduan-e-invois-lhdn-syarikat-pest-control/",
    "/blog/penjadualan-teknikal-dan-gps-kawalan-perosak/",
    "/blog/sst-untuk-syarikat-kawalan-makhluk-perosak/",
  ];
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(locations.sort(), expectedRoutes.map(absolute).sort());
  assert.doesNotMatch(sitemap, /https:\/\/pestflow\.my\/pest-control-software\//);
});

test("commercial pages provide contextual next steps inside main content", async () => {
  const requirements = new Map([
    ["index.html", [
      "/product/",
      "/pricing/",
      "/pest-control-software-malaysia/",
      "/pest-control-software-small-business/",
      "/commercial-pest-control-software/",
      "/pest-control-scheduling-software/",
      "/pest-control-technician-app/",
      "/workflow/",
    ]],
    ["product/index.html", ["/pest-control-software-malaysia/"]],
    ["pricing/index.html", ["/pest-control-software-small-business/", "/commercial-pest-control-software/"]],
    ["pest-control-software-malaysia/index.html", ["/", "/compliance/"]],
    ["pest-control-software-small-business/index.html", ["/", "/pricing/"]],
    ["commercial-pest-control-software/index.html", ["/", "/pest-control-scheduling-software/", "/pest-control-technician-app/"]],
    ["pest-control-scheduling-software/index.html", ["/", "/pest-control-technician-app/"]],
    ["pest-control-technician-app/index.html", ["/", "/pest-control-scheduling-software/"]],
    ["workflow/index.html", ["/pest-control-scheduling-software/", "/pest-control-technician-app/", "/compliance/"]],
    ["compliance/index.html", [
      "/blog/panduan-e-invois-lhdn-syarikat-pest-control/",
      "/blog/sst-untuk-syarikat-kawalan-makhluk-perosak/",
    ]],
  ]);

  for (const [path, targets] of requirements) {
    const content = main(await read(path));
    for (const target of targets) {
      assert.match(content, new RegExp(`href=["']${escapeRegExp(target)}["']`), `${path}: missing main-content link to ${target}`);
    }
  }
});
