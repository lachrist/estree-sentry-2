import type { Annotate } from "./annotate";
import type { Kind } from "./kind";
import type { Path } from "./path";

export type AnnotationBrand = { __brand: "annotation" };

export type Guard<N> = (
  node: object,
  path: Path,
  annotate: Annotate<AnnotationBrand>,
) => N & AnnotationBrand;

export type Subguard<N extends { type: string }> = <X>(
  node: object,
  path: Path,
  annotate: Annotate<AnnotationBrand>,
  type: N["type"],
  kind: Kind,
) => N & AnnotationBrand;
