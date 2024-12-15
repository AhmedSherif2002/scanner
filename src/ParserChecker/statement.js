import assignStmt from "./assignStmt";
import ifStmt from "./IfStmt";
import readStmt from "./readStmt";
import writeStmt from "./writeStmt";
import match from "./match";
import repeatStmt from "./repeatStmt";

function statement(output, indexObj) {
  if (output[indexObj.index]?.type === "IF") {
    ifStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "REPEAT") {
    repeatStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "IDENTIFIER") {
    assignStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "READ") {
    readStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "WRITE") {
    writeStmt(output, indexObj);
  } else {
    throw new Error("Invalid , there must be a new valid statement ");
  }
}
export default statement;
