import match from "./match";
// comparisonOp --> < | =
function comparisonOp(output, indexObj) {
  // match(<) OR match (=)
  if (output[indexObj.index]?.type === "LESSTHAN")
    match(
      output,
      indexObj,
      "LESSTHAN",
      "Missing LESSTHAN token in comparisonOp"
    );
  else if (output[indexObj.index]?.type === "EQUAL")
    match(output, indexObj, "LESSTHAN", "Missing EQUAL token in comparisonOp");
}

export default comparisonOp;
