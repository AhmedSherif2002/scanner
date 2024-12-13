import Node from "./Node";

const special = ["IDENTIFIER","NUMBER","LESSTHAN","EQUAL","PLUS","MINUS","MULT","DIV"]

function match(output, indexObj, matcher, message) {

  console.log(indexObj.index, matcher, output[indexObj.index].type);
  if (output[indexObj.index]?.type === matcher) {
    indexObj.index++;
    if(special.includes(matcher)){
      console.log("Value is returned", output[indexObj.index-1].value)
      return output[indexObj.index-1].value;
    }else{
      const node = new Node(matcher);
      console.log("a node was made...", node)
      return node;
    }
  } else {
    console.log(message)
    throw new Error(`invalid syntax ${message}`);
  }
}
export default match;
