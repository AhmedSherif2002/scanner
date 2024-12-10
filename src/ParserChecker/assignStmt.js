import match from "./match";
import exp from "./exp";
//assign-stmt --> IDENTIFIER := exp
function assignStmt(output, indexObj) {
  // match(IDENTIFIER)

  match(
    output,
    indexObj,
    "IDENTIFIER",
    "Missing IDENTIFIER token in assignStmt"
  );
  // match(:=)

  match(output, indexObj, "ASSIGN", "Missing ASSIGN token in assignStmt");
  // match (exp)
  exp(output, indexObj);
}

export default assignStmt;
