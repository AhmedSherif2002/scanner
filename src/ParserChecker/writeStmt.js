// writeStmt --> write exp
function writeStmt(output, indexObj) {
  try {
    // match(write)
    if (output[indexObj.index]?.type === "WRITE") indexObj.index++;
    else throw new Error("Missing WRITE token in writeStmt");

    // match (exp)
    exp(output, indexObj);
  } catch (error) {
    throw error;
  }
}

export default writeStmt;
