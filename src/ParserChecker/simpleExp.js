import addOp from "./addOp";
import match from "./match";
import term from "./term";
function simpleExp(output, indexObj) {
  term(output, indexObj);
  while (
    output[indexObj.index]?.type === "PLUS" ||
    output[indexObj.index]?.type === "MINUS"
  ) {
    addOp(output, indexObj);
    term(output, indexObj);
  }
}
export default simpleExp;
