let index = 0;
let program = (output, index) => {
  try {
    stmtSequence(output, index);
    return "success";
  } catch (e) {
    return "error";
  }
};
export default program;
