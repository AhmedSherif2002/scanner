// stmt-Sequence -> statement {;statement}
function StmtSequence(output, indexObj) {
  try {
    // match(statement)
    statement(output, indexObj);
    while (output.length > indexObj.index) {
      // match (;)
      if (output[indexObj.index]?.type === "SEMICOLON") {
        indexObj.index++;
      } else {
        throw new Error("There is a SEMICOLON Missing in stmtSequence");
      }
      // match(statement)
      statement(output, indexObj);
    }
  } catch (error) {
    throw error;
  }
}

export default StmtSequence;
