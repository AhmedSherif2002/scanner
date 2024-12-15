import match from "./match";
import Node from "./Node";

// addOp --> + | -
function addOp(output, indexObj) {
  // match(+) OR match (-)
  let op;
  if (output[indexObj.index]?.type === "PLUS"){
    op = match(output, indexObj, "PLUS", "Missing PLUS token in addOp");
  }
  else if (output[indexObj.index]?.type === "MINUS"){
    op = match(output, indexObj, "MINUS", "Missing MINUS token in addOp");
  }

  const node = new Node(`op(${op})`);
  return node;
}

export default addOp;
