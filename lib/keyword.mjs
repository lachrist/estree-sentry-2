/**
 * @type {{[key in import("./keyword").Keyword]: null}}
 */
export const KEYWORD_RECORD = {
  break: null,
  case: null,
  catch: null,
  class: null,
  const: null,
  continue: null,
  debugger: null,
  default: null,
  delete: null,
  do: null,
  else: null,
  enum: null,
  export: null,
  extends: null,
  false: null,
  finally: null,
  for: null,
  function: null,
  if: null,
  import: null,
  in: null,
  instanceof: null,
  new: null,
  null: null,
  return: null,
  super: null,
  switch: null,
  this: null,
  throw: null,
  true: null,
  try: null,
  typeof: null,
  var: null,
  void: null,
  while: null,
  with: null,
};

/**
 * @type {{[key in import("./keyword").StrictKeyword]: null}}
 */
export const STRICT_KEYWORD_RECORD = {
  yield: null,
  implements: null,
  interface: null,
  let: null,
  package: null,
  private: null,
  protected: null,
  public: null,
  static: null,
};

/**
 * @type {{[key in import("./keyword").StrictReadonlyKeyword]: null}}
 */
export const STRICT_READONLY_KEYWORD_RECORD = {
  arguments: null,
  eval: null,
};

/**
 * @type {{[key in import("./keyword").ContextualKeyword]: null}}
 */
export const CONTEXTUAL_KEYWORD_RECORD = {
  yield: null,
  await: null,
};
