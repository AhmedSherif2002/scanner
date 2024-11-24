import stmtSequence from "./StmtSequence";

let program = (output, indexObj) => {
  try {
    stmtSequence(output, indexObj);
    if (indexObj.index < output.length) throw new Error("invalid parsing");
    indexObj.index = 0;
    return "success";
  } catch (e) {
    return e.message;
  }
};
export default program;
