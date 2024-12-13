import match from "./match";
import exp from "./exp";

// writeStmt --> write exp
function writeStmt(output, indexObj) {
  // match(write)
  const node = match(output, indexObj, "WRITE", "Missing WRITE token in writeStmt");

  // match (exp)
  const expNode = exp(output, indexObj);

  node.addChild(expNode);
  return node;
}

export default writeStmt;
