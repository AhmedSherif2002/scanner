import match from "./match";
function simpleExp(output, index) {
  term(output, index);
  while (output[index]?.type === "PLUS") {
    match(output, index, "PLUS");
    term(output, index);
  }
}
export default simpleExp;
