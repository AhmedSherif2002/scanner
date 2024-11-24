import match from "./match";
// stmt-Sequence -> statement {;statement}
function StmtSequence(output, index) {
  try {
    // match(statement)
    statement(output, index);
    while (output.length > index) {
      // match (;)
      if (output[index]?.type === "SEMICOLON") {
        index++;
      } else {
        throw new Error("There is a SEMICOLON Missing in stmtSequence");
      }
      // match(statement)
      statement(output, index);
    }
  } catch (error) {
    throw error;
  }
}

export default StmtSequence;
