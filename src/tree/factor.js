import match from "./match";
import exp from "./exp";
import Node from "./Node";

function factor(output, indexObj) {
  if (output[indexObj.index]?.type === "OPENBRACKET") {
    match(
      output,
      indexObj,
      "OPENBRACKET",
      "missing OPENBRACKET token in factor"
    );
    const node = exp(output, indexObj);
    match(
      output,
      indexObj,
      "CLOSEBRACKET",
      "missing CLOSEBRACKET token in factor"
    );
    return node;
  } else if (output[indexObj.index]?.type === "IDENTIFIER") {
    const id = match(output, indexObj, "IDENTIFIER", "Missing IDENTIFIER token in factor");
    const node = new Node(`id(${id})`)
    return node;
  } else if (output[indexObj.index]?.type === "NUMBER") {
    const number = match(output, indexObj, "NUMBER", "Missing NUMBER token in factor");
    const node = new Node(`const(${number})`)
    return node;
  } else {
    throw new Error("invalid syntax in factor");
  }
}

export default factor;
