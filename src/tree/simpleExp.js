import addOp from "./addOp";
import match from "./match";
import term from "./term";

function simpleExp(output, indexObj) {
  const leftNode = term(output, indexObj);
  let prevNode = null;
  let prevFactor = null;
  let parentNode = null;
  if(output[indexObj.index]?.type === "PLUS" || output[indexObj.index]?.type === "MINUS"){
    parentNode = addOp(output, indexObj);
    const rightNode = term(output, indexObj);
    parentNode.addChild(leftNode);
    prevNode = parentNode;
    prevFactor = rightNode;
  }else return leftNode;
  let flag = 0
  while (output[indexObj.index]?.type === "PLUS" || output[indexObj.index]?.type === "MINUS") {
    const node = addOp(output, indexObj);
    const rightNode = term(output, indexObj);

    node.addChild(prevFactor)
    prevNode.addChild(node);
    prevNode = node
    prevFactor = rightNode;
    flag = 1
  }
  prevNode.addChild(prevFactor);
  // if(flag)
  // else prevNode.addChild(prevFactor)
  return parentNode;
}
export default simpleExp;
