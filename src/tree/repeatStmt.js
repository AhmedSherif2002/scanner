import exp from "./exp";
import match from "./match";
import stmtSequence from "./StmtSequence";

function repeatStmt(output, indexObj) {
  const node = match(output, indexObj, "REPEAT", "missing REPEAT token in repeatStmt");
  const node2 = stmtSequence(output, indexObj);
  match(output, indexObj, "UNTIL", "missing UNTIL token in repeatStmt");
  const node3 = exp(output, indexObj);
  node.addChild(node2);
  node.addChild(node3);
  return node
}
export default repeatStmt;
