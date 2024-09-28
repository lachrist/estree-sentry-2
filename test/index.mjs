import { argv, stdout, stderr } from "node:process";
import { spawn } from "./spawn.mjs";

Error.stackTraceLimit = Infinity;

export const CASE_ENUM = [
  "call",
  "chain",
  "class",
  "declaration",
  "expression",
  "function",
  "identifier",
  "key",
  "literal",
  "member",
  "module",
  "object",
  "pattern",
  "program",
  "statement",
  "template",
];

/**
 * @type {(
 *   name: string,
 * ) => Promise<number>}
 */
const cov = (name) =>
  spawn("npx", [
    "c8",
    "--100",
    "--include",
    `lib/guard/${name}.mjs`,
    "--",
    "node",
    `test/cases/${name}.mjs`,
  ]);

/**
 * @type {(
 *   name: string,
 * ) => Promise<number>}
 */
const reg = async (name) => {
  try {
    await import(`./cases/${name}.mjs`);
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
    stderr.write("usage: node test/index.mjs (cov|reg) [ ... cases ]\n");
    return 1;
  } else {
    const [mode, ...case_enum] = argv;
    if (mode === "cov" || mode === "reg") {
      for (const name of case_enum.length === 0 ? CASE_ENUM : case_enum) {
        if (CASE_ENUM.includes(name)) {
          const code = await run[mode](name);
          if (code !== 0) {
            return code;
          }
        } else {
          stderr.write(`unknown case: ${name}\n`);
          return 1;
        }
      }
      return 0;
    } else {
      stderr.write("usage: node test/index.mjs (cov|reg) [ ... cases ]\n");
      return 1;
    }
  }
};

process.exitCode = await main(argv.slice(2));
