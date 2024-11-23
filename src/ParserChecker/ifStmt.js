import StmtSequence from "./StmtSequence";

// ifStmt -> if exp then stmt-sequence [else stmt-sequence] end
function ifStmt(output, indexObj) {
  try {
    // match(IF)
    if (output[indexObj.index]?.type === "IF") {
      indexObj.index++;
    } else {
      throw new Error("Missing IF token in ifStmt");
    }

    // match(exp)
    exp(output, indexObj);

    //match(THEN)
    if (output[indexObj.index]?.type === "THEN") {
      indexObj.index++;
    } else {
      throw new Error("Missing THEN token in ifStmt");
    }

    //match(stmtSequence)
    StmtSequence(output, indexObj);

    // match(ELSE) (OPTIONAL)
    if (output[indexObj.index]?.type === "ELSE") {
      index++;
      // match(stmtSequence)
      StmtSequence(output, indexObj);
    }

    // match(END)
    if (output[indexObj.index]?.type === "END") indexObj.index++;
    else {
      throw new Error("Missing END token in ifStmt");
    }
  } catch (error) {
    throw error;
  }
}

export default ifStmt;
