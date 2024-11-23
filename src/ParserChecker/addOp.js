// addOp --> + | -
function addOp(output, indexObj) {
  try {
    // match(+) OR match (-)
    if (output[indexObj.index]?.type === "PLUS") indexObj.index++;
    else if (output[indexObj.index]?.type === "MINUS") indexObj.index++;
    else throw new Error("Missing PLUS or MINUS token in addOp");
  } catch (error) {
    throw error;
  }
}

export default addOp;
