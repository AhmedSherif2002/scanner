import assignStmt from "./assignStmt";
import ifStmt from "./IfStmt";
import readStmt from "./readStmt";
import writeStmt from "./writeStmt";
import match from "./match";
import repeatStmt from "./repeatStmt";

function statement(output, indexObj) {
  let node;
  if (output[indexObj.index]?.type === "IF") {
    node = ifStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "REPEAT") {
    node = repeatStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "IDENTIFIER") {
    node = assignStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "READ") {
    node = readStmt(output, indexObj);
  } else if (output[indexObj.index]?.type === "WRITE") {
    node = writeStmt(output, indexObj);
  } else {
    throw new Error("Invalid , there must be a new valid statement ");
  }
  return node;
}
export default statement;
