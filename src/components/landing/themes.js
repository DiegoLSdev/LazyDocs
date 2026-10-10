import { useEffect, useState } from "react";

const sources = import.meta.glob("../../themes/*.css", { query: "?raw", import: "default" });

const knownOrder = ["brownie", "greenleaf", "bluewave", "panda"];

function readVariables(block = "") {
  const tokens = {};
  for (const [, name, value] of block.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    tokens[`--${name}`] = value.trim();
  }
  return tokens;
}

export function parseTheme(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  return {
    light: readVariables(clean.match(/:root\s*\{([^}]*)\}/)?.[1]),
    dark: readVariables(clean.match(/\.dark\s*\{([^}]*)\}/)?.[1]),
  };
}

let cache = null;

function rank(name) {
  const i = knownOrder.indexOf(name);
  return i === -1 ? knownOrder.length : i;
}

export function loadThemes() {
  cache ??= Promise.all(
    Object.entries(sources).map(async ([path, load]) => {
      const name = path.split("/").pop().replace(/\.css$/, "");
      return { name, ...parseTheme(await load()) };
    })
  ).then((themes) => themes.sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name)));
  return cache;
}

export function useThemes() {
  const [themes, setThemes] = useState(null);

  useEffect(() => {
    let alive = true;
    loadThemes()
      .then((list) => alive && setThemes(list))
      .catch(() => alive && setThemes([]));
    return () => {
      alive = false;
    };
  }, []);

  return themes;
}
