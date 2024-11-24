import match from "./match";
function factor(output, index) {
  if (output[index]?.type === "OPENBRACKET") {
    match(output, index, "OPENBRACKET");
    exp(output, index);
    match(output, index, "CLOSEBRACKET");
  } else if (
    output[index]?.type === "IDENTIFIER" ||
    output[index]?.type === "NUMBER"
  ) {
    index++;
  } else {
    throw new Error("invalid syntax");
  }
}

export default factor;
