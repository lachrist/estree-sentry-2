export type Console = {
  log: (...args: unknown[]) => void;
  dir: (arg: unknown, options: { depth: number }) => void;
};
