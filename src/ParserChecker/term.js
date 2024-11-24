import factor from "./factor";
import match from "./match";
function term(output, indexObj) {
  factor(output, indexObj);
  while (output[indexObj.index]?.type === "MULT") {
    match(output, indexObj, "MULT", "missing MULT token in term");
    factor(output, indexObj);
  }
}
export default term;
