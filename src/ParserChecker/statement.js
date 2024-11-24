import assignStmt from "./assignStmt";
import ifStmt from "./ifStmt";
import readStmt from "./readStmt";
import writeStmt from "./writeStmt";
import match from "./match";
function statement(output, index) {
  if (output[index]?.type === "IF") {
    ifStmt(output, index);
  } else if (output[index]?.type === "REPEAT") {
    repeatStmt(output, index);
  } else if (output[index]?.type === "IDENTIFIER") {
    assignStmt(output, index);
  } else if (output[index]?.type === "READ") {
    readStmt(output, index);
  } else if (output[index]?.type === "WRITE") {
    writeStmt(output, index);
  }
}
export default statement;
