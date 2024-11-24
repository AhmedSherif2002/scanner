import match from "./match";
// writeStmt --> write exp
function writeStmt(output, index) {
  try {
    // match(write)
    if (output[index]?.type === "WRITE") index++;
    else throw new Error("Missing WRITE token in writeStmt");

    // match (exp)
    exp(output, index);
  } catch (error) {
    throw error;
  }
}

export default writeStmt;
