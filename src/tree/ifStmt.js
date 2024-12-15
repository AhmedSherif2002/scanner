import stmtSequence from "./StmtSequence";
import exp from "./exp";
import match from "./match";

// ifStmt -> if exp then stmt-sequence [else stmt-sequence] end
function ifStmt(output, indexObj) {
  // match(IF)

  const node = match(output, indexObj, "IF", "Missing IF token in ifStmt");

  // match(exp)
  const node2 = exp(output, indexObj);

  //match(THEN)
  match(output, indexObj, "THEN", "Missing THEN token in ifStmt");

  //match(stmtSequence)
  const node3 = stmtSequence(output, indexObj);

  // match(ELSE) (OPTIONAL)
  let elseNode;
  if (output[indexObj.index]?.type === "ELSE") {
    elseNode = match(output, indexObj, "ELSE", "Missing ELSE token in ifStmt");
    // match(stmtSequence)
    const elseChild = stmtSequence(output, indexObj);
    elseNode.addChild(elseChild);
  }

  // match(END)
  match(output, indexObj, "END", "Missing END token in ifStmt");

  node.addChild(node2);
  node.addChild(node3);
  node.addChild(elseNode);
  return node;
}

export default ifStmt;
