import { EstreeSentryTypeError } from "./error.mjs";
import { filter, isNotNull } from "./util/index.mjs";

/**
 * @type {<X>(
 *   node: import("./node").Node<X>,
 * ) => import("./node").Node<X>[]}
 */
export const listChildren = (node) => {
  switch (node.type) {
    case "Program": {
      return [...node.body];
    }
    case "ArrayExpression": {
      return filter(node.elements, isNotNull);
    }
    case "ObjectExpression": {
      return [...node.properties];
    }
    case "ObjectPattern": {
      return [...node.properties];
    }
    case "FunctionExpression": {
      if (node.id === null) {
        return [...node.params, node.body];
      } else {
        return [node.id, ...node.params, node.body];
      }
    }
    case "ArrowFunctionExpression": {
      return [...node.params, node.body];
    }
    case "ClassExpression": {
      return filter([node.id, node.superClass, node.body], isNotNull);
    }
    case "PropertyDefinition": {
      if (node.value === null) {
        return [node.key];
      } else {
        return [node.key, node.value];
      }
    }
    case "VariableDeclaration": {
      return [...node.declarations];
    }
    case "VariableDeclarator": {
      if (node.init === null) {
        return [node.id];
      } else {
        return [node.id, node.init];
      }
    }
    case "BlockStatement": {
      return [...node.body];
    }
    case "ReturnStatement": {
      if (node.argument === null) {
        return [];
      } else {
        return [node.argument];
      }
    }
    case "FunctionDeclaration": {
      if (node.id === null) {
        return [...node.params, node.body];
      } else {
        return [node.id, ...node.params, node.body];
      }
    }
    case "ClassDeclaration": {
      return filter([node.id, node.superClass, node.body], isNotNull);
    }
    case "ForStatement": {
      return filter([node.init, node.test, node.update, node.body], isNotNull);
    }
    case "ForInStatement": {
      return [node.left, node.right, node.body];
    }
    case "ForOfStatement": {
      return [node.left, node.right, node.body];
    }
    case "WhileStatement": {
      return [node.test, node.body];
    }
    case "DoWhileStatement": {
      return [node.body, node.test];
    }
    case "IfStatement": {
      if (node.alternate === null) {
        return [node.test, node.consequent];
      } else {
        return [node.test, node.consequent, node.alternate];
      }
    }
    case "SwitchStatement": {
      return [node.discriminant, ...node.cases];
    }
    case "SwitchCase": {
      return filter([node.test, ...node.consequent], isNotNull);
    }
    case "TryStatement": {
      return filter([node.block, node.handler, node.finalizer], isNotNull);
    }
    case "CatchClause": {
      if (node.param === null) {
        return [node.body];
      } else {
        return [node.param, node.body];
      }
    }
    case "ThrowStatement": {
      return [node.argument];
    }
    case "LabeledStatement": {
      return [node.label, node.body];
    }
    case "BreakStatement": {
      if (node.label === null) {
        return [];
      } else {
        return [node.label];
      }
    }
    case "ContinueStatement": {
      if (node.label === null) {
        return [];
      } else {
        return [node.label];
      }
    }
    case "WithStatement": {
      return [node.object, node.body];
    }
    case "DebuggerStatement": {
      return [];
    }
    case "ExpressionStatement": {
      return [node.expression];
    }
    case "EmptyStatement": {
      return [];
    }
    case "SequenceExpression": {
      return [...node.expressions];
    }
    case "UnaryExpression": {
      return [node.argument];
    }
    case "UpdateExpression": {
      return [node.argument];
    }
    case "BinaryExpression": {
      return [node.left, node.right];
    }
    case "AssignmentExpression": {
      return [node.left, node.right];
    }
    case "LogicalExpression": {
      return [node.left, node.right];
    }
    case "MemberExpression": {
      return [node.object, node.property];
    }
    case "CallExpression": {
      return [node.callee, ...node.arguments];
    }
    case "NewExpression": {
      return [node.callee, ...node.arguments];
    }
    case "ConditionalExpression": {
      return [node.test, node.consequent, node.alternate];
    }
    case "YieldExpression": {
      if (node.argument === null) {
        return [];
      } else {
        return [node.argument];
      }
    }
    case "AwaitExpression": {
      return [node.argument];
    }
    case "TaggedTemplateExpression": {
      return [node.tag, node.quasi];
    }
    case "TemplateLiteral": {
      return [...node.quasis, ...node.expressions];
    }
    case "TemplateElement": {
      return [];
    }
    case "ArrayPattern": {
      return filter(node.elements, isNotNull);
    }
    case "RestElement": {
      return [node.argument];
    }
    case "AssignmentPattern": {
      return [node.left, node.right];
    }
    case "Property": {
      return [node.key, node.value];
    }
    case "ChainExpression": {
      return [node.expression];
    }
    case "ClassBody": {
      return [...node.body];
    }
    case "MethodDefinition": {
      return [node.key, node.value];
    }
    case "StaticBlock": {
      return [...node.body];
    }
    case "SpreadElement": {
      return [node.argument];
    }
    case "Super": {
      return [];
    }
    case "ImportDeclaration": {
      return [...node.specifiers, node.source];
    }
    case "ImportSpecifier": {
      return [node.imported, node.local];
    }
    case "ImportDefaultSpecifier": {
      return [node.local];
    }
    case "ImportNamespaceSpecifier": {
      return [node.local];
    }
    case "ExportAllDeclaration": {
      if (node.exported === null) {
        return [node.source];
      } else {
        return [node.exported, node.source];
      }
    }
    case "ExportNamedDeclaration": {
      return filter(
        [node.declaration, ...node.specifiers, node.source],
        isNotNull,
      );
    }
    case "ExportDefaultDeclaration": {
      return [node.declaration];
    }
    case "ExportSpecifier": {
      return [node.local, node.exported];
    }
    case "ThisExpression": {
      return [];
    }
    case "Identifier": {
      return [];
    }
    case "Literal": {
      return [];
    }
    case "ImportExpression": {
      return [node.source];
    }
    case "MetaProperty": {
      return [node.meta, node.property];
    }
    case "PrivateIdentifier": {
      return [];
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(node);
    }
    /* c8 ignore stop */
  }
};

// /**
//  * @type {<X>(
//  *   node: import("./node").Node<X>,
//  * ) => Generator<import("./node").Node<X>>}
//  */
// export const generateChildren = function* (node) {
//   switch (node.type) {
//     case "Program": {
//       yield* node.body;
//       return undefined;
//     }
//     case "ArrayExpression": {
//       for (const element of node.elements) {
//         if (element !== null) {
//           yield element;
//         }
//       }
//       return undefined;
//     }
//     case "ObjectExpression": {
//       yield* node.properties;
//       return undefined;
//     }
//     case "ObjectPattern": {
//       yield* node.properties;
//       return undefined;
//     }
//     case "FunctionExpression": {
//       if (node.id !== null) {
//         yield node.id;
//       }
//       yield* node.params;
//       yield node.body;
//       return undefined;
//     }
//     case "ArrowFunctionExpression": {
//       yield* node.params;
//       yield node.body;
//       return undefined;
//     }
//     case "ClassExpression": {
//       if (node.id !== null) {
//         yield node.id;
//       }
//       if (node.superClass !== null) {
//         yield node.superClass;
//       }
//       yield node.body;
//       return undefined;
//     }
//     case "PropertyDefinition": {
//       if (node.value !== null) {
//         yield node.value;
//       }
//       yield node.key;
//       return undefined;
//     }
//     case "VariableDeclaration": {
//       yield* node.declarations;
//       return undefined;
//     }
//     case "VariableDeclarator": {
//       yield node.id;
//       if (node.init !== null) {
//         yield node.init;
//       }
//       return undefined;
//     }
//     case "BlockStatement": {
//       yield* node.body;
//       return undefined;
//     }
//     case "ReturnStatement": {
//       if (node.argument !== null) {
//         yield node.argument;
//       }
//       return undefined;
//     }
//     case "FunctionDeclaration": {
//       if (node.id !== null) {
//         yield node.id;
//       }
//       yield* node.params;
//       yield node.body;
//       return undefined;
//     }
//     case "ClassDeclaration": {
//       if (node.id !== null) {
//         yield node.id;
//       }
//       if (node.superClass !== null) {
//         yield node.superClass;
//       }
//       yield node.body;
//       return undefined;
//     }
//     case "ForStatement": {
//       if (node.init !== null) {
//         yield node.init;
//       }
//       if (node.test !== null) {
//         yield node.test;
//       }
//       if (node.update !== null) {
//         yield node.update;
//       }
//       yield node.body;
//       return undefined;
//     }
//     case "ForInStatement": {
//       yield node.left;
//       yield node.right;
//       yield node.body;
//       return undefined;
//     }
//     case "ForOfStatement": {
//       yield node.left;
//       yield node.right;
//       yield node.body;
//       return undefined;
//     }
//     case "WhileStatement": {
//       yield node.test;
//       yield node.body;
//       return undefined;
//     }
//     case "DoWhileStatement": {
//       yield node.body;
//       yield node.test;
//       return undefined;
//     }
//     case "IfStatement": {
//       yield node.test;
//       yield node.consequent;
//       if (node.alternate !== null) {
//         yield node.alternate;
//       }
//       return undefined;
//     }
//     case "SwitchStatement": {
//       yield node.discriminant;
//       yield* node.cases;
//       return undefined;
//     }
//     case "SwitchCase": {
//       if (node.test !== null) {
//         yield node.test;
//       }
//       yield* node.consequent;
//       return undefined;
//     }
//     case "TryStatement": {
//       yield node.block;
//       if (node.handler !== null) {
//         yield node.handler;
//       }
//       if (node.finalizer !== null) {
//         yield node.finalizer;
//       }
//       return undefined;
//     }
//     case "CatchClause": {
//       if (node.param !== null) {
//         yield node.param;
//       }
//       yield node.body;
//       return undefined;
//     }
//     case "ThrowStatement": {
//       yield node.argument;
//       return undefined;
//     }
//     case "LabeledStatement": {
//       yield node.label;
//       yield node.body;
//       return undefined;
//     }
//     case "BreakStatement": {
//       if (node.label !== null) {
//         yield node.label;
//       }
//       return undefined;
//     }
//     case "ContinueStatement": {
//       if (node.label !== null) {
//         yield node.label;
//       }
//       return undefined;
//     }
//     case "WithStatement": {
//       yield node.object;
//       yield node.body;
//       return undefined;
//     }
//     case "DebuggerStatement": {
//       return undefined;
//     }
//     case "ExpressionStatement": {
//       yield node.expression;
//       return undefined;
//     }
//     case "EmptyStatement": {
//       return undefined;
//     }
//     case "SequenceExpression": {
//       yield* node.expressions;
//       return undefined;
//     }
//     case "UnaryExpression": {
//       yield node.argument;
//       return undefined;
//     }
//     case "UpdateExpression": {
//       yield node.argument;
//       return undefined;
//     }
//     case "BinaryExpression": {
//       yield node.left;
//       yield node.right;
//       return undefined;
//     }
//     case "AssignmentExpression": {
//       yield node.left;
//       yield node.right;
//       return undefined;
//     }
//     case "LogicalExpression": {
//       yield node.left;
//       yield node.right;
//       return undefined;
//     }
//     case "MemberExpression": {
//       yield node.object;
//       yield node.property;
//       return undefined;
//     }
//     case "CallExpression": {
//       yield node.callee;
//       yield* node.arguments;
//       return undefined;
//     }
//     case "NewExpression": {
//       yield node.callee;
//       yield* node.arguments;
//       return undefined;
//     }
//     case "ConditionalExpression": {
//       yield node.test;
//       yield node.consequent;
//       yield node.alternate;
//       return undefined;
//     }
//     case "YieldExpression": {
//       if (node.argument !== null) {
//         yield node.argument;
//       }
//       return undefined;
//     }
//     case "AwaitExpression": {
//       yield node.argument;
//       return undefined;
//     }
//     case "TaggedTemplateExpression": {
//       yield node.tag;
//       yield node.quasi;
//       return undefined;
//     }
//     case "TemplateLiteral": {
//       yield* node.quasis;
//       yield* node.expressions;
//       return undefined;
//     }
//     case "TemplateElement": {
//       return undefined;
//     }
//     case "ArrayPattern": {
//       for (const element of node.elements) {
//         if (element !== null) {
//           yield element;
//         }
//       }
//       return undefined;
//     }
//     case "RestElement": {
//       yield node.argument;
//       return undefined;
//     }
//     case "AssignmentPattern": {
//       yield node.left;
//       yield node.right;
//       return undefined;
//     }
//     case "Property": {
//       yield node.key;
//       yield node.value;
//       return undefined;
//     }
//     case "ChainExpression": {
//       yield node.expression;
//       return undefined;
//     }
//     case "ClassBody": {
//       yield* node.body;
//       return undefined;
//     }
//     case "MethodDefinition": {
//       yield node.key;
//       yield node.value;
//       return undefined;
//     }
//     case "StaticBlock": {
//       yield* node.body;
//       return undefined;
//     }
//     case "SpreadElement": {
//       yield node.argument;
//       return undefined;
//     }
//     case "Super": {
//       return undefined;
//     }
//     case "ImportDeclaration": {
//       yield* node.specifiers;
//       yield node.source;
//       return undefined;
//     }
//     case "ImportSpecifier": {
//       yield node.imported;
//       yield node.local;
//       return undefined;
//     }
//     case "ImportDefaultSpecifier": {
//       yield node.local;
//       return undefined;
//     }
//     case "ImportNamespaceSpecifier": {
//       yield node.local;
//       return undefined;
//     }
//     case "ExportAllDeclaration": {
//       if (node.exported !== null) {
//         yield node.exported;
//       }
//       yield node.source;
//       return undefined;
//     }
//     case "ExportNamedDeclaration": {
//       if (node.declaration !== null) {
//         yield node.declaration;
//       }
//       yield* node.specifiers;
//       if (node.source !== null) {
//         yield node.source;
//       }
//       return undefined;
//     }
//     case "ExportDefaultDeclaration": {
//       yield node.declaration;
//       return undefined;
//     }
//     case "ExportSpecifier": {
//       yield node.local;
//       yield node.exported;
//       return undefined;
//     }
//     case "ThisExpression": {
//       return undefined;
//     }
//     case "Identifier": {
//       return undefined;
//     }
//     case "Literal": {
//       return undefined;
//     }
//     case "ImportExpression": {
//       yield node.source;
//       return undefined;
//     }
//     case "MetaProperty": {
//       yield node.meta;
//       yield node.property;
//       return undefined;
//     }
//     case "PrivateIdentifier": {
//       return undefined;
//     }
//     /* c8 ignore start */
//     default: {
//       throw new EstreeSentryTypeError(node);
//     }
//     /* c8 ignore stop */
//   }
// };
