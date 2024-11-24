import match from "./match";
//mulOp --> * | /
function mulOp(output, index) {
  try {
    // match(*) OR match (/)
    if (output[index]?.type === "MULT") index++;
    else if (output[index]?.type === "DIV") index++;
    else throw new Error("Missing MULT or DIV token in mulOp");
  } catch (error) {
    throw error;
  }
}

export default mulOp;
