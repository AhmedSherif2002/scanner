import match from "./match";
// comparisonOp --> < | =
function comparisonOp(output, index) {
  try {
    // match(<) OR match (=)
    if (output[index]?.type === "LESSTHAN") index++;
    else if (output[index]?.type === "EQUAL") index++;
    else throw new Error("Missing LESSTHAN or EQUAL token in comparisonOp");
  } catch (error) {
    throw error;
  }
}

export default comparisonOp;
