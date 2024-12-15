import simpleExp from "./simpleExp";
import match from "./match";
import Node from "./Node";

function exp(output, indexObj) {
  console.log("reach2")
  const left = simpleExp(output, indexObj);
  console.log("reach2")
  if (output[indexObj.index]?.type === "LESSTHAN") {
    const op = match(output, indexObj, "LESSTHAN", "missing LESSTHAN token in exp");
    const node = new Node(`op(${op})`);
    const right = simpleExp(output, indexObj);
    node.addChild(left);
    node.addChild(right);
    return node
  } else if (output[indexObj.index]?.type === "EQUAL") {
    const op = match(output, indexObj, "EQUAL", "missing EQUAL token in exp");
    const node = new Node(`op(${op})`);
    const right = simpleExp(output, indexObj);
    node.addChild(left);
    node.addChild(right);
    return node
  }else{
    return left
  }
}
export default exp;
