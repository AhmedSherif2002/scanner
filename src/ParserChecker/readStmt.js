import match from "./match";
function readStmt(output, indexObj) {
  match(output, indexObj, "READ", "missing READ token in readStmt");
  match(output, indexObj, "IDENTIFIER", "missing IDENTIFIER token in readStmt");
}

export default readStmt;
