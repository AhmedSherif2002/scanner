import simpleExp from "./simpleExp";
import match from "./match";
function exp(output, index) {
  simpleExp(output, index);
  if (output[index]?.type === "LESSTHAN") {
    match(output, index, "LESSTHAN");
    simpleExp(output, index);
  } else if (output[index]?.type === "EQUAL") {
    match(output, index, "EQUAL");
    simpleExp(output, index);
  }
}
export default exp;
