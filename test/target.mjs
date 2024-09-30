import { access } from "node:fs/promises";
import { crawl } from "./util.mjs";
import { R_OK } from "node:constants";

const { URL, Set, Error } = globalThis;

/**
 * @type {(
 *   base: URL,
 *   root: URL,
 * ) => Promise<import("./target").Target[]>}
 */
export const crawlTarget = async (base, root) => {
  /** @type {Set<string>} */
  const files = new Set();
  for await (const file of crawl(base)) {
    if (file.href.startsWith(root.href)) {
      files.add(file.href.substring(root.href.length));
    } else {
      throw new Error("file outside root");
    }
  }
  /** @type {import("./target").Target[]} */
  const targets = [];
  for (const file of files) {
    if (file.endsWith(".mjs") && !file.endsWith(".test.mjs")) {
      const test = `${file.slice(0, -4)}.test.mjs`;
      targets.push({
        main: file,
        test: files.has(test) ? test : null,
      });
    }
  }
  return targets;
};

/**
 * @type {(
 *   main: URL,
 *   root: URL,
 * ) => Promise<import("./target").Target | string>}
 */
export const toTarget = async (main, root) => {
  if (!main.href.startsWith(root.href)) {
    return `${main} is outside ${root}`;
  }
  if (!main.href.endsWith(".mjs") || main.href.endsWith(".test.mjs")) {
    return `${main} is not a main module`;
  }
  const test = new URL(`${main.href.slice(0, -4)}.test.mjs`);
  try {
    await access(main, R_OK);
    await access(test, R_OK);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      throw error;
    }
  }
  return {
    main: main.href.substring(root.href.length),
    test: test.href.substring(root.href.length),
  };
};
