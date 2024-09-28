import { pass } from "../test.mjs";

// DefaultClassDeclaration //

pass("export default class {}", "module");

pass("export default class extends d {}", "module");

// ClassDeclaration //

pass("class c extends d {}");

pass("class c {}");

// ClassExpression //

pass("(class c {});");

pass("(class {});");

pass("(class extends d {});");

pass("(class c extends d {});");

// StaticBlock //

pass(`
  (class {
    static {
      123;
    }
  });
`);

// ConstructorMethodDefinition //

pass(`
  (class {
    constructor () {}
  });
`);

// PlainMethodDefinition //

pass(`
  (class {
    m1 () {}
    static m2 () {}
  });
`);

pass(`
  (class {
    [m] () {}
    static [m2] () {}
  });
`);

// GetterMethodDefinition //

pass(`
  (class {
    get m1 () {}
    static get m2 () {}
  });
`);

pass(`
  (class {
    get [m1] () {}
    static get [m2] () {}
  });
`);

// SetterMethodDefinition //

pass(`
  (class {
    set m1 (x) {}
    static set m2 (x) {}
  });
`);

pass(`
  (class {
    set [m1] (x) {}
    static set [m2] (x) {}
  });
`);

// property //

pass(`
  (class {
    p1 = x;
    static p2 = x;
    p3;
    static p4;
  });
`);

pass(`
  (class {
    [p1] = x;
    static [p2] = x;
    [p3];
    static [p4];
  });
`);
