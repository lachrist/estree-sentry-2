import type { Annotate } from "./annotate";
import type { Kind } from "./kind";
import type { Path } from "./path";

export type AnnotationBrand = { __brand: "annotation" };

export type GuardAnnotate = Annotate<AnnotationBrand>;

export type Guard<N> = (
  node: object,
  path: Path,
  annotate: GuardAnnotate,
) => N & AnnotationBrand;

export type Subguard<N extends { type: string }> = (
  node: object,
  path: Path,
  annotate: GuardAnnotate,
  type: N["type"],
  kind: Kind,
) => N & AnnotationBrand;

export type AnyGuard<N> = <X>(
  node: object,
  path: Path,
  annotate: Annotate<X>,
) => N;
