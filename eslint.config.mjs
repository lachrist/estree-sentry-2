import tsparser from "@typescript-eslint/parser";
import tslinter from "@typescript-eslint/eslint-plugin";

/**
 * @type {import("eslint").Rule.RuleModule}
 */
const no_global_rule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow global variables",
      recommended: false,
    },
    schema: {
      type: "array",
      items: { type: "string" },
    },
  },
  create: (context) => {
    const { options: allowed } = context;
    return {
      Program: (node) => {
        const { variables, through } = context.sourceCode.getScope(node);
        for (const { references } of variables) {
          for (const { identifier } of references) {
            if (!allowed.includes(identifier.name)) {
              context.report({
                node: identifier,
                message: `global variable are forbidden: ${identifier.name}`,
              });
            }
          }
        }
        for (const { identifier } of through) {
          if (!allowed.includes(identifier.name)) {
            context.report({
              node: identifier,
              message: `undefined global variable: ${identifier.name}`,
            });
          }
        }
      },
    };
  },
};

/**
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        globalThis: false,
        console: false,
      },
    },
    plugins: {
      custom: {
        rules: {
          "no-global": no_global_rule,
        },
      },
    },
    rules: {
      "custom/no-global": ["error", "globalThis"],
      "no-unreachable": "error",
      "no-duplicate-imports": "error",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tslinter,
    },
    rules: {
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
