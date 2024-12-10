function match(output, indexObj, matcher, message) {
  console.log(indexObj.index, matcher, output[indexObj.index].type);
  if (output[indexObj.index]?.type === matcher) {
    indexObj.index++;
  } else {
    throw new Error(`invalid syntax ${message}`);
  }
}
export default match;
