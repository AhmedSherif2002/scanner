import match from "./match";
//mulOp --> * | /
function mulOp(output, index) {
  // match(*) OR match (/)
  if (output[indexObj.index]?.type === "MULT")
    match(output, indexObj, "MULT", "Missing MULT token in mulOp");
  else if (output[indexObj.index]?.type === "DIV")
    match(output, indexObj, "DIV", "Missing DIV token in mulOp");
}

export default mulOp;
