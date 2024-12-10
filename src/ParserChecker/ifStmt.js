import stmtSequence from "./StmtSequence";
import exp from "./exp";
import match from "./match";
// ifStmt -> if exp then stmt-sequence [else stmt-sequence] end
function ifStmt(output, indexObj) {
  // match(IF)

  match(output, indexObj, "IF", "Missing IF token in ifStmt");

  // match(exp)
  exp(output, indexObj);

  //match(THEN)
  match(output, indexObj, "THEN", "Missing THEN token in ifStmt");

  //match(stmtSequence)
  stmtSequence(output, indexObj);

  // match(ELSE) (OPTIONAL)
  if (output[indexObj.index]?.type === "ELSE") {
    match(output, indexObj, "ELSE", "Missing ELSE token in ifStmt");
    // match(stmtSequence)
    stmtSequence(output, indexObj);
  }

  // match(END)
  match(output, indexObj, "END", "Missing END token in ifStmt");
}

export default ifStmt;
