import { resolve } from "node:path";

const pages = [
  "index.html",
  "product/index.html",
  "workflow/index.html",
  "compliance/index.html",
  "pricing/index.html",
  "blog/index.html",
  "about/index.html",
  "contact/index.html",
  "brand/index.html",
  "pest-control-scheduling-software/index.html",
  "pest-control-technician-app/index.html",
  "pest-control-software-small-business/index.html",
  "commercial-pest-control-software/index.html",
  "pest-control-software-malaysia/index.html",
];

export default {
  publicDir: "public",
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [
          page.replace("/index.html", "").replace(".html", "") || "home",
          resolve(page),
        ]),
      ),
    },
  },
};
