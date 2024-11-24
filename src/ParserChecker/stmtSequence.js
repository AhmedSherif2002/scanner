import match from "./match";
import statement from "./statement";
// stmt-Sequence -> statement {;statement}
function stmtSequence(output, indexObj) {
  // match(statement)
  statement(output, indexObj);
  while (output[indexObj.index]?.type === "SEMICOLON") {
    match(
      output,
      indexObj,
      "SEMICOLON",
      "Missing SEMICOLON token in stmtSequence"
    );

    // match(statement)
    statement(output, indexObj);
  }
}

export default stmtSequence;
