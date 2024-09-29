import type { Kind } from "./kind";
import type { Path } from "./path";

export type Annotate<X> = (node: object, path: Path, kind: Kind) => X;
