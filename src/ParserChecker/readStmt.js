import match from "./match";
function readStmt(output, index) {
  match(output, index, "READ");
  match(output, index, "IDENTIFIER");
}

export default readStmt;
