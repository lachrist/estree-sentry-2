import { spawn as spawnInner } from "child_process";
import { readdir, stat } from "node:fs/promises";

const { URL } = globalThis;

/**
 * @type {(
 *   command: string,
 *   argv: string[],
 * ) => Promise<number>}
 */
export const spawn = (command, argv) =>
  new Promise((resolve, reject) => {
    const child = spawnInner(command, argv, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal === null) {
        if (code === null) {
          reject(new Error("spawn failed with no exit code"));
        } else {
          resolve(code);
        }
      } else {
        reject(new Error(`spawn failed with signal ${signal}`));
      }
    });
  });

/**
 * @type {(
 *   directory: URL,
 * ) => AsyncIterable<URL>}
 */
export const crawl = async function* (parent) {
  if (!parent.href.endsWith("/")) {
    throw new Error("directory must end with a slash");
  }
  for (const name of (await readdir(parent)).sort()) {
    const child = new URL(name, parent);
    if ((await stat(child)).isDirectory()) {
      yield* crawl(new URL(`${name}/`, parent));
    } else {
      yield child;
    }
  }
};
