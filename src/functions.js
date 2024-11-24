import fs from "fs";
import program from "./ParserChecker/program";

let states = [
  "Initial",
  "Number",
  "String",
  "Operator",
  "AssignOp",
  "Comment",
  "Error",
];

let preserved = {
  ";": "SEMICOLON",
  if: "IF",
  then: "THEN",
  end: "END",
  read: "READ",
  write: "WRITE",
  repeat: "REPEAT",
  until: "UNTIL",
  ":=": "ASSIGN",
  "<": "LESSTHAN",
  "=": "EQUAL",
  "+": "PLUS",
  "-": "MINUS",
  "*": "MULT",
  "/": "DIV",
  "(": "OPENBRACKET",
  ")": "CLOSEBRACKET",
};

let code = `
    read x;
    if 0<x then 
        fact:=1;
        repeat
            fact:=fact*x;
            x:=x-1
        until x=0;
        write fact 
    end
`;

// let delimiters = [" ",";","\n"];
let delimiters = [" ", "\n", "\r", "\t"];

let token = "";
let output = [];
let errors = [];
let stack = [];
let currState = "Initial";
let prevState = "Initial";

const parseToken = (token, state) => {
  if (state === "Comment") return;
  if (state === "String") {
    const type = preserved[token] ? preserved[token] : "IDENTIFIER";
    output.push({
      value: token,
      type,
    });
  }
  if (state === "Number") {
    output.push({
      value: token,
      type: "NUMBER",
    });
  }
  if (state === "AssignOp") {
    output.push({
      value: token,
      type: preserved[token],
    });
  }
  if (state === "Operator") {
    output.push({
      value: token,
      type: preserved[token],
    });
  }
};

const errorCheck = (currState, c, token) => {
  if (currState === "String" && /[0-9]/.test(c)) {
    handleError(currState, token, c, "Unexpected Token: ");
    currState = "Error";
    return true;
  }
  if (currState === "Number" && /[a-zA-Z]/.test(c)) {
    handleError(currState, token, c, "Unexpected Token: ");
    currState = "Error";
    return true;
  }
  if (currState === "Operator" && "=+-*/;<".includes(c) && token.endsWith(c)) {
    handleError(currState, token, c, "Unexpected Token: ");
    currState = "Error";
    return true;
  }
  if (currState === "AssignOp") {
    if ((token === ":=" && c === "=") || (token === ":" && c !== "=")) {
      handleError(currState, token, c, "Unexpected Token: ");
      currState = "Error";
      return true;
    }
  }
  if (c === ")") {
    // console.log("stack", stack);
    if (stack.at(-1) !== "(") {
      handleError(currState, token, c, "Open Bracket Missing: ");
      currState = "Error";
      return true;
    } else {
      stack.pop();
      //   console.log("stack", stack);
    }
  }
  if (c === "}") {
    // console.log("stack", stack);
    if (stack.at(-1) !== "{") {
      handleError(currState, token, c, "Open Bracket Missing: ");
      currState = "Error";
      return true;
    } else {
      stack.pop();
      //   console.log("stack", stack);
    }
  }
  return false;
};

const handleError = (state, token, c, type) => {
  const string = token + c;
  errors.push({
    type,
    string,
  });
};

const scan = (code) => {
  output = [];
  errors = [];
  stack = [];
  currState = "Initial";
  prevState = "Initial";
  token = "";
  // console.log(filepath)
  // let code = fs.readFileSync(filepath.toString(),"utf8");
  //   console.log(code);
  code += "\n";
  for (let c of code) {
    // console.log(c);
    if (currState === "Comment") {
      if (c !== "}") continue;
      else {
        currState = "Initial";
      }
    }
    if (c === "{") {
      currState = "Comment";
      stack.push("{");
    }
    if (delimiters.includes(c)) {
      currState = "Initial";
    }
    if (errorCheck(currState, c, token)) {
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      currState = "String";
    } else if ("=+-*/();<".includes(c)) {
      if (c === "=" && currState === "AssignOp") {
        currState = "AssignOp";
      } else {
        currState = "Operator";
        if (c === "(") stack.push("(");
        if ("()".includes(c)) {
          if ("()".includes(token) || prevState === "Operator") {
            parseToken(token, prevState);
            token = c;
            continue;
          }
        } else if (prevState === "Operator" && token !== ")") {
          handleError(currState, token, c, "Unexpected Token: ");
        }
      }
    } else if (/[0-9]/.test(c)) {
      currState = "Number";
    } else if (c === ":") {
      currState = "AssignOp";
    } else if (!delimiters.includes(c) && c !== "{" && c !== "}") {
      // unknown token
      handleError(currState, "", c, "Unknown Token: ");
    }
    if (prevState !== currState) {
      parseToken(token, prevState);
      token = c;
    } else {
      token += c;
    }
    prevState = currState;
  }
  if (stack.length !== 0) {
    for (let bracket of stack) {
      errors.push({
        type: "Bracket Not Closed: ",
        string: bracket,
      });
    }
  }
  //   console.log(output);
  console.log(program(output, { index: 0 }));
  return { errors, tokens: output };
};

// for(token of output){
//     console.log(token);
// }

export { scan };
