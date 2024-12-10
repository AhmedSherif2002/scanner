import match from "./match";
import exp from "./exp";
function factor(output, indexObj) {
  if (output[indexObj.index]?.type === "OPENBRACKET") {
    match(
      output,
      indexObj,
      "OPENBRACKET",
      "missing OPENBRACKET token in factor"
    );
    exp(output, indexObj);
    match(
      output,
      indexObj,
      "CLOSEBRACKET",
      "missing CLOSEBRACKET token in factor"
    );
  } else if (output[indexObj.index]?.type === "IDENTIFIER") {
    match(output, indexObj, "IDENTIFIER", "Missing IDENTIFIER token in factor");
  } else if (output[indexObj.index]?.type === "NUMBER") {
    match(output, indexObj, "NUMBER", "Missing NUMBER token in factor");
  } else {
    throw new Error("invalid syntax in factor");
  }
}

export default factor;
