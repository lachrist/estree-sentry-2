import type { Annotate } from "./annotate";
import type { Kind } from "./kind";
import type { Path } from "./path";

export type MarkerAnnotation = { __marker: null };

export type Guard<N> = (
  node: object,
  path: Path,
  annotate: Annotate<MarkerAnnotation>,
) => N & MarkerAnnotation;

export type Subguard<N extends { type: string }> = <X>(
  node: object,
  path: Path,
  annotate: Annotate<MarkerAnnotation>,
  type: N["type"],
  kind: Kind,
) => N & MarkerAnnotation;
