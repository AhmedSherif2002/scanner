import match from "./match";
import Node from "./Node";

// comparisonOp --> < | =
function comparisonOp(output, indexObj) {
  // match(<) OR match (=)
  let operator;
  if (output[indexObj.index]?.type === "LESSTHAN"){
    operator = match(
      output,
      indexObj,
      "LESSTHAN",
      "Missing LESSTHAN token in comparisonOp"
    );
    
  }
  else if (output[indexObj.index]?.type === "EQUAL")
    operator = match(output, indexObj, "EQUAL", "Missing EQUAL token in comparisonOp");

  const node = new Node(`op(${operator})`)
  return node;
}

export default comparisonOp;
