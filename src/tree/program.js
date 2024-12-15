import stmtSequence from "./StmtSequence";

let program = (output, indexObj) => {
  try {
    const node = stmtSequence(output, indexObj);
    if (indexObj.index < output.length) throw new Error("invalid parsing");
    indexObj.index = 0;
    // return "success";
    return node;
  }
  catch (e) {
    console.log(e.message)
    return e.message;
  }
};
export default program;
