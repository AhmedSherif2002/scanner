import match from "./match";

function readStmt(output, indexObj) {
  const node = match(output, indexObj, "READ", "missing READ token in readStmt");
  const id = match(output, indexObj, "IDENTIFIER", "missing IDENTIFIER token in readStmt");
  node.value = node.value + `(${id})`;
  return node;
}

export default readStmt;
