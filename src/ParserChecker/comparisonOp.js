// comparisonOp --> < | =
function comparisonOp(output, indexObj) {
  try {
    // match(<) OR match (=)
    if (output[indexObj.index]?.type === "LESSTHAN") indexObj.index++;
    else if (output[indexObj.index]?.type === "EQUAL") indexObj.index++;
    else throw new Error("Missing LESSTHAN or EQUAL token in comparisonOp");
  } catch (error) {
    throw error;
  }
}

export default comparisonOp;
