import match from "./match";
import statement from "./statement";

// stmt-Sequence -> statement {;statement}
function stmtSequence(output, indexObj) {
  // match(statement)
  const node = statement(output, indexObj);
  let prevNode = node;
  while (output[indexObj.index]?.type === "SEMICOLON") {
    const type = output[indexObj.index].type
    console.log("Reaching final semicolon",type)
    match(
      output,
      indexObj,
      `${type}`,
      `Missing SEMICOLON token in stmtSequence`
    );

    // match(statement)
    const node2 = statement(output, indexObj);
    prevNode.addSibling(node2)    
    prevNode = node2;
    if(!output[indexObj.index]) break
  }
  // if(output[indexObj.index]?.type === "END"){
  //   // console.log("Reaching final end",type)
  //   match(
  //     output,
  //     indexObj,
  //     `END`,
  //     `Missing END token in stmtSequence`
  //   );
  //   const node2 = statement(output, indexObj);
  //   node.addSibling(node2)
  // }
  return node;
}

export default stmtSequence;
