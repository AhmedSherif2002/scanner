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
  else: "ELSE",
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

let delimiters = [" ", "\n", "\r", "\t"];

let token = "";
let output = [];
let errors = [];
let stack = [];
let currState = "Initial";
let prevState = "Initial";

const parseToken = (token, state) => {
  console.log("parsing:", "token:", token, "state:", state)
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
    handleOps(token)
  }
};

const handleOps= (tokenString)=>{
  for(let token of tokenString){
    output.push({
      value: token,
      type: preserved[token],
    });
  }
}

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
  code += "\n";
  for (let c of code) {
    console.log("current",c, "state:", currState, "prevState:", prevState);
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
    if (/[a-zA-Z]/.test(c)) {
      currState = "String";
    } else if ("=+-*/();<".includes(c)) {
      if (c === "=" && currState === "AssignOp") {
        currState = "AssignOp";
      }
      else {
        currState = "Operator";
      }
    } else if (/[0-9]/.test(c)) {
      currState = "Number";
    } else if (c === ":") {
      currState = "AssignOp";
    } else if (!delimiters.includes(c) && c !== "{" && c !== "}") {  // Unknown token 
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
  const parsingAvailable = program(output, { index: 0 });
  return { errors, tokens: output, parsingAvailable };
};

export { scan };
