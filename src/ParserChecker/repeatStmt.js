import exp from "./exp";
import match from "./match";
import stmtSequence from "./StmtSequence";
function repeatStmt(output, indexObj) {
  match(output, indexObj, "REPEAT", "missing REPEAT token in repeatStmt");
  stmtSequence(output, indexObj);
  match(output, indexObj, "UNTIL", "missing UNTIL token in repeatStmt");
  exp(output, indexObj);
}
export default repeatStmt;
