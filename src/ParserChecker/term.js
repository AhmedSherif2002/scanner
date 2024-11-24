import match from "./match";
function term(output, index) {
  factor(output, index);
  while (output[index]?.type === "MULT") {
    match(output, index, "MULT");
    factor(output, index);
  }
}
export default term;
