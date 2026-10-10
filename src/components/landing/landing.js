const DEFAULT_REPO = "https://github.com/DiegoLSdev/LazyDocs";

export function repoUrl(config) {
  if (config?.repository) return config.repository;
  const fromNavbar = config?.navbar?.links?.find((link) => /github\.com/i.test(link.href || ""));
  return (fromNavbar?.href || DEFAULT_REPO).replace(/\/$/, "");
}

export function cloneCommand(config) {
  return `git clone ${repoUrl(config)}`;
}

export const docsRoutes = {
  start: "/docs/getting-started/introduction",
  quickStart: "/docs/getting-started/quick-start",
  installation: "/docs/getting-started/installation",
  themes: "/docs/customization/themes",
  search: "/docs/advanced/search",
};

export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
