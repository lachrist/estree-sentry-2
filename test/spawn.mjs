import { spawn as spawnInner } from "child_process";
import { resolve } from "path";

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
