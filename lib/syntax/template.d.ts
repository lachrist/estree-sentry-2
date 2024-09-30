import { Expression } from "./expression";

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
    /* It is null when the template literal is tagged and the text has an invalid escape (e.g. - tag`\unicode and \u{55}`) */
    cooked: string | null;
    raw: string;
  };
};
