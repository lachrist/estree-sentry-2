import { argv, stdout, stderr } from "node:process";
import { crawl, spawn } from "./util.mjs";
import { crawlTarget, toTarget } from "./target.mjs";

Error.stackTraceLimit = Infinity;

/**
 * @type {(
 *   target: import("./target").Target,
 * ) => Promise<number>}
 */
const cov = ({ main, test }) =>
  spawn("npx", ["c8", "--100", "--include", main, "--", "node", test ?? main]);

/**
 * @type {(
 *   target: import("./target").Target,
 * ) => Promise<number>}
 */
const reg = async ({ main, test }) => {
  try {
    await import(`../${test ?? main}`);
    return 0;
  } catch (error) {
    if (error instanceof Error) {
      stderr.write(`${error.stack}\n`);
      return 1;
    } else {
      throw error;
    }
  }
};

const run = { cov, reg };

/**
 * @type {(
 *   argv: string[],
 * ) => Promise<number>}
 */
const main = async (argv) => {
  if (argv.length === 0) {
    stderr.write("usage: node test/index.mjs (cov|reg) [ ... files ]\n");
    return 1;
  } else {
    const [mode, ...mains] = argv;
    if (mode === "cov" || mode === "reg") {
      const root = new URL("../", import.meta.url);
      if (mains.length === 0) {
        for (const target of await crawlTarget(new URL("lib/", root), root)) {
          stdout.write(`testing ${target.main}...\n`);
          const code = await run[mode](target);
          if (code !== 0) {
            return code;
          }
        }
      } else {
        for (const main of mains) {
          const either = await toTarget(new URL(main, root), root);
          if (typeof either === "string") {
            stderr.write(`${either}\n`);
            return 1;
          } else {
            stdout.write(`testing ${either.main}...\n`);
            const code = await run[mode](either);
            if (code !== 0) {
              return code;
            }
          }
        }
      }
      return 0;
    } else {
      stderr.write("usage: node test/index.mjs (cov|reg) [ ... files ]\n");
      return 1;
    }
  }
};

process.exitCode = await main(argv.slice(2));
