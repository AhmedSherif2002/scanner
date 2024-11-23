//mulOp --> * | /
function mulOp(output, indexObj) {
  try {
    // match(*) OR match (/)
    if (output[indexObj.index]?.type === "MULT") indexObj.index++;
    else if (output[indexObj.index]?.type === "DIV") indexObj.index++;
    else throw new Error("Missing MULT or DIV token in mulOp");
  } catch (error) {
    throw error;
  }
}

export default mulOp;
