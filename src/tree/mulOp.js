import match from "./match";
import Node from "./Node";

//mulOp --> * | /
function mulOp(output, index) {
  // match(*) OR match (/)
  let op;
  if (output[indexObj.index]?.type === "MULT")
    op = match(output, indexObj, "MULT", "Missing MULT token in mulOp");
  else if (output[indexObj.index]?.type === "DIV")
    op = match(output, indexObj, "DIV", "Missing DIV token in mulOp");

  const node = new Node(`op(${op})`);
  return node
}

export default mulOp;
