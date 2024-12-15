import factor from "./factor";
import match from "./match";
import Node from "./Node";

function term(output, indexObj) {
  const leftNode = factor(output, indexObj);
  let prevNode = null;
  let prevFactor = null;
  let parentNode = null;
  if(output[indexObj.index]?.type === "MULT" || output[indexObj.index]?.type === "DIV"){
    const type = output[indexObj.index]?.type
    const operator = match(output, indexObj, `${type}`, `missing ${type} token in term`);
    parentNode = new Node(`op(${operator})`);
    const rightNode = factor(output, indexObj);
    parentNode.addChild(leftNode);
    prevNode = parentNode;
    prevFactor = rightNode;
  }else return leftNode;
  let flag = 0;
  while (output[indexObj.index]?.type === "MULT" || output[indexObj.index]?.type === "DIV"){
    const type = output[indexObj.index]?.type
    const operator = match(output, indexObj, `${type}`, "missing MULT token in term");
    const node = new Node(`op(${operator})`);
    const rightNode = factor(output, indexObj);
    // node.addChild(prevFactor);
    // node.addChild(prevNode)
    // if(prevNode !== null){
      // }
    node.addChild(prevFactor)
    prevNode.addChild(node);
    prevNode = node
    prevFactor = rightNode;
    flag = 1
  }
  console.log("reached")
  prevNode.addChild(prevFactor);
  // if(flag)
  console.log("unreached")
  return parentNode;

}
export default term;
