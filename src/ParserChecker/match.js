function match(output, index, matcher) {
  if (output[index]?.type === matcher) {
    index++;
  } else {
    throw new Error("invalid syntax");
  }
}
export default match;
