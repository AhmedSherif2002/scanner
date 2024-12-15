import simpleExp from "./simpleExp";
import match from "./match";

function exp(output, indexObj) {
  simpleExp(output, indexObj);
  if (output[indexObj.index]?.type === "LESSTHAN") {
    match(output, indexObj, "LESSTHAN", "missing LESSTHAN token in exp");
    simpleExp(output, indexObj);
  } else if (output[indexObj.index]?.type === "EQUAL") {
    match(output, indexObj, "EQUAL", "missing EQUAL token in exp");
    simpleExp(output, indexObj);
  }
}
export default exp;
