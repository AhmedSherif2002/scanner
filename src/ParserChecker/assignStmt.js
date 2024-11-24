import match from "./match";
//assign-stmt --> IDENTIFIER := exp
function assignStmt(output, index) {
  try {
    // match(IDENTIFIER)
    if (output[index]?.type === "IDENTIFIER") index++;
    else throw new Error("Missing IDENTIFIER token in assignStmt");
    // match(:=)
    if (output[index]?.type === "ASSIGN") index++;
    else throw new Error("Missing ASSIGN token in assignStmt");
    // match (exp)
    exp(output, index);
  } catch (error) {
    throw error;
  }
}

export default assignStmt;
