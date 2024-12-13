import match from "./match";
import exp from "./exp";
import Node from "./Node";

//assign-stmt --> IDENTIFIER := exp
function assignStmt(output, indexObj) {
  // match(IDENTIFIER)

  const id = match(
    output,
    indexObj,
    "IDENTIFIER",
    "Missing IDENTIFIER token in assignStmt"
  );
  // match(:=)
  const operator = match(output, indexObj, "ASSIGN", "Missing ASSIGN token in assignStmt");
  // match (exp)
  const expNode = exp(output, indexObj);
  
  const node = new Node(`assign(${id})`);
  node.addChild(expNode);
  return node;
}

export default assignStmt;
