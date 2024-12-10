import match from "./match";
// addOp --> + | -
function addOp(output, indexObj) {
  // match(+) OR match (-)
  if (output[indexObj.index]?.type === "PLUS")
    match(output, indexObj, "PLUS", "Missing PLUS token in addOp");
  else if (output[indexObj.index]?.type === "MINUS")
    match(output, indexObj, "MINUS", "Missing MINUS token in addOp");
}

export default addOp;
