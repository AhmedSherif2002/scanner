import StmtSequence from "./StmtSequence";
import match from "./match";
// ifStmt -> if exp then stmt-sequence [else stmt-sequence] end
function ifStmt(output, index) {
  try {
    // match(IF)
    if (output[index]?.type === "IF") {
      index++;
    } else {
      throw new Error("Missing IF token in ifStmt");
    }

    // match(exp)
    exp(output, index);

    //match(THEN)
    if (output[index]?.type === "THEN") {
      index++;
    } else {
      throw new Error("Missing THEN token in ifStmt");
    }

    //match(stmtSequence)
    StmtSequence(output, index);

    // match(ELSE) (OPTIONAL)
    if (output[index]?.type === "ELSE") {
      index++;
      // match(stmtSequence)
      StmtSequence(output, index);
    }

    // match(END)
    if (output[index]?.type === "END") index++;
    else {
      throw new Error("Missing END token in ifStmt");
    }
  } catch (error) {
    throw error;
  }
}

export default ifStmt;
