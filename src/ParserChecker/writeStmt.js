import match from "./match";
import exp from "./exp";
// writeStmt --> write exp
function writeStmt(output, indexObj) {
  // match(write)
  match(output, indexObj, "WRITE", "Missing WRITE token in writeStmt");

  // match (exp)
  exp(output, indexObj);
}

export default writeStmt;
