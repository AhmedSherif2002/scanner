const fs = require("fs");

let states = ["Initial","Number","String","Operator","AssignOp","Comment"];

let preserved = {
    ";":"SEMICOLON",
    "if":"IF",
    "then":"THEN",
    "end":"END",
    "read":"READ",
    "write":"WRITE",
    "repeat":"REPEAT",
    "until":"UNTIL",
    ":=":"ASSIGN",
    "<":"LESSTHAN",
    "=":"EQUAL",
    "+":"PLUS",
    "-":"MINUS",
    "*":"MULT",
    "/":"DIV",
    "(":"OPENBRACKET",
    ")":"CLOSEBRACKET",
}

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
`

// let delimiters = [" ",";","\n"];
let delimiters = [" ","\n","\r"];

let token = "";
let output = [];
let currState = "Initial";
let prevState = "Initial";

const getType = (token) => {
    if(isNaN(parseInt(token))) return "IDENTIFIER"
    else return "NUMBER"
}

const sanitizeToken = (token, state)=>{
    if(state === "Comment") return;
    if(state === "String"){
        const type = preserved[token]?preserved[token]:"IDENTIFIER";
        output.push({
            value: token,
            type
        })
    }
    if(state === "Number"){
        output.push({
            value: token,
            type: "NUMBER"
        })
    }
    if(state === "AssignOp"){
        output.push({
            value: token,
            type: preserved[token]
        })
    }
    if(state === "Operator"){
        output.push({
            value: token,
            type: preserved[token]
        })
    }
}

const scan = (filepath)=>{
    console.log(filepath)
    let code = fs.readFileSync(filepath.toString(),"utf8");
    console.log(code)
    code += "\n";
    for(let c of code){
        console.log(c);
        if(currState === "Comment"){
            if(c !== "}") continue
            else{
                currState = "Initial";
            }
        }
        if(c === "{"){
            currState = "Comment";
        }
        if(delimiters.includes(c)){
            currState = "Initial"
        }
        if(/[a-zA-Z]/.test(c)){
            currState = "String";
        }
        if("=+-*/();<".includes(c)){
            if(c === "=" && currState === "AssignOp"){
                currState = "AssignOp"
            }else 
                currState = "Operator";
        }
        if(/[0-9]/.test(c)){
            currState = "Number";
        }
        if(c === ":"){
            currState = "AssignOp"
        }
        if(prevState !== currState){
            sanitizeToken(token, prevState);
            token = c;
        }else{
            token += c;
        }
        prevState = currState;
    }
    return output;
}

// for(token of output){
//     console.log(token);
// }

export {
    scan
}