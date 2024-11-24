import match from "./match";
// addOp --> + | -
function addOp(output, index) {
  try {
    // match(+) OR match (-)
    if (output[index]?.type === "PLUS") index++;
    else if (output[index]?.type === "MINUS") index++;
    else throw new Error("Missing PLUS or MINUS token in addOp");
  } catch (error) {
    throw error;
  }
}

export default addOp;
