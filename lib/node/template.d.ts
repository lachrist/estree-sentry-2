import type { Brand } from "../util/brand";
import type { Expression } from "./expression";

export type TemplateElementValue = Brand<string, "estree.TemplateElementValue">;

export type TemplateElementRawValue = Brand<
  string,
  "estree.TemplateElementRawValue"
>;

export type TaggedTemplateExpression<X> = X & {
  type: "TaggedTemplateExpression";
  tag: Expression<X>;
  quasi: TemplateLiteral<X>;
};

export type TemplateLiteral<X> = X & {
  type: "TemplateLiteral";
  quasis: TemplateElement<X>[];
  expressions: Expression<X>[];
};

export type TemplateElement<X> = X & {
  type: "TemplateElement";
  tail: boolean;
  value: {
    cooked: TemplateElementValue | null;
    raw: TemplateElementRawValue;
  };
};
