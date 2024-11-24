import StmtSequence from "./stmtSequence";
import match from "./match";
function repeatStmt(output, index) {
  match(output, index, "REPEAT");
  StmtSequence(output, index);
  match(output, index, "UNTIL");
  exp(output, index);
}
export default repeatStmt;
