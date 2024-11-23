//assign-stmt --> IDENTIFIER := exp
function assignStmt(output, indexObj) {
  try {
    // match(IDENTIFIER)
    if (output[indexObj.index]?.type === "IDENTIFIER") indexObj.index++;
    else throw new Error("Missing IDENTIFIER token in assignStmt");
    // match(:=)
    if (output[indexObj.index]?.type === "ASSIGN") indexObj.index++;
    else throw new Error("Missing ASSIGN token in assignStmt");
    // match (exp)
    exp(output, indexObj);
  } catch (error) {
    throw error;
  }
}

export default assignStmt;
